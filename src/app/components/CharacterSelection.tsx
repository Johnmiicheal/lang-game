import React from 'react'
import Ade from './characters/Ade'
import Bola from './characters/Bola'
import Chike from './characters/Chike'

const characters = [
  { id: 'easy', name: 'Ade', difficulty: 'Easy', Component: Ade },
  { id: 'medium', name: 'Bola', difficulty: 'Medium', Component: Bola },
  { id: 'hard', name: 'Chike', difficulty: 'Hard', Component: Chike },
]

export interface Character {
  id: string;
  name: string;
  difficulty: string;
  Component?: React.ComponentType;
}

interface CharacterSelectionProps {
  onSelect: (character: Character) => void;
}

export default function CharacterSelection({ onSelect }: CharacterSelectionProps) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Choose Your Character</h1>
      <div className="flex space-x-4">
        {characters.map((character) => (
          <button
            key={character.id}
            onClick={() => onSelect(character)}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-32 h-32 flex items-center justify-center">
              <character.Component />
            </div>
            <span className="font-bold mt-2">{character.name}</span>
            <span className="text-sm text-gray-500">{character.difficulty}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

