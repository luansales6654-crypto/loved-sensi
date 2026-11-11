import React, { useState, useMemo } from 'react';
import {
  Search,
  Smartphone,
  ChevronRight,
  ArrowLeft,
  Check,
  PlusCircle,
  HelpCircle,
  Sliders,
} from 'lucide-react';
import {
  DeviceInfo,
  getAllBrands,
  getModels,
  createCustomDevice,
  DeviceTier,
  DeviceOS,
} from '../data/devices';

interface DeviceSelectorProps {
  selectedDevice: DeviceInfo | null;
  onSelectDevice: (device: DeviceInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  selectedDevice,
  onSelectDevice,
  onNext,
  onBack,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('Samsung');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);

  // Form customizado
  const [customName, setCustomName] = useState('');
  const [customTier, setCustomTier] = useState<DeviceTier>('intermediate');
  const [customOs, setCustomOs] = useState<DeviceOS>('android');

  const allBrands = useMemo(() => getAllBrands(), []);

  // Se o usuário estiver pesquisando algo, filtra em todas as marcas
  const filteredModels = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      return getModels(undefined, searchQuery);
    }
    return getModels(selectedBrand);
  }, [selectedBrand, searchQuery]);

  const handleSelectModel = (model: DeviceInfo) => {
    onSelectDevice(model);
  };

  const handleSaveCustomDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newDev = createCustomDevice({
      customName: customName.trim(),
      tier: customTier,
      os: customOs,
    });

    onSelectDevice(newDev);
    setShowCustomModal(false);
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
          Passo 1 de 2: Aparelho
        </span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Qual é o seu celular?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Selecione a marca e modelo para calibrar a taxa de resposta ao toque.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar marca ou modelo (Ex: A54, S23, iPhone 13, Poco X6...)"
          className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF2E7E] focus:ring-2 focus:ring-[#FF2E7E]/20 text-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            type="button"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-white/10"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Brand Horizontal Scroller (quando não estiver pesquisando termo geral) */}
      {!searchQuery && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {allBrands.map((brand) => {
            const isSelected = selectedBrand.toLowerCase() === brand.toLowerCase();
            return (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FF2E7E] text-white glow-love-sm'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      )}

      {/* Device List */}
      <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1">
        {filteredModels.length === 0 ? (
          <div className="py-8 text-center bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <HelpCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <div className="text-sm font-bold text-white">Nenhum modelo encontrado</div>
            <p className="text-xs text-slate-400 mt-1">
              Não achou seu aparelho? Use a opção abaixo para configurar manualmente.
            </p>
          </div>
        ) : (
          filteredModels.map((item) => {
            const isChosen = selectedDevice?.id === item.id;
            const tierLabel =
              item.tier === 'flagship'
                ? 'Topo de Linha'
                : item.tier === 'intermediate'
                ? 'Intermediário'
                : 'Básico';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectModel(item)}
                className={`p-3.5 rounded-2xl flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer ${
                  isChosen
                    ? 'bg-[#FF2E7E]/15 border-2 border-[#FF2E7E] glow-love-sm'
                    : 'bg-white/[0.03] hover:bg-white/[0.07] border border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isChosen ? 'bg-[#FF2E7E] text-white' : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{item.name}</span>
                      {isChosen && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF2E7E] text-white font-extrabold uppercase">
                          Selecionado
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{item.brand}</span>
                      <span>•</span>
                      <span>{tierLabel}</span>
                      <span>•</span>
                      <span>{item.screenHz}Hz</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    isChosen
                      ? 'border-[#FF2E7E] bg-[#FF2E7E] text-white'
                      : 'border-white/20 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Botão "Meu modelo não está aqui" */}
      <button
        type="button"
        onClick={() => setShowCustomModal(true)}
        className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-[#FF2E7E]/10 border border-dashed border-white/20 hover:border-[#FF2E7E]/50 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <PlusCircle className="w-4 h-4 text-[#FF2E7E]" />
        <span>Meu modelo não está aqui (Configurar manualmente)</span>
      </button>

      {/* Selected Preview & Next Action */}
      <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
        {selectedDevice && (
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Selecionado:</span>
              <strong className="text-white font-bold">{selectedDevice.name}</strong>
              <span className="text-[#FF2E7E]">({selectedDevice.screenHz}Hz)</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" /> Pronto
            </span>
          </div>
        )}

        <button
          onClick={onNext}
          type="button"
          disabled={!selectedDevice}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#FF2E7E] to-[#e61767] hover:from-[#ff408a] hover:to-[#ff1970] text-white font-bold text-base flex items-center justify-center gap-2 glow-love active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <span>Avançar para Escolher Jogador</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Modal / Sheet: Meu Modelo Não Está Aqui */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0f0e14] border border-[#FF2E7E]/40 rounded-3xl p-6 glow-love shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#FF2E7E]" />
                <h3 className="text-lg font-bold text-white">Configurar Meu Celular</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCustomDevice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Nome do Modelo / Aparelho
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Ex: Moto G9 Play, Redmi 8, etc."
                  required
                  autoFocus
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF2E7E] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Sistema Operacional
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomOs('android')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      customOs === 'android'
                        ? 'bg-[#FF2E7E] border-[#FF2E7E] text-white'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    Android
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomOs('ios')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      customOs === 'ios'
                        ? 'bg-[#FF2E7E] border-[#FF2E7E] text-white'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    iPhone (iOS)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Faixa de Desempenho do Aparelho
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomTier('basic')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border flex flex-col items-center gap-1 transition-all ${
                      customTier === 'basic'
                        ? 'bg-[#FF2E7E] border-[#FF2E7E] text-white'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <span>Básico</span>
                    <span className="text-[10px] opacity-75 font-normal">60Hz</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomTier('intermediate')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border flex flex-col items-center gap-1 transition-all ${
                      customTier === 'intermediate'
                        ? 'bg-[#FF2E7E] border-[#FF2E7E] text-white'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <span>Intermediário</span>
                    <span className="text-[10px] opacity-75 font-normal">90-120Hz</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomTier('flagship')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border flex flex-col items-center gap-1 transition-all ${
                      customTier === 'flagship'
                        ? 'bg-[#FF2E7E] border-[#FF2E7E] text-white'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <span>Topo de Linha</span>
                    <span className="text-[10px] opacity-75 font-normal">120Hz+</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="flex-1 h-12 rounded-xl bg-white/5 text-slate-300 font-semibold text-xs border border-white/10"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!customName.trim()}
                  className="flex-1 h-12 rounded-xl bg-[#FF2E7E] text-white font-bold text-xs glow-love disabled:opacity-50"
                >
                  Salvar e Selecionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
