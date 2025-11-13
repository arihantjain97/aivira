'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  Rocket,
  Users,
  Sparkles,
  UserCheck,
  Briefcase,
  BadgeCheck,
  Layers,
  Target,
  FileText,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { FeatureCard } from '@/components/ui/feature-card';
import { FAQAccordion } from '@/components/ui/faq-accordion';
import HowItWorksTeaser from '@/components/ui/how-it-works-teaser';
import { features, faqs } from '@/lib/constants';

const coreLayers = [
  {
    title: 'Intent & Context Engine',
    badge: 'Context Intelligence',
    description: 'Understands funding logic, ROI signals, and industry nuance.',
    icon: Sparkles,
    accent: {
      border: 'border-sky-500/30',
      background: 'bg-gradient-to-br from-sky-500/20 via-sky-500/10 to-transparent',
      icon: 'bg-sky-500/15 text-sky-600',
      badge: 'text-sky-600/75',
    },
  },
  {
    title: 'Human-in-the-Loop Validation',
    badge: 'Expert Oversight',
    description: 'Expert approval on critical steps to maintain trust.',
    icon: UserCheck,
    accent: {
      border: 'border-emerald-500/25',
      background: 'bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent',
      icon: 'bg-emerald-500/15 text-emerald-600',
      badge: 'text-emerald-600/75',
    },
  },
  {
    title: 'Business-Centric Expertise',
    badge: 'Outcome Design',
    description: 'Designed around real business workflows and outcomes.',
    icon: Briefcase,
    accent: {
      border: 'border-violet-500/25',
      background: 'bg-gradient-to-br from-violet-500/20 via-violet-500/10 to-transparent',
      icon: 'bg-violet-500/15 text-violet-600',
      badge: 'text-violet-600/75',
    },
  },
  {
    title: 'Compliance-Ready by Design',
    badge: 'Policy Alignment',
    description: 'Evidence-backed, policy-aligned output every time.',
    icon: BadgeCheck,
    accent: {
      border: 'border-amber-500/30',
      background: 'bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent',
      icon: 'bg-amber-500/15 text-amber-600',
      badge: 'text-amber-600/75',
    },
  },
  {
    title: 'Modular & Scalable Architecture',
    badge: 'Composable Systems',
    description: 'Composable services powering both Grant and Lead engines.',
    icon: Layers,
    accent: {
      border: 'border-rose-500/30',
      background: 'bg-gradient-to-br from-rose-500/20 via-rose-500/10 to-transparent',
      icon: 'bg-rose-500/15 text-rose-600',
      badge: 'text-rose-600/75',
    },
  },
];

