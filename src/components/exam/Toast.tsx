
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb, AlertCircle } from 'lucide-react';

export const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgClass: 'bg-gradient-to-r from-green-500 to-green-600',
          icon: CheckCircle,
          borderClass: 'border-green-400'
        };
      case 'error':
        return {
          bgClass: 'bg-gradient-to-r from-red-500 to-red-600',
          icon: XCircle,
          borderClass: 'border-red-400'
        };
      case 'info':
        return {
          bgClass: 'bg-gradient-to-r from-blue-500 to-blue-600',
          icon: Lightbulb,
          borderClass: 'border-blue-400'
        };
      default:
        return {
          bgClass: 'bg-gradient-to-r from-gray-500 to-gray-600',
          icon: AlertCircle,
          borderClass: 'border-gray-400'
        };
    }
  };

  const { bgClass, icon: Icon, borderClass } = getToastStyles();

  return (
    <div className={`fixed bottom-6 right-6 ${bgClass} text-white px-6 py-4 rounded-xl shadow-2xl border-2 ${borderClass} flex items-center space-x-3 z-[100] animate-fade-in-up max-w-md`}>
      <Icon size={20} className="flex-shrink-0" />
      <span className="text-sm font-medium flex-grow">{message}</span>
      <button 
        onClick={onClose} 
        className="text-white opacity-75 hover:opacity-100 transition-opacity p-1 hover:bg-white hover:bg-opacity-20 rounded-lg"
      >
        <XCircle size={18} />
      </button>
    </div>
  );
};
