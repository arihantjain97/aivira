'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Building2, Users, Store } from 'lucide-react';

type UserRole = 'sme' | 'consultant' | 'vendor';

const roles: { value: UserRole; label: string; description: string; icon: React.ComponentType<any> }[] = [
  {
    value: 'sme',
    label: 'Business Owner',
    description: 'I own or work for a small to medium enterprise seeking grants',
    icon: Building2
  },
  {
    value: 'consultant',
    label: 'Grant Consultant',
    description: 'I help businesses apply for grants and manage compliance',
    icon: Users
  },
  {
    value: 'vendor',
    label: 'Technology Vendor',
    description: 'I provide solutions that help businesses qualify for grants',
    icon: Store
  }
];

export default function OnboardingRole() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/pilot/login');
        return;
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, [router]);

  const handleContinue = () => {
    if (!selectedRole) return;
    setIsLoading(true);
    router.push(`/onboarding/profile?role=${selectedRole}`);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 pt-24 pb-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">What best describes you?</h1>
          <p className="text-muted-foreground">
            This helps us personalize your Aivira experience
          </p>
        </motion.div>

        <div className="space-y-4 mb-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setSelectedRole(role.value)}
                className={`w-full p-6 text-left rounded-lg border-2 transition-all ${
                  selectedRole === role.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    selectedRole === role.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <role.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{role.label}</h3>
                    <p className="text-muted-foreground">{role.description}</p>
                  </div>
                  {selectedRole === role.value && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedRole || isLoading}
            size="lg"
            className="px-8"
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
} 