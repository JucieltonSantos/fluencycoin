/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Coins } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const VideoLessonScreen = () => {
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);
  const [coins, setCoins] = useState(3500);

  const [answers, setAnswers] = useState<any>([]);

  const handleChange = (value: any) => {
    const question = value.split("-")[0];
    const resp = value.split("-")[1];
    const answer = value.split("-")[2];
    const newAnswers = answers.filter(
      (answer: any) => answer.question !== question
    );

    setAnswers([
      ...newAnswers,
      { question: question, submitted: resp, answer: answer },
    ]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://tiger.developmentfluencyacademy.io/videos/1/quizzes"
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-purple-900 text-white flex flex-col">
        <button type="button" className="bg-indigo-500" disabled>
          <svg
            className="animate-spin h-10 w-10 mr-3"
            viewBox="0 0 20 20"
          ></svg>
          Processing...
        </button>
      </div>
    );
  if (error) return <div>Erro: {error}</div>;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading2(true);
    const userCookie = Cookies.get("email");
    const sendData = {
      email: userCookie,
      results: answers,
    };

    try {
      const response = await fetch(
        "https://tiger.developmentfluencyacademy.io/videos/1/quizzes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setLoading2(false);
        router.push("/coins");

        console.log("Respostas enviadas com sucesso:", result);
      } else {
        console.error("Erro ao enviar as respostas:", response.status);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    }
  };

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
      {/* Description Area */}
      <div className="flex-1 p-6">
        {/* Main Description */}
        <div className="space-y-6 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Perguntas de fixação:
            </h2>
          </div>

          {/* Exercise List */}
          <div className="space-y-4">
            <form onSubmit={handleSubmit}>
              {data &&
                data.questions.map((resp: any, key: any) => {
                  return (
                    <div
                      key={key}
                      className="border rounded-md border-border-solid border-2 p-4 border-purple-700 mb-2"
                    >
                      <span className="text-pink-500 font-medium">
                        {key + 1 + "."}
                      </span>
                      <div
                        className="flex items-center gap-3"
                        key={resp.question}
                      >
                        <div className="flex-1">
                          <p className="text-white">{resp.question}</p>
                          <div className="flex items-center space-x-2 mb-2 mt-2">
                            <RadioGroup
                              defaultValue={resp.question}
                              onValueChange={handleChange}
                            >
                              {resp.options.map((option: any, key: any) => {
                                return (
                                  <div
                                    className="flex items-center space-x-4 mb-2 mt-2"
                                    key={key}
                                  >
                                    <RadioGroupItem
                                      value={
                                        resp.question +
                                        "-" +
                                        option +
                                        "-" +
                                        resp.answer
                                      }
                                      id={option}
                                      className="border-purple-500 text-lime-500"
                                    />
                                    <Label htmlFor={option}>{option}</Label>
                                  </div>
                                );
                              })}
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/* Fixed Button at Bottom */}
              <div className="p-4 border-t border-purple-800">
                <button
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl transition-colors"
                  type="submit"
                  disabled={loading2}
                >
                  {loading2 ? "Enviando..." : "Enviar respostas"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLessonScreen;
