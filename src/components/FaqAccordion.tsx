
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the response time for inquiries?",
    answer: "We strive to respond to all inquiries within 24 business hours. For urgent matters, please call us directly."
  },
  {
    question: "Do you offer technical support for courses?",
    answer: "Yes, our technical support team is available to help with any platform-related issues. Please select 'Technical Support' as the inquiry type in the contact form."
  },
  {
    question: "Can I get a refund for a subscription?",
    answer: "Refund policies vary depending on the subscription plan. Please review our Terms of Service or contact our billing department for specific details."
  },
  {
    question: "How do I provide feedback or a testimonial?",
    answer: "We love hearing from you! You can use the contact form on this page and select 'Feedback / Testimonial' as the reason. We might even feature your testimonial on our site!"
  }
];

const FaqAccordion = () => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center text-foreground mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqAccordion;
