import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSensi, formatSensiText } from './sensiCalculator';
import { DEVICE_DATABASE, createCustomDevice } from '../data/devices';
import { PLAYERS_DATABASE } from '../data/players';

test('calculateSensi is 100% deterministic (same device + same player produces identical output)', () => {
  const device = DEVICE_DATABASE[0]; // iPhone 16 Pro Max
  const player = PLAYERS_DATABASE[0]; // Nobru

  const run1 = calculateSensi(device, player, 'high');
  const run2 = calculateSensi(device, player, 'high');

  assert.deepEqual(run1.values, run2.values);
  assert.equal(run1.buttonSizePct, run2.buttonSizePct);
  assert.equal(run1.dpi.value, run2.dpi.value);
  assert.equal(run1.capaTip, run2.capaTip);
});

test('calculateSensi clamps all values within legal Free Fire 0-200 ranges and scales above 100', () => {
  for (const device of DEVICE_DATABASE.slice(0, 5)) {
    for (const player of PLAYERS_DATABASE) {
      for (const mode of ['high', 'low'] as const) {
        const result = calculateSensi(device, player, mode);
        const { geral, redDot, mira2x, mira4x, miraAwm, olharLivre } = result.values;

        assert(geral >= 0 && geral <= 200, `Geral out of bounds: ${geral}`);
        assert(redDot >= 0 && redDot <= 200, `RedDot out of bounds: ${redDot}`);
        assert(mira2x >= 0 && mira2x <= 200, `2x out of bounds: ${mira2x}`);
        assert(mira4x >= 0 && mira4x <= 200, `4x out of bounds: ${mira4x}`);
        assert(miraAwm >= 0 && miraAwm <= 200, `AWM out of bounds: ${miraAwm}`);
        assert(olharLivre >= 0 && olharLivre <= 200, `OlharLivre out of bounds: ${olharLivre}`);
        assert(result.buttonSizePct >= 40 && result.buttonSizePct <= 75, `ButtonSize out of bounds: ${result.buttonSizePct}`);

        // Garante que a sensibilidade geral e red dot estão de fato na escala moderna (acima de 100)
        assert(geral > 120, `Geral deve estar na escala moderna 0-200: ${geral}`);
      }
    }
  }
});

test('new pro players Marechal and Felps exist and generate valid sensis', () => {
  const marechal = PLAYERS_DATABASE.find(p => p.id === 'marechal');
  const felps = PLAYERS_DATABASE.find(p => p.id === 'felps');
  assert(marechal, 'Marechal must exist in PLAYERS_DATABASE');
  assert(felps, 'Felps must exist in PLAYERS_DATABASE');

  const device = DEVICE_DATABASE[0];
  const resMarechal = calculateSensi(device, marechal!, 'high');
  const resFelps = calculateSensi(device, felps!, 'high');

  assert(resMarechal.values.geral >= 170 && resMarechal.values.geral <= 200);
  assert(resFelps.values.geral >= 160 && resFelps.values.geral <= 200);
});

test('high sensi mode provides faster/higher geral sensitivity than low sensi mode', () => {
  const device = DEVICE_DATABASE.find(d => d.brand === 'Samsung')!;
  const player = PLAYERS_DATABASE.find(p => p.id === 'nobru')!;

  const high = calculateSensi(device, player, 'high');
  const low = calculateSensi(device, player, 'low');

  assert(high.values.geral > low.values.geral, 'High mode Geral must be higher than low mode Geral');
  assert(high.values.redDot > low.values.redDot, 'High mode RedDot must be higher than low mode RedDot');
  assert(high.buttonSizePct <= low.buttonSizePct, 'High mode button size should be slightly smaller for swipe room');
});

test('iOS devices return null DPI with appropriate iOS instruction', () => {
  const iphone = DEVICE_DATABASE.find(d => d.os === 'ios')!;
  const player = PLAYERS_DATABASE[0];

  const result = calculateSensi(iphone, player, 'high');

  assert.equal(result.dpi.value, null);
  assert.equal(result.dpi.isAdjustable, false);
  assert(result.dpi.instruction.includes('iOS'));
});

test('Android devices return recommended safe DPI value', () => {
  const android = DEVICE_DATABASE.find(d => d.os === 'android')!;
  const player = PLAYERS_DATABASE[0];

  const result = calculateSensi(android, player, 'high');

  assert.notEqual(result.dpi.value, null);
  assert.equal(result.dpi.isAdjustable, true);
  assert(typeof result.dpi.value === 'number');
  assert((result.dpi.value as number) >= 380 && (result.dpi.value as number) <= 750);
});

test('custom device creation works seamlessly with sensi calculation', () => {
  const customDev = createCustomDevice({
    customName: 'Moto G9 Play Custom',
    tier: 'basic',
    os: 'android',
  });
  const player = PLAYERS_DATABASE[1]; // Bak

  const result = calculateSensi(customDev, player, 'high');
  assert.equal(result.deviceName, 'Moto G9 Play Custom');
  assert(result.values.geral >= 80);
});

test('formatSensiText generates complete readable report with all components', () => {
  const device = DEVICE_DATABASE[0];
  const player = PLAYERS_DATABASE[0];
  const result = calculateSensi(device, player, 'high');
  const text = formatSensiText(result);

  assert(text.includes('LOVED SENSI'));
  assert(text.includes('Geral:'));
  assert(text.includes('Ponto Vermelho:'));
  assert(text.includes('DICA DE CAPA:'));
  assert(text.includes('BOTÃO DE TIRO:'));
});
