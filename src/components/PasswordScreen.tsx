import React, { useState } from 'react';
import { Heart, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface PasswordScreenProps {
  onUnlock: (password: string) => boolean;
}

export const PasswordScreen: React.FC<PasswordScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasShake, setHasShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Por favor, digite a senha para continuar.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Pequeno delay visual para feedback tátil de validação
    setTimeout(() => {
      const isSuccess = onUnlock(password.trim());
      setIsSubmitting(false);

      if (!isSuccess) {
        setErrorMessage('Senha incorreta. Verifique e tente novamente.');
        setHasShake(true);
        setTimeout(() => setHasShake(false), 500);
      }
    }, 250);
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div
        className={`w-full max-w-sm bg-[#0d0d12]/90 backdrop-blur-xl border border-[#FF2E7E]/30 rounded-3xl p-6 sm:p-8 glow-love transition-transform ${
          hasShake ? 'animate-bounce' : ''
        }`}
      >
        {/* Brand Icon & Heading */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF2E7E] via-[#ff4d91] to-[#ff75aa] flex items-center justify-center glow-love">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black border-2 border-[#FF2E7E] flex items-center justify-center">
              <Lock className="w-3 h-3 text-[#FF2E7E]" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Loved <span className="text-[#FF2E7E]">Sensi</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-[260px]">
            Gerador exclusivo de sensibilidade para puxar capa no Free Fire
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="app-password-input"
              className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
            >
              Senha de Acesso
            </label>
            <div className="relative">
              <input
                id="app-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Digite a senha..."
                autoFocus
                autoComplete="current-password"
                className="w-full h-13 px-4 pr-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF2E7E] focus:ring-2 focus:ring-[#FF2E7E]/30 text-base transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-lg focus:outline-none"
                aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-slate-400" />
                ) : (
                  <Eye className="w-5 h-5 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Mensagem de Erro */}
          {errorMessage && (
            <div
              role="alert"
              className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium animate-fadeIn"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Botão de Entrar */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 mt-2 rounded-2xl bg-gradient-to-r from-[#FF2E7E] to-[#e61767] hover:from-[#ff408a] hover:to-[#ff1970] text-white font-bold text-base flex items-center justify-center gap-2 glow-love active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Entrar no App</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer info discreta */}
        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <p className="text-[11px] text-slate-500">
            Acesso liberado com senha única. Salvo no dispositivo após entrar.
          </p>
        </div>
      </div>
    </div>
  );
};
