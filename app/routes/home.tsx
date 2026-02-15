import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { ResumeCard } from "~/components/ResumeCard";
import { resumes } from "~/content";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeX" },
    { name: "description", content: "Smart Analyzer For your Resume" },
  ];
}

export default function Home() {
  return <main className="bg-[url('images/bg-main.svg')] bg-cover">
    <Navbar/>
    <section className="main-section">
      <div className="page-heading">
      
        <h1 > Track Your Application & Resume Ratings</h1>
        <h2>Review your submissions and check AI-powered feedback.</h2>
      </div>
       { resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

    </section>
  </main> ;
}
