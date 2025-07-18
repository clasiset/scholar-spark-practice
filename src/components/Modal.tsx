import React, { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, User, Mail, Lock, UserPlus, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import StartExamModal from './StartExamModal';

const Modal = ({ type, data, onClose, openModal, navigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Wrap handleGoogleAuthSuccess with useCallback for stable reference
  const handleGoogleAuthSuccess = useCallback((event: CustomEvent) => {
    const { email, name } = event.detail;
    // Simulate successful signup with Google account
    onClose();
  }, [onClose]);

  // Check for Google OAuth completion on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state) {
      // OAuth flow completed, handle the Google signup
      handleGoogleOAuthComplete();
    }
    
    window.addEventListener('googleAuthSuccess', handleGoogleAuthSuccess);
    
    return () => {
      window.removeEventListener('googleAuthSuccess', handleGoogleAuthSuccess);
    };
  }, [onClose, handleGoogleAuthSuccess]);

  const handleGoogleOAuthComplete = async () => {
    try {
      // Get the stored email from localStorage
      const selectedEmail = localStorage.getItem('selectedGoogleEmail') || 'google-user@example.com';
      
      // Clean up localStorage
      localStorage.removeItem('selectedGoogleEmail');
            
      // Close modal and navigate to home
      onClose();
      
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      
    } catch (error) {
      console.error('Google OAuth completion error:', error);
      setError('Failed to complete Google authentication');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user types
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePhoneAuth = async () => {
    if (!formData.phone) {
      setError("Please enter your phone number.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formData.phone,
      });
      if (error) {
        setError(error.message);
      } else {
        setError('');
        alert('OTP sent to your phone number!');
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  const handleAuth = async () => {
    setLoading(true);
    setError('');

    try {
      if (type === 'signup') {
        if (!formData.email || !formData.password || !formData.confirmPassword) {
          setError("Please fill in all fields.");
          setLoading(false);
          return;
        }
        
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) {
          setError(error.message);
        } else if (data.user) {
          onClose();
        }
      } else { // login
        if (!formData.email || !formData.password) {
          setError("Please enter your email and password.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          setError(error.message);
        } else if (data.user) {
          onClose();
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      onClose();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (type === 'startExam') {
    return <StartExamModal onClose={onClose} examDetails={data} navigate={navigate} />;
  }

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg w-full relative border border-gray-200 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors duration-200 hover:rotate-90 transform transition-transform"
        >
          &times;
        </button>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {type === 'signup' && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create Your Account</h2>
              <p className="text-gray-600 dark:text-slate-300 mt-2">Join thousands of students preparing for success</p>
            </div>
            
            {!showPhoneAuth ? (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-slate-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 dark:text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 dark:text-slate-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button 
                  onClick={handleAuth} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400 dark:text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone number (+1234567890)"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                  />
                </div>

                <button 
                  onClick={handlePhoneAuth} 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>

                <button 
                  onClick={() => setShowPhoneAuth(false)}
                  className="w-full text-gray-600 dark:text-slate-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  Back to Email Registration
                </button>
              </div>
            )}
            
            <p className="text-center text-gray-600 dark:text-slate-300 mt-4">
              Already have an account? 
              <span className="text-blue-600 font-medium cursor-pointer hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 ml-1" onClick={() => openModal('login')}>
                Sign in
              </span>
            </p>
            
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300 dark:border-slate-600"></div>
              <span className="flex-shrink mx-4 text-gray-500 dark:text-slate-400 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300 dark:border-slate-600"></div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-200"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {!showPhoneAuth && (
                <button 
                  onClick={() => setShowPhoneAuth(true)}
                  className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-200"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Continue with Phone Number
                </button>
              )}
            </div>
          </>
        )}

        {type === 'login' && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome Back</h2>
              <p className="text-gray-600 dark:text-slate-300 mt-2">Continue your learning journey</p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-slate-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-slate-900 dark:border-slate-600" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-slate-300">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500">Forgot password?</a>
              </div>

              <button 
                onClick={handleAuth} 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
              
              <p className="text-center text-gray-600 dark:text-slate-300 mt-4">
                Don't have an account? 
                <span className="text-blue-600 font-medium cursor-pointer hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 ml-1" onClick={() => openModal('signup')}>
                  Sign up
                </span>
              </p>
              
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300 dark:border-slate-600"></div>
                <span className="flex-shrink mx-4 text-gray-500 dark:text-slate-400 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300 dark:border-slate-600"></div>
              </div>
              
              <button 
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md dark:border-slate-600 dark:hover:bg-slate-700 dark:text-slate-200"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </>
        )}

        {type === 'profile' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {(data?.first_name && data?.last_name) ? `${data.first_name} ${data.last_name}` : data?.email || 'User Profile'}
            </h2>
            <p className="text-gray-600 dark:text-slate-300 mb-6">{data?.email ? data.email : 'Sign in to manage your profile.'}</p>
            {data?.email ? (
              <div className="space-y-3">
                <button onClick={() => { navigate('editProfile'); onClose(); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  View Profile
                </button>
                <button onClick={() => { navigate('settings'); onClose(); }} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200">
                  Settings
                </button>
                <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Logout
                </button>
              </div>
            ) : (
                <button 
                  onClick={() => { onClose(); openModal('login'); }} 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
            )}
          </div>
        )}

        {type === 'enroll' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Confirm Enrollment</h2>
            <p className="text-lg text-gray-700 dark:text-slate-200 mb-6">You are about to enroll in: <br /><span className="font-semibold text-blue-600 dark:text-blue-400">{data}</span></p>
            <p className="text-gray-600 dark:text-slate-300 mb-8">Click confirm to proceed with your enrollment.</p>
            <button
              onClick={() => { alert('Enrollment Confirmed!'); onClose(); }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Confirm Enrollment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
