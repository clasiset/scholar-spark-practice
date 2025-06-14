
import React from 'react';
import { Check } from 'lucide-react';
import BackButton from './BackButton';

const SubscriptionPage = ({ openModal, goBack, previousPageName }: { 
  openModal: (type: string, data?: any) => void, 
  goBack?: () => void, 
  previousPageName?: string | null 
}) => {
  const plans = [
    {
      id: 'free',
      name: 'Basic',
      price: 0,
      currency: 'ETB',
      interval: 'month',
      description: 'Access to free courses, Limited practice exams, Community forum access'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 299,
      currency: 'ETB',
      interval: 'month',
      description: 'All Basic features, Unlimited practice exams, Priority support, Advanced analytics'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 599,
      currency: 'ETB',
      interval: 'month',
      description: 'All Pro features, One-on-one tutoring sessions, Custom study plans, Career guidance'
    }
  ];

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'ETB') {
      return `${price} ETB`;
    }
    return `$${price}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {goBack && <BackButton onClick={goBack} previousPageName={previousPageName} />}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock your full potential with our subscription plans. Get access to exclusive content and features.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
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
                onClick={() => plan.id !== 'free' ? openModal('login') : null}
                disabled={plan.id === 'free'}
                className={`w-full font-semibold py-3 px-4 rounded-lg transition duration-300 ${
                  plan.id === 'free'
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {plan.id === 'free' ? 'Current Plan' : `Subscribe to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
