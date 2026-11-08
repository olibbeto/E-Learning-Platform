'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Flag, CheckCircle2 } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

const mockQuiz: Quiz = {
  id: '1',
  title: 'React Fundamentals Quiz',
  questions: [
    { id: 'q1', text: 'What is the hook used to manage state in a functional component?', options: ['useEffect', 'useReducer', 'useState', 'useContext'], correctIndex: 2, explanation: 'useState is the primary hook for managing state.' },
    { id: 'q2', text: 'Which method is called right after a component is mounted in class components?', options: ['componentDidMount', 'componentWillUnmount', 'render', 'constructor'], correctIndex: 0, explanation: 'componentDidMount is called after the component is rendered to the DOM.' },
    { id: 'q3', text: 'What does JSX stand for?', options: ['JavaScript XML', 'JSON XML', 'JavaScript Syntax Extension', 'Java XML'], correctIndex: 0, explanation: 'JSX stands for JavaScript XML.' },
  ]
};

function useApp() {
  const saveQuizResult = (id: string, result: any) => {
    console.log('Saved quiz result:', result);
  };
  return { getQuiz: (id: string) => mockQuiz, saveQuizResult };
}

export default function QuizPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { getQuiz, saveQuizResult } = useApp();
  
  const quiz = getQuiz(id);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quiz?.questions.length || 0).fill(-1));
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [showModal, setShowModal] = useState(false);

  if (!quiz) return <div className="min-h-screen bg-[#081726] text-white p-8">Quiz not found</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const answeredCount = selectedAnswers.filter(a => a !== -1).length;

  const handleOptionSelect = (optIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optIndex;
    setSelectedAnswers(newAnswers);
  };

  const toggleFlag = () => {
    const newFlags = new Set(flaggedQuestions);
    if (newFlags.has(currentQuestionIndex)) {
      newFlags.delete(currentQuestionIndex);
    } else {
      newFlags.add(currentQuestionIndex);
    }
    setFlaggedQuestions(newFlags);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowModal(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = () => {
    saveQuizResult(id, { selectedAnswers, flaggedQuestions: Array.from(flaggedQuestions) });
    router.push(`/quiz/${id}/results`);
  };

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans">
      {/* Top bar */}
      <div className="bg-[#0A1926] border-b border-[#102C40] px-4 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-lg">
        <button onClick={() => router.back()} className="text-white/60 hover:text-white font-medium text-xs flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-sm font-bold text-white truncate mx-4">{quiz.title}</h1>
        <div className="text-xs font-mono text-[#D8FF00] shrink-0 bg-[#D8FF00]/10 px-2.5 py-1 rounded-full border border-[#D8FF00]/20">
          -- min remaining
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-white/10 h-1">
        <div 
          className="bg-[#D8FF00] h-1 transition-all duration-300 shadow-[0_0_8px_rgba(216,255,0,0.6)]" 
          style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
        />
      </div>

      <main className="flex-1 max-w-3xl w-full mx-auto py-8 px-4 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-medium text-white/50">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <button 
            onClick={toggleFlag}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
              flaggedQuestions.has(currentQuestionIndex) ? 'text-amber-400' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Flag className="w-3.5 h-3.5" fill={flaggedQuestions.has(currentQuestionIndex) ? 'currentColor' : 'none'} />
            {flaggedQuestions.has(currentQuestionIndex) ? 'Flagged' : 'Flag Question'}
          </button>
        </div>

        {/* Question Area */}
        <div className="bg-[#0D2232] rounded-2xl border border-[#102C40] p-6 sm:p-8 flex-1 shadow-xl">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-6 leading-relaxed">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected 
                      ? 'border-[#D8FF00] bg-[#D8FF00]/10 shadow-[0_0_15px_rgba(216,255,0,0.15)]' 
                      : 'border-[#102C40] bg-[#0A1926]/60 hover:border-white/20 hover:bg-[#0A1926]'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 shrink-0 ${
                      isSelected ? 'border-[#D8FF00] bg-[#D8FF00]' : 'border-white/30'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>
                    <span className={`text-sm ${isSelected ? 'text-white font-semibold' : 'text-white/80'}`}>
                      {opt}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <button 
            onClick={handlePrev} 
            disabled={currentQuestionIndex === 0}
            className="px-5 py-2.5 border border-[#102C40] rounded-xl text-xs font-semibold text-white/70 bg-[#0D2232] hover:bg-[#102C40] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <div className="hidden sm:flex space-x-2">
            {quiz.questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== -1;
              const isFlagged = flaggedQuestions.has(idx);
              const isCurrent = currentQuestionIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isCurrent ? 'ring-2 ring-[#D8FF00] ring-offset-2 ring-offset-[#081726]' : ''
                  } ${
                    isFlagged ? 'bg-amber-400' : isAnswered ? 'bg-[#D8FF00]' : 'bg-white/20'
                  }`}
                  aria-label={`Go to question ${idx + 1}`}
                />
              );
            })}
          </div>

          <button 
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-black bg-[#D8FF00] hover:bg-[#cbf200] shadow-[0_0_20px_rgba(216,255,0,0.3)] transition-colors"
          >
            {isLastQuestion ? 'Submit Quiz' : 'Next'}
          </button>
        </div>
      </main>

      {/* Submit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0D2232] border border-[#102C40] rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Ready to Submit?</h3>
            <p className="text-xs text-white/70 mb-4">
              You answered <span className="font-bold text-[#D8FF00]">{answeredCount}</span> of <span className="font-bold text-white">{quiz.questions.length}</span> questions.
            </p>
            {flaggedQuestions.size > 0 && (
              <p className="text-xs text-amber-300 mb-4">
                You have {flaggedQuestions.size} flagged question{flaggedQuestions.size > 1 ? 's' : ''}.
              </p>
            )}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-medium text-white/60 hover:text-white"
              >
                Review Answers
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#D8FF00] hover:bg-[#cbf200] text-black font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(216,255,0,0.3)]"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
