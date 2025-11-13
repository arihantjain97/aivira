'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from 'lucide-react';

export default function PilotAfter() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const handleAuthRedirect = async () => {
      try {
        // 1. Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Error getting user:', userError);
          router.replace('/pilot/login');
          return;
        }

        if (!user) {
          router.replace('/pilot/login');
          return;
        }

        // 2. Fetch profile
        console.log('Fetching profile for user:', user.id);
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role,onboarding_completed')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          setError('Failed to load profile');
          setIsLoading(false);
          return;
        }

        console.log('Profile data:', profile);

        // 3. Routing logic
        if (hasRedirected) {
          return; // Prevent multiple redirects
        }

        if (!profile) {
          // No profile exists - create one and go to role selection
          console.log('Creating new profile for user:', user.id);
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              user_id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || null,
              role: 'SME',
              onboarding_completed: false
            });

          if (insertError) {
            console.error('Error creating profile:', insertError);
            setError('Failed to create profile');
            setIsLoading(false);
            return;
          }

          console.log('Profile created successfully');
          setHasRedirected(true);
          router.replace('/onboarding/role');
        } else if (!profile.onboarding_completed) {
          // Profile exists but onboarding not completed - go to profile completion
          // Map database role to frontend role format
          const frontendRole = profile.role.toLowerCase();
          setHasRedirected(true);
          router.replace(`/onboarding/profile?role=${frontendRole}`);
        } else {
          // Onboarding completed - go to dashboard
          // Map database role to frontend role format
          const frontendRole = profile.role.toLowerCase();
          setHasRedirected(true);
          router.replace(`/dashboard/${frontendRole}`);
        }

      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
        setIsLoading(false);
      }
    };

    handleAuthRedirect();
  }, []); // Removed router dependency to prevent infinite loops

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/pilot/login')}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
        <h2 className="text-xl font-semibold mb-2">Setting up your account...</h2>
        <p className="text-muted-foreground">Please wait while we redirect you</p>
      </div>
    </div>
  );
} 