
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface ExamToastProps {
  message: string;
  type: 'success' | 'info' | 'error';
  onClose: () => void;
}

export const ExamToast = ({ message, type, onClose }: ExamToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'info' ? 'bg-blue-500' : 'bg-red-500';
  const Icon = type === 'success' ? CheckCircle : type === 'info' ? Lightbulb : XCircle;

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-fade-in-up`}>
      <Icon size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto text-white opacity-75 hover:opacity-100">
        <XCircle size={18} />
      </button>
    </div>
  );
};
