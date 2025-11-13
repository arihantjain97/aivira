'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { FeatureCard } from '@/components/ui/feature-card';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import HowItWorksTeaser from '@/components/ui/how-it-works-teaser';
import { features, faqs } from '@/lib/constants';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background -z-10" />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-5 -z-20" />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Secure Your SME Grant Funding <span className="text-primary">Effortlessly</span> with AI
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Aivira automates the entire grant process for Singapore SMEs. Match grants in minutes, auto-draft proposals, and track compliance in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/pilot-program">Pilot Trial</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                <span className="font-semibold">Join our pilot program</span> and be among the first to experience AI-powered grant automation
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="rounded-lg shadow-2xl overflow-hidden bg-white">
                <Image 
                  src="https://images.pexels.com/photos/8636602/pexels-photo-8636602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Aivira Dashboard" 
                  width={600} 
                  height={400}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Why Choose Aivira?" 
            subtitle="Our AI platform automates every step of the grant application process, saving you time and money while helping you submit compliant, high-quality applications."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Teaser */}
      <HowItWorksTeaser />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold mb-4">Ready to streamline your grant applications?</h2>
              <p className="text-lg opacity-90">
                Join our pilot program today and be among the first to experience the future of grant automation.
              </p>
            </div>
            <div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/pilot-program">Try Pilot</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Frequently Asked Questions" 
            subtitle="Find answers to the most common questions about Aivira and our services."
          />
          
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help.
            </p>
            <Button variant="outline" asChild>
              <Link href="/pilot-program">Pilot Trial</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}