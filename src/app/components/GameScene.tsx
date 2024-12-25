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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [playerAttacking, setPlayerAttacking] = useState(false);
  const [opponentAttacking, setOpponentAttacking] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);



  useEffect(() => {
    if (opponentHealth <= 0) {
      setShowVictoryModal(true);
    }
  }, [opponentHealth]);

  return (
    <div className="w-full h-full bg-blue-200 px-4 pt-20">
      <div className="flex justify-between mb-4">
        <HealthBar health={playerHealth} isPlayer={true} />
        <HealthBar health={opponentHealth} isPlayer={false} />
      </div>
      <div className="flex justify-between items-end">
        <div className="transform scale-x-[-1]">
          <CharacterSprite
            character={playerCharacter}
            isAttacking={playerAttacking}
          />
        </div>
        <CharacterSprite
          character={opponentCharacter}
          isAttacking={opponentAttacking}
        />
      </div>
      {showVictoryModal && (
        <VictoryModal
          onReplay={() => {
            setShowVictoryModal(false);
            router.refresh();
            // Add your reset game logic here
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
          <AlertDialogTitle>Victory!</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Congratulations, you won the battle!
        </AlertDialogDescription>
        <AlertDialogFooter>
          <button
            onClick={onReplay}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Play Again
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
