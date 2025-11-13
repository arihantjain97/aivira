'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  index?: number;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  popular = false,
  index = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'flex flex-col p-6 bg-card rounded-xl shadow-sm',
        popular
          ? 'border-2 border-primary relative shadow-md'
          : 'border border-border'
      )}
    >
      {popular && (
        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-3 bg-primary text-primary-foreground text-xs font-bold py-1 px-3 rounded-full">
          POPULAR
        </div>
      )}
      
      <div className="mb-5">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="flex items-baseline mt-2">
          <span className="text-3xl font-bold">${price}</span>
          <span className="ml-1 text-muted-foreground">/month</span>
        </div>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
      
      <div className="mt-2 mb-6 flex-grow">
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button 
        className={cn(
          'mt-auto w-full',
          popular ? 'bg-primary hover:bg-primary/90' : 'bg-primary/90 hover:bg-primary'
        )}
        size="lg"
      >
        {cta}
      </Button>
    </motion.div>
  );
}