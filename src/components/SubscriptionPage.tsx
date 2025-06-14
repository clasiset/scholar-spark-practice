
import React from 'react';
import { Check } from 'lucide-react';
import BackButton from './BackButton';

const SubscriptionPage = ({ openModal, goBack, previousPageName }: { openModal: (type: string, data?: any) => void, goBack?: () => void, previousPageName?: string | null }) => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      features: [
        'Access to free courses',
        'Limited practice exams',
        'Community forum access',
      ],
      buttonText: 'Current Plan',
      isPopular: false,
      isCurrent: true,
    },
    {
      name: 'Pro',
      price: '$9.99/mo',
      features: [
        'Access to all courses',
        'Unlimited practice exams',
        'Priority support',
        'Advanced analytics',
      ],
      buttonText: 'Upgrade to Pro',
      isPopular: true,
      isCurrent: false,
    },
    {
      name: 'Premium',
      price: '$19.99/mo',
      features: [
        'All Pro features',
        'One-on-one tutoring sessions',
        'Personalized study plans',
        'Career guidance',
      ],
      buttonText: 'Upgrade to Premium',
      isPopular: false,
      isCurrent: false,
    },
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:scale-105 relative ${
                plan.isPopular ? 'border-4 border-indigo-600' : 'border border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase">Most Popular</span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{plan.name}</h3>
              <p className="text-4xl font-extrabold text-gray-900 mb-6 text-center">{plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => !plan.isCurrent && openModal('login')}
                disabled={plan.isCurrent}
                className={`w-full font-semibold py-3 px-4 rounded-lg transition duration-300 ${
                  plan.isCurrent
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
