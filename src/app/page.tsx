'use client'

import { useState } from 'react'
import CharacterSelection, { Character } from './components/CharacterSelection'
import GameScene from './components/GameScene'
import QuestionPanel from './components/QuestionPanel'


export default function YorubaFighter() {
  const [gameState, setGameState] = useState({
    playerCharacter: { id: '', name: '', difficulty: '' },
    opponentCharacter: { id: '', name: '', difficulty: '' },
    playerHealth: 100,
    opponentHealth: 100,
    currentQuestion: null,
    gameStarted: false,
  })

  const startGame = (character: Character) => {
    setGameState({
      ...gameState,
      playerCharacter: character,
      opponentCharacter: getRandomOpponent(),
      gameStarted: true,
    })
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setGameState({
        ...gameState,
        opponentHealth: Math.max(0, gameState.opponentHealth - 20),
      })
    } else {
      setGameState({
        ...gameState,
        playerHealth: Math.max(0, gameState.playerHealth - 10),
      })
    }
    // Here we would also set a new question
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!gameState.gameStarted ? (
        <CharacterSelection onSelect={startGame} />
      ) : (
        <>
          <GameScene
            playerCharacter={gameState.playerCharacter!}
            opponentCharacter={gameState.opponentCharacter!}
            playerHealth={gameState.playerHealth}
            opponentHealth={gameState.opponentHealth}
          />
          <QuestionPanel onAnswer={handleAnswer} />
        </>
      )}
    </div>
  )
}

function getRandomOpponent() {
  const opponents = [
    { id: 'easy', name: 'Ade', difficulty: 'Easy' },
    { id: 'medium', name: 'Bola', difficulty: 'Medium' },
    { id: 'hard', name: 'Chike', difficulty: 'Hard' },
  ]
  return opponents[Math.floor(Math.random() * opponents.length)]
}

