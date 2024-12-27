/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, JSX } from "react";
import Ade from "./characters/Ade";
import Bola from "./characters/Bola";
import Chike from "./characters/Chike";
import { Character } from "./CharacterSelection";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import ConfettiExplosion, { ConfettiProps } from "./utils/Confetti";
import ImageSequenceAnimator from "./utils/ImageSequence";

const characterComponents: {
  [key: string]: ({ isAttacking }: { isAttacking?: boolean }) => JSX.Element;
} = {
  Ade,
  Bola,
  Chike,
};

interface GameSceneProps {
  playerCharacter: Character;
  opponentCharacter: Character;
  playerHealth: number;
  opponentHealth: number;
}

export default function GameScene({
  playerCharacter,
  opponentCharacter,
  playerHealth,
  opponentHealth,
}: GameSceneProps) {
  const [playerAttacking, setPlayerAttacking] = useState(false);
  const [opponentAttacking, setOpponentAttacking] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  const [pop, setPop] = useState(false);
  const mediumProps: ConfettiProps = {
    force: 0.8,
    duration: 3500,
    particleCount: 400,
    width: 1800,
    colors: ["#041E43", "#1471BF", "#5BB4DC", "#FC027B", "#66D805"],
  };

  useEffect(() => {
    if (opponentHealth <= 0) {
      setPop(true);
      setShowVictoryModal(true);
    }
  }, [opponentHealth]);

  return (
    <div className="w-full h-full bg-blue-200 px-4 pt-20">
      {pop && <ConfettiExplosion {...mediumProps} />}
      <div className="flex justify-between mb-4">
        <HealthBar health={playerHealth} isPlayer={true} />
        <HealthBar health={opponentHealth} isPlayer={false} />
      </div>
      <div className="flex justify-between items-end">
        <div className="transform scale-x-[0.5] scale-y-[0.5] w-[250px] h-[285px]">
          <ImageSequenceAnimator
            imagePath={playerCharacter.animated!}
            totalFrames={playerCharacter.frames!}
            frameDuration={playerCharacter.duration}
            width={550}
            height={750}
          />
        </div>
        <div className="animate-bounce-fast">
          <CharacterSprite
            character={opponentCharacter}
            isAttacking={opponentAttacking}
          />
        </div>
      </div>
      {showVictoryModal && (
        <VictoryModal
          onReplay={() => {
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}

function HealthBar({
  health,
  isPlayer,
}: {
  health: number;
  isPlayer: boolean;
}) {
  return (
    <div className="w-48 bg-gray-300 rounded-full h-6">
      <div
        className={`h-full rounded-full ${
          isPlayer ? "bg-green-500" : "bg-red-500"
        }`}
        style={{ width: `${health}%` }}
      ></div>
    </div>
  );
}

function CharacterSprite({
  character,
  isAttacking,
}: {
  character: Character;
  isAttacking: boolean;
}) {
  const CharacterComponent = characterComponents[character.name] || Ade;
  return <CharacterComponent isAttacking={isAttacking} />;
}

const VictoryModal = ({ onReplay }: { onReplay: () => void }) => {
  return (
    <AlertDialog open={true} onOpenChange={() => {}}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="w-full flex justify-center text-3xl">
            Victory!
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="w-full flex justify-center text-xl">
          Congratulations, you won the battle!
        </AlertDialogDescription>
        <AlertDialogFooter className="flex items-center align-center sm:justify-center w-full">
          <button
            onClick={onReplay}
            className="mt-8 p-2 px-4 border-b-4 border-2 border-sky-600 bg-sky-500 hover:scale-105 active:transform active:scale-95 transition ease text-white font-bold rounded-lg"
          >
            Play Again
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const DefeatModal = ({ onReplay }: { onReplay: () => void }) => {
  return (
    <AlertDialog open={true} onOpenChange={() => {}}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="w-full flex justify-center text-3xl">
            Defeat!
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="w-full flex justify-center text-xl">
          So close!. You failed to defeat your opponent.
        </AlertDialogDescription>
        <AlertDialogFooter className="flex items-center align-center sm:justify-center w-full">
          <button
            onClick={onReplay}
            className="mt-8 p-2 px-4 border-b-4 border-2 border-sky-600 bg-sky-500 hover:scale-105 active:transform active:scale-95 transition ease text-white font-bold rounded-lg"
          >
            Play Again
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
