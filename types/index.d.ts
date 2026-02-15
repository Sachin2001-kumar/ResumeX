interface Resume {
    id: string;
    companyName?:string;
    jobTitle?:string;
    imagePath?:string;
    resumePath?:string;
    feedback:Feedback;
}

interface Feedback{
    overallScore:number;
    ATS:{
        score:number;
        tips:{
            types:"good" |"improve";
            tips:string;
        }[];
    };
    toneAndStyle:{
        score:number;
        tips:{
            types:"good" |"improve";
            tips:string;
            explanation:string;
        }[];
    };
    content:{
        score:number;
        tips:{
            types:"good" |"improve";
            tips:string;
            explanation:string;
        }[];
    };
    structure:{
        score:number;
        tips:{
            types:"good" |"improve";
            tips:string;
            explanation:string;
        }[];
    };
    skills:{
        score:number;
        tips:{
            types:"good" |"improve";
            tips:string;
            explanation:string;
        }[];
    };

}