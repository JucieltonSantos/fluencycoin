/* eslint-disable */
import React, { useState } from "react";
import { ChevronRight, Coins, Play } from "lucide-react";
import { useRouter } from "next/navigation";

const VideoLessonScreenOne = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const [coins, setCoins] = useState(3500);

  // Common Header Component
  const Header = ({ title = "", showBack = true, showCoins = true }) => (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {!showBack && (
            <div className="text-2xl font-bold">
              FLUENCY
              <div className="text-xs text-purple-200">ACADEMY</div>
            </div>
          )}
          {title && <h1 className="text-xl font-bold">{title}</h1>}
        </div>
        <div className="flex gap-3 items-center">
          {showCoins && (
            <div className="flex items-center gap-2 bg-purple-800 rounded-full px-4 py-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="font-bold">{coins}</span>
            </div>
          )}
          <div
            className="flex items-center gap-2 bg-purple-800 rounded-full px-4 py-2"
            onClick={() => router.push("/login")}
          >
            <span className="font-bold">Sair</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-purple-900 text-white flex flex-col">
      <Header showBack={false} showCoins />
      {/* Video Player Area */}
      <div className="relative w-full aspect-video bg-purple-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 flex items-center justify-center bg-pink-500 rounded-full hover:bg-pink-600 transition-colors"
          >
            <Play className="w-8 h-8 ml-1" fill="white" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          className="bg-pink-500 hover:bg-pink-600 rounded-full py-3 px-6 flex items-center gap-2"
          onClick={() => router.push("/video")}
        >
          Continuar Jornada
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default VideoLessonScreenOne;
