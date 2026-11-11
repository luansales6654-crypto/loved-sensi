/**
 * =======================================================================
 * CONFIGURAÇÃO GERAL DO APLICATIVO - LOVED SENSI
 * =======================================================================
 * 
 * Aqui você pode facilmente alterar a senha de acesso e outras configurações
 * básicas do aplicativo.
 */

// Senha mestra única para todos os usuários entrarem no aplicativo.
// Troque a palavra entre aspas para a senha que você desejar!
export const APP_PASSWORD = "LOVED";

// Chave utilizada no armazenamento local (localStorage) para salvar o login
export const AUTH_STORAGE_KEY = "loved_sensi_authenticated_v1";

// Chave utilizada para salvar o histórico da última sensi gerada
export const LAST_SENSI_STORAGE_KEY = "loved_sensi_last_result_v1";

// Informações do aplicativo
export const APP_INFO = {
  name: "Loved Sensi",
  slogan: "Sensibilidade & DPI de Pro Player para Free Fire",
  version: "1.0.0",
  freeFirePackageAndroid: "com.dts.freefireth",
  freeFirePlayStoreUrl: "https://play.google.com/store/apps/details?id=com.dts.freefireth",
  freeFireAppStoreUrl: "https://apps.apple.com/app/free-fire-chaos/id1300146617",
};