const engineOutputs = [
  {
    title: 'Grant Engine',
    items: [
      { label: 'Instant Grant Eligibility', icon: Search },
      { label: 'ROI-Driven Project Builder', icon: Target },
      { label: 'Compliant Document Generation', icon: FileText },
    ],
    icon: Rocket,
    accent: {
      background: 'bg-gradient-to-br from-primary/90 to-primary/70',
      border: 'border-primary/30',
      text: 'text-primary-foreground',
      icon: 'bg-primary text-primary-foreground',
    },
  },
  {
    title: 'Lead Engine',
    items: [
      { label: 'Trusted Consultant & Vendor Matching', icon: Users },
      { label: 'Lead Qualification Logic', icon: BadgeCheck },
      { label: 'Collaboration Workspace', icon: Layers },
    ],
    icon: Users,
    accent: {
      background: 'bg-gradient-to-br from-slate-900/90 to-slate-700/80 dark:from-slate-100/90 dark:to-slate-200/80',
      border: 'border-slate-700/40 dark:border-slate-200/40',
      text: 'text-white dark:text-slate-900',
      icon: 'bg-slate-900 text-white dark:bg-white dark:text-slate-900',
    },
  },
];

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
                Your AI Engine for Funding, Insights, Compliance, and Better Business.
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Aivira matches businesses to the right grants and funding, auto-drafts compliant proposals, and delivers the insights and opportunities they need to grow revenue and strengthen operations.
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
      <section className="py-20 bg-[#f7f7f7]">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="The Barriers Holding Businesses Back" 
            subtitle="SMEs contribute more than half of Asia’s GDP yet face ongoing obstacles in financing, business expansion, and digital transformation."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const accent =
                index === 0
                  ? 'from-rose-500/90 to-rose-500/70'
                  : index === 1
                  ? 'from-amber-500/90 to-amber-500/70'
                  : 'from-slate-600/90 to-slate-600/70';

              return (
                <div
                  key={feature.title}
                  className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-white shadow-lg shadow-${index === 0 ? 'rose' : index === 1 ? 'amber' : 'slate'}-500/40`}>
                      <i className={`lucide lucide-${feature.icon} text-lg`} />
                    </span>
                    <div className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                      {feature.title}
                    </div>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{feature.description}</h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed">{feature.longDescription}</p>
                  <div className={`pointer-events-none absolute -bottom-10 -right-12 h-28 w-28 rounded-full ${index === 0 ? 'bg-rose-500/10' : index === 1 ? 'bg-amber-500/10' : 'bg-slate-600/10'} blur-2xl`} />
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-black/5 px-6 py-3 shadow-inner shadow-black/10 backdrop-blur">
              <span className="inline-flex h-2 w-2 rounded-full bg-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
              <span className="text-sm font-semibold tracking-wide text-foreground/70">
                Generic, expensive, non-compliant AI tools aren’t solving these problems.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Benefits & Intelligence Section */}
      <section className="py-24 bg-gradient-to-b from-background via-background to-muted/50 border-t border-border/60">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Why Choose Aivira?" 
            subtitle="Aivira simplifies funding, clarifies your project needs, connects you with best-fit experts, and generates compliant, credible documents — all with the speed and precision SMEs need."
          />

          <div className="mt-16 flex flex-col items-center gap-16">
            <div className="w-full max-w-6xl text-center mt-12">
              <p className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                THE INTELLIGENCE BEHIND AIVIRA
              </p>
            </div>

            <div className="w-full max-w-6xl mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {coreLayers.map(({ title, badge, description, icon: Icon, accent }) => (
                  <div
                    key={title}
                    className={`relative min-h-[220px] overflow-hidden rounded-3xl border ${accent.border} ${accent.background} p-7 shadow-lg shadow-black/5 backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl`}
                  >
                    {badge && (
                      <span
                        className={`mb-4 block text-center text-[11px] font-medium uppercase tracking-[0.22em] ${accent.badge}`}
                      >
                        {badge}
                      </span>
                    )}
                    <div className="mb-4 flex justify-center">
                      <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${accent.icon}`}>
                        <Icon className="h-7 w-7" />
                      </span>
                    </div>
                    <h4 className="mb-3 text-center text-lg font-semibold text-foreground leading-tight">
                      {title}
                    </h4>
                    <p className="text-center text-sm text-muted-foreground/90 leading-relaxed">{description}</p>
                    <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full max-w-4xl flex flex-col items-center gap-6">
              <div className="flex items-center gap-6">
                <span className="hidden md:block h-px w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 bg-primary/10 text-primary shadow-[0_0_30px_-10px] shadow-primary/60">
                  <ArrowDown className="h-6 w-6" />
                </span>
                <span className="hidden md:block h-px w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              </div>

              <div className="mt-6 mb-6 text-center">
                <p className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  The Aivira Product Ecosystem
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 w-full mt-6">
                {engineOutputs.map(({ title, items, icon: Icon, accent }) => (
                  <div
                    key={title}
                    className={`rounded-3xl border ${accent.border} ${accent.background} p-7 text-center shadow-xl backdrop-blur`}
                  >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/85 p-1 shadow-inner shadow-black/10 dark:bg-white/90">
                      <span className={`flex h-full w-full items-center justify-center rounded-full ${accent.icon}`}>
                        <Icon className="h-7 w-7" />
                      </span>
                    </div>
                    <h4 className={`text-2xl font-semibold tracking-tight ${accent.text} mb-4`}>{title}</h4>
                    <div className="flex w-full flex-col items-center gap-2">
                      {items.map(({ label, icon: ItemIcon }) => (
                        <span
                          key={label}
                          className="flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[13px] font-semibold text-white shadow-sm backdrop-blur-sm dark:bg-slate-900/15 dark:text-slate-900"
                        >
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">
                            <ItemIcon className="h-3.5 w-3.5" />
                          </span>
                          <span className="flex-1 text-center truncate">{label}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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