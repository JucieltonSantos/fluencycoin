import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Play } from "lucide-react";

const VideoLessonScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [answers, setAnswers] = useState<any>([]);

  const handleChange = (value: any) => {
    console.log(answers);
    console.log(value);
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
        console.log(result);
        setData(result);
      } catch (error: any) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Respostas enviadas:", answers);

    const sendData = {
      email: "jucieltonsantos@gmail.com",
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
        console.log("Respostas enviadas com sucesso:", result);
      } else {
        console.error("Erro ao enviar as respostas:", response.status);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-900 text-white flex flex-col">
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
                      className="border rounded-md border-border-solid border-2 p-4 border-purple-700"
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
                >
                  Enviar respostas
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
