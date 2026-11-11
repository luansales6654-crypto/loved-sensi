import { DeviceInfo } from '../data/devices';
import { PlayerProfile } from '../data/players';

export type SensiMode = 'high' | 'low';

export interface SensiValues {
  geral: number;
  redDot: number;
  mira2x: number;
  mira4x: number;
  miraAwm: number;
  olharLivre: number;
}

export interface DpiRecommendation {
  value: number | null; // null no iPhone
  isAdjustable: boolean;
  instruction: string;
  warningNote: string;
}

export interface SensiResult {
  deviceId: string;
  deviceName: string;
  deviceBrand: string;
  playerId: string;
  playerName: string;
  playerNickname: string;
  mode: SensiMode;
  values: SensiValues;
  buttonSizePct: number;
  buttonPosition: string;
  dpi: DpiRecommendation;
  capaTip: string;
  styleDescription: string;
}

/**
 * Função determinística de hashing para derivar micro-ajustes consistentes
 * a partir do nome do aparelho e do jogador (mesmos inputs = sempre o mesmo valor exato).
 */
function getDeterministicOffset(str: string, maxOffset: number = 3): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % (maxOffset * 2 + 1) - maxOffset;
}

function clamp(val: number, min: number = 0, max: number = 100): number {
  return Math.max(min, Math.min(max, Math.round(val)));
}

/**
 * Calcula a sensibilidade calibrada e determinística para o Free Fire
 */
export function calculateSensi(
  device: DeviceInfo,
  player: PlayerProfile,
  mode: SensiMode = 'high'
): SensiResult {
  const isHigh = mode === 'high';
  const isIos = device.os === 'ios';
  const isGaming = device.screenHz >= 144 || device.touchSamplingRate >= 480;

  // 1. Sensibilidade Base de acordo com a resposta de toque e taxa de atualização do aparelho
  // Em aparelhos de tela muito rápida (120Hz/144Hz+) com toque de 360-720Hz, a sensibilidade
  // precisa ser levemente dosada para não passar da cabeça e espalhar disparos no céu.
  let baseGeral = 95;
  let baseRedDot = 92;
  let base2x = 88;
  let base4x = 84;
  let baseAwm = 42;
  let baseOlharLivre = 75;

  if (device.tier === 'flagship') {
    baseGeral = isGaming ? 93 : 95;
    baseRedDot = 91;
    base2x = 87;
    base4x = 82;
    baseAwm = 40;
    baseOlharLivre = 70;
  } else if (device.tier === 'intermediate') {
    baseGeral = 97;
    baseRedDot = 94;
    base2x = 90;
    base4x = 86;
    baseAwm = 44;
    baseOlharLivre = 76;
  } else {
    // Básico: Telas de 60Hz e toque de 120Hz precisam de maior sensibilidade no motor do jogo
    baseGeral = 99;
    baseRedDot = 97;
    base2x = 94;
    base4x = 90;
    baseAwm = 48;
    baseOlharLivre = 82;
  }

  // 2. Compensação do Sistema Operacional (iOS vs Android)
  if (isIos) {
    // iPhones possuem leitura capacitiva nativa ultra responsiva sem buffer de latência do Android
    baseGeral -= 3;
    baseRedDot -= 2;
    base2x -= 2;
  }

  // 3. Aplicação do estilo e pesos do jogador escolhido
  const pWeights = player.weights;
  baseGeral += pWeights.geralBias;
  baseRedDot += pWeights.redDotBias;
  base2x += pWeights.scope2xBias;
  base4x += pWeights.scope4xBias;
  baseAwm += pWeights.awmBias;
  baseOlharLivre += pWeights.freeLookBias;

  // 4. Modo ALTA vs BAIXA
  if (isHigh) {
    // Sensi Alta: mais agilidade no giro 360 e subida em curto percurso
    baseGeral += 4;
    baseRedDot += 3;
    base2x += 3;
    base4x += 2;
    baseAwm += 2;
    baseOlharLivre += 5;
  } else {
    // Sensi Baixa: mais peso na mira para cravar tiros e não tremer
    baseGeral -= 6;
    baseRedDot -= 5;
    base2x -= 6;
    base4x -= 6;
    baseAwm -= 4;
    baseOlharLivre -= 8;
  }

  // 5. Micro-ajuste determinístico usando ID combinado (nunca aleatório, sempre fixo para este par)
  const seedString = `${device.id}_${player.id}_${mode}`;
  const microGeral = getDeterministicOffset(`${seedString}_geral`, 2);
  const microRedDot = getDeterministicOffset(`${seedString}_redDot`, 2);
  const micro2x = getDeterministicOffset(`${seedString}_2x`, 2);
  const micro4x = getDeterministicOffset(`${seedString}_4x`, 2);
  const microAwm = getDeterministicOffset(`${seedString}_awm`, 2);
  const microOlhar = getDeterministicOffset(`${seedString}_olhar`, 3);

  const values: SensiValues = {
    geral: clamp(baseGeral + microGeral, 50, 100),
    redDot: clamp(baseRedDot + microRedDot, 50, 100),
    mira2x: clamp(base2x + micro2x, 40, 100),
    mira4x: clamp(base4x + micro4x, 35, 100),
    miraAwm: clamp(baseAwm + microAwm, 15, 85),
    olharLivre: clamp(baseOlharLivre + microOlhar, 30, 100),
  };

  // 6. Botão de tiro recomendado
  let buttonSize = player.weights.buttonSizePct;
  if (isHigh) {
    // Botão ligeiramente menor na sensi alta para ter maior curso livre na tela
    buttonSize -= 3;
  } else {
    // Botão ligeiramente maior para toques mais firmes
    buttonSize += 3;
  }
  const buttonSizeClamped = clamp(buttonSize, 42, 68);

  // 7. Cálculo de DPI recomendado
  let dpiResult: DpiRecommendation;

  if (isIos) {
    dpiResult = {
      value: null,
      isAdjustable: false,
      instruction: 'O iOS não permite alterar DPI manualmente. A sensibilidade do jogo já foi matematicamente calibrada para a escala de toque nativa do seu iPhone.',
      warningNote: 'No iPhone, você pode ajustar a "Velocidade do Cursor" em Ajustes > Acessibilidade > Controle Assistivo > Cursor Móvel se quiser sensação ainda mais rápida.',
    };
  } else {
    // Android: DPI baseado no default do aparelho + perfil do jogador + modo
    let targetDpi = device.defaultDpi + player.weights.dpiBiasAndroid;
    if (isHigh) {
      targetDpi += 40;
    } else {
      targetDpi -= 20;
    }

    // Regras de segurança de DPI do Android (para evitar tela preta ou reset em aparelhos básicos)
    if (device.tier === 'basic') {
      targetDpi = Math.min(540, Math.max(380, targetDpi));
    } else if (device.tier === 'intermediate') {
      targetDpi = Math.min(620, Math.max(410, targetDpi));
    } else {
      // Flagship suporta DPI mais alto com segurança
      targetDpi = Math.min(720, Math.max(440, targetDpi));
    }

    // Arredonda para múltiplo amigável de 5
    targetDpi = Math.round(targetDpi / 5) * 5;

    dpiResult = {
      value: targetDpi,
      isAdjustable: true,
      instruction: `Vá em Configurações > Opções do Desenvolvedor > "Menor Largura" (ou DPI) e digite ${targetDpi}. (Padrão original do seu aparelho: ${device.defaultDpi}).`,
      warningNote: 'Nunca coloque DPI muito acima de 800 no Android para evitar reiniciar o aparelho. O valor sugerido acima é 100% seguro.',
    };
  }

  // 8. Dica de puxada de capa
  let capaTip = player.pullTechniqueTip;
  if (isHigh) {
    capaTip += ' Como a sensi está no modo ALTO, faça um movimento de arrasto mais suave e curto com a ponta do polegar.';
  } else {
    capaTip += ' No modo BAIXO, empregue um movimento mais longo e controlado em direção ao topo da tela.';
  }

  return {
    deviceId: device.id,
    deviceName: device.name,
    deviceBrand: device.brand,
    playerId: player.id,
    playerName: player.name,
    playerNickname: player.nickname,
    mode,
    values,
    buttonSizePct: buttonSizeClamped,
    buttonPosition: player.weights.buttonPositionTip,
    dpi: dpiResult,
    capaTip,
    styleDescription: isHigh
      ? 'Sensi ALTA: giros ultrarrápidos, puxada curta de capa e alta agilidade para rush.'
      : 'Sensi BAIXA: mira grudante, controle cirúrgico de spray e consistência em média/longa distância.',
  };
}

