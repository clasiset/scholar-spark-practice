
import React, { useState, useEffect, useCallback } from 'react';
import BackButton from './BackButton';
import { ExamHeader } from './exam/ExamHeader';
import { QuestionDisplay } from './exam/QuestionDisplay';
import { QuestionPanel } from './exam/QuestionPanel';
import { FooterNav } from './exam/FooterNav';
import { dummyQuestions } from './exam/dummyQuestions';
import { ExamCompletedModal } from './exam/ExamCompletedModal';
import { toast } from "sonner";

interface ExamPageProps {
  navigate?: (page: any, data?: any) => void;
  examDetails?: any;
  goBack?: () => void;
  previousPageName?: string | null;
}

const ExamPage: React.FC<ExamPageProps> = ({ navigate, examDetails, goBack, previousPageName }) => {
    const questions = dummyQuestions;
    const [examMode, setExamMode] = useState(false);
    const EXAM_DURATION = 3600; // 60 minutes
    const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
    const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
    const [explanationLoading, setExplanationLoading] = useState(false);
    const [isExamFinished, setIsExamFinished] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const resetExam = useCallback(() => {
        setExamMode(false);
        setTimeLeft(EXAM_DURATION);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setFlaggedQuestions([]);
        setShowExplanations({});
        setIsExamFinished(false);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (examMode && timeLeft > 0 && !isExamFinished) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && examMode && !isExamFinished) {
            toast.info("Time's up! Your exam has been submitted automatically.");
            handleExamSubmit();
        }
        return () => clearInterval(timer);
    }, [examMode, timeLeft, isExamFinished]);

    const handleToggleExamMode = () => {
        if (!examMode) {
            if (window.confirm("Are you sure you want to start the exam? You will have 60 minutes to complete it.")) {
                resetExam();
                setExamMode(true);
            }
        } else {
            if (window.confirm("Are you sure you want to exit exam mode? The timer will stop and your progress will be cleared.")) {
                resetExam();
            }
        }
    };

    const handleExamSubmit = () => {
        setExamMode(false);
        setIsExamFinished(true);
    };

    const handleAnswerSelect = (optionId: string) => {
        setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionId }));
        if (examMode) {
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    handleNext();
                } else {
                    handleExamSubmit();
                    toast.success("You've completed the last question! Exam submitted.");
                }
            }, 300);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };
    
    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };
    
    const handleQuestionSelect = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    const handleFlagToggle = (questionIndex: number) => {
        setFlaggedQuestions(prev =>
            prev.includes(questionIndex)
                ? prev.filter(i => i !== questionIndex)
                : [...prev, questionIndex]
        );
    };

    const handleGetHint = () => {
        if(currentQuestion.hint) {
            toast.info(currentQuestion.hint);
        } else {
            toast.info("No hint available for this question.");
        }
    };

    const handleGetExplanation = () => {
        if (showExplanations[currentQuestionIndex] || examMode) return;

        setExplanationLoading(true);
        setTimeout(() => {
            setShowExplanations(prev => ({ ...prev, [currentQuestionIndex]: true }));
            setExplanationLoading(false);
        }, 1000);
    };

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const score = Object.entries(selectedAnswers).reduce((acc, [qIndex, ans]) => {
        return questions[parseInt(qIndex)].correctAnswer === ans ? acc + 1 : acc;
    }, 0);
    const totalAnswered = Object.keys(selectedAnswers).length;
    const incorrectAnswers = totalAnswered - score;

    return (
        <>
            <div className="bg-gray-50 min-h-screen flex flex-col">
                <div className="container mx-auto px-4 md:px-6 py-4">
                  <BackButton onClick={goBack} previousPageName={previousPageName} />
                </div>
                <ExamHeader
                    examMode={examMode}
                    timeLeft={timeLeft}
                    onToggleExamMode={handleToggleExamMode}
                    totalQuestions={questions.length}
                    answeredQuestions={Object.keys(selectedAnswers).length}
                    onOpenMobilePanel={() => {}}
                    examDetails={examDetails}
                />
                <main className="container mx-auto p-4 lg:p-8 flex-grow">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
                            <QuestionPanel
                                questions={questions}
                                currentQuestionIndex={currentQuestionIndex}
                                answers={selectedAnswers}
                                flaggedQuestions={flaggedQuestions}
                                onQuestionClick={handleQuestionSelect}
                                onFlagToggleByIndex={handleFlagToggle}
                                examMode={examMode}
                                onFinishPracticeExam={handleExamSubmit}
                            />
                        </div>
                        <div className="flex-grow lg:w-3/4 xl:w-4/5">
                            <QuestionDisplay
                                question={currentQuestion}
                                selectedAnswer={selectedAnswers[currentQuestionIndex]}
                                onAnswerSelect={handleAnswerSelect}
                                onGetHint={handleGetHint}
                                onGetExplanation={handleGetExplanation}
                                showExplanation={showExplanations[currentQuestionIndex]}
                                examMode={examMode}
                                totalQuestions={questions.length}
                                currentQuestionNumber={currentQuestionIndex + 1}
                                explanationLoading={explanationLoading}
                                progress={progress}
                            />
                        </div>
                    </div>
                </main>
                <FooterNav
                    onPrevious={handlePrev}
                    onNext={handleNext}
                    showPrevious={currentQuestionIndex > 0}
                    showNext={currentQuestionIndex < questions.length - 1}
                    onSubmitExam={handleExamSubmit}
                    examMode={examMode}
                />
            </div>
            {isExamFinished && (
                <ExamCompletedModal
                    onClose={() => { setIsExamFinished(false); }}
                    score={score}
                    correct={score}
                    incorrect={incorrectAnswers}
                    total={totalAnswered}
                    onRestart={resetExam}
                />
            )}
        </>
    );
};

export default ExamPage;
