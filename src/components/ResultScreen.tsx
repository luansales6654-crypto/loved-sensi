import React, { useState } from 'react';
import {
  Copy,
  Check,
  ExternalLink,
  Maximize2,
  RotateCcw,
  Sparkles,
  Smartphone,
  Crosshair,
  Flame,
  Info,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';
import { SensiResult, SensiMode, formatSensiText } from '../utils/sensiCalculator';
import { QuickGlanceModal } from './QuickGlanceModal';
import { APP_INFO } from '../config/appConfig';

interface ResultScreenProps {
  result: SensiResult;
  onModeChange: (newMode: SensiMode) => void;
  onReset: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onModeChange,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [showGlanceModal, setShowGlanceModal] = useState(false);

  const { values, dpi, buttonSizePct, buttonPosition, capaTip, mode } = result;

  const handleCopyValues = async () => {
    try {
      const textToCopy = formatSensiText(result);
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenFreeFire = () => {
    const isAndroid = /android/i.test(navigator.userAgent);
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);

    if (isAndroid) {
      // Intent do pacote Android do Free Fire oficial
      const intentUrl = `intent://#Intent;package=${APP_INFO.freeFirePackageAndroid};scheme=launch;end`;
      const fallbackUrl = APP_INFO.freeFirePlayStoreUrl;

      const startTime = Date.now();
      window.location.href = intentUrl;

      // Se o app não abrir em 1.5s, direciona para a loja
      setTimeout(() => {
        if (Date.now() - startTime < 2000) {
          window.location.href = fallbackUrl;
        }
      }, 1500);
    } else if (isIos) {
      // Link direto para abrir na App Store / app scheme
      window.location.href = APP_INFO.freeFireAppStoreUrl;
    } else {
      // Desktop / Navegador genérico: abre a Google Play Store
      window.open(APP_INFO.freeFirePlayStoreUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const sensiItems = [
    { label: 'Geral', value: values.geral, desc: 'Velocidade de giro e movimentação livre' },
    { label: 'Ponto Vermelho', value: values.redDot, desc: 'Tiros sem mira (mira branca/red dot)' },
    { label: 'Mira 2x', value: values.mira2x, desc: 'Recoil e puxada para combates médios' },
    { label: 'Mira 4x', value: values.mira4x, desc: 'Precisão e estabilização de longo alcance' },
    { label: 'Mira AWM', value: values.miraAwm, desc: 'Sensibilidade de snipers e Barrett' },
    { label: 'Olhar Livre', value: values.olharLivre, desc: 'Câmera rápida de 360 graus' },
  ];

  return (
    <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-4 sm:py-6 flex flex-col gap-4 pb-12">
      {/* Header Card do Resultado */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-[#18121f] to-[#0c0a10] border border-[#FF2E7E]/30 glow-love-border flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E7E] animate-pulse" />
            <span className="text-[11px] font-bold text-[#FF2E7E] tracking-wider uppercase">
              Sensi Calibrada com Sucesso
            </span>
          </div>

          <button
            onClick={() => setShowGlanceModal(true)}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF2E7E]/15 hover:bg-[#FF2E7E]/30 border border-[#FF2E7E]/40 text-[#FF2E7E] text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Tela de Consulta</span>
          </button>
        </div>

        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{result.deviceName}</span>
            <span className="text-slate-500 font-normal text-sm">•</span>
            <span className="text-[#FF2E7E]">{result.playerName}</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#FF2E7E]" />
            <span>{result.styleDescription}</span>
          </p>
        </div>

        {/* Toggle Sensi ALTA vs BAIXA */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF2E7E]" />
            Variação da Sensi:
          </span>

          <div className="flex p-1 rounded-xl bg-black/60 border border-white/10">
            <button
              type="button"
              onClick={() => onModeChange('high')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'high'
                  ? 'bg-[#FF2E7E] text-white glow-love-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ALTA (Rush)
            </button>
            <button
              type="button"
              onClick={() => onModeChange('low')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'low'
                  ? 'bg-[#FF2E7E] text-white glow-love-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              BAIXA (Precisão)
            </button>
          </div>
        </div>
      </div>

      {/* Aviso de como colocar no jogo */}
      <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-2.5 text-xs text-slate-300">
        <Info className="w-4 h-4 text-[#FF2E7E] shrink-0 mt-0.5" />
        <p>
          Abra o <strong>Free Fire &gt; Configurações &gt; Sensibilidade</strong> e digite os valores exatamente como calculados abaixo.
        </p>
      </div>

      {/* Grid das Sensibilidades (0 a 100) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {sensiItems.map((item) => (
          <div
            key={item.label}
            className="p-3.5 rounded-2xl bg-[#0f0e15]/90 border border-white/10 hover:border-[#FF2E7E]/30 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <span className="text-xs font-bold text-white block">{item.label}</span>
                <span className="text-[10px] text-slate-400 block">{item.desc}</span>
              </div>
              <span className="text-2xl font-black font-mono text-[#FF2E7E] tabular-nums text-glow">
                {item.value}
              </span>
            </div>

            {/* Barra de progresso visual */}
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#FF2E7E]/60 to-[#FF2E7E] rounded-full transition-all duration-500"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Botão de Tiro Card */}
      <div className="p-4 rounded-2xl bg-[#0f0e15]/90 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FF2E7E]/15 border border-[#FF2E7E]/30 text-[#FF2E7E] flex items-center justify-center font-mono font-black text-xl shrink-0">
            {buttonSizePct}%
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Tamanho Ideal do Botão de Tiro</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs">
              {buttonPosition}
            </p>
          </div>
        </div>
      </div>

      {/* DPI Recomendado Card */}
      <div className="p-4 rounded-2xl bg-[#0f0e15]/90 border border-white/10 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#FF2E7E]" />
            <span className="text-xs font-bold text-white">DPI Recomendado</span>
          </div>

          <div className="px-3 py-1 rounded-xl bg-[#FF2E7E]/20 text-[#FF2E7E] font-mono font-black text-sm">
            {dpi.isAdjustable ? `${dpi.value} DPI` : 'Nativo do iPhone'}
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {dpi.instruction}
        </p>

        {dpi.warningNote && (
          <div className="text-[11px] text-amber-300/80 bg-amber-500/10 p-2 rounded-xl flex items-start gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
            <span>{dpi.warningNote}</span>
          </div>
        )}
      </div>

      {/* Dica de Puxada de Capa */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF2E7E]/10 to-transparent border border-[#FF2E7E]/30 flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#FF2E7E] text-white flex items-center justify-center shrink-0 glow-love-sm">
          <Crosshair className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-white uppercase tracking-wider">
            Técnica de Puxada ({result.playerName})
          </div>
          <p className="text-xs text-slate-200 mt-1 leading-relaxed">
            {capaTip}
          </p>
        </div>
      </div>

      {/* Quick Actions (Copiar & Abrir Free Fire) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          onClick={handleCopyValues}
          type="button"
          className="h-13 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Valores Copiados!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#FF2E7E]" />
              <span>Copiar Todos os Valores</span>
            </>
          )}
        </button>

        <button
          onClick={handleOpenFreeFire}
          type="button"
          className="h-13 px-4 rounded-2xl bg-[#FF2E7E] hover:bg-[#ff408a] text-white font-bold text-xs flex items-center justify-center gap-2 glow-love active:scale-95 transition-all cursor-pointer shadow-md shadow-[#FF2E7E]/30"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Abrir Free Fire Direto</span>
        </button>
      </div>

      {/* Botão Gerar Outra Sensi */}
      <div className="pt-2">
        <button
          onClick={onReset}
          type="button"
          className="w-full h-12 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#FF2E7E]" />
          <span>Gerar Sensi Para Outro Celular ou Jogador</span>
        </button>
      </div>

      {/* Aviso Discreto Final */}
      <p className="text-center text-[11px] text-slate-500 px-4 mt-2">
        Sensi sugerida como ponto de partida; ajuste 2 a 3 pontos conforme o seu jeito de jogar.
      </p>

      {/* Modal de Consulta Rápida */}
      {showGlanceModal && (
        <QuickGlanceModal
          result={result}
          onClose={() => setShowGlanceModal(false)}
        />
      )}
    </div>
  );
};
