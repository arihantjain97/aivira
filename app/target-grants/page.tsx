'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { GrantCard } from '@/components/ui/grant-card';
import { ComparisonTable } from '@/components/ui/comparison-table';
import { targetGrants } from '@/lib/constants';

export default function TargetGrants() {
  const handleEligibilityCheck = () => {
    // Navigate to the internal eligibility checker
    window.location.href = '/target-grants/eligibility-checker';
  };

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
              Target Grants & Eligibility
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Aivira helps Singapore SMEs access a wide range of government grants. Learn about the key grants and see if your business qualifies.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Grants Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Key Singapore SME Grants" 
            subtitle="Our platform currently covers these major grant programs, with more being added regularly."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetGrants.map((grant, index) => (
              <GrantCard
                key={grant.id}
                id={grant.id}
                name={grant.name}
                description={grant.description}
                maxFunding={grant.maxFunding}
                eligibility={grant.eligibility}
                index={index}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Aivira continuously updates its database with the latest grant programs.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleEligibilityCheck}
            >
              🚀 Check Your Eligibility Now
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Get instant results in under 2 minutes!
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility Explainer */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Understanding Eligibility" 
            subtitle="Grant eligibility can be complex, but Aivira simplifies the process by automatically matching your business with grants you qualify for."
          />
          
          <div className="max-w-3xl mx-auto bg-card p-6 md:p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-4">Common Eligibility Criteria</h3>
            <p className="mb-6 text-muted-foreground">
              While each grant has specific requirements, most Singapore government grants share these basic eligibility criteria:
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">Registration & Incorporation</h4>
                <p className="text-muted-foreground">
                  Your business must be registered and operating in Singapore.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Local Shareholding</h4>
                <p className="text-muted-foreground">
                  Most grants require at least 30% local shareholding.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Financial Requirements</h4>
                <p className="text-muted-foreground">
                  Your company typically needs to demonstrate financial viability and may need to meet certain revenue or employee count criteria.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Project Requirements</h4>
                <p className="text-muted-foreground">
                  The proposed project must align with the grant's objectives and be implemented in Singapore.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Technology or Innovation Focus</h4>
                <p className="text-muted-foreground">
                  Many grants prioritize projects that adopt new technologies, innovative processes, or productivity enhancements.
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-primary/10 rounded-md border border-primary/20">
              <p className="font-medium">
                Aivira's AI analyzes over 100 eligibility factors to match your business with suitable grants, saving you hours of research and reducing the risk of application rejection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Aivira vs. Alternatives" 
            subtitle="See how Aivira compares to traditional grant consultants and government portals."
          />
          
          <ComparisonTable />
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Aivira combines the best of both worlds: the affordability of self-service with the expertise of consultants.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Grants You Qualify For?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Use Aivira to instantly see which grants your business is eligible for and get started on your applications.
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