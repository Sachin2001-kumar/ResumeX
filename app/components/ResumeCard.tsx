import { Link } from "react-router"
import ScrollCircle from "./ScrollCircle"


export const ResumeCard = ({resume}:{resume:Resume}) => {
  return (
    <Link to={`/resume/${resume.id}`} className="resume-card animate-in fade-in duration-1000">
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
            <h1 className="text-black! font-bold wrap-break-word">{resume.companyName}</h1>
            <h2 className="text-lg wrap-break-word text-gray-500">{resume.jobTitle}</h2>
        </div>
        <div className="flex shrink-0">
          <ScrollCircle score={resume.feedback.overallScore}/>
        </div>
      </div>
      <div  className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
            <img
            src={resume.imagePath}
            alt="Resume"
            className="w-full h-87.5 max-sm:h-50 object-fit rounded-lg"
            />
        </div>
      </div>
    </Link>
)
}
