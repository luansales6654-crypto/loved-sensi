/**
 * =======================================================================
 * JOGADORES FAMOSOS DE FREE FIRE - LOVED SENSI
 * =======================================================================
 * 
 * Para adicionar mais jogadores no futuro, basta duplicar um bloco e
 * preencher os dados do novo jogador nesta lista!
 */

export type PlayStyle = 'aggressive' | 'balanced' | 'precision' | 'sniper';

export interface PlayerProfile {
  id: string;
  name: string;
  nickname: string;
  tagline: string;
  role: string;
  style: PlayStyle;
  signatureWeapons: string;
  pullTechniqueTip: string;
  avatarBg: string;
  // Pesos para calibrar a sensibilidade de acordo com o estilo do jogador
  weights: {
    geralBias: number;        // -5 a +10
    redDotBias: number;       // -5 a +10
    scope2xBias: number;      // -5 a +10
    scope4xBias: number;      // -5 a +10
    awmBias: number;          // -15 a +15
    freeLookBias: number;     // -5 a +10
    buttonSizePct: number;    // Ex: 46% a 58%
    buttonPositionTip: string;
    dpiBiasAndroid: number;   // -30 a +70
  };
}

export const PLAYERS_DATABASE: PlayerProfile[] = [
  {
    id: 'nobru',
    name: 'Nobru',
    nickname: 'O Rei do Rush',
    tagline: 'Movimentação insana, puxada rápida e rush agressivo',
    role: 'Capitão / Rushador',
    style: 'aggressive',
    signatureWeapons: 'MP40, UMP, Desert Eagle',
    pullTechniqueTip: 'Puxada em "J" curto e explosivo logo no primeiro frame de tiro; solte o dedo se a mira passar da cabeça.',
    avatarBg: 'from-amber-500 to-rose-600',
    weights: {
      geralBias: 7,
      redDotBias: 6,
      scope2xBias: 4,
      scope4xBias: 2,
      awmBias: -2,
      freeLookBias: 8,
      buttonSizePct: 48,
      buttonPositionTip: 'Canto inferior direito, ligeiramente rebaixado para permitir maior curso de subida do polegar.',
      dpiBiasAndroid: 45,
    },
  },
  {
    id: 'bak',
    name: 'Bak',
    nickname: 'O Mestre da Precisão',
    tagline: 'Controle cirúrgico de mira 2x, 4x e zero dispersão',
    role: 'Capitão / Suporte de Meia',
    style: 'precision',
    signatureWeapons: 'Scar, M4A1, Groza, Desert',
    pullTechniqueTip: 'Puxada reta e contínua com toque progressivo; excelente para cravar tiros na cabeça sem espalhar recoil.',
    avatarBg: 'from-blue-600 to-cyan-500',
    weights: {
      geralBias: 2,
      redDotBias: 4,
      scope2xBias: 7,
      scope4xBias: 6,
      awmBias: 2,
      freeLookBias: 3,
      buttonSizePct: 53,
      buttonPositionTip: 'Posição média-baixa, bem centralizada com o polegar relaxado para disparos calculados.',
      dpiBiasAndroid: 30,
    },
  },
  {
    id: 'cerol',
    name: 'Cerol',
    nickname: 'O Pai da Guilda',
    tagline: 'Equilíbrio perfeito de mira colada e tiros certeiros',
    role: 'Equilibrado / All-Rounder',
    style: 'balanced',
    signatureWeapons: 'AK47, MP5, Thompson, M1014',
    pullTechniqueTip: 'Puxe firme em linha reta para cima nos 3 primeiros tiros; a mira gruda direto na altura do capacete.',
    avatarBg: 'from-emerald-500 to-teal-700',
    weights: {
      geralBias: 4,
      redDotBias: 5,
      scope2xBias: 5,
      scope4xBias: 4,
      awmBias: 0,
      freeLookBias: 5,
      buttonSizePct: 55,
      buttonPositionTip: 'Posição padrão confortável, um pouco acima da borda inferior para evitar toques acidentais.',
      dpiBiasAndroid: 35,
    },
  },
  {
    id: 'apelapato',
    name: 'Apelapato',
    nickname: 'Lenda do Fone & AWM',
    tagline: 'Instakill, troca rápida de armas e controle de AWM lendário',
    role: 'Sniper & Pistola Rápida',
    style: 'sniper',
    signatureWeapons: 'AWM, Barrett M82B, Desert Eagle',
    pullTechniqueTip: 'Troca de arma instantânea após o disparo de sniper; na pistola, puxão vertical seco de alta sensibilidade.',
    avatarBg: 'from-purple-600 to-pink-600',
    weights: {
      geralBias: 5,
      redDotBias: 7,
      scope2xBias: 4,
      scope4xBias: 3,
      awmBias: 14,
      freeLookBias: 9,
      buttonSizePct: 46,
      buttonPositionTip: 'Botão pequeno na área de alcance rápido para disparos reflexos e troca de slot imediata.',
      dpiBiasAndroid: 55,
    },
  },
  {
    id: 'marechal',
    name: 'Marechal',
    nickname: 'O Rei do X1 & Gel Rápido',
    tagline: 'Puxada insana, gelo agachado ultrarrápido e controle absurdo de Desert Eagle',
    role: 'Rushador / Rei do X1',
    style: 'aggressive',
    signatureWeapons: 'Desert Eagle, M1014, UMP, Thompson',
    pullTechniqueTip: 'Puxada em meia-lua rápida sincronizada com o pulo; sensibilidade alta no 200 permite virar a câmera e tacar gelo no mesmo milissegundo.',
    avatarBg: 'from-fuchsia-600 to-rose-600',
    weights: {
      geralBias: 9,
      redDotBias: 8,
      scope2xBias: 5,
      scope4xBias: 3,
      awmBias: 2,
      freeLookBias: 10,
      buttonSizePct: 45,
      buttonPositionTip: 'Botão bem baixo no canto direito com ampla área livre para deslizar rápido em 360°.',
      dpiBiasAndroid: 60,
    },
  },
  {
    id: 'felps',
    name: 'Felps',
    nickname: 'O Capitão Frio',
    tagline: 'Visão tática, controle milimétrico de recoil e disparos letais de média distância',
    role: 'Capitão / Rifler de Elite',
    style: 'balanced',
    signatureWeapons: 'SCAR, M4A1, Groza, MP5',
    pullTechniqueTip: 'Puxe o botão de forma firme e linear nos primeiros disparos; o recoil se estabiliza cravado na altura do capacete.',
    avatarBg: 'from-indigo-600 to-sky-500',
    weights: {
      geralBias: 5,
      redDotBias: 6,
      scope2xBias: 7,
      scope4xBias: 6,
      awmBias: 3,
      freeLookBias: 6,
      buttonSizePct: 52,
      buttonPositionTip: 'Alinhado à altura natural de repouso do polegar para precisão em combates longos.',
      dpiBiasAndroid: 45,
    },
  },
  {
    id: 'thurzin',
    name: 'Thurzin',
    nickname: 'Menino Prodígio',
    tagline: 'Movimentação fluida e puxada leve que não passa do capacete',
    role: 'Rushador / Criador de Espaço',
    style: 'aggressive',
    signatureWeapons: 'UMP, Thompson, Mini Uzi',
    pullTechniqueTip: 'Toque suave subindo em curva leve; não force a tela, deixe a sensibilidade alta fazer o trabalho.',
    avatarBg: 'from-orange-500 to-yellow-600',
    weights: {
      geralBias: 8,
      redDotBias: 7,
      scope2xBias: 3,
      scope4xBias: 3,
      awmBias: -1,
      freeLookBias: 7,
      buttonSizePct: 47,
      buttonPositionTip: 'Canto inferior com margem de 10% da lateral para disparar com o polegar em movimento.',
      dpiBiasAndroid: 50,
    },
  },
  {
    id: 'two9',
    name: 'Two9',
    nickname: 'Máquina de Headshot',
    tagline: 'Controle de tela e puxada seca para campeonatos',
    role: 'Rifler / First Kill',
    style: 'precision',
    signatureWeapons: 'M4A1, XM8, Desert Eagle',
    pullTechniqueTip: 'Espere o adversário parar ou atirar primeiro para aplicar a puxada direta de 100% de capa.',
    avatarBg: 'from-red-600 to-rose-700',
    weights: {
      geralBias: 3,
      redDotBias: 5,
      scope2xBias: 6,
      scope4xBias: 5,
      awmBias: 3,
      freeLookBias: 4,
      buttonSizePct: 52,
      buttonPositionTip: 'Centralizado na altura natural do dedão para máxima consistência em partidas competitivas.',
      dpiBiasAndroid: 40,
    },
  },
];

export function getPlayerById(id: string): PlayerProfile | undefined {
  return PLAYERS_DATABASE.find(p => p.id === id);
}
