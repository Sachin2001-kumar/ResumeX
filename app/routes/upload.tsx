import React, { useState } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { prepareInstructions } from "~/content";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

const Upload = () => {
    const {auth,fs,isLoading,ai,kv}=usePuterStore();
    const navigate=useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const  handleAnalyze=async ({companyName,jobTitle,jobDescription,file}:{companyName: string, jobTitle: string, jobDescription: string, file: File})=>{
   setIsProcessing(true);
   setStatusText("Uplaoding your file");
    const uploadFile =await fs.upload([file]);
    if(!uploadFile) return setStatusText("Error: failed to upload file");

    setStatusText("Converting to image");
    const imagefile = await convertPdfToImage(file);
    if (!imagefile.file) return setStatusText("Error: failed to convert pdf to image ");

    setStatusText("Uplaod the image...");
    const uploadedImage = await fs.upload([imagefile.file]);

    setStatusText("preparing the data for analysis...");
    const uuid =generateUUID();
    const resumeData={
      id :uuid,
      resumePath:uploadFile.path,
      imagePath: uploadedImage?.path,
      companyName,jobTitle,jobDescription,
      feedback:''
    }

    await kv.set(`resume:${uuid}`, JSON.stringify(resumeData))

    setStatusText('Analyzing ....');
    const feedback = await ai.feedback(
        uploadFile.path,
        prepareInstructions({jobTitle,jobDescription})
    )
    if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        resumeData.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(resumeData));
        setStatusText('Analysis complete, redirecting...');
        console.log(resumeData);
        navigate(`/resume/${uuid}`);
    
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if(!file) return;

    handleAnalyze({companyName, jobTitle, jobDescription, file})
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading">
          <h1>Smart Feedback to your dream Job</h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="Resume scanning animation"
                className="w-full"
              />
            </>
          ) : (
            <h2>Drop your resume for an ATS Score and Improvements Tips</h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  id="company-name"
                  placeholder="Company Name"
                  required
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  id="job-title"
                  placeholder="Job Title"
                  required
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  id="job-description"
                  placeholder="Job Description"
                  required
                />
              </div>

              <div className="form-div">
                <label htmlFor="uploader">Upload Resume (PDF)</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
