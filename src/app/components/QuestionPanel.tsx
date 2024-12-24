'use client'

import { useState } from 'react'

const questions = [
  {
    question: 'What is "Hello" in Yoruba?',
    options: ['Pẹlẹ o', 'Bawo ni', 'Odabo', 'Jọwọ'],
    correctAnswer: 'Pẹlẹ o',
  },
  {
    question: 'How do you say "Thank you" in Yoruba?',
    options: ['Jọwọ', 'Pẹlẹ o', 'Ẹ ṣeun', 'Odabo'],
    correctAnswer: 'Ẹ ṣeun',
  },
{
    question: 'What is "Goodbye" in Yoruba?',
    options: ['Bawo ni', 'Odabo', 'Pẹlẹ o', 'Ẹ ṣeun'],
    correctAnswer: 'Odabo',
},
{
    question: 'How do you say "Please" in Yoruba?',
    options: ['Jọwọ', 'Pẹlẹ o', 'Odabo', 'Ẹ ṣeun'],
    correctAnswer: 'Jọwọ',
},
]

interface QuestionPanelProps {
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuestionPanel({ onAnswer }: QuestionPanelProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer
      onAnswer(isCorrect)
      setSelectedAnswer(null)
      setCurrentQuestion((prev) => (prev + 1) % questions.length)
    }
  }

  return (
    <div className="w-full max-w-4xl mt-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{questions[currentQuestion].question}</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(option)}
            className={`p-4 text-lg font-semibold rounded-lg transition-colors ${
              selectedAnswer === option
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={selectedAnswer === null}
        className="w-full p-4 text-xl font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Submit Answer
      </button>
    </div>
  )
}

