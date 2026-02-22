export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "faq1",
    question: "How does ResumeX rate my resume?",
    answer:
      "ResumeX uses AI-powered analysis to evaluate formatting, keyword optimization, structure, readability, and industry relevance to give your resume a score.",
  },
  {
    id: "faq2",
    question: "Is my resume data secure?",
    answer:
      "Yes. We prioritize your privacy and use secure encryption to protect your uploaded resume and personal information.",
  },
  {
    id: "faq3",
    question: "Can I edit my resume after uploading?",
    answer:
      "Absolutely. You can update, re-upload, or modify your resume at any time and receive updated AI feedback instantly.",
  },
  {
    id: "faq4",
    question: "Does ResumeX support different industries?",
    answer:
      "Yes. Our AI is trained across multiple industries including tech, finance, marketing, healthcare, and more.",
  },
  {
    id: "faq5",
    question: "Is ResumeX free to use?",
    answer:
      "We offer both free and premium plans. Free users can upload and review resumes, while premium users unlock advanced analytics and optimization tips.",
  },
  {
    id: "faq6",
    question: "How accurate is the AI feedback?",
    answer:
      "Our AI provides highly accurate suggestions based on ATS standards and hiring trends, but human review is always recommended for final polishing.",
  },
];