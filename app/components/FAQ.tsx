import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "./Accordion";

import { faqData } from "~/lib/data";

const FAQ = () => {
  return (
    <section className="w-full bg-transparent py-12">

      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about ResumeX.
          </p>
        </div>

        {/* Centered Accordion Container */}
        <div className="max-w-4xl mx-auto">
          <Accordion
            allowMultiple
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4"
          >
            {faqData.map((item) => (
              <AccordionItem key={item.id} id={item.id}>
                <AccordionHeader
                  itemId={item.id}
                  className="font-semibold text-lg"
                >
                  {item.question}
                </AccordionHeader>
                <AccordionContent
                  itemId={item.id}
                  className="text-gray-600 text-sm"
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default FAQ;