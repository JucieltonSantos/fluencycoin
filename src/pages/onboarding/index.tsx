import React, { useState } from "react";
import {
  ChevronRight,
  ArrowRight,
  ChevronLeft,
  Rocket,
  Target,
  Coins,
  Gift,
} from "lucide-react";
import { useRouter } from "next/navigation";

const OnboardingScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();

  const screens = [
    {
      id: 1,
      title: "Aprenda muito mais rápido",
      description:
        "Método comprovado para aprender idiomas de forma eficiente e divertida",
      icon: Rocket,
      bgColor: "from-pink-500/20 to-purple-500/20",
    },
    {
      id: 2,
      title: "Exercícios personalizados para você",
      description: "Conteúdo adaptado ao seu nível e objetivos de aprendizado",
      icon: Target,
      bgColor: "from-blue-500/20 to-purple-500/20",
    },
    {
      id: 3,
      title: "Ganhe moedas",
      description: "Complete desafios e ganhe recompensas por sua dedicação",
      icon: Coins,
      bgColor: "from-yellow-500/20 to-purple-500/20",
    },
    {
      id: 4,
      title: "E troque por experiências incríveis",
      description:
        "Desbloqueie conteúdos exclusivos e personalize seu aprendizado",
      icon: Gift,
      bgColor: "from-green-500/20 to-purple-500/20",
    },
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handlePrevious = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  return (
    <div className="h-screen bg-purple-900 text-white flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <div className="h-16 flex justify-between items-center px-6">
        <div className="w-20">
          {currentScreen > 0 && (
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full hover:bg-purple-800/50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
        </div>

        {currentScreen < screens.length - 1 && (
          <button
            onClick={() => {
              setCurrentScreen(screens.length - 1);
              router.push("/home");
            }}
            className="text-purple-200 hover:text-white transition-colors"
          >
            Pular
          </button>
        )}
      </div>

      {/* Content Area with Fixed Height */}
      <div className="flex-1 flex flex-col relative">
        <div className="absolute inset-0">
          {screens.map((screen, index) => {
            const Icon = screen.icon;
            return (
              <div
                key={screen.id}
                className={`absolute inset-0 flex flex-col items-center transition-all duration-500 transform
                  ${
                    index === currentScreen
                      ? "opacity-100 translate-x-0"
                      : index < currentScreen
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                  }`}
              >
                {/* Illustration Container */}
                <div className="w-full flex-1 flex items-center justify-center px-6 relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${screen.bgColor} opacity-20`}
                  />
                  <div className="relative">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-purple-800/30 flex items-center justify-center">
                      <Icon className="w-24 h-24 md:w-28 md:h-28 text-pink-500 animate-float" />
                    </div>
                  </div>
                </div>

                {/* Text Content - Fixed Height */}
                <div className="h-40 flex flex-col items-center justify-start px-6 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    {screen.title}
                  </h2>
                  <p className="text-purple-200 text-sm md:text-base max-w-xs">
                    {screen.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Navigation Area */}
      <div className="h-32 px-6 pb-8 flex flex-col justify-end">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 
                ${
                  index === currentScreen
                    ? "w-8 bg-pink-500"
                    : "w-2 bg-purple-700"
                }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={
            currentScreen < screens.length - 1
              ? handleNext
              : () => router.push("/home")
          }
          className="w-full bg-pink-500 hover:bg-pink-600 text-white h-14 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          {currentScreen < screens.length - 1 ? (
            <>
              Próximo
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            <>
              Começar
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Add floating animation */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default OnboardingScreen;
