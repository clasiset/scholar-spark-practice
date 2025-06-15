
import React from 'react';
import { Check, Zap, Crown } from 'lucide-react';
import BreadcrumbNav from './BreadcrumbNav';

interface HistoryEntry {
  page: string;
  data: any | null;
}

const SubscriptionPage = ({ openModal, history, navigateToHistory }: {
  openModal: (type: string, data?: any) => void;
  history: HistoryEntry[];
  navigateToHistory: (index: number) => void;
}) => {
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 500,
      currency: 'ETB',
      interval: 'month',
      shortDescription: 'Perfect for small businesses starting their digital journey',
      features: [
        'Up to 100 transactions/month',
        'Basic payment methods',
        'Email support',
        'Transaction history',
        'Mobile app access'
      ],
      icon: Crown,
      iconColor: 'text-yellow-500 dark:text-yellow-400',
      iconBgColor: 'bg-yellow-100 dark:bg-yellow-900/50',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-300',
      textColor: 'text-white dark:text-yellow-950',
      borderColor: 'border-4 border-yellow-500 dark:border-yellow-400',
      popular: true,
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 1200,
      currency: 'ETB',
      interval: 'month',
      shortDescription: 'Ideal for growing businesses with higher transaction volumes',
      features: [
        'Up to 1,000 transactions/month',
        'All payment methods',
        'Priority support',
        'Advanced analytics',
        'API access',
        'Custom branding'
      ],
      icon: Zap,
      iconColor: 'text-green-600 dark:text-green-400',
      iconBgColor: 'bg-green-100 dark:bg-green-900/50',
      buttonColor: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-400',
      textColor: 'text-white dark:text-green-950',
      borderColor: 'border-border',
      popular: false,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 2500,
      currency: 'ETB',
      interval: 'month',
      shortDescription: 'Complete solution for large businesses and enterprises',
      features: [
        'Unlimited transactions',
        'All premium features',
        'Dedicated account manager',
        'Custom integrations',
        'White-label solutions',
        'SLA guarantee'
      ],
      icon: Crown,
      iconColor: 'text-red-600 dark:text-red-400',
      iconBgColor: 'bg-red-100 dark:bg-red-900/50',
      buttonColor: 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400',
      textColor: 'text-white dark:text-red-950',
      borderColor: 'border-border',
      popular: false,
    }
  ];

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'ETB') {
      return `${price} ETB`;
    }
    return `$${price}`;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-6">
        <BreadcrumbNav history={history} navigateToHistory={navigateToHistory} />
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Subscription Plans</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for you and unlock exclusive features.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-card rounded-xl shadow-lg p-8 text-center flex flex-col transform transition-transform duration-300 hover:scale-105 relative ${plan.borderColor}`}
            >
              {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-500 dark:bg-yellow-400 text-white dark:text-yellow-950 text-xs font-bold px-4 py-1 rounded-full uppercase">Most Popular</span>
                </div>
              )}
              <div className="flex-grow">
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${plan.iconBgColor}`}>
                    <plan.icon className={`w-8 h-8 ${plan.iconColor}`} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 h-12">{plan.shortDescription}</p>
                <p className="text-4xl font-extrabold text-foreground mb-6">
                  {formatPrice(plan.price, plan.currency)}
                  <span className="text-lg font-normal text-muted-foreground">/{plan.interval}</span>
                </p>
                <ul className="space-y-4 mb-8 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => openModal('login')}
                className={`w-full font-semibold py-3 px-4 rounded-lg transition duration-300 ${plan.buttonColor} ${plan.textColor}`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
