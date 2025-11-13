'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type UserRole = 'sme' | 'consultant' | 'vendor';

export default function OnboardingProfile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') as UserRole;
  
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is logged in and role is valid
    const checkAuthAndRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/pilot/login');
        return;
      }

      if (!role || !['sme', 'consultant', 'vendor'].includes(role)) {
        router.replace('/onboarding/role');
        return;
      }

      setIsCheckingAuth(false);
    };
    checkAuthAndRole();
  }, [router, role]);

  // Map frontend role values to database enum values
  const mapRoleToDatabase = (frontendRole: string): string => {
    switch (frontendRole) {
      case 'sme': return 'SME';
      case 'consultant': return 'CONSULTANT';
      case 'vendor': return 'VENDOR';
      default: return frontendRole.toUpperCase();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Prepare placeholder answers object
      const answers = {
        industry: '',
        employees: '',
        grant_familiarity: '',
        timeline: ''
      };

      // Map role to database format
      const databaseRole = mapRoleToDatabase(role);

      // Call the RPC to finish onboarding
      const { error: rpcError } = await supabase.rpc('finish_onboarding', {
        _role: databaseRole,
        _full_name: fullName.trim(),
        _company: company.trim() || null,
        _answers: answers,
        _version: 1
      });

      if (rpcError) {
        console.error('RPC error:', rpcError);
        setError('Failed to save your profile. Please try again.');
        return;
      }

      // Success - redirect to dashboard
      router.replace(`/dashboard/${role}`);

    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'sme': return 'SME Owner';
      case 'consultant': return 'Grant Consultant';
      case 'vendor': return 'Technology Vendor';
      default: return role;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 pt-24 pb-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground mb-4">
            You're joining as a <span className="font-semibold">{getRoleLabel(role)}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <Input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter your company name (optional)"
                className="w-full"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading || !fullName.trim()}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Setting up your account...
                  </>
                ) : (
                  'Complete Setup'
                )}
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-6"
        >
          <button
            onClick={() => router.push('/onboarding/role')}
            className="text-sm text-muted-foreground hover:text-primary underline"
          >
            ← Back to role selection
          </button>
        </motion.div>
      </div>
    </div>
  );
} 