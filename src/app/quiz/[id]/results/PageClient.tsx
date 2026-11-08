'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Award } from 'lucide-react';

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

const mockResult = {
  selectedAnswers: [2, 1, 0],
  flaggedQuestions: [1]
};

function useApp() {
  return { 
    getQuiz: (id: string) => mockQuiz, 
    quizResults: { [mockQuiz.id]: mockResult } 
  };
}

export default function QuizResultsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { getQuiz, quizResults } = useApp();
  
  const quiz = getQuiz(id);
  const result = quizResults[id] || mockResult;

  if (!quiz || !result) return <div className="min-h-screen bg-[#081726] text-white p-8">Result not found.</div>;

  let correctCount = 0;
  quiz.questions.forEach((q, idx) => {
    if (result.selectedAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });

  const total = quiz.questions.length;
  const percentage = Math.round((correctCount / total) * 100);
  const isPass = percentage >= 70;

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans">
      <main className="flex-1 max-w-3xl w-full mx-auto py-12 px-4 sm:px-6">
        
        {/* Score Card */}
        <div className="rounded-3xl border border-[#102C40] bg-[#0D2232] p-8 text-center shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D8FF00]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="w-16 h-16 mx-auto mb-4 bg-[#D8FF00]/15 text-[#D8FF00] rounded-2xl flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h1>
          <p className="text-xs text-white/60 mb-6">{quiz.title}</p>

          <div className="text-6xl font-black text-[#D8FF00] mb-2 tracking-tight drop-shadow-[0_0_20px_rgba(216,255,0,0.4)]">
            {correctCount}/{total}
          </div>
          <p className="text-xl text-white/90 font-semibold mb-4">{percentage}%</p>

          <div className={`inline-block px-4 py-1.5 rounded-full font-bold text-xs ${
            isPass ? 'bg-[#D8FF00]/20 text-[#D8FF00] border border-[#D8FF00]/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
          }`}>
            {isPass ? 'PASSED' : 'NEEDS PRACTICE'}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => router.push(`/quiz/${id}`)}
              className="px-5 py-2.5 rounded-xl border border-[#102C40] text-xs font-semibold text-white/80 hover:bg-white/5 flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
            <Link
              href="/my-learning"
              className="px-6 py-2.5 rounded-xl bg-[#D8FF00] text-black text-xs font-semibold hover:bg-[#cbf200] flex items-center gap-2 shadow-[0_0_20px_rgba(216,255,0,0.3)] transition-colors"
            >
              Back to Learning
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <h2 className="text-lg font-bold text-white mb-4">Question Breakdown</h2>
        <div className="space-y-4">
          {quiz.questions.map((q, idx) => {
            const chosen = result.selectedAnswers[idx];
            const isCorrect = chosen === q.correctIndex;
            return (
              <div key={q.id} className="bg-[#0D2232] rounded-2xl border border-[#102C40] p-6 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-sm text-white">{idx + 1}. {q.text}</h3>
                  {isCorrect ? (
                    <span className="flex items-center gap-1 text-xs text-[#D8FF00] font-semibold shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-red-400 font-semibold shrink-0">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </span>
                  )}
                </div>

                <div className="text-xs space-y-1.5 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40">Your answer:</span>
                    <span className={isCorrect ? 'text-[#D8FF00] font-medium' : 'text-red-400 font-medium'}>
                      {chosen !== -1 ? q.options[chosen] : 'No answer'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="flex items-center gap-2">
                      <span className="text-white/40">Correct answer:</span>
                      <span className="text-[#D8FF00] font-medium">{q.options[q.correctIndex]}</span>
                    </div>
                  )}
                </div>

                {q.explanation && (
                  <p className="mt-3 p-3 bg-[#0A1926] rounded-xl text-xs text-white/60 border border-[#102C40]">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
