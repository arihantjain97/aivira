'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

export function FeatureCard({
  title,
  description,
  icon,
  index,
}: FeatureCardProps) {
  // Get the icon component with proper type safety
  const iconName = icon.charAt(0).toUpperCase() + icon.slice(1);
  const IconComponent = 
    (LucideIcons as unknown as Record<string, React.FC<LucideProps>>)[iconName] ?? 
    LucideIcons.CircleDot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card p-6 rounded-lg shadow-sm"
    >
      <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        <IconComponent className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}