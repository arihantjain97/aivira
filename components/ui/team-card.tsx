'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TeamCardProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  index?: number;
  className?: string;
}

export function TeamCard({
  name,
  title,
  bio,
  image,
  index = 0,
  className,
}: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'flex flex-col p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-all',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 sm:mb-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-primary font-medium mb-3">{title}</p>
          <p className="text-muted-foreground">{bio}</p>
        </div>
      </div>
    </motion.div>
  );
}