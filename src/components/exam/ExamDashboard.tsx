
import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { ExamHeader } from './ExamHeader';
import { QuestionPanel } from './QuestionPanel';
import { QuestionDisplay } from './QuestionDisplay';
import { FooterNav } from './FooterNav';
import { ExamCompletedModal } from './ExamCompletedModal';
import { Toast } from './Toast';

// Dummy data for questions
const dummyQuestions = [
  {
    id: 1,
    text: "The weather outside was extremely pleasant and hence we decided to ______.",
    options: [
      { id: 'a', text: "employ this rare opportunity for writing letters" },
      { id: 'b', text: "enjoy a morning ride in the open" },
      { id: 'c', text: "refrain from going out for a morning walk" },
      { id: 'd', text: "utilize our time watching the television" },
    ],
    correctAnswer: 'b',
    hint: "Think about what one would do on a pleasant morning outdoors.",
    explanation: "The phrase 'extremely pleasant' suggests an activity that would allow one to enjoy the weather. 'Enjoy a morning ride in the open' fits this perfectly, implying taking advantage of the good weather.",
  },
  {
    id: 2,
    text: "Which of the following is a prime number?",
    options: [
      { id: 'a', text: "4" },
      { id: 'b', text: "9" },
      { id: 'c', text: "11" },
      { id: 'd', text: "15" },
    ],
    correctAnswer: 'c',
    hint: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
    explanation: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. 4 = 2x2, 9 = 3x3, 15 = 3x5. Only 11 is divisible only by 1 and 11.",
  },
  {
    id: 3,
    text: "What is the capital of France?",
    options: [
      { id: 'a', text: "Berlin" },
      { id: 'b', text: "Madrid" },
      { id: 'c', text: "Rome" },
      { id: 'd', text: "Paris" },
    ],
    correctAnswer: 'd',
    hint: "It's a major European city known for its art and culture.",
    explanation: "Paris is the capital and most populous city of France.",
  },
  {
    id: 4,
    text: "Which planet is known as the 'Red Planet'?",
    options: [
      { id: 'a', text: "Earth" },
      { id: 'b', text: "Mars" },
      { id: 'c', text: "Jupiter" },
      { id: 'd', text: "Venus" },
    ],
    correctAnswer: 'b',
    hint: "It's the fourth planet from the Sun.",
    explanation: "Mars is often referred to as the 'Red Planet' due to its reddish appearance, which is caused by iron oxide (rust) on its surface.",
  },
  {
    id: 5,
    text: "What is the chemical symbol for water?",
    options: [
      { id: 'a', text: "O2" },
      { id: 'b', text: "H2O" },
      { id: 'c', text: "CO2" },
      { id: 'd', text: "NaCl" },
    ],
    correctAnswer: 'b',
    hint: "It involves hydrogen and oxygen.",
    explanation: "The chemical symbol for water is H2O, meaning it is composed of two hydrogen atoms and one oxygen atom.",
  },
  {
    id: 6,
    text: "Who painted the Mona Lisa?",
    options: [
      { id: 'a', text: "Vincent van Gogh" },
      { id: 'b', text: "Pablo Picasso" },
      { id: 'c', text: "Leonardo da Vinci" },
      { id: 'd', text: "Claude Monet" },
    ],
    correctAnswer: 'c',
    hint: "He was a famous Italian Renaissance artist and inventor.",
    explanation: "The Mona Lisa was painted by Leonardo da Vinci, an Italian polymath of the High Renaissance.",
  },
  {
    id: 7,
    text: "What is the largest ocean on Earth?",
    options: [
      { id: 'a', text: "Atlantic Ocean" },
      { id: 'b', text: "Indian Ocean" },
      { id: 'c', text: "Arctic Ocean" },
      { id: 'd', text: "Pacific Ocean" },
    ],
    correctAnswer: 'd',
    hint: "It covers about one-third of the surface of the Earth.",
    explanation: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions.",
  },
  {
    id: 8,
    text: "How many continents are there?",
    options: [
      { id: 'a', text: "5" },
      { id: 'b', text: "6" },
      { id: 'c', text: "7" },
      { id: 'd', text: "8" },
    ],
    correctAnswer: 'c',
    hint: "Think about North America, South America, Europe, Asia, Africa, Australia...",
    explanation: "There are generally considered to be seven continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.",
  },
  {
    id: 9,
    text: "What is the fastest land animal?",
    options: [
      { id: 'a', text: "Lion" },
      { id: 'b', text: "Cheetah" },
      { id: 'c', text: "Gazelle" },
      { id: 'd', text: "Horse" },
    ],
    correctAnswer: 'b',
    hint: "It's known for its incredible speed and spotted coat.",
    explanation: "The cheetah is the fastest land animal, capable of running at speeds of up to 120 km/h (75 mph) over short distances.",
  },
  {
    id: 10,
    text: "Which gas do plants absorb from the atmosphere?",
    options: [
      { id: 'a', text: "Oxygen" },
      { id: 'b', text: "Nitrogen" },
      { id: 'c', text: "Carbon Dioxide" },
      { id: 'd', text: "Hydrogen" },
    ],
    correctAnswer: 'c',
    hint: "It's essential for photosynthesis.",
    explanation: "Plants absorb carbon dioxide from the atmosphere for photosynthesis, the process by which they convert light energy into chemical energy.",
  },
];

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const ExamDashboard = ({ questions: initialQuestions = dummyQuestions, navigate, examDetails }) => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanationLoading, setExplanationLoading] = useState(false);

  const [examMode, setExamMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const EXAM_DURATION = 10 * 60;

  const [showExamCompletedModal, setShowExamCompletedModal] = useState(false);
  const [examResults, setExamResults] = useState({ score: 0, correct: 0, incorrect: 0, total: questions.length });
  const [toast, setToast] = useState(null);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  const timerRef = useRef(null);
  const currentQuestion = questions[currentQuestionIndex];
  
  const resetQuizState = (isExam) => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlaggedQuestions([]);
    setShowExplanation(false);
    setExplanationLoading(false);
    setShowExamCompletedModal(false);
    setTimeLeft(EXAM_DURATION);
    setExamMode(isExam);
    setIsMobilePanelOpen(false); 
    setQuestions(initialQuestions); 
  };

  useEffect(() => {
    if (examMode) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            handleFinishExam(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [examMode, questions]); 

  const calculateResults = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    questions.forEach((q, index) => {
      if (answers[index] !== undefined) {
        if (answers[index] === q.correctAnswer) {
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

  const handleFinishExam = (timedOut = false) => {
    clearInterval(timerRef.current);
    const results = calculateResults();
    setExamResults(results);
    setShowExamCompletedModal(true);
    setIsMobilePanelOpen(false);
    if (timedOut) {
        setToast({ message: "Time's up! Exam submitted automatically.", type: 'info'});
    } else if (examMode) { 
        setToast({ message: "Exam submitted successfully!", type: 'success'});
    } else { 
        setToast({ message: "Practice session ended. Check your results!", type: 'info'});
    }
  };
  
  const handleAnswerSelect = (optionId) => {
    if (examMode && answers[currentQuestionIndex] !== undefined) {
        setToast({ message: "You cannot change your answer in exam mode.", type: 'info'});
        return;
    }

    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionId }));
    
    if (!examMode) {
        setShowExplanation(false); 
    } else {
        const newAnswers = { ...answers, [currentQuestionIndex]: optionId };
        if (Object.keys(newAnswers).length === questions.length) {
          handleFinishExam(false); 
        }
    }
  };

  const handleFlagToggleByIndex = (index) => {
    if (examMode) {
        setToast({ message: "Flagging is disabled in Exam Mode.", type: 'info' });
        return;
    }
    const isCurrentlyFlagged = flaggedQuestions.includes(index);
    let newMessage;
    if (isCurrentlyFlagged) {
      setFlaggedQuestions(prev => prev.filter(item => item !== index));
      newMessage = `Question ${index + 1} unflagged.`;
    } else {
      setFlaggedQuestions(prev => [...prev, index]);
      newMessage = `Question ${index + 1} flagged.`;
    }
    setToast({ message: newMessage, type: 'info' });
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
    setShowExplanation(false);
    setExplanationLoading(false);
    setIsMobilePanelOpen(false); 
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
      setExplanationLoading(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
      setExplanationLoading(false);
    }
  };

  const handleGetHint = () => {
    if (examMode) {
        setToast({ message: "Hints are disabled in Exam Mode.", type: 'info' });
        return;
    }
    if (showExplanation) {
        setToast({ message: "Hint not available when explanation is shown.", type: 'info' });
        return;
    }
    if (currentQuestion && currentQuestion.hint) {
      setToast({ message: `Hint: ${currentQuestion.hint}`, type: 'info' });
    } else {
      setToast({ message: "No hint available for this question.", type: 'info' });
    }
  };

  const handleGetExplanation = async () => {
    if (examMode) {
        setToast({ message: "Explanations are disabled during Exam Mode.", type: 'info' });
        return;
    }
    if (!answers[currentQuestionIndex]) {
        setToast({ message: "Please select an answer first.", type: 'info' });
        return;
    }
    if (showExplanation) return; 

    setExplanationLoading(true);
    
    try {
        // Use the default explanation for now since we don't have API key
        const updatedQuestions = questions.map((q, index) => 
            index === currentQuestionIndex ? { ...q, explanation: q.explanation || "Default explanation available." } : q
        );
        setQuestions(updatedQuestions);
    } catch (error) {
        console.error('Error fetching explanation:', error);
        setToast({ message: `Error: ${error.message}. Using default explanation.`, type: 'error' });
        const updatedQuestions = questions.map((q, index) => 
            index === currentQuestionIndex ? { ...q, explanation: q.explanation || "Could not fetch AI explanation." } : q
        );
        setQuestions(updatedQuestions);
    } finally {
        setExplanationLoading(false);
        setShowExplanation(true); 
    }
  };

  const handleToggleExamMode = () => {
    setExamMode(prevMode => {
        const newMode = !prevMode;
        resetQuizState(newMode); 
        if (newMode) {
            setToast({ message: "Exam Mode started. Timer is running!", type: 'info' });
        } else {
            setToast({ message: "Switched to Practice Mode.", type: 'info' });
        }
        return newMode;
    });
  };
  
  const handleRestartExamFromModal = () => {
    resetQuizState(true); 
    setShowExamCompletedModal(false);
    setToast({ message: "Exam restarted. Good luck!", type: 'info' });
  };

  const handleCloseResultsModal = () => {
    setShowExamCompletedModal(false);
    resetQuizState(false); 
    setToast({ message: "Switched to Practice Mode.", type: 'info' });
  };

  const questionProgress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showExamCompletedModal && examResults && (
        <ExamCompletedModal
          score={examResults.score}
          correct={examResults.correct}
          incorrect={examResults.incorrect}
          total={examResults.total}
          onClose={handleCloseResultsModal}
          onRestart={handleRestartExamFromModal}
        />
      )}
      
      {isMobilePanelOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobilePanelOpen(false)}>
            <div className="fixed inset-y-0 left-0 w-64 sm:w-72 bg-white shadow-xl p-4 z-50 transform transition-transform duration-300 ease-in-out" 
                 style={{ transform: isMobilePanelOpen ? 'translateX(0)' : 'translateX(-100%)' }}
                 onClick={e => e.stopPropagation()}>
                 <QuestionPanel
                    questions={questions}
                    currentQuestionIndex={currentQuestionIndex}
                    answers={answers}
                    flaggedQuestions={flaggedQuestions}
                    onQuestionClick={handleQuestionClick} 
                    onFlagToggleByIndex={handleFlagToggleByIndex}
                    examMode={examMode}
                    onFinishPracticeExam={() => {
                        handleFinishExam(false);
                        setIsMobilePanelOpen(false);
                    }}
                 />
            </div>
         </div>
      )}

      <ExamHeader
        examMode={examMode}
        timeLeft={timeLeft}
        onToggleExamMode={handleToggleExamMode}
        totalQuestions={questions.length}
        answeredQuestions={Object.keys(answers).length}
        onOpenMobilePanel={() => setIsMobilePanelOpen(true)}
        examDetails={examDetails}
      />
      
      {examMode && (
        <div className="bg-yellow-100 border-b border-yellow-300 text-yellow-700 px-4 py-2 text-sm text-center">
          <Clock size={14} className="inline mr-1.5 align-middle" />
          Exam Mode Active. Time: {formatTime(timeLeft)}. Answer all questions to finish.
        </div>
      )}

      <main className="flex-grow container mx-auto p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">
          <div className="hidden lg:block lg:w-1/4 xl:w-1/5 flex-shrink-0">
            <QuestionPanel
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              answers={answers}
              flaggedQuestions={flaggedQuestions}
              onQuestionClick={handleQuestionClick}
              onFlagToggleByIndex={handleFlagToggleByIndex}
              examMode={examMode}
              onFinishPracticeExam={() => handleFinishExam(false)}
            />
          </div>

          <div className="flex-grow min-w-0"> 
            {currentQuestion && (
              <QuestionDisplay
                question={currentQuestion}
                selectedAnswer={answers[currentQuestionIndex]}
                onAnswerSelect={handleAnswerSelect}
                onGetHint={handleGetHint}
                onGetExplanation={handleGetExplanation}
                showExplanation={showExplanation}
                examMode={examMode}
                totalQuestions={questions.length}
                currentQuestionNumber={currentQuestionIndex + 1}
                explanationLoading={explanationLoading}
                progress={questionProgress}
              />
            )}
          </div>
        </div>
      </main>

      <FooterNav
        onPrevious={handlePrevious}
        onNext={handleNext}
        showPrevious={currentQuestionIndex > 0}
        showNext={currentQuestionIndex < questions.length - 1} 
        examMode={examMode}
        onSubmitExam={() => handleFinishExam(false)}
      />
    </div>
  );
};
