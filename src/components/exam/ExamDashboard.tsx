import React, { useState, useEffect, useRef } from 'react';
import { List, Clock } from 'lucide-react';

const questions = [
    { text: "The weather outside was extremely pleasant and hence we decided to ________.", options: ["employ this rare opportunity for writing letters", "enjoy a morning ride in the open", "refrain from going out for a morning walk", "utilize our time watching the television"], answer: "enjoy a morning ride in the open", hint: "Think about what people do in pleasant weather." },
    { text: "Which HTML tag is used to define an internal style sheet?", options: ["<script>", "<css>", "<style>", "<link>"], answer: "<style>", hint: "This tag is placed inside the <head> section." },
    { text: "What is the correct syntax for referring to an external script called 'xxx.js'?", options: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"], answer: "<script src='xxx.js'>", hint: "It's an attribute that specifies the source URL." },
    { text: "Which company developed JavaScript?", options: ["Microsoft", "Netscape", "Sun Microsystems", "Oracle"], answer: "Netscape", hint: "It was created by Brendan Eich at this company in 1995."},
    { text: "Question 5", options: ["A", "B", "C", "D"], answer: "A", hint: "Hint for Q5"}, { text: "Question 6", options: ["A", "B", "C", "D"], answer: "A", hint: "Hint for Q6"},
    { text: "Question 7", options: ["A", "B", "C", "D"], answer: "A", hint: "Hint for Q7"}, { text: "Question 8", options: ["A", "B", "C", "D"], answer: "A", hint: "Hint for Q8"},
    { text: "Question 9", options: ["A", "B", "C", "D"], answer: "A", hint: "Hint for Q9"}, { text: "Question 10", options: ["A", "B", "C", "D"], answer: "A", hint: "Hint for Q10"},
];

const QuizStyles = () => (
    <style>{`
        .question-nav-panel {
            display: flex;
            flex-direction: column;
        }
        .question-nav-item {
            transition: all 0.2s ease-in-out;
            border: 2px solid #d1d5db; /* gray-300 */
        }
        .question-nav-item.active {
            background-color: #4f46e5; /* indigo-600 */
            color: white;
            border-color: #4f46e5; /* indigo-600 */
            transform: scale(1.1);
        }
        .question-nav-item.answered {
            border-color: #22c55e; /* green-500 */
            color: #16a34a; /* green-600 */
        }
        .question-nav-item.answered.active {
            background-color: #4f46e5; /* indigo-600 */
            color: white;
        }
        .question-nav-item.flagged {
            position: relative;
        }
        .question-nav-item.flagged::after {
            content: '⚑';
            color: #ef4444; /* red-500 */
            position: absolute;
            top: -8px;
            right: -8px;
            font-size: 1rem;
            background: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
        }
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 50; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgba(0,0,0,0.5); /* Black w/ opacity */
            align-items: center; /* Center content vertically */
            justify-content: center; /* Center content horizontally */
        }
        .modal.show {
            display: flex;
        }
        .modal-content {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 90%;
            max-width: 500px;
            border-radius: 0.5rem;
            text-align: center;
        }
        .correct-answer {
            background-color: #dcfce7 !important; /* green-100 */
            border-color: #22c55e !important; /* green-500 */
        }
        .incorrect-answer {
            background-color: #fee2e2 !important; /* red-100 */
            border-color: #ef4444 !important; /* red-500 */
        }
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 110px; /* Adjusted width for text */
            height: 38px;
            background-color: #4f46e5; /* indigo-600 */
            border-radius: 19px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #4f46e5; /* indigo-600 */
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 19px; /* Same as switch for full rounding */
            display: flex; /* Use flexbox for label positioning */
            align-items: center;
            justify-content: space-around; /* Distribute labels */
            color: white; /* Default text color for labels */
            font-weight: 600;
            font-size: 0.8rem; /* text-sm */
        }
        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 30px;
            width: 52px; /* Slightly less than half of the width, adjusted */
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 15px; /* Half of height for rounded thumb */
        }
        input:checked + .toggle-slider {
            background-color: #4f46e5; /* indigo-600 */
        }
        input:focus + .toggle-slider {
            box-shadow: 0 0 1px #4f46e5;
        }
        input:checked + .toggle-slider:before {
            -webkit-transform: translateX(54px);
            -ms-transform: translateX(54px);
            transform: translateX(54px);
        }
        .toggle-slider .label-practice,
        .toggle-slider .label-exam {
            position: relative; /* Needed for z-index */
            z-index: 1; /* Ensure labels are above the moving thumb */
            transition: color 0.4s; /* Smooth color transition */
        }
        .toggle-slider .label-practice {
            color: white; /* Active color when Practice is selected */
            margin-left: -5px; /* Adjust text position */
        }
        .toggle-slider .label-exam {
            color: #a5b4fc; /* indigo-300 when not active */
            margin-right: -5px; /* Adjust text position */
        }
        input:checked + .toggle-slider .label-practice {
            color: #a5b4fc; /* Gray out Practice when Exam is selected */
        }
        input:checked + .toggle-slider .label-exam {
            color: white; /* Lighten Exam when Exam is selected */
        }
    `}</style>
);

export const ExamDashboard = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(null));
    const [flaggedQuestions, setFlaggedQuestions] = useState(new Array(questions.length).fill(false));
    const [isPracticeMode, setIsPracticeMode] = useState(true);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [showAllMobileQuestions, setShowAllMobileQuestions] = useState(false);
    const [infoModal, setInfoModal] = useState({ show: false, message: '' });
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes for the exam
    const timerRef = useRef<NodeJS.Timeout>();

    const longPressTimer = useRef<NodeJS.Timeout>();

    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];

    const handleAnswerSelect = (option: string) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = option;
        setUserAnswers(newAnswers);
    };

    const handleFlagToggle = (index: number) => {
        const newFlags = [...flaggedQuestions];
        newFlags[index] = !newFlags[index];
        setFlaggedQuestions(newFlags);
        setInfoModal({ show: true, message: `Question ${index + 1} has been ${newFlags[index] ? 'flagged' : 'unflagged'}.` });
    };

    const startLongPress = (index: number) => {
        longPressTimer.current = setTimeout(() => {
            handleFlagToggle(index);
        }, 500);
    };

    const cancelLongPress = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
        }
    };
    
    const renderNavItems = (isMobile = false) => {
        const createNavItem = (index: number) => {
            const isAnswered = userAnswers[index] !== null;
            const isFlagged = flaggedQuestions[index];
            const isActive = index === currentQuestionIndex;
            return (
                <button
                    key={index}
                    className={`question-nav-item w-10 h-10 flex items-center justify-center font-semibold rounded-full hover:bg-gray-200 ${isActive ? 'active' : ''} ${isAnswered ? 'answered' : ''} ${isFlagged ? 'flagged' : ''}`}
                    onClick={() => {
                        setCurrentQuestionIndex(index);
                        if (isMobile) {
                            setShowMobileNav(false);
                            setShowAllMobileQuestions(false);
                        }
                    }}
                    onMouseDown={() => startLongPress(index)}
                    onTouchStart={() => startLongPress(index)}
                    onMouseUp={cancelLongPress}
                    onMouseLeave={cancelLongPress}
                    onTouchEnd={cancelLongPress}
                >
                    {index + 1}
                </button>
            )
        };
        
        if (isMobile && !showAllMobileQuestions) {
            const items = [];
            if (currentQuestionIndex > 0) {
                items.push(createNavItem(currentQuestionIndex - 1));
            }
            items.push(createNavItem(currentQuestionIndex));
            return items;
        } else {
            return questions.map((_, i) => createNavItem(i));
        }
    };

    const showPracticeFeedback = userAnswer !== null && isPracticeMode;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;

    useEffect(() => {
        if (!isPracticeMode) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current!);
                        setInfoModal({ show: true, message: "Time's up! The exam has ended." });
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isPracticeMode]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <QuizStyles />
            <div className="w-full flex flex-col lg:flex-row justify-center p-4 gap-8">
                {/* Desktop Question Nav */}
                <div className="hidden lg:flex flex-col w-72 bg-white p-6 rounded-xl shadow-lg sticky top-24">
                     <h3 className="text-lg font-bold mb-4 border-b pb-3 text-gray-800">Questions</h3>
                     <div className="grid grid-cols-5 gap-3">
                        {renderNavItems(false)}
                     </div>
                     <div className="mt-6 border-t pt-4 space-y-3 text-sm text-gray-600">
                        <div className="flex items-center">
                            <span className="w-4 h-4 rounded-full mr-3 flex-shrink-0 bg-indigo-600"></span>
                            <span>Current</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-4 h-4 rounded-full border-2 border-green-500 mr-3 flex-shrink-0"></span>
                            <span>Answered</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0"></span>
                            <span>Unanswered</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-red-500 mr-2 text-xl" style={{lineHeight: 1}}>⚑</span>
                            <span>Flagged (Long press)</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="w-full max-w-4xl bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <button
                                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                                onClick={() => {
                                    setShowMobileNav(true);
                                    setShowAllMobileQuestions(true);
                                }}
                                title="View all questions"
                            >
                                <List className="h-6 w-6 text-gray-700" />
                            </button>
                            <h2 className="text-base sm:text-xl font-semibold text-gray-800">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            {!isPracticeMode && (
                                <div className="flex items-center text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-md">
                                    <Clock size={16} className="mr-2" />
                                    <span>{formatTime(timeLeft)}</span>
                                </div>
                            )}
                            <div className="flex items-center">
                                <label className="toggle-switch">
                                    <input type="checkbox" checked={!isPracticeMode} onChange={() => setIsPracticeMode(!isPracticeMode)} />
                                    <span className="toggle-slider">
                                        <span className="label-practice">Practice</span>
                                        <span className="label-exam">Exam</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow">
                        <p className="text-lg text-gray-700 mb-6">{currentQuestion.text}</p>
                        <div className="space-y-4">
                            {currentQuestion.options.map((option, i) => {
                                const optionLetter = String.fromCharCode(65 + i);
                                const isSelected = userAnswer === option;
                                const isCorrect = currentQuestion.answer === option;

                                let labelClass = "flex items-center gap-4 w-full p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50";
                                if (isSelected) labelClass += " bg-indigo-100 border-indigo-500";
                                if (showPracticeFeedback) {
                                    if(isCorrect) labelClass += " correct-answer";
                                    else if(isSelected) labelClass += " incorrect-answer";
                                }
                                
                                return (
                                    <div key={i}>
                                        <input
                                            type="radio"
                                            id={`q${currentQuestionIndex}_${i}`}
                                            name={`question${currentQuestionIndex}`}
                                            value={option}
                                            className="hidden peer"
                                            checked={isSelected}
                                            onChange={() => handleAnswerSelect(option)}
                                            disabled={showPracticeFeedback}
                                        />
                                        <label htmlFor={`q${currentQuestionIndex}_${i}`} className={labelClass}>
                                            <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 rounded-full font-semibold text-gray-500 ${isSelected ? 'bg-indigo-600 text-white border-indigo-600' : ''}`}>
                                                {optionLetter}
                                            </span>
                                            <span className="text-gray-700">{option}</span>
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end items-center border-t pt-4 mt-6 gap-4">
                        {isPracticeMode && (
                            <button
                                className="text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                                onClick={() => setInfoModal({ show: true, message: currentQuestion.hint || "No hint available." })}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                                Need a hint?
                            </button>
                        )}
                        {showPracticeFeedback && (
                             <button
                                className="text-white font-semibold py-2 px-4 rounded-lg transition-colors bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                                onClick={() => setInfoModal({ show: true, message: `The correct answer is: ${currentQuestion.answer}` })}
                             >
                                 Get Explanation
                             </button>
                        )}
                        
                        <div className="flex gap-4">
                            <button
                                className="text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                                disabled={isFirstQuestion}
                            >
                                Previous
                            </button>
                            <button
                                className="text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                                disabled={isLastQuestion}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* Question Navigation Modal */}
                <div className={`modal ${showMobileNav ? 'show' : ''}`}>
                    <div className="modal-content">
                        <h3 className="text-lg font-bold mb-4 border-b pb-3">Questions</h3>
                        <p className="text-xs text-gray-500 mb-4">Click to navigate. Long press to flag.</p>
                        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-3">
                           {renderNavItems(true)}
                        </div>
                        <button 
                            className="text-white font-bold py-2 px-6 rounded-lg mt-6 transition-colors bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                            onClick={() => {
                                setShowMobileNav(false);
                                setShowAllMobileQuestions(false);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>

                {/* General Information Modal */}
                <div className={`modal ${infoModal.show ? 'show' : ''}`}>
                    <div className="modal-content">
                        <p className="mb-4">{infoModal.message}</p>
                        <button
                            className="text-white font-bold py-2 px-6 rounded-lg transition-colors bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                            onClick={() => setInfoModal({ show: false, message: '' })}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExamDashboard;
