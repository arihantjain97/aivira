'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  ShoppingCart, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';
import { personas } from '@/lib/personas';

const personaConfig = {
  SME: {
    icon: Building2,
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stats: [
      { label: 'Time Saved', value: '15 hours', icon: Clock },
      { label: 'Grants Available', value: '12+', icon: Target },
      { label: 'AI-Powered', value: '100%', icon: TrendingUp }
    ],
    journey: [
      {
        step: 1,
        title: 'Grant Feasibility Checker',
        description: 'Complete our smart questionnaire in under 5 minutes',
        icon: Building2,
        details: ['Company information', 'Industry classification', 'Revenue & employee count', 'Growth objectives']
      },
      {
        step: 2,
        title: 'AI Grant Matching',
        description: 'Our AI analyzes 100+ eligibility criteria instantly',
        icon: Zap,
        details: ['Real-time eligibility checking', 'Compatibility scoring', 'Funding amount estimates', 'Application deadlines']
      },
      {
        step: 3,
        title: 'Proposal Generation',
        description: 'AI drafts customized proposals for your top matches',
        icon: BarChart3,
        details: ['Tailored content generation', 'Government requirement compliance', 'Financial projections', 'Supporting documentation']
      },
      {
        step: 4,
        title: 'Submit & Track',
        description: 'Monitor progress and maintain compliance effortlessly',
        icon: CheckCircle,
        details: ['Application submission', 'Status tracking', 'Compliance reminders', 'Success analytics']
      }
    ]
  },
  Consultant: {
    icon: Users,
    color: 'bg-green-500',
    gradient: 'from-green-500 to-green-600',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stats: [
      { label: 'Lead Conversion', value: '65%', icon: TrendingUp },
      { label: 'Client Capacity', value: '3x', icon: Users },
      { label: 'Revenue Growth', value: '40%', icon: BarChart3 }
    ],
    journey: [
      {
        step: 1,
        title: 'Lead Intelligence',
        description: 'Access warm SME leads actively seeking grant funding',
        icon: Target,
        details: ['Pre-qualified prospects', 'Grant readiness scores', 'Contact information', 'Funding requirements']
      },
      {
        step: 2,
        title: 'Collaborative Workspace',
        description: 'Work seamlessly with clients on grant applications',
        icon: Users,
        details: ['Shared project dashboards', 'Real-time collaboration', 'Document management', 'Client communication tools']
      },
      {
        step: 3,
        title: 'Automated Proposals',
        description: 'Generate professional proposals with AI assistance',
        icon: Zap,
        details: ['Template customization', 'AI content suggestions', 'Compliance checking', 'Version control']
      },
      {
        step: 4,
        title: 'Success Tracking',
        description: 'Monitor all client applications from one dashboard',
        icon: BarChart3,
        details: ['Portfolio overview', 'Success metrics', 'Client reporting', 'Performance analytics']
      }
    ]
  },
  Vendor: {
    icon: ShoppingCart,
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-purple-600',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    stats: [
      { label: 'Qualified Leads', value: '200+', icon: Target },
      { label: 'Conversion Rate', value: '45%', icon: TrendingUp },
      { label: 'Average Deal Size', value: '$85K', icon: BarChart3 }
    ],
    journey: [
      {
        step: 1,
        title: 'Product Listing',
        description: 'Showcase PSG-eligible solutions to qualified buyers',
        icon: ShoppingCart,
        details: ['Product catalog', 'Grant alignment docs', 'Pricing transparency', 'Compliance certificates']
      },
      {
        step: 2,
        title: 'Smart Matching',
        description: 'Connect with SMEs seeking your specific solutions',
        icon: Target,
        details: ['Buyer-seller matching', 'Requirements analysis', 'Budget compatibility', 'Timeline alignment']
      },
      {
        step: 3,
        title: 'Quote Builder',
        description: 'Generate grant-compliant quotes instantly',
        icon: Zap,
        details: ['Automated pricing', 'Grant calculation tools', 'Proposal templates', 'Approval workflows']
      },
      {
        step: 4,
        title: 'Relationship Management',
        description: 'Build lasting partnerships with data-driven insights',
        icon: Users,
        details: ['Client relationship tracking', 'Performance analytics', 'Repeat business alerts', 'Trust score building']
      }
    ]
  }
};

