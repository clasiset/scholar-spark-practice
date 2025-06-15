
-- Create questions table to store exam questions
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  year TEXT NOT NULL,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  explanation TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_published BOOLEAN DEFAULT true
);

-- Create web transactions table to track website activity
CREATE TABLE public.web_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_type TEXT NOT NULL, -- 'question_view', 'exam_start', 'exam_complete', 'user_registration', etc.
  user_id UUID REFERENCES auth.users(id),
  question_id UUID REFERENCES public.questions(id),
  exam_type TEXT,
  subject TEXT,
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  page_url TEXT,
  referrer TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_transactions ENABLE ROW LEVEL SECURITY;

-- Questions policies - admins can manage, users can view published questions
CREATE POLICY "Anyone can view published questions" 
  ON public.questions 
  FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Authenticated users can create questions" 
  ON public.questions 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own questions" 
  ON public.questions 
  FOR UPDATE 
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own questions" 
  ON public.questions 
  FOR DELETE 
  USING (auth.uid() = created_by);

-- Web transactions policies - only admins can view all transactions
CREATE POLICY "Users can view their own transactions" 
  ON public.web_transactions 
  FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM auth.users WHERE email LIKE '%@admin.zehulu.com'));

CREATE POLICY "Anyone can insert transactions" 
  ON public.web_transactions 
  FOR INSERT 
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_questions_exam_type_subject ON public.questions(exam_type, subject);
CREATE INDEX idx_questions_year ON public.questions(year);
CREATE INDEX idx_questions_created_at ON public.questions(created_at);
CREATE INDEX idx_web_transactions_type ON public.web_transactions(transaction_type);
CREATE INDEX idx_web_transactions_created_at ON public.web_transactions(created_at);
CREATE INDEX idx_web_transactions_user_id ON public.web_transactions(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for questions table
CREATE TRIGGER update_questions_updated_at 
    BEFORE UPDATE ON public.questions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
