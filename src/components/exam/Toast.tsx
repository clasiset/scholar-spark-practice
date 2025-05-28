
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

export const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch(type) {
      case 'success':
        return 'bg-gradient-to-r from-emerald-500 to-green-500 border-emerald-400';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-pink-500 border-red-400';
      case 'info':
      default:
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-400';
    }
  };

  const Icon = type === 'success' ? CheckCircle : type === 'info' ? Lightbulb : XCircle;

  return (
    <div className={`fixed bottom-6 right-6 ${getToastStyles()} text-white px-5 py-4 rounded-xl shadow-2xl 
                     flex items-center space-x-3 z-[100] animate-fade-in-up text-sm border-l-4 backdrop-blur-sm
                     transform transition-all duration-300 ease-out hover:scale-105`}>
      <Icon size={20} className="flex-shrink-0" />
      <span className="font-medium">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-2 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20"
      >
        <XCircle size={18} />
      </button>
    </div>
  );
};
