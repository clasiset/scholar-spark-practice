
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: string;
  description: string;
}

interface Subscription {
  id: string;
  plan_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  plans: Plan;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscription();

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        loadSubscription();
      } else if (event === 'SIGNED_OUT') {
        setSubscription(null);
        setLoading(false);
      }
    });

    return () => {
      authSubscription?.unsubscribe();
    };
  }, []);

  const loadSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setSubscription(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('subscriptions' as any)
        .select(`
          *,
          plans (*)
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (!error && data) {
        setSubscription(data);
      } else {
        setSubscription(null);
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  const hasActiveSubscription = () => {
    return subscription && subscription.status === 'active';
  };

  const isSubscribedToPlan = (planId: string) => {
    return subscription?.plan_id === planId;
  };

  return {
    subscription,
    loading,
    hasActiveSubscription,
    isSubscribedToPlan,
    refetch: loadSubscription
  };
};
