
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface GoogleAuthInterfaceProps {
  onClose: () => void;
  onBack: () => void;
}

const GoogleAuthInterface: React.FC<GoogleAuthInterfaceProps> = ({ onClose, onBack }) => {
  const [selectedAccount, setSelectedAccount] = useState('hzqielemail@gmail.com');

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-0 max-w-md w-full relative border border-gray-700 animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">⚡</span>
              </div>
              <span className="text-sm text-gray-300">በGoogle ይግቡ</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">መለያ ይምረጡ</h2>
            <p className="text-sm text-gray-400">
              ወደ stackblitz ለመቀጠል
            </p>
          </div>

          {/* Account Selection */}
          <div className="space-y-3 mb-6">
            <div 
              onClick={() => setSelectedAccount('hzqielemail@gmail.com')}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${
                selectedAccount === 'hzqielemail@gmail.com' 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">E</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">Email</div>
                <div className="text-xs text-gray-400">hzqielemail@gmail.com</div>
              </div>
              {selectedAccount === 'hzqielemail@gmail.com' && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-600 hover:border-gray-500 transition-all cursor-pointer">
              <div className="w-10 h-10 border-2 border-dashed border-gray-500 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-lg">👤</span>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-300">ሌላ መለያ ይጨምሩ</div>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-400 leading-relaxed">
              ይህን ውሳኔ ከተለቀቀ በኋላ በዚህ የstackblitz'ን ግላዊነት ሙከራዎች እና የአገልግሎት ውሎች ወደ መግባቢያዎች ይሳባል
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <select className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500">
              <option>አማርኛ</option>
              <option>English</option>
              <option>العربية</option>
            </select>

            <div className="flex space-x-3">
              <button 
                onClick={onBack}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                አረጋገጥ
              </button>
              <button 
                onClick={() => {
                  // Simulate Google auth success
                  setTimeout(() => {
                    onClose();
                    // You can dispatch a custom event here to simulate successful Google auth
                    window.dispatchEvent(new CustomEvent('googleAuthSuccess', { 
                      detail: { 
                        email: selectedAccount,
                        name: 'User Name'
                      } 
                    }));
                  }, 1000);
                }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
              >
                ግላዊነት
              </button>
              <button 
                onClick={() => {
                  // Simulate Google auth success
                  setTimeout(() => {
                    onClose();
                    window.dispatchEvent(new CustomEvent('googleAuthSuccess', { 
                      detail: { 
                        email: selectedAccount,
                        name: 'User Name'
                      } 
                    }));
                  }, 1000);
                }}
                className="px-6 py-2 bg-white text-gray-900 text-sm rounded hover:bg-gray-100 transition-colors"
              >
                ውሎች
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuthInterface;
