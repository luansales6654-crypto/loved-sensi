import React, { useState, useEffect } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { Header } from './components/Header';
import { PasswordScreen } from './components/PasswordScreen';
import { HomeScreen } from './components/HomeScreen';
import { DeviceSelector } from './components/DeviceSelector';
import { PlayerSelector } from './components/PlayerSelector';
import { ResultScreen } from './components/ResultScreen';
import { DeviceInfo } from './data/devices';
import { PlayerProfile } from './data/players';
import { calculateSensi, SensiResult, SensiMode } from './utils/sensiCalculator';
import { APP_PASSWORD, AUTH_STORAGE_KEY, LAST_SENSI_STORAGE_KEY } from './config/appConfig';

type AppStep = 'home' | 'device' | 'player' | 'result';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [currentStep, setCurrentStep] = useState<AppStep>('home');
  const [selectedDevice, setSelectedDevice] = useState<DeviceInfo | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerProfile | null>(null);
  const [currentMode, setCurrentMode] = useState<SensiMode>('high');
  const [currentResult, setCurrentResult] = useState<SensiResult | null>(null);
  const [lastSavedResult, setLastSavedResult] = useState<SensiResult | null>(null);

  // Carrega última sensi salva do localStorage se existir
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LAST_SENSI_STORAGE_KEY);
      if (saved) {
        setLastSavedResult(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Autenticação com a senha mestra
  const handleUnlock = (enteredPassword: string): boolean => {
    if (enteredPassword === APP_PASSWORD) {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch {
        // ignore
      }
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Botão Sair: limpa o acesso do aparelho e volta para a tela de senha
  const handleLogout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setCurrentStep('home');
    setSelectedDevice(null);
    setSelectedPlayer(null);
    setCurrentResult(null);
  };

  // Iniciar geração a partir da Home
  const handleStartGenerator = () => {
    setCurrentStep('device');
  };

  // Ver última sensi salva
  const handleViewLastResult = () => {
    if (lastSavedResult) {
      setCurrentResult(lastSavedResult);
      setCurrentMode(lastSavedResult.mode);
      setCurrentStep('result');
    }
  };

  // Avançar da seleção de aparelho para seleção de jogador
  const handleDeviceNext = () => {
    if (selectedDevice) {
      setCurrentStep('player');
    }
  };

  // Gerar a Sensibilidade
  const handleGenerateSensi = () => {
    if (!selectedDevice || !selectedPlayer) return;

    const result = calculateSensi(selectedDevice, selectedPlayer, currentMode);
    setCurrentResult(result);
    setLastSavedResult(result);

    try {
      localStorage.setItem(LAST_SENSI_STORAGE_KEY, JSON.stringify(result));
    } catch {
      // ignore
    }

    setCurrentStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Alternar entre modo ALTA e BAIXA na tela de resultado
  const handleModeChange = (newMode: SensiMode) => {
    setCurrentMode(newMode);
    if (selectedDevice && selectedPlayer) {
      const updated = calculateSensi(selectedDevice, selectedPlayer, newMode);
      setCurrentResult(updated);
      try {
        localStorage.setItem(LAST_SENSI_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
    } else if (currentResult) {
      // Caso tenha vindo do histórico sem selectedDevice completo
      const updated: SensiResult = {
        ...currentResult,
        mode: newMode,
      };
      setCurrentResult(updated);
    }
  };

  // Resetar para gerar outra
  const handleReset = () => {
    setCurrentStep('device');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-white flex flex-col font-sans selection:bg-[#FF2E7E] selection:text-white">
      {/* Corações rosa flutuando em todas as telas no fundo */}
      <FloatingHearts />

      {/* Se não estiver autenticado, exibe a tela de senha */}
      {!isAuthenticated ? (
        <PasswordScreen onUnlock={handleUnlock} />
      ) : (
        <>
          {/* Header Superior com Logomarca e botão Sair */}
          <Header onLogout={handleLogout} showLogout={true} />

          {/* Conteúdo Dinâmico por Passo */}
          <main className="flex-1 flex flex-col">
            {currentStep === 'home' && (
              <HomeScreen
                onStartGenerator={handleStartGenerator}
                lastResult={lastSavedResult}
                onViewLastResult={handleViewLastResult}
              />
            )}

            {currentStep === 'device' && (
              <DeviceSelector
                selectedDevice={selectedDevice}
                onSelectDevice={setSelectedDevice}
                onNext={handleDeviceNext}
                onBack={() => setCurrentStep('home')}
              />
            )}

            {currentStep === 'player' && selectedDevice && (
              <PlayerSelector
                device={selectedDevice}
                selectedPlayer={selectedPlayer}
                onSelectPlayer={setSelectedPlayer}
                onGenerate={handleGenerateSensi}
                onBack={() => setCurrentStep('device')}
                onChangeDevice={() => setCurrentStep('device')}
              />
            )}

            {currentStep === 'result' && currentResult && (
              <ResultScreen
                result={currentResult}
                onModeChange={handleModeChange}
                onReset={handleReset}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
}
