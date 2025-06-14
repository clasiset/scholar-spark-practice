
import React, { useState, useEffect, useRef } from 'react';

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
        .quiz-container {
            display: flex;
            height: calc(100vh - 4rem);
            max-height: 800px;
        }
        .question-nav-panel {
            display: flex;
            flex-direction: column;
        }
        .question-nav-item {
            transition: all 0.2s ease-in-out;
            border: 2px solid #d1d5db; /* gray-300 */
        }
        .question-nav-item.active {
            background-color: #6d28d9; /* Darker violet for consistency */
            color: white;
            border-color: #6d28d9;
            transform: scale(1.1);
        }
        .question-nav-item.answered {
            border-color: #22c55e; /* green-500 */
            color: #16a34a; /* green-600 */
        }
        .question-nav-item.answered.active {
            background-color: #6d28d9; /* Darker violet */
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
            width: 130px; /* Adjusted width for text */
            height: 40px;
            background-color: #6d28d9; /* Darker violet */
            border-radius: 20px;
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
            background-color: #6d28d9; /* Darker violet */
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 20px; /* Same as switch for full rounding */
            display: flex; /* Use flexbox for label positioning */
            align-items: center;
            justify-content: space-around; /* Distribute labels */
            color: white; /* Default text color for labels */
            font-weight: 600;
            font-size: 0.875rem; /* text-sm */
        }
        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 32px;
            width: 60px; /* Slightly less than half of the width, adjusted */
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 16px; /* Half of height for rounded thumb */
        }
        input:checked + .toggle-slider {
            background-color: #6d28d9; /* Darker violet */
        }
        input:focus + .toggle-slider {
            box-shadow: 0 0 1px #6d28d9;
        }
        input:checked + .toggle-slider:before {
            -webkit-transform: translateX(62px);
            -ms-transform: translateX(62px);
            transform: translateX(62px);
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
            color: #d1baff; /* Lighter violet when not active */
            margin-right: -5px; /* Adjust text position */
        }
        input:checked + .toggle-slider .label-practice {
            color: #d1baff; /* Gray out Practice when Exam is selected */
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

    return (
        <>
            <QuizStyles />
            <div className="quiz-container w-full max-w-7xl grid grid-cols-12 gap-6 p-4">
                {/* Left Panel: Question Navigation (Desktop View) */}
                <div className="hidden lg:flex col-span-3 bg-white p-6 rounded-xl shadow-lg question-nav-panel">
                    <div className="flex-grow overflow-y-auto">
                        <h3 className="text-lg font-bold mb-6">Questions</h3>
                        <div className="grid grid-cols-5 gap-4">
                            {renderNavItems()}
                        </div>
                    </div>
                    <div className="flex-shrink-0 pt-4 border-t mt-4">
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-indigo-600"></span> Current</li>
                            <li className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-green-500"></span> Answered</li>
                            <li className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-gray-300"></span> Unanswered</li>
                            <li className="flex items-center gap-2"><span className="text-red-500">⚑</span> Flagged (Long press)</li>
                        </ul>
                    </div>
                </div>

                {/* Right Panel: Main Question Content */}
                <div className="col-span-12 lg:col-span-9 bg-white p-6 md:p-8 rounded-xl shadow-lg flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                        <div className="flex items-center gap-2">
                            <label className="toggle-switch">
                                <input type="checkbox" checked={!isPracticeMode} onChange={() => setIsPracticeMode(!isPracticeMode)} />
                                <span className="toggle-slider">
                                    <span className="label-practice">Practice</span>
                                    <span className="label-exam">Exam</span>
                                </span>
                            </label>
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

                    <div className="flex justify-between items-center border-t pt-4 mt-6 gap-4">
                        <button 
                            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-2 transition-colors" style={{backgroundColor: '#6d28d9'}}
                            onClick={() => {
                                setShowMobileNav(true);
                            }}
                        >
                            {showAllMobileQuestions ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                            )}
                        </button>
                        {isPracticeMode && (
                            <button
                                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition-colors" style={{backgroundColor: '#6d28d9'}}
                                onClick={() => setInfoModal({ show: true, message: currentQuestion.hint || "No hint available." })}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                                Need a hint?
                            </button>
                        )}
                        {showPracticeFeedback && (
                             <button
                                className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors" style={{backgroundColor: '#6d28d9'}}
                                onClick={() => setInfoModal({ show: true, message: `The correct answer is: ${currentQuestion.answer}` })}
                             >
                                 Get Explanation
                             </button>
                        )}
                        
                        <button
                            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" style={{backgroundColor: '#6d28d9'}}
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                            disabled={isFirstQuestion}
                        >
                            Previous
                        </button>
                        <button
                            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors" style={{backgroundColor: '#6d28d9'}}
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                            disabled={isLastQuestion}
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Mobile Question Navigation Modal */}
                <div className={`modal ${showMobileNav ? 'show' : ''}`}>
                    <div className="modal-content">
                        <h3 className="text-lg font-bold mb-4 border-b pb-3">Questions</h3>
                        <p className="text-xs text-gray-500 mb-4">Click to navigate. Long press to flag.</p>
                        <div className="grid grid-cols-5 gap-3">
                           {renderNavItems(true)}
                        </div>
                        <button 
                            className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 mt-6 transition-colors" style={{backgroundColor: '#6d28d9'}}
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
                            className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors" style={{backgroundColor: '#6d28d9'}}
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
