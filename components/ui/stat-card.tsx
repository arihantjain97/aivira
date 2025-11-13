'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  index?: number;
  className?: string;
}

export function StatCard({
  label,
  value,
  index = 0,
  className,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'flex flex-col p-6 bg-card rounded-lg shadow-sm border border-border',
        className
      )}
    >
      <p className="text-muted-foreground font-medium mb-2">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
}