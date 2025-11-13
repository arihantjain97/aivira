'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface ComparisonFeature {
  name: string;
  aivira: boolean;
  consultants: boolean;
  government: boolean;
  highlight?: boolean;
}

const comparisonData: ComparisonFeature[] = [
  {
    name: 'AI-powered grant matching',
    aivira: true,
    consultants: false,
    government: false,
    highlight: true,
  },
  {
    name: 'Automated proposal generation',
    aivira: true,
    consultants: false,
    government: false,
    highlight: true,
  },
  {
    name: 'Real-time compliance tracking',
    aivira: true,
    consultants: true,
    government: false,
  },
  {
    name: 'Personalized service',
    aivira: true,
    consultants: true,
    government: false,
  },
  {
    name: 'Access to all grant programs',
    aivira: true,
    consultants: true,
    government: true,
  },
  {
    name: 'Free to use',
    aivira: false,
    consultants: false,
    government: true,
  },
  {
    name: 'Guaranteed response time',
    aivira: true,
    consultants: true,
    government: false,
  },
  {
    name: 'Affordable monthly pricing',
    aivira: true,
    consultants: false,
    government: true,
    highlight: true,
  },
];

export function ComparisonTable() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto w-full"
    >
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 text-left font-normal text-muted-foreground">Features</th>
            <th className="py-4 px-6 text-center bg-primary/5 font-bold text-primary">
              Aivira
            </th>
            <th className="py-4 px-6 text-center font-normal">
              Traditional Consultants
            </th>
            <th className="py-4 px-6 text-center font-normal">
              Government Portals
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((feature, index) => (
            <tr 
              key={index} 
              className={cn(
                'border-t border-border',
                feature.highlight ? 'bg-primary/5' : ''
              )}
            >
              <td className="py-4 px-6">{feature.name}</td>
              <td className="py-4 px-6 text-center">
                {feature.aivira ? (
                  <Check className="h-5 w-5 mx-auto text-primary" />
                ) : (
                  <X className="h-5 w-5 mx-auto text-muted-foreground" />
                )}
              </td>
              <td className="py-4 px-6 text-center">
                {feature.consultants ? (
                  <Check className="h-5 w-5 mx-auto text-primary" />
                ) : (
                  <X className="h-5 w-5 mx-auto text-muted-foreground" />
                )}
              </td>
              <td className="py-4 px-6 text-center">
                {feature.government ? (
                  <Check className="h-5 w-5 mx-auto text-primary" />
                ) : (
                  <X className="h-5 w-5 mx-auto text-muted-foreground" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}