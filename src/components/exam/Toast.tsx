
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

export const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'info' ? 'bg-blue-500' : 'bg-red-500';
  const Icon = type === 'success' ? CheckCircle : type === 'info' ? Lightbulb : XCircle;

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-3 rounded-md shadow-lg flex items-center space-x-2 z-[100] animate-fade-in-up text-sm`}>
      <Icon size={18} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto text-white opacity-75 hover:opacity-100">
        <XCircle size={16} />
      </button>
    </div>
  );
};
