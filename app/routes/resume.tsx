
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import ATS from '~/components/ATS'
import Details from '~/components/Details'
import Summary from '~/components/Summary'
import { usePuterStore } from '~/lib/puter'

export const meta =()=>{[
    {title:'ResumeX- Resume'},
    {name:'description', content:'View your ResumeX resume'}
]}

const resume = () => {
    const {auth, isLoading ,kv,fs} = usePuterStore();
    const [resumeUrl,setresumeUrl]=useState('');
    const [imageUrl,setimageUrl]=useState('');
    const [feedback,setFeedback]=useState<Feedback|null>(null);
    const navigate=useNavigate();
    const {id} =useParams()

    useEffect(()=>{
      if(!isLoading && !auth.isAuthenticated){
        navigate(`/auth?next=/resume/${id}`);
      }
    },[auth.isAuthenticated])
    useEffect(()=>{
     const loadresume=async()=>{
        const resume= await kv.get(`resume:${id}`);
        if(!resume) return;
        const data=JSON.parse(resume);
        const resumeblob=await fs.read(data.resumePath);
        if(!resumeblob) return;
        const pdfblob=new Blob([resumeblob],{type:'application/pdf'});
        const resumeUrl=URL.createObjectURL(pdfblob);
        setresumeUrl(resumeUrl)

        //for Image 
        const imageblob=await fs.read(data.resumePath);
        if(!imageblob) return;
        const imageUrl=URL.createObjectURL(imageblob);
        setimageUrl(imageUrl);
       //feedback
       setFeedback(data.feedback);
     }

     loadresume();
    },[id])
  return (
    <main className='pt-0!'>
       <nav className='resume-nav'>
        <Link to="/" className='back-button'>
        <img src='/icons/back.svg' alt='back-arrow' className='w-2.5 h-2.5'/>
        <span className='text-gray-800 text-sm font-semibold'>Back to Homepage</span>
        </Link>
       </nav>
       <div className='flex flex-row w-full max-lg:flex-col-reverse'>
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-screen sticky top-0 items-center justify-center flex" >
          {imageUrl && resumeUrl && (
            <div className='animate-in fade-in duration-1000 gradient-border max-sm: m-0 h-[90%] max-2xl:h-fit w-fit'>
                <a href={resumeUrl} target='_blank'> 
                  <img src={imageUrl} alt='Resume Image' className='w-full h-full object-contain rounded-2xl' title='resume-image'/>
                </a>
            </div>
          )}
        </section>
        <section className='feedback-section'>
          <h2 className='text-4xl text-black! font-bold'>Resume Review</h2>
          {feedback ?(
            <div className='flex flex-col gap-8 animate-in fade-in duration-1000'>Summary ATS details
            <Summary feedback={feedback}/>
            <ATS score={feedback.ATS.score|| 0} suggestions={(feedback.ATS.tips || []).map((s: any) => ({ type: s.types, tip: s.tips }))}/>
            <Details feedback={feedback}/>
            </div>
          ):(
            <img src='public/images/resume-scan-2.gif' alt='scanning-resume' className='w-full'/>
          )}
        </section>
       
       </div> 
    </main>
  )
}

export default resume