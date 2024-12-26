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
    animated: "/characters/ade_idle",
    frames: 120,
    duration: 12,
  },
  {
    id: "2",
    name: "Bola",
    difficulty: "Medium",
    Component: Bola,
    image: "/characters/bola.png",
    animated: "/characters/bola_idle",
    frames: 308,
    duration: 10,

  },
  {
    id: "3",
    name: "Chike",
    difficulty: "Hard",
    Component: Chike,
    image: "/characters/chike.png",
    animated: "/characters/chike_idle",
    frames: 115,
    duration: 10,
  },
  {
    id: "4",
    name: "Dayo",
    difficulty: "Easy",
    Component: undefined,
    image: "/characters/incubator.png",
    animated: "/characters/unselected",
    frames: 1,
    duration: 10,
  },
  {
    id: "5",
    name: "Emeka",
    difficulty: "Medium",
    Component: undefined,
    image: "/characters/incubator.png",
    animated: "/characters/unselected",
    frames: 1,
    duration: 10,
  },
  {
    id: "6",
    name: "Folake",
    difficulty: "Hard",
    Component: undefined,
    image: "/characters/incubator.png",
    animated: "/characters/unselected",
    frames: 1,
    duration: 10,
  },
  {
    id: "7",
    name: "Gbenga",
    difficulty: "Medium",
    Component: undefined,
    image: "/characters/incubator.png",
    animated: "/characters/unselected",
    frames: 1,
    duration: 10,
  },
];

export interface Character {
  id: string;
  name: string;
  difficulty: string;
  Component?: React.ComponentType;
  image?: string;
  animated?: string;
  frames?: number;
  duration?: number;
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
        <div className="flex justify-between items-center w-full mb-8 z-20">
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
                className={`-skew-y-3 border-2 flex flex-col items-center py-[20px] bg-white rounded-lg border-2 border-b-4 hover:shadow-lg transition-shadow overflow-hidden ${
                  selectedCharacter === character
                    ? "border-sky-500"
                    : "border-gray-200"
                }`}
              >
                <div
                  className={`-skew-y-3 w-32 h-36 bg-white overflow-hidden rounded-md border-2 border-gray-200 flex items-center justify-center`}
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
                <div className="w-[500px] h-[300px]">
                  <ImageSequenceAnimator
                    imagePath={selectedCharacter.animated!}// Path to your images
                    totalFrames={selectedCharacter.frames!} // Total number of frames in your sequence
                    frameDuration={selectedCharacter.duration} // Duration for each frame (optional)
                    width={450} // Canvas width (optional)
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
