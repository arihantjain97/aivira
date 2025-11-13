'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { faqs } from '@/lib/constants';

// Additional category-specific FAQs
const grantFaqs = [
  {
    question: 'What types of grants are available for Singapore businesses?',
    answer: 'Singapore offers numerous grants for businesses including the Productivity Solutions Grant (PSG), Enterprise Development Grant (EDG), Market Readiness Assistance (MRA), and many more. These grants support various business needs from technology adoption to overseas expansion.'
  },
  {
    question: 'How do I know which grant is right for my business?',
    answer: 'Determining the right grant depends on your specific business needs, growth stage, and objectives. Aivira\'s AI matching algorithm analyzes your business profile against all available grants to recommend the ones most suitable for you.'
  },
  {
    question: 'Does using Aivira guarantee my grant will be approved?',
    answer: 'No. Approval decisions are made solely by the relevant government agencies. Aivira helps you stay organized and compliant, but no tool or consultant can promise an approval outcome.'
  },
  {
    question: 'How long does the grant application process usually take?',
    answer: 'The timeline varies by grant, but typically takes 2-3 months from submission to approval. After approval, fund disbursement generally follows a reimbursement model based on project milestones. Aivira helps you plan for these timelines and track all important dates.'
  },
];

const platformFaqs = [
  {
    question: 'Can Aivira integrate with my existing business software?',
    answer: 'Yes, Aivira offers API integrations with common business software including accounting packages, CRM systems, and document management platforms. This allows for seamless data flow and reduces duplicate data entry.'
  },
  {
    question: 'Is Aivira suitable for all industries?',
    answer: 'Aivira works for businesses across all industries. Our AI engine has been trained on successful applications from various sectors and can adapt recommendations to your specific industry context and requirements.'
  },
  {
    question: 'What if I need help beyond what the platform provides?',
    answer: 'While Aivira automates most of the grant process, we understand some situations require human expertise. All paid plans include access to our support team, and higher-tier plans include regular consulting sessions with grant experts.'
  },
  {
    question: 'Can I use Aivira for multiple grant applications simultaneously?',
    answer: 'Absolutely! One of the advantages of Aivira is the ability to manage multiple grant applications from a single dashboard. Our platform keeps track of all requirements, deadlines, and compliance needs across all your active applications.'
  },
];

const securityFaqs = [
  {
    question: 'How does Aivira ensure the security of my business data?',
    answer: 'Aivira employs enterprise-grade security measures including end-to-end encryption, secure cloud infrastructure (Microsoft Azure), regular security audits, and strict access controls. We comply with all Singapore data protection regulations including PDPA.'
  },
  {
    question: 'Where is my data stored?',
    answer: 'All data is stored in secure data centers in Singapore, ensuring compliance with local data residency requirements and minimizing latency for our users.'
  },
  {
    question: 'Does Aivira share my business information with third parties?',
    answer: 'We never share your business information with third parties without your explicit consent. The only exception is when you choose to submit grant applications, in which case the necessary information is shared with the relevant government agencies.'
  },
  {
    question: 'What happens to my data if I cancel my subscription?',
    answer: 'You can export all your data at any time. After account closure, we retain your data for a limited period as required by regulations, after which it is securely deleted from our systems.'
  },
];

export default function FAQs() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Find answers to common questions about Aivira and our services.
            </motion.p>
          </div>
        </div>
      </section>

      {/* General FAQs */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="General Questions" 
            subtitle="Common questions about Aivira and our services."
          />
          
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* Grant-Specific FAQs */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Grant-Specific Questions" 
            subtitle="Learn more about Singapore business grants and the application process."
          />
          
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={grantFaqs} />
          </div>
        </div>
      </section>

      {/* Platform FAQs */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Platform Questions" 
            subtitle="Technical questions about using Aivira."
          />
          
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={platformFaqs} />
          </div>
        </div>
      </section>

      {/* Security & Privacy FAQs */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Security & Privacy" 
            subtitle="Questions about how we protect your data."
          />
          
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={securityFaqs} />
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading 
            title="Still Have Questions?" 
            subtitle="Our team is here to help you with any additional questions you may have."
          />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button size="lg" asChild>
              <Link href="/pilot-program">Join Pilot Program</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}