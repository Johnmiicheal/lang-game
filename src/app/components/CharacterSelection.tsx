import React from 'react'
import Ade from './characters/Ade'
import Bola from './characters/Bola'
import Chike from './characters/Chike'
import Image from 'next/image'

const characters = [
  { id: 'easy', name: 'Ade', difficulty: 'Easy', Component: Ade, image: '/characters/ade.svg' },
  { id: 'medium', name: 'Bola', difficulty: 'Medium', Component: Bola, image: '/characters/bola.svg' },
  { id: 'hard', name: 'Chike', difficulty: 'Hard', Component: Chike, image: '/characters/chike.svg' },
]

export interface Character {
  id: string;
  name: string;
  difficulty: string;
  Component?: React.ComponentType;
  image?: string;
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
            className=" skew-y-3 flex flex-col items-center p-4 bg-white rounded-lg border-b-4 hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="w-32 h-32 overflow-hidden rounded-md border-2 border-red-400 flex items-center justify-center">
              <Image src={character.image} alt={character.name} width={100} height={100} className="mt-4" />
            </div>
            <span className="font-bold mt-2">{character.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

