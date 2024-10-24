import React, { useState } from "react";
import {
  MessageCircle,
  Trophy,
  Crown,
  Medal,
  ChevronRight,
  ChevronLeft,
  Globe,
  Coins,
  ShoppingBag,
  Book,
  Plus,
  Shirt,
  User,
  Home,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

const FluencyPrototype = () => {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState("home");
  const [coins, setCoins] = useState(3500);
  const [selectedCategory, setSelectedCategory] = useState("avatar");

  // Navigation function
  const navigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  // Common Header Component
  const Header = ({ title = "", showBack = true, showCoins = true }) => (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              className="bg-purple-800 p-2 rounded-full"
              onClick={() => navigate("home")}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
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
        </div>
      </div>
    </div>
  );

  // Bottom Navigation
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-purple-800/90 backdrop-blur-sm p-2 flex justify-between items-center">
      <button
        className={`p-2 rounded-full ${
          currentScreen === "home" ? "bg-pink-500" : "bg-purple-700"
        }`}
        onClick={() => navigate("home")}
      >
        <Home className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded-full ${
          currentScreen === "ranking" ? "bg-pink-500" : "bg-purple-700"
        }`}
        onClick={() => navigate("ranking")}
      >
        <Trophy className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded-full ${
          currentScreen === "store" ? "bg-pink-500" : "bg-purple-700"
        }`}
        onClick={() => navigate("store")}
      >
        <ShoppingBag className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded-full ${
          currentScreen === "settings" ? "bg-pink-500" : "bg-purple-700"
        }`}
        onClick={() => navigate("settings")}
      >
        <div className="bg-pink-500 rounded-full w-10 h-10 flex items-center justify-center">
          ML
        </div>
      </button>
    </div>
  );

  // Home Screen Content
  const HomeScreen = () => {
    const courses = [
      {
        id: 1,
        language: "English",
        nativeLanguage: "Inglês",
        currentLesson: "Aula 3: Mic Up",
        progress: 0,
        flag: "🇺🇸",
      },
      {
        id: 2,
        language: "Spanish",
        nativeLanguage: "Espanhol",
        currentLesson: "Aula 1: Básicos",
        progress: 15,
        flag: "🇪🇸",
      },
    ];

    return (
      <div>
        <Header showBack={false} showCoins />
        <div className="px-4 mb-4">
          <div className="bg-purple-700 rounded-full px-4 py-2 inline-flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span>English</span>
          </div>
        </div>
        <div className="space-y-4 px-4 mb-20">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-purple-800 rounded-3xl p-4 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 h-1 bg-cyan-200"
                style={{ width: `${course.progress}%` }}
              />
              <div className="flex justify-between items-start mb-4">
                <div className="text-2xl">{course.flag}</div>
                <div className="text-sm text-purple-300">
                  {course.progress}%
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {course.nativeLanguage}
              </h2>
              <div className="text-purple-300 mb-4">
                Estudando Agora:
                <div className="text-white">{course.currentLesson}</div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="bg-pink-500 hover:bg-pink-600 rounded-full py-3 px-6 flex items-center gap-2"
                  onClick={() => router.push("/video")}
                >
                  Continuar Jornada
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="bg-purple-700 p-3 rounded-full">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Store Screen Content
  const StoreScreen = () => {
    const storeItems: any = {
      avatar: [
        {
          id: 1,
          name: "Glasses",
          price: 1200,
          image: "/images/glasses.svg",
          tag: "Novo",
        },
        {
          id: 2,
          name: "Headphones",
          price: 800,
          image: "/images/headphones.svg",
          tag: "Popular",
        },
        {
          id: 3,
          name: "Billed Cap",
          price: 2000,
          image: "/images/billed_cap.svg",
          tag: "Especial",
        },
        {
          id: 4,
          name: "Graduation Cap",
          price: 2000,
          image: "/images/graduation_cap.svg",
          tag: "Especial",
        },
      ],
      lessons: [
        {
          id: 1,
          name: "Gavin",
          price: 1200,
          image: "/images/gavin.svg",
          tag: "Novo",
        },
        {
          id: 2,
          name: "Paula Gabriela",
          price: 800,
          image: "/images/paula.svg",
          tag: "Popular",
        },
        {
          id: 3,
          name: "Rhavi",
          price: 2000,
          image: "/images/rhavi.svg",
          tag: "Especial",
        },
      ],
      coins: [
        {
          id: 1,
          name: "1000 Coins",
          price: "R$ 4,99",
          image: "/images/billed_cap.svg",
          amount: 1000,
        },
        {
          id: 2,
          name: "2500 Coins",
          price: "R$ 9,99",
          image: "/images/billed_cap.svg",
          amount: 2500,
          tag: "Popular",
        },
        {
          id: 3,
          name: "5000 Coins",
          price: "R$ 18,99",
          image: "/images/billed_cap.svg",
          amount: 5000,
          tag: "Melhor Valor",
        },
        {
          id: 4,
          name: "10000 Coins",
          price: "R$ 34,99",
          image: "/images/billed_cap.svg",
          amount: 10000,
          tag: "Premium",
        },
      ],
    };

    return (
      <div className="min-h-screen bg-purple-900 text-white">
        {/* Header */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <button className="bg-purple-800 p-2 rounded-full">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold">Loja</h1>
            </div>
            <div className="flex items-center gap-2 bg-purple-800 rounded-full px-4 py-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              <span className="font-bold">3,500</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <Tabs
          defaultValue=""
          className="w-full"
          onValueChange={setSelectedCategory}
        >
          <TabsList className="w-full flex justify-between p-2 bg-transparent">
            {Object.keys(storeItems).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl text-sm
                ${
                  selectedCategory === category
                    ? "bg-pink-500"
                    : "bg-purple-800/50"
                }`}
              >
                <CategoryIcon category={category} />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Items Grid */}
        <ScrollArea className="h-[calc(100vh-180px)] px-4 py-6">
          <div className="grid grid-cols-2 gap-4">
            {storeItems[selectedCategory].map((item: any) => (
              <div
                key={item.id}
                className="bg-purple-800/50 rounded-2xl p-4 flex flex-col"
              >
                <div className="relative mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-xl bg-purple-700"
                  />
                  {item.tag && (
                    <span className="absolute top-2 right-2 bg-pink-500 text-xs px-2 py-1 rounded-full">
                      {item.tag}
                    </span>
                  )}
                </div>

                <h3 className="font-semibold mb-1">{item.name}</h3>

                <div className="mt-auto">
                  <button className="w-full bg-pink-500 hover:bg-pink-600 rounded-full py-2 flex items-center justify-center gap-2 transition-colors">
                    {selectedCategory === "coins" ? (
                      <>
                        <Plus className="w-5 h-5" />
                        {item.price}
                      </>
                    ) : (
                      <>
                        <Coins className="w-4 h-4 text-yellow-400" />
                        {item.price}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  };

  // Ranking Screen Content
  const RankingScreen = () => {
    const rankings = [
      {
        id: 1,
        name: "Maria Silva",
        points: 2850,
        streak: 45,
        avatar: "/api/placeholder/32/32",
      },
      {
        id: 2,
        name: "João Santos",
        points: 2720,
        streak: 32,
        avatar: "/api/placeholder/32/32",
      },
      {
        id: 3,
        name: "Ana Oliveira",
        points: 2680,
        streak: 28,
        avatar: "/api/placeholder/32/32",
      },
      {
        id: 4,
        name: "Pedro Costa",
        points: 2590,
        streak: 21,
        avatar: "/api/placeholder/32/32",
      },
      {
        id: 5,
        name: "Lucia Pereira",
        points: 2485,
        streak: 19,
        avatar: "/api/placeholder/32/32",
      },
      {
        id: 6,
        name: "Carlos Lima",
        points: 2390,
        streak: 15,
        avatar: "/api/placeholder/32/32",
      },
    ];

    return (
      <div className="min-h-screen bg-purple-900 text-white">
        <Header showBack={false} showCoins />

        {/* Title Section */}
        <div className="px-4 mb-6">
          <h1 className="text-2xl font-bold mb-2">Ranking Global</h1>
          <p className="text-purple-200">
            Compete com estudantes do mundo todo
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="bg-purple-800/50 rounded-t-3xl px-4 py-6">
          <div className="flex justify-center items-end gap-4 mb-8">
            {/* Second Place */}
            <div className="flex flex-col items-center">
              <Avatar className="w-16 h-16 border-2 border-purple-300 mb-2">
                <AvatarImage src={rankings[1].avatar} />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="h-24 w-20 bg-purple-700/50 rounded-t-xl flex flex-col items-center justify-end pb-2">
                <Medal className="w-6 h-6 text-gray-300 mb-1" />
                <p className="text-sm font-semibold">{rankings[1].points}</p>
              </div>
            </div>

            {/* First Place */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Crown className="w-8 h-8 text-yellow-400 absolute -top-8 left-1/2 -translate-x-1/2" />
                <Avatar className="w-20 h-20 border-2 border-yellow-400 mb-2">
                  <AvatarImage src={rankings[0].avatar} />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
              </div>
              <div className="h-32 w-20 bg-purple-600/50 rounded-t-xl flex flex-col items-center justify-end pb-2">
                <Trophy className="w-6 h-6 text-yellow-400 mb-1" />
                <p className="text-sm font-semibold">{rankings[0].points}</p>
              </div>
            </div>

            {/* Third Place */}
            <div className="flex flex-col items-center">
              <Avatar className="w-16 h-16 border-2 border-amber-700 mb-2">
                <AvatarImage src={rankings[2].avatar} />
                <AvatarFallback>AO</AvatarFallback>
              </Avatar>
              <div className="h-20 w-20 bg-purple-700/50 rounded-t-xl flex flex-col items-center justify-end pb-2">
                <Medal className="w-6 h-6 text-amber-700 mb-1" />
                <p className="text-sm font-semibold">{rankings[2].points}</p>
              </div>
            </div>
          </div>

          {/* Rankings List */}
          <ScrollArea className="h-[calc(100vh-480px)]">
            {rankings.slice(3).map((user) => (
              <div
                key={user.id}
                className="bg-purple-700/30 rounded-2xl p-4 mb-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold text-purple-300 w-6">
                    {user.id}
                  </span>
                  <Avatar className="h-12 w-12 border-2 border-purple-500">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <div className="flex items-center gap-2 text-sm text-purple-200">
                      <Trophy className="w-4 h-4" />
                      {user.points} pontos
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-purple-200">Streak</span>
                  <span className="font-semibold text-pink-500">
                    {user.streak} dias
                  </span>
                </div>
              </div>
            ))}
          </ScrollArea>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-purple-800/90 backdrop-blur-sm p-4 flex justify-between items-center">
            <button className="bg-pink-500 hover:bg-pink-600 rounded-full py-3 px-6 flex items-center gap-2">
              Ver Ranking Completo
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="bg-purple-700 p-3 rounded-full">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Helper Components
  const CategoryIcon = ({ category }: any) => {
    switch (category) {
      case "avatar":
        return <User className="w-5 h-5" />;
      case "lessons":
        return <Book className="w-5 h-5" />;
      case "coins":
        return <Coins className="w-5 h-5" />;
      default:
        return <ShoppingBag className="w-5 h-5" />;
    }
  };

  // Main Render
  return (
    <div className="min-h-screen bg-purple-900 text-white">
      {currentScreen === "home" && <HomeScreen />}
      {currentScreen === "ranking" && <RankingScreen />}
      {currentScreen === "store" && <StoreScreen />}
      <BottomNav />
    </div>
  );
};

export default FluencyPrototype;
