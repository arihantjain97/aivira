'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Coffee, Timer } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="max-w-md w-full mx-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card p-8 rounded-lg shadow-lg text-center"
        >
          <div className="flex justify-center mb-6">
            <Coffee className="h-16 w-16 text-primary" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            Brewing Something Special
          </h1>
          
          <p className="text-muted-foreground mb-6">
            Our login page is still steeping... just like a perfect cup of grant-writing inspiration! Check back soon while we add the final ingredients.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-primary mb-8">
            <Timer className="h-5 w-5 animate-pulse" />
            <span className="font-medium">Coming Soon</span>
          </div>
          
          <Button asChild className="w-full">
            <Link href="/pilot-program">
              Join the Pilot Program Instead
            </Link>
          </Button>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Want to be notified when we launch? 
            <Link href="/pilot-program" className="text-primary hover:underline ml-1">
              Sign up for early access
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}