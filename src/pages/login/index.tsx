import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const LoginScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen bg-purple-900 text-white flex flex-col">
      {/* Logo Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-1">FLUENCY</h1>
            <p className="text-purple-200">ACADEMY</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm text-purple-200 block">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
                  <Mail className="w-5 h-5" />
                </div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-purple-800/50 border-purple-700 focus:border-pink-500 text-white pl-10 pr-4 py-3 rounded-xl"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm text-purple-200 block">Senha</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
                  <Lock className="w-5 h-5" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-purple-800/50 border-purple-700 focus:border-pink-500 text-white pl-10 pr-12 py-3 rounded-xl"
                  placeholder="••••••••"
                  required
                  minLength={2}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Recovery Link */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-purple-200 hover:text-pink-500 transition-colors"
              >
                Esqueci minha senha
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-pink-500 hover:bg-pink-600 text-white py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all
                ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-purple-200">
                Não tem uma conta?{" "}
                <a
                  href="#"
                  className="text-pink-500 hover:text-pink-400 transition-colors font-medium"
                >
                  Criar conta
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Language Selector */}
      <div className="p-6 text-center">
        <button className="text-purple-200 hover:text-white transition-colors text-sm">
          🌎 Português (BR)
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
