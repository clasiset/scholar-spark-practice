
import { supabase } from '@/integrations/supabase/client';

export interface WebTransactionData {
  transaction_type: string;
  user_id?: string;
  question_id?: string;
  exam_type?: string;
  subject?: string;
  metadata?: Record<string, any>;
}

export const trackWebTransaction = async (data: WebTransactionData) => {
  try {
    // Get or create session ID
    let sessionId = sessionStorage.getItem('zehulu_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('zehulu_session_id', sessionId);
    }

    // Get user ID if authenticated
    const { data: { user } } = await supabase.auth.getUser();

    const transactionData = {
      ...data,
      user_id: data.user_id || user?.id || null,
      session_id: sessionId,
      page_url: window.location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      ip_address: null, // Will be captured by Supabase
    };

    const { error } = await supabase
      .from('web_transactions')
      .insert(transactionData);

    if (error) {
      console.error('Error tracking web transaction:', error);
    }
  } catch (error) {
    console.error('Error in trackWebTransaction:', error);
  }
};

// Predefined transaction types for consistency
export const TRANSACTION_TYPES = {
  QUESTION_VIEW: 'question_view',
  QUESTION_CREATED: 'question_created',
  EXAM_START: 'exam_start',
  EXAM_COMPLETE: 'exam_complete',
  USER_REGISTRATION: 'user_registration',
  USER_LOGIN: 'user_login',
  PAGE_VIEW: 'page_view',
  SEARCH: 'search',
  COURSE_ENROLLMENT: 'course_enrollment',
} as const;
