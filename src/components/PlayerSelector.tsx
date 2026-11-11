import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Crosshair,
  Flame,
  Smartphone,
  Sparkles,
  Zap,
  Target,
  Shield,
  Eye,
} from 'lucide-react';
import { DeviceInfo } from '../data/devices';
import { PLAYERS_DATABASE, PlayerProfile, PlayStyle } from '../data/players';

interface PlayerSelectorProps {
  device: DeviceInfo;
  selectedPlayer: PlayerProfile | null;
  onSelectPlayer: (player: PlayerProfile) => void;
  onGenerate: () => void;
  onBack: () => void;
  onChangeDevice: () => void;
}

export const PlayerSelector: React.FC<PlayerSelectorProps> = ({
  device,
  selectedPlayer,
  onSelectPlayer,
  onGenerate,
  onBack,
  onChangeDevice,
}) => {
  const [isGeneratingAnimation, setIsGeneratingAnimation] = useState(false);

  const handleGenerateClick = () => {
    if (!selectedPlayer) return;
    setIsGeneratingAnimation(true);
    setTimeout(() => {
      onGenerate();
      setIsGeneratingAnimation(false);
    }, 450);
  };

  const getStyleIcon = (style: PlayStyle) => {
    switch (style) {
      case 'aggressive':
        return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'precision':
        return <Target className="w-3.5 h-3.5 text-cyan-400" />;
      case 'sniper':
        return <Eye className="w-3.5 h-3.5 text-pink-400" />;
      case 'balanced':
      default:
        return <Shield className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const getStyleBadge = (style: PlayStyle) => {
    switch (style) {
      case 'aggressive':
        return 'Rush Agressivo';
      case 'precision':
        return 'Precisão Cirúrgica';
      case 'sniper':
        return 'Sniper & Pistola';
      case 'balanced':
      default:
        return 'Equilibrado';
    }
  };

  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-4 sm:py-6 flex flex-col gap-4">
      {/* Top Navigation & Step Indicator */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 border border-white/10 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <span className="text-xs font-semibold text-[#FF2E7E] tracking-wider uppercase">
          Passo 2 de 2: Pro Player
        </span>
      </div>

      {/* Device Summary Badge */}
      <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FF2E7E]/20 text-[#FF2E7E] flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Aparelho Selecionado</div>
            <div className="text-xs font-bold text-white">{device.name} ({device.screenHz}Hz)</div>
          </div>
        </div>
        <button
          onClick={onChangeDevice}
          type="button"
          className="text-xs font-semibold text-[#FF2E7E] hover:underline px-2 py-1"
        >
          Trocar
        </button>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Escolha o Pro Player
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          A sensi será calibrada combinando o hardware do seu celular com o estilo de puxada do jogador.
        </p>
      </div>

      {/* Players List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
        {PLAYERS_DATABASE.map((player) => {
          const isSelected = selectedPlayer?.id === player.id;

          return (
            <button
              key={player.id}
              type="button"
              onClick={() => onSelectPlayer(player)}
              className={`p-4 rounded-2xl text-left transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? 'bg-[#FF2E7E]/15 border-2 border-[#FF2E7E] glow-love-sm'
                  : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/10'
              }`}
            >
              {/* Header with Avatar and Selection Check */}
              <div className="flex items-start justify-between w-full mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${player.avatarBg} flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0`}
                  >
                    {player.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-white flex items-center gap-1.5">
                      <span>{player.name}</span>
                      {isSelected && (
                        <Flame className="w-4 h-4 text-[#FF2E7E] fill-[#FF2E7E]" />
                      )}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                      {player.nickname}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 ${
                    isSelected
                      ? 'border-[#FF2E7E] bg-[#FF2E7E] text-white'
                      : 'border-white/20 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Tagline & style */}
              <p className="text-xs text-slate-300 leading-snug mb-3">
                {player.tagline}
              </p>

              {/* Badges footer */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1 font-semibold text-slate-300">
                  {getStyleIcon(player.style)}
                  <span>{getStyleBadge(player.style)}</span>
                </div>
                <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                  {player.signatureWeapons}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-white/10">
        <button
          onClick={handleGenerateClick}
          type="button"
          disabled={!selectedPlayer || isGeneratingAnimation}
          className="w-full h-15 rounded-2xl bg-gradient-to-r from-[#FF2E7E] via-[#ff3b86] to-[#e61767] hover:from-[#ff408a] hover:to-[#ff1970] text-white font-extrabold text-lg flex items-center justify-center gap-3 glow-love active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-lg shadow-[#FF2E7E]/30"
        >
          {isGeneratingAnimation ? (
            <div className="flex items-center gap-2">
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Calibrando Sensi...</span>
            </div>
          ) : (
            <>
              <Crosshair className="w-6 h-6" />
              <span>Gerar Sensi Para {selectedPlayer ? selectedPlayer.name : 'Jogador'}</span>
              <Sparkles className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
