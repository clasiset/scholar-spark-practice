
import React, { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import BackButton from './BackButton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  current_period_end: string;
  plans: Plan;
}

const SubscriptionPage = ({ openModal, goBack, previousPageName }: { 
  openModal: (type: string, data?: any) => void, 
  goBack?: () => void, 
  previousPageName?: string | null 
}) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [userSubscription, setUserSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPlans();
    loadUserSubscription();
  }, []);

  const loadPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('plans' as any)
        .select('*')
        .order('price', { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error loading plans:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription plans",
        variant: "destructive"
      });
    }
  };

  const loadUserSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
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
          setUserSubscription(data);
        }
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        openModal('login');
        return;
      }

      setProcessingPlan(planId);

      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await supabase.functions.invoke('initialize-payment', {
        body: { planId },
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      });

      if (response.error) {
        throw response.error;
      }

      if (response.data?.checkout_url) {
        // Redirect to Chapa payment page
        window.location.href = response.data.checkout_url;
      } else {
        throw new Error('No checkout URL received');
      }

    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingPlan(null);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'ETB') {
      return `${price} ETB`;
    }
    return `$${price}`;
  };

  const getButtonText = (plan: Plan) => {
    if (userSubscription?.plan_id === plan.id) {
      return 'Current Plan';
    }
    return `Subscribe to ${plan.name}`;
  };

  const isCurrentPlan = (planId: string) => {
    return userSubscription?.plan_id === planId;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Add free plan to the beginning
  const allPlans = [
    {
      id: 'free',
      name: 'Basic',
      price: 0,
      currency: 'ETB',
      interval: 'month',
      description: 'Access to free courses, Limited practice exams, Community forum access'
    },
    ...plans
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {goBack && <BackButton onClick={goBack} previousPageName={previousPageName} />}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock your full potential with our subscription plans. Get access to exclusive content and features.
          </p>
          {userSubscription && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg inline-block">
              <p className="text-green-800 font-medium">
                Active: {userSubscription.plans.name} Plan
              </p>
              <p className="text-green-600 text-sm">
                Expires: {new Date(userSubscription.current_period_end).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {allPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:scale-105 relative ${
                plan.name === 'Pro' ? 'border-4 border-indigo-600' : 'border border-gray-200'
              }`}
            >
              {plan.name === 'Pro' && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase">Most Popular</span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{plan.name}</h3>
              <p className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
                {plan.price === 0 ? 'Free' : formatPrice(plan.price, plan.currency)}
                {plan.price > 0 && <span className="text-lg font-normal text-gray-600">/{plan.interval}</span>}
              </p>
              <ul className="space-y-4 mb-8">
                {plan.description.split(', ').map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => plan.id !== 'free' ? handleSubscribe(plan.id) : null}
                disabled={isCurrentPlan(plan.id) || processingPlan === plan.id || plan.id === 'free'}
                className={`w-full font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center ${
                  isCurrentPlan(plan.id) || plan.id === 'free'
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {processingPlan === plan.id ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  getButtonText(plan)
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
