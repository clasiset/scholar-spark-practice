
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick?: () => void;
  previousPageName?: string | null;
}

const formatPageName = (name: string) => {
  if (!name) return '';
  const withSpaces = name.replace(/([A-Z])/g, ' $1');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};

const BackButton: React.FC<BackButtonProps> = ({ onClick, previousPageName }) => {
  if (!previousPageName || !onClick) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center text-primary hover:text-primary/80 mb-4 transition-colors group"
    >
      <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
      Back to {formatPageName(previousPageName)}
    </button>
  );
};

export default BackButton;
