'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import { CheckCircle, Users, Zap, Shield } from 'lucide-react';

const benefits = [
  {
    icon: CheckCircle,
    title: "Early Access",
    description: "Be among the first to experience Aivira's AI-powered grant automation"
  },
  {
    icon: Users,
    title: "Direct Feedback",
    description: "Shape the product with your input and help us build the perfect solution"
  },
  {
    icon: Zap,
    title: "Free Trial Period",
    description: "Test all features at no cost during the pilot program"
  },
  {
    icon: Shield,
    title: "Priority Support",
    description: "Get dedicated support from our team throughout the pilot"
  }
];

const faqs = [
  {
    question: "What is included in the pilot trial?",
    answer: "The pilot trial includes full access to our grant matching AI, proposal drafting tools, and compliance tracking features. You'll also get priority support and the ability to influence product development."
  },
  {
    question: "How long does the pilot trial last?",
    answer: "The pilot trial runs for 3 months, giving you ample time to test all features and see real results with your grant applications."
  },
  {
    question: "Is there any cost for the pilot trial?",
    answer: "No, the pilot trial is completely free. We're looking for feedback to improve our platform before the official launch."
  },
  {
    question: "What happens after the pilot trial ends?",
    answer: "Pilot participants will receive exclusive early-bird pricing and priority access to the full platform when it launches."
  }
];

export default function PilotProgram() {
  return (
    <>
      {/* Hero Section with Decorative Background */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/30">
        {/* Decorative SVG background */}
        <svg className="absolute -top-32 -left-32 w-[600px] h-[600px] opacity-30 blur-2xl -z-10" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="300" r="300" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(300 300) scale(300)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" stopOpacity="0.25" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        {/* Decorative SVG blob and floating icons on right half */}
        <div className="hidden lg:block absolute top-24 bottom-0 right-0 w-1/2 z-0 pointer-events-none">
          {/* SVG Blob */}
          <svg className="absolute right-0 top-1/4 w-96 h-96 opacity-40 blur-2xl" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="200" cy="200" rx="180" ry="120" fill="url(#paint2_radial)" />
            <defs>
              <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientTransform="translate(200 200) scale(180 120)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a5b4fc" stopOpacity="0.3" />
                <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
          {/* Floating icons */}
          <CheckCircle className="absolute right-24 top-32 w-16 h-16 text-primary/10" />
          <Users className="absolute right-40 top-80 w-20 h-20 text-secondary/20" />
          <Zap className="absolute right-10 top-1/2 w-14 h-14 text-primary/10" />
          <Shield className="absolute right-32 bottom-24 w-16 h-16 text-secondary/10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full px-4 py-1 text-xs font-semibold shadow-md animate-pulse">
                  Beta Access
                </span>
                <span className="text-xs text-muted-foreground">Early Users Program</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent drop-shadow-lg">
                Start Your <span className="text-primary">Aivira</span> Journey
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                Join our exclusive pilot program and be among the first to experience the future of grant automation. Get early access, provide feedback, and help shape the platform.
              </p>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6 mb-8 shadow-md">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Exclusive Access for SMEs, Vendors & Consultants
                </h2>
                <p className="text-muted-foreground">
                  Be among the first to experience AI-powered grant automation. Shape the future of funding access in Singapore.
                </p>
              </div>
              <Button size="lg" variant="outline" asChild className="transition-transform hover:scale-105">
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              <div className="flex w-full max-w-md flex-col items-center mx-auto">
                <div className="w-full bg-white/80 dark:bg-card rounded-2xl shadow-2xl p-10 border border-border backdrop-blur-md relative overflow-hidden">
                  {/* Overlay for extra readability */}
                  <div className="absolute inset-0 bg-white/70 dark:bg-background/70 z-10" />
                  <div className="relative z-20">
                    <h3 className="text-2xl font-bold text-center mb-6 text-primary">
                      Ready to Get Started?
                    </h3>
                    <Button size="lg" className="w-full mb-4 transition-transform hover:scale-105" asChild>
                      <Link href="/pilot/login">
                        Join the Pilot Trial →
                      </Link>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Early access • Social login coming soon
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-muted/60 to-background relative">
        {/* Decorative divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-full blur-md opacity-60" />
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Why Join the Pilot Trial?" 
            subtitle="Get exclusive early access and help shape the future of grant automation"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/90 dark:bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-8 flex flex-col items-center text-center border border-border group"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-5 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 shadow-lg group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground relative overflow-hidden">
        {/* Decorative SVG */}
        <svg className="absolute right-0 top-0 w-96 h-96 opacity-20 blur-2xl -z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="200" fill="url(#paint1_radial)" />
          <defs>
            <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientTransform="translate(200 200) scale(200)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" stopOpacity="0.2" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Ready to Transform Your Grant Process?</h2>
            <p className="text-lg opacity-90 mb-8">
              Join our exclusive pilot program and be among the first to experience the future of grant automation.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-primary hover:bg-white/90 text-xl font-bold px-10 py-6 shadow-xl transition-transform hover:scale-105"
              asChild
            >
              <Link href="/pilot/login">Join the Pilot Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-background via-muted/60 to-background relative">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Pilot Trial FAQ" 
            subtitle="Everything you need to know about joining our pilot program"
          />
          <div className="max-w-3xl mx-auto bg-white/90 dark:bg-card rounded-2xl shadow-lg border border-border p-10">
            <FAQAccordion faqs={faqs} />
          </div>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Ready to get started?
            </p>
            <Button asChild className="transition-transform hover:scale-105">
              <Link href="/pilot/login">Join the Pilot Trial</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}