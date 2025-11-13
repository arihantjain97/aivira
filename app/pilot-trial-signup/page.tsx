'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AuthPlaceholderCard from '@/components/ui/auth-placeholder-card';

export default function PilotTrialSignup() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Join Aivira Pilot Trial</h1>
        <p className="text-muted-foreground">
          Get early access to our AI-powered grant automation platform
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <AuthPlaceholderCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6"
      >
        <Link
          href="/pilot-program"
          className="text-sm font-medium text-primary hover:text-primary/80 underline transition-colors"
        >
          ← Back to Pilot page
        </Link>
      </motion.div>
    </div>
  );
}