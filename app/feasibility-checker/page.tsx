import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

export default function FeasibilityChecker() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col items-center justify-center p-4 pt-32">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 text-center">
        <Construction size={80} className="text-yellow-500 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Work in Progress
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The Grant Feasibility Checker is currently under development. 
          We're working hard to bring you an amazing experience!
        </p>
        <div className="space-y-4">
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            size="lg"
            asChild
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 