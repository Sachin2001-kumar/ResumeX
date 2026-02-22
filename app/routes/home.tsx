import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Footer from "~/components/Footer";
import FAQ from "~/components/FAQ";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeX" },
    { name: "description", content: "Smart Analyzer For your Resume" },
  ];
}

export default function Home() {
  const {auth,fs,kv} = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadResumes,setLoadingResumes]=useState(false);
   
    const navigate=useNavigate();

    useEffect(()=>{
      if(!auth.isAuthenticated){
        navigate('/auth?next=/');
      }
    },[auth.isAuthenticated])

    useEffect(()=>{
       const loadResume=async()=>{
            setLoadingResumes(true);
             const resumes = (await kv.list('resume:*', true)) as KVItem[];

             const parsedResumes=resumes?.map((resume)=>(
              JSON.parse(resume.value) as Resume
             ))
            setResumes(parsedResumes || []);
      setLoadingResumes(false);

           
       }
       loadResume();
    },[])

    
  return <main className="bg-[url('images/bg-main.svg')]">
    <Navbar/>
    <section className="main-section">
      <div className="page-heading mb-10">
      
        <h1 > Track Your Application & Resume Ratings</h1>
        {!loadResumes && resumes?.length===0?(
          <h2>No resumes found. Upload your first resume to get feedback.</h2>
        ):(
           <h2>Review your submissions and check AI-powered feedback.</h2>
        )}
       
      </div>
      {loadResumes && (
          <div className="flex flex-col items-center justify-center">
            <img src="/images/resume-scan-2.gif" className="w-50" />
          </div>
      )}
       { !loadResumes && resumes.length > 0 && (
        <div>
          <h2 className="text-4xl font-bold mb-6 text-center text-black!">
              Your All Resumes
            </h2>
     
        <div className="resumes-section">

          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
           </div>
      )}

      {!loadResumes && resumes?.length===0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link to="/upload" className="primary-button w-fit text-xl font-semibold">Upload your First Resume</Link>
        </div>
      )}

    </section>
    <FAQ/>
    <Footer/>
  </main> ;
}
