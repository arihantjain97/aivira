'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { TeamCard } from '@/components/ui/team-card';
import { companyInfo, teamMembers, techStack } from '@/lib/constants';

export default function About() {
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
              About Aivira
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              We're on a mission to democratize access to government funding for Singapore businesses through AI-powered automation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <SectionHeading 
                title="Our Story" 
                subtitle="How Aivira came to be and our vision for the future."
                align="left"
                className="mb-8"
              />
              
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Aivira was founded in May 2025 by Romil Jain and Medha Jain to transform how Singapore businesses access government funding.
                </p>
                <p>
                  Romil, a 20+ year veteran in IT and transformation programs, saw the need for faster, more intelligent systems to support complex compliance and reporting. Medha brought deep experience from frontline roles at Citi and UOB, where she saw firsthand how underserved businesses were in the funding process.
                </p>
                <p>
                  Together, they set out to build an AI-driven platform that bridges the gap between opportunity and access — automating eligibility checks, proposal generation, and compliance tracking.
                </p>
                <p className="font-medium">
                  Their mission is to unlock SGD 500M in grants for 10,000 Singapore businesses by 2028, fueling innovation, growth, and equitable access to government support.
                </p>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team working together" 
                width={600} 
                height={400}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Company Information" 
            subtitle="Aivira PTE. LTD. is a registered company in Singapore."
          />
          
          <div className="max-w-3xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Company Name</h3>
                <p className="text-muted-foreground mb-4">{companyInfo.name}</p>
                
                <h3 className="text-lg font-semibold mb-2">UEN Number</h3>
                <p className="text-muted-foreground mb-4">{companyInfo.uen}</p>
                
                <h3 className="text-lg font-semibold mb-2">Founded</h3>
                <p className="text-muted-foreground mb-4">{companyInfo.founded}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Address</h3>
                <p className="text-muted-foreground mb-4">{companyInfo.address}</p>
                
                <h3 className="text-lg font-semibold mb-2">Contact Email</h3>
                <p className="text-muted-foreground mb-4">
                  <a href={`mailto:${companyInfo.email}`} className="text-primary hover:underline">
                    {companyInfo.email}
                  </a>
                </p>
                
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground mb-4">
                  <a href={`tel:${companyInfo.phone}`} className="text-primary hover:underline">
                    {companyInfo.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Meet Our Team" 
            subtitle="The people behind Aivira."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard
                key={index}
                name={member.name}
                title={member.title}
                bio={member.bio}
                image={member.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Technology */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Technology" 
            subtitle="The powerful technology stack that powers Aivira."
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {techStack.map((tech, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-lg shadow-sm"
                >
                  <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                  <p className="text-muted-foreground">{tech.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">How Our AI Works</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Our AI-powered platform is designed to generate customized proposals that meet government requirements while highlighting your business's unique strengths. We're building the most comprehensive grant automation solution for Singapore businesses.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Grant Matching Algorithm</h4>
                    <p className="text-muted-foreground">
                      Our AI analyzes your business profile against over 100 grant eligibility criteria to find perfect matches with 95% accuracy.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Proposal Generation Engine</h4>
                    <p className="text-muted-foreground">
                      Trained on thousands of successful grant applications, our AI generates customized proposals that meet government requirements while highlighting your business's unique strengths.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Compliance Tracking System</h4>
                    <p className="text-muted-foreground">
                      Our AI continuously monitors grant requirements and deadlines, sending automated reminders and guiding you through post-approval compliance.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">Continuous Learning</h4>
                    <p className="text-muted-foreground">
                      Our AI improves with each grant application, learning from successful submissions to optimize future recommendations and proposals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Our Values" 
            subtitle="The principles that guide everything we do at Aivira."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card p-6 rounded-lg shadow-sm"
            >
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><line x1="2" x2="22" y1="12" y2="12"></line><line x1="12" x2="12" y1="2" y2="22"></line></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-muted-foreground">
                We believe government funding should be accessible to all eligible businesses, not just those who can afford expensive consultants.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card p-6 rounded-lg shadow-sm"
            >
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We continually push the boundaries of what's possible with AI to create better, more efficient solutions for the businesses we aim to support.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-6 rounded-lg shadow-sm"
            >
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in being open and honest about how our technology works, our pricing, and what prospective users can expect from our service.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us on Our Mission</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Help us democratize access to government funding for Singapore businesses. Join our pilot program today.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link href="/pilot-program">Join Our Pilot Program</Link>
          </Button>
        </div>
      </section>
    </>
  );
}