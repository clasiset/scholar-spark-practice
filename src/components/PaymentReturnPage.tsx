
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const PaymentReturnPage = ({ navigate }: { navigate: (page: string) => void }) => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'checking' | 'success' | 'failed'>('checking');
  const [message, setMessage] = useState('Processing your payment...');
  
  const txRef = searchParams.get('tx_ref');

  useEffect(() => {
    if (!txRef) {
      setPaymentStatus('failed');
      setMessage('Invalid payment reference');
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        // Poll for payment status
        let attempts = 0;
        const maxAttempts = 10;
        
        const pollStatus = async (): Promise<void> => {
          const { data: payment, error } = await supabase
            .from('payments')
            .select('status')
            .eq('chapa_tx_ref', txRef)
            .single();

          if (error) {
            console.error('Error checking payment:', error);
            if (attempts >= maxAttempts) {
              setPaymentStatus('failed');
              setMessage('Unable to verify payment status. Please contact support.');
            }
            return;
          }

          if (payment?.status === 'succeeded') {
            setPaymentStatus('success');
            setMessage('Payment successful! Your subscription is now active.');
          } else if (payment?.status === 'failed') {
            setPaymentStatus('failed');
            setMessage('Payment failed. Please try again.');
          } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(pollStatus, 2000); // Wait 2 seconds before next check
          } else {
            setPaymentStatus('failed');
            setMessage('Payment verification timeout. Please contact support.');
          }
        };

        pollStatus();
      } catch (error) {
        console.error('Payment status check error:', error);
        setPaymentStatus('failed');
        setMessage('Error checking payment status');
      }
    };

    checkPaymentStatus();
  }, [txRef]);

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'checking':
        return <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case 'failed':
        return <XCircle className="h-16 w-16 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (paymentStatus) {
      case 'checking':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          {getStatusIcon()}
        </div>
        
        <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
          {paymentStatus === 'checking' && 'Processing Payment'}
          {paymentStatus === 'success' && 'Payment Successful!'}
          {paymentStatus === 'failed' && 'Payment Failed'}
        </h1>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="space-y-3">
          {paymentStatus === 'success' && (
            <button
              onClick={() => navigate('subscription')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              View Subscription
            </button>
          )}
          
          {paymentStatus === 'failed' && (
            <button
              onClick={() => navigate('subscription')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Try Again
            </button>
          )}
          
          <button
            onClick={() => navigate('home')}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Go Home
          </button>
        </div>
        
        {txRef && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">Reference: {txRef}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentReturnPage;
