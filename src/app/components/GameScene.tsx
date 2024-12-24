import React, { useState, useEffect, JSX } from 'react'
import Ade from './characters/Ade'
import Bola from './characters/Bola'
import Chike from './characters/Chike'
import { Character } from './CharacterSelection'

const characterComponents: { [key: string]: ({ isAttacking }: { isAttacking?: boolean }) => JSX.Element } = {
  Ade,
  Bola,
  Chike,
}


interface GameSceneProps {
  playerCharacter: Character;
  opponentCharacter: Character;
  playerHealth: number;
  opponentHealth: number;
}

export default function GameScene({ playerCharacter, opponentCharacter, playerHealth, opponentHealth }: GameSceneProps) {
  const [playerAttacking, setPlayerAttacking] = useState(false)
  const [opponentAttacking, setOpponentAttacking] = useState(false)

  useEffect(() => {
    const attackInterval = setInterval(() => {
      setOpponentAttacking(true)
      setTimeout(() => setOpponentAttacking(false), 500)
    }, 3000)

    return () => clearInterval(attackInterval)
  }, [])


  return (
    <div className="w-full max-w-4xl bg-blue-200 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <HealthBar health={playerHealth} isPlayer={true} />
        <HealthBar health={opponentHealth} isPlayer={false} />
      </div>
      <div className="flex justify-between items-end">
        <div className="transform scale-x-[-1]">
          <CharacterSprite character={playerCharacter} isAttacking={playerAttacking} />
        </div>
        <CharacterSprite character={opponentCharacter} isAttacking={opponentAttacking} />
      </div>
    </div>
  )
}

function HealthBar({ health, isPlayer }: { health: number; isPlayer: boolean }) {
  return (
    <div className="w-48 bg-gray-300 rounded-full h-6">
      <div
        className={`h-full rounded-full ${isPlayer ? 'bg-green-500' : 'bg-red-500'}`}
        style={{ width: `${health}%` }}
      ></div>
    </div>
  )
}

function CharacterSprite({ character, isAttacking }: { character: Character; isAttacking: boolean }) {
  const CharacterComponent = characterComponents[character.name] || Ade
  return <CharacterComponent isAttacking={isAttacking} />
}