export default function HowItWorks() {
  const searchParams = useSearchParams();
  const [activePersona, setActivePersona] = useState('SME');
  const [activeStep, setActiveStep] = useState(1);

  // Handle URL parameter for persona selection
  useEffect(() => {
    const role = searchParams.get('role');
    if (role && ['SME', 'Consultant', 'Vendor'].includes(role)) {
      setActivePersona(role);
    }
  }, [searchParams]);

  const currentPersona = personaConfig[activePersona as keyof typeof personaConfig];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background -z-10" />
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-6 px-4 py-2">
              Tailored for Every User Type
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              How Aivira Works for You
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how our AI-powered platform transforms grant applications for SMEs, consultants, and vendors across Singapore.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Persona Selector */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activePersona} onValueChange={setActivePersona} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12 h-16">
              {Object.entries(personaConfig).map(([key, config]) => {
                const IconComponent = config.icon;
                return (
                  <TabsTrigger 
                    key={key} 
                    value={key} 
                    className="flex items-center gap-2 text-base font-medium h-full"
                  >
                    <IconComponent className="w-5 h-5" />
                    {key}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.entries(personaConfig).map(([key, config]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Persona Overview */}
                  <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`p-3 rounded-xl ${config.color} text-white`}>
                          <config.icon className="w-8 h-8" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold">{key}</h2>
                          <p className="text-muted-foreground">User Journey</p>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-semibold mb-4">
                        {personas[key as keyof typeof personas].hero}
                      </h3>
                      
                      <ul className="space-y-3 mb-8">
                        {personas[key as keyof typeof personas].bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        {config.stats.map((stat, idx) => (
                          <Card key={idx} className="p-4 text-center">
                            <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-xs text-muted-foreground">{stat.label}</div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={config.image}
                          alt={`${key} workflow`}
                          width={600}
                          height={400}
                          className="w-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-tr ${config.gradient} opacity-20`} />
                      </div>
                    </div>
                  </div>

                  {/* Journey Steps */}
                  <div className="mb-16">
                    <h3 className="text-2xl font-bold text-center mb-12">Your Journey with Aivira</h3>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {config.journey.map((step, idx) => (
                        <motion.div
                          key={step.step}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: idx * 0.1 }}
                          className="relative"
                        >
                          <Card className="p-6 h-full hover:shadow-lg transition-all cursor-pointer group"
                                onClick={() => setActiveStep(step.step)}>
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`w-10 h-10 rounded-full ${config.color} text-white flex items-center justify-center font-bold`}>
                                {step.step}
                              </div>
                              <step.icon className="w-6 h-6 text-primary" />
                            </div>
                            
                            <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                              {step.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              {step.description}
                            </p>
                            
                            <ul className="space-y-1">
                              {step.details.slice(0, 2).map((detail, detailIdx) => (
                                <li key={detailIdx} className="text-xs text-muted-foreground flex items-center gap-2">
                                  <div className="w-1 h-1 bg-primary rounded-full" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                            
                            {idx < config.journey.length - 1 && (
                              <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                            )}
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Step View */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8"
                    >
                      {(() => {
                        const step = config.journey.find(s => s.step === activeStep);
                        if (!step) return null;
                        
                        return (
                          <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 rounded-full ${config.color} text-white flex items-center justify-center font-bold text-lg`}>
                                  {step.step}
                                </div>
                                <div>
                                  <h4 className="text-2xl font-bold">{step.title}</h4>
                                  <p className="text-muted-foreground">Step {step.step} of 4</p>
                                </div>
                              </div>
                              
                              <p className="text-lg mb-6">{step.description}</p>
                              
                              <div className="grid grid-cols-2 gap-4">
                                {step.details.map((detail, idx) => (
                                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                    <span className="text-sm">{detail}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="relative">
                              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                                <step.icon className="w-16 h-16 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Grant Process?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join our pilot program and be among the first to experience the future of grant automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/pilot-program">Start Your Journey</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-primary hover:bg-white hover:text-primary"
                asChild
              >
                <Link href="/target-grants">Explore Grants</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-8">Trusted by Singapore's Leading Businesses</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 font-medium">Company {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}