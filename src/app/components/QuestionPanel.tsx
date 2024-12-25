/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { questions } from "@/lib/questions";
import { useState } from "react";

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

  const [answeredQuestions, setAnsweredQuestions] = useState<{
    [key: number]: string;
  }>({});

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect =
        selectedAnswer === questions[currentQuestion].correctAnswer;
      setAnsweredQuestions((prev) => ({
        ...prev,
        [currentQuestion]: selectedAnswer,
      }));
      console.log(selectedAnswer);
      console.log(answeredQuestions);
      
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }
  };

  return (
    <div className="w-full max-w-4xl mt-6 bg-white p-6 rounded-lg shadow-md ">
      <div className="flex gap-2 mb-4">
        {questionBank.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${
              currentQuestion in answeredQuestions
            ? answeredQuestions[index] === questionBank[index].correctAnswer
              ? "bg-green-500"
              : "bg-red-500"
            : "bg-gray-200"
            }`}
          />
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
        className={`w-full p-4 text-xl border-2 font-bold text-white border-b-4 disabled:border-gray-400 border-green-600 hover:border-green-700 bg-green-500 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors transition ease-in-out ${
          selectedAnswer !== null ? "active:transform active:scale-95" : ""
        }`}
      >
        Submit Answer
      </button>
    </div>
  );
}