/**
 * Gera texto formatado para copiar para a área de transferência
 */
export function formatSensiText(result: SensiResult): string {
  const { values, dpi } = result;
  const dpiText = dpi.isAdjustable ? `${dpi.value} DPI` : 'Padrão do iPhone (Nativo)';

  return `❤️ LOVED SENSI - FREE FIRE ❤️
━━━━━━━━━━━━━━━━━━━
📱 Aparelho: ${result.deviceName} (${result.deviceBrand})
👑 Estilo: ${result.playerName} (${result.playerNickname})
⚡ Versão: ${result.mode === 'high' ? 'SENSI ALTA (Rush/Giro Rápido)' : 'SENSI BAIXA (Precisão/Controle)'}
━━━━━━━━━━━━━━━━━━━
🎯 SENSIBILIDADE NO JOGO:
• Geral: ${values.geral}
• Ponto Vermelho: ${values.redDot}
• Mira 2x: ${values.mira2x}
• Mira 4x: ${values.mira4x}
• Mira AWM: ${values.miraAwm}
• Olhar Livre: ${values.olharLivre}

🔥 BOTÃO DE TIRO: ${result.buttonSizePct}%
📐 Posição: ${result.buttonPosition}
🛠️ DPI RECOMENDADO: ${dpiText}

💡 DICA DE CAPA:
${result.capaTip}
━━━━━━━━━━━━━━━━━━━
Gerado com Loved Sensi 💖`;
}
