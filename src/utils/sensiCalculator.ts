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

function clamp(val: number, min: number = 0, max: number = 200): number {
  return Math.max(min, Math.min(max, Math.round(val)));
}

/**
 * Calcula a sensibilidade calibrada e determinística para o Free Fire na escala 0-200
 */
export function calculateSensi(
  device: DeviceInfo,
  player: PlayerProfile,
  mode: SensiMode = 'high'
): SensiResult {
  const isHigh = mode === 'high';
  const isIos = device.os === 'ios';
  const isGaming = device.screenHz >= 144 || device.touchSamplingRate >= 480;

  // 1. Sensibilidade Base na escala 0-200 de acordo com a resposta de toque do aparelho
  let baseGeral = 188;
  let baseRedDot = 182;
  let base2x = 174;
  let base4x = 164;
  let baseAwm = 84;
  let baseOlharLivre = 150;

  if (device.tier === 'flagship') {
    baseGeral = isGaming ? 182 : 186;
    baseRedDot = 180;
    base2x = 172;
    base4x = 162;
    baseAwm = 80;
    baseOlharLivre = 142;
  } else if (device.tier === 'intermediate') {
    baseGeral = 190;
    baseRedDot = 185;
    base2x = 176;
    base4x = 168;
    baseAwm = 86;
    baseOlharLivre = 152;
  } else {
    // Básico: Telas de 60Hz e toque de 120Hz precisam de maior sensibilidade no motor do jogo
    baseGeral = 196;
    baseRedDot = 192;
    base2x = 184;
    base4x = 176;
    baseAwm = 92;
    baseOlharLivre = 162;
  }

  // 2. Compensação do Sistema Operacional (iOS vs Android)
  if (isIos) {
    // iPhones possuem leitura capacitiva nativa ultra responsiva sem buffer de latência do Android
    baseGeral -= 6;
    baseRedDot -= 4;
    base2x -= 4;
  }

  // 3. Aplicação do estilo e pesos do jogador escolhido (escala ampliada para 200)
  const pWeights = player.weights;
  baseGeral += Math.round(pWeights.geralBias * 1.5);
  baseRedDot += Math.round(pWeights.redDotBias * 1.5);
  base2x += Math.round(pWeights.scope2xBias * 1.5);
  base4x += Math.round(pWeights.scope4xBias * 1.5);
  baseAwm += Math.round(pWeights.awmBias * 1.5);
  baseOlharLivre += Math.round(pWeights.freeLookBias * 1.5);

  // 4. Modo ALTA vs BAIXA
  if (isHigh) {
    // Sensi Alta: mais agilidade no giro 360 e subida em curto percurso
    baseGeral += 7;
    baseRedDot += 6;
    base2x += 5;
    base4x += 4;
    baseAwm += 4;
    baseOlharLivre += 8;
  } else {
    // Sensi Baixa: mais estabilidade para cravar tiros e controle de recoil
    baseGeral -= 18;
    baseRedDot -= 16;
    base2x -= 18;
    base4x -= 18;
    baseAwm -= 14;
    baseOlharLivre -= 24;
  }

  // 5. Micro-ajuste determinístico usando ID combinado (nunca aleatório, sempre fixo para este par)
  const seedString = `${device.id}_${player.id}_${mode}`;
  const microGeral = getDeterministicOffset(`${seedString}_geral`, 3);
  const microRedDot = getDeterministicOffset(`${seedString}_redDot`, 3);
  const micro2x = getDeterministicOffset(`${seedString}_2x`, 3);
  const micro4x = getDeterministicOffset(`${seedString}_4x`, 3);
  const microAwm = getDeterministicOffset(`${seedString}_awm`, 3);
  const microOlhar = getDeterministicOffset(`${seedString}_olhar`, 4);

  const values: SensiValues = {
    geral: clamp(baseGeral + microGeral, 50, 200),
    redDot: clamp(baseRedDot + microRedDot, 50, 200),
    mira2x: clamp(base2x + micro2x, 40, 200),
    mira4x: clamp(base4x + micro4x, 35, 200),
    miraAwm: clamp(baseAwm + microAwm, 20, 180),
    olharLivre: clamp(baseOlharLivre + microOlhar, 40, 200),
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
