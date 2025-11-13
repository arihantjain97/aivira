'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GrantCardProps {
  id: string;
  name: string;
  description: string;
  maxFunding: string;
  eligibility: string[];
  index?: number;
  className?: string;
}

export function GrantCard({
  id,
  name,
  description,
  maxFunding,
  eligibility,
  index = 0,
  className,
}: GrantCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'flex flex-col p-6 bg-card rounded-lg shadow-sm border border-border',
        className
      )}
    >
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <div className="mb-4">
        <p className="font-medium">Maximum Funding:</p>
        <p className="text-primary font-semibold">{maxFunding}</p>
      </div>
      
      <div className="mb-6">
        <p className="font-medium mb-2">Key Eligibility Criteria:</p>
        <ul className="list-disc pl-5 space-y-1">
          {eligibility.map((item, idx) => (
            <li key={idx} className="text-muted-foreground">{item}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}