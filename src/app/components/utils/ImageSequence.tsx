// components/ImageSequenceAnimator.tsx

import React, { useEffect, useRef, useState } from 'react';

interface ImageSequenceAnimatorProps {
    imagePath: string; // Path to the images
    totalFrames: number; // Total number of frames
    frameDuration?: number; // Duration for each frame in milliseconds
    width?: number; // Canvas width
    height?: number; // Canvas height
}

const ImageSequenceAnimator: React.FC<ImageSequenceAnimatorProps> = ({
    imagePath,
    totalFrames,
    frameDuration = 60, // Default frame duration
    width = 800, // Default canvas width
    height = 800, // Default canvas height
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [frameIndex, setFrameIndex] = useState(0);

    const currentFrame = (index: number) => {
        return `${imagePath}/${String(index).padStart(3, '0')}.png`;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');

        const img = new Image();
        img.src = currentFrame(frameIndex);
        
        img.onload = () => {
            context?.clearRect(0, 0, canvas.width, canvas.height);
            context?.drawImage(img, 0, 0);
        };

        const intervalId = setInterval(() => {
            setFrameIndex((prevIndex) => (prevIndex + 1) % totalFrames);
        }, frameDuration);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [frameIndex, totalFrames, frameDuration]);

    return (
        <div className="flex justify-center items-center h-full">
            <canvas ref={canvasRef} width={width} height={height}></canvas>
        </div>
    );
};

export default ImageSequenceAnimator;
