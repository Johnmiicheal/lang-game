/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { questions } from "@/lib/questions";
import { useState, useEffect } from "react";
import { DefeatModal } from "./GameScene";

interface QuestionPanelProps {
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuestionPanel({ onAnswer }: QuestionPanelProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const getRandomItems = (arr: any[], count: number = 5) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const [questionBank] = useState(getRandomItems(questions, 5));
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState(questionBank.map(() => null))

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect: any =
        selectedAnswer === questionBank[currentQuestion].correctAnswer;
        setAnswers(prev => {
          const newAnswers = [...prev]
          newAnswers[currentQuestion] = isCorrect
          return newAnswers
        })
      console.log(selectedAnswer);
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }
  };
 const [showDefeatModal, setShowDefeatModal] = useState(false);
  useEffect(() => {
    if (currentQuestion > questionBank.length - 1 && answers.some(answer => answer === false)) {
      setShowDefeatModal(true);
    }
  }, [currentQuestion, answers]);
  
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return "Are you sure you want to leave?";
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mt-6 bg-white p-6 rounded-lg shadow-md ">
        {showDefeatModal && (
            <DefeatModal onReplay={() => {
                window.location.reload();
              }} />
        )}
<div className="flex justify-center space-x-2 mb-4">
      {answers.map((answer, index) => (
        <div
          key={index}
          className={`w-full h-3 rounded-full ${
            index === currentQuestion
              ? 'bg-sky-500'
              : answer === null
              ? 'bg-gray-300'
              : answer
              ? 'bg-green-500'
              : 'bg-red-500'
          }`}
        ></div>
      ))}
    </div>
      <h2 className="text-2xl font-bold mb-8 text-black">
        {questionBank[currentQuestion]?.question}
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {questionBank[currentQuestion]?.options.map(
          (option: any, index: any) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              className={`p-4 w-full text-lg border-b-4 border-2 active:transform active:scale-95 transition ease border-gray-300 font-semibold rounded-[8px] transition-colors ${
                selectedAnswer === option
                  ? "bg-sky-500 text-white border-sky-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:border-gray-400"
              }`}
            >
              {option}
            </button>
          )
        )}
      </div>
      <button
        onClick={handleSubmit}
        disabled={selectedAnswer === null}
        className={`w-full p-4 text-xl border-2 font-bold text-white border-b-4 disabled:opacity-30 border-green-600 hover:border-green-700 bg-green-500 rounded-lg hover:bg-green-600 disabled:cursor-not-allowed transition-colors transition ease-in-out ${
          selectedAnswer !== null ? "active:transform active:scale-95" : ""
        }`}
      >
        Submit Answer
      </button>
    </div>
  );
}
