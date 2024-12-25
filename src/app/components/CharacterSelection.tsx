import React, { useState } from "react";
import Ade from "./characters/Ade";
import Bola from "./characters/Bola";
import Chike from "./characters/Chike";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import ImageSequenceAnimator from "./utils/ImageSequence";

const characters = [
  {
    id: "1",
    name: "Ade",
    difficulty: "Easy",
    Component: Ade,
    image: "/characters/ade.png",
  },
  {
    id: "2",
    name: "Bola",
    difficulty: "Medium",
    Component: Bola,
    image: "/characters/bola.png",
  },
  {
    id: "3",
    name: "Chike",
    difficulty: "Hard",
    Component: Chike,
    image: "/characters/chike.png",
  },
  {
    id: "4",
    name: "Dayo",
    difficulty: "Easy",
    Component: undefined,
    image: "/characters/incubator.png",
  },
  {
    id: "5",
    name: "Emeka",
    difficulty: "Medium",
    Component: undefined,
    image: "/characters/incubator.png",
  },
  {
    id: "6",
    name: "Folake",
    difficulty: "Hard",
    Component: undefined,
    image: "/characters/incubator.png",
  },
  {
    id: "7",
    name: "Gbenga",
    difficulty: "Medium",
    Component: undefined,
    image: "/characters/incubator.png",
  },
];

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

export default function CharacterSelection({
  onSelect,
}: CharacterSelectionProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    characters[0]
  );
  return (
    <div className="bg-sky-100 w-full h-[100vh] flex items-center justify-center">
      <span className="absolute top-0 p-4">
        <Marquee direction="right" speed={7}>
          <Image
            src="/assets/clouds.svg"
            alt="clouds"
            width={1000}
            height={1000}
          />
          <Image
            src="/assets/clouds.svg"
            alt="clouds"
            width={1500}
            height={900}
          />
        </Marquee>
      </span>
      <div className="flex flex-col items-center align-center justify-center w-full max-w-[1400px] h-full p-10 z-10">
        <div className="flex justify-between items-center w-full mb-8">
          <h1 className="text-3xl font-bold">Choose Your Character</h1>
          {selectedCharacter && (
            <button
              onClick={() => onSelect(selectedCharacter)}
              className="p-4 border-b-4 border-2 border-sky-600 bg-sky-500 text-white font-bold rounded-lg"
            >
              Start Game
            </button>
          )}
        </div>
        <div className="flex items-center align-center justify-center w-full h-[70vh]">
          <div className="grid grid-cols-3 gap-4 w-full">
            {characters.map((character) => (
              <button
                key={character.id}
                onClick={() => setSelectedCharacter(character)}
                className={`border-2 flex flex-col items-center p-4 py-5 bg-white rounded-lg border-2 border-b-4 hover:shadow-lg transition-shadow overflow-hidden ${
                  selectedCharacter === character
                    ? "border-sky-500"
                    : "border-gray-200"
                }`}
              >
                <div
                  className={`-skew-y-3 w-32 h-32 bg-white overflow-hidden rounded-md border-2 border-gray-200 flex items-center justify-center`}
                >
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={200}
                    height={200}
                    className="mt-14"
                  />
                </div>
                {/* <span className="font-bold mt-2">{character.name}</span> */}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-end w-full">
            {selectedCharacter && (
              <div className="flex flex-col items-end">
                <div className="w-[400px] h-[300px]">
                  <ImageSequenceAnimator
                    imagePath="/characters/bola_idle" // Path to your images
                    totalFrames={308} // Total number of frames in your sequence
                    frameDuration={10} // Duration for each frame (optional)
                    width={400} // Canvas width (optional)
                    height={900} // Canvas height (optional)
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
