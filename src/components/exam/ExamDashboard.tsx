
import React, { useState, useEffect, useRef } from 'react';
import { dummyQuestions } from './dummyQuestions';
import { ExamToast } from './ExamToast';
import { ExamCompletedModalComponent } from './ExamCompletedModalComponent';
import { ExamHeaderComponent } from './ExamHeaderComponent';
import { QuestionPanelComponent } from './QuestionPanelComponent';
import { QuestionDisplayComponent } from './QuestionDisplayComponent';
import { QuestionGridModalComponent } from './QuestionGridModalComponent';
import { FooterNavComponent } from './FooterNavComponent';
import { ExamStyles } from './ExamStyles';

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ExamResults {
  score: number;
  correct: number;
  incorrect: number;
  total: number;
}

const Dashboard = ({ questions }: { questions: Question[] }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [examMode, setExamMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [showExamCompletedModal, setShowExamCompletedModal] = useState(false);
  const [examResults, setExamResults] = useState<ExamResults>({ score: 0, correct: 0, incorrect: 0, total: questions.length });
  const [toast, setToast] = useState<ToastState | null>(null);
  const [showQuestionGridModal, setShowQuestionGridModal] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (examMode) {
      setTimeLeft(10 * 60);
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleFinishExam(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examMode, questions.length]);

  const calculateResults = (currentAnswers: Record<number, string>): ExamResults => {
    let correctCount = 0;
    let incorrectCount = 0;
    questions.forEach((q, index) => {
      if (currentAnswers[index] !== undefined) {
        if (currentAnswers[index] === q.correctAnswer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });
    const scorePercentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    return {
      score: scorePercentage,
      correct: correctCount,
      incorrect: incorrectCount,
      total: questions.length,
    };
  };

  const handleAnswerSelect = (optionId: string) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: optionId };
    setAnswers(newAnswers);
    
    if (!examMode) {
      setShowExplanation(false);
    }
  };

  const handleFlagToggle = () => {
    const isCurrentlyFlagged = flaggedQuestions.includes(currentQuestionIndex);
    let newMessage: string;
    if (isCurrentlyFlagged) {
      setFlaggedQuestions(prev => prev.filter(index => index !== currentQuestionIndex));
      newMessage = `Question ${currentQuestionIndex + 1} unflagged.`;
    } else {
      setFlaggedQuestions(prev => [...prev, currentQuestionIndex]);
      newMessage = `Question ${currentQuestionIndex + 1} flagged for review.`;
    }
    setToast({ message: newMessage, type: 'info' });
  };

  const handleFlagToggleByIndex = (index: number) => {
    const isCurrentlyFlagged = flaggedQuestions.includes(index);
    let newMessage: string;
    if (isCurrentlyFlagged) {
      setFlaggedQuestions(prev => prev.filter(item => item !== index));
      newMessage = `Question ${index + 1} unflagged.`;
    } else {
      setFlaggedQuestions(prev => [...prev, index]);
      newMessage = `Question ${index + 1} flagged for review.`;
    }
    setToast({ message: newMessage, type: 'info' });
  };

  const handleQuestionClick = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowExplanation(false);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    } else if (examMode && currentQuestionIndex === questions.length - 1) {
      setToast({ message: "You are at the last question. Click 'Finish Exam' to submit.", type: 'info' });
    }
  };

  const handleGetHint = () => {
    if (currentQuestion && currentQuestion.hint && !examMode) {
      setToast({ message: `Hint: ${currentQuestion.hint}`, type: 'info' });
    } else if (examMode) {
      setToast({ message: "Hints are not available in Exam Mode.", type: 'info' });
    }
  };

  const handleGetExplanation = () => {
    if (!examMode) {
      setShowExplanation(true);
    } else {
      setToast({ message: "Explanations are not available in Exam Mode until after submission.", type: 'info' });
    }
  };

  const handleToggleExamMode = () => {
    setExamMode(!examMode);
    setShowExplanation(false);
    if (!examMode) {
      setAnswers({});
      setFlaggedQuestions([]);
      setCurrentQuestionIndex(0);
      setToast({ message: "Exam Mode started. Timer is running.", type: 'info' });
    } else {
      setToast({ message: "Switched to Practice Mode.", type: 'info' });
    }
  };

  const handleFinishExam = (timedOut: boolean) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const results = calculateResults(answers);
    setExamResults(results);
    setShowExamCompletedModal(true);
    if (timedOut) {
      setToast({ message: "Time's up! Exam submitted automatically.", type: 'info' });
    } else {
      setToast({ message: "Exam submitted successfully!", type: 'success' });
    }
  };

  const handleCloseExamCompletedModal = () => {
    setShowExamCompletedModal(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlaggedQuestions([]);
    setShowExplanation(false);
    setExamMode(false);
    setTimeLeft(10 * 60);
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  const handleToggleQuestionGrid = () => {
    setShowQuestionGridModal(!showQuestionGridModal);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ExamHeaderComponent
        title="Aptitude Entrance Exam"
        breadcrumbs={["Home", "Exams", "Aptitude"]}
        examMode={examMode}
        timeLeft={timeLeft}
        onToggleExamMode={handleToggleExamMode}
        onToggleQuestionGrid={handleToggleQuestionGrid}
      />

      <main className="flex-grow container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
          <QuestionPanelComponent
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            onQuestionClick={handleQuestionClick}
            onFlagToggleByIndex={handleFlagToggleByIndex}
          />
        </div>

        <div className="flex-grow lg:w-3/4 xl:w-4/5">
          {currentQuestion ? (
            <QuestionDisplayComponent
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              selectedAnswer={answers[currentQuestionIndex]}
              onAnswerSelect={handleAnswerSelect}
              onFlagToggle={handleFlagToggle}
              isFlagged={flaggedQuestions.includes(currentQuestionIndex)}
              onGetHint={handleGetHint}
              onGetExplanation={handleGetExplanation}
              showExplanation={showExplanation && !examMode}
              examMode={examMode}
            />
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-xl text-gray-700">No questions loaded.</p>
            </div>
          )}
        </div>
      </main>

      {currentQuestion && (
        <FooterNavComponent
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          onPrevious={handlePrevious}
          onNext={handleNext}
          showPrevious={currentQuestionIndex > 0}
          showNext={currentQuestionIndex < questions.length - 1 || (examMode && currentQuestionIndex === questions.length - 1)}
          onQuestionClick={handleQuestionClick}
          onFlagToggleByIndex={handleFlagToggleByIndex}
          onFinishExam={handleFinishExam}
          examMode={examMode}
        />
      )}

      {toast && <ExamToast message={toast.message} type={toast.type} onClose={handleCloseToast} />}
      {showExamCompletedModal && (
        <ExamCompletedModalComponent
          {...examResults}
          onClose={handleCloseExamCompletedModal}
        />
      )}
      {showQuestionGridModal && (
        <QuestionGridModalComponent
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          flaggedQuestions={flaggedQuestions}
          onQuestionClick={handleQuestionClick}
          onClose={handleToggleQuestionGrid}
          onFlagToggleByIndex={handleFlagToggleByIndex}
        />
      )}
      <ExamStyles />
    </div>
  );
};

export const ExamDashboard = () => {
  return <Dashboard questions={dummyQuestions} />;
};

export default ExamDashboard;
