/**
 * =======================================================================
 * BASE DE DADOS DE APARELHOS (MARCAS E MODELOS) - LOVED SENSI
 * =======================================================================
 * 
 * Para adicionar novos aparelhos ou novas marcas, basta inserir um novo
 * item na lista DEVICE_DATABASE abaixo.
 */

export type DeviceTier = 'basic' | 'intermediate' | 'flagship';
export type DeviceOS = 'android' | 'ios';

export interface DeviceInfo {
  id: string;
  name: string;
  brand: string;
  tier: DeviceTier;
  os: DeviceOS;
  screenHz: 60 | 90 | 120 | 144 | 165;
  touchSamplingRate: number; // Hz (ex: 120, 240, 360, 480, 720)
  defaultDpi: number;
}

export const DEVICE_DATABASE: DeviceInfo[] = [
  // ================= APPLE / IPHONE =================
  { id: 'apple-16-promax', name: 'iPhone 16 Pro Max', brand: 'Apple', tier: 'flagship', os: 'ios', screenHz: 120, touchSamplingRate: 240, defaultDpi: 460 },
  { id: 'apple-16-pro', name: 'iPhone 16 Pro', brand: 'Apple', tier: 'flagship', os: 'ios', screenHz: 120, touchSamplingRate: 240, defaultDpi: 460 },
  { id: 'apple-16', name: 'iPhone 16', brand: 'Apple', tier: 'flagship', os: 'ios', screenHz: 60, touchSamplingRate: 120, defaultDpi: 460 },
  { id: 'apple-15-promax', name: 'iPhone 15 Pro Max', brand: 'Apple', tier: 'flagship', os: 'ios', screenHz: 120, touchSamplingRate: 240, defaultDpi: 460 },
  { id: 'apple-15-pro', name: 'iPhone 15 Pro', brand: 'Apple', tier: 'flagship', os: 'ios', screenHz: 120, touchSamplingRate: 240, defaultDpi: 460 },
  { id: 'apple-15', name: 'iPhone 15', brand: 'Apple', tier: 'intermediate', os: 'ios', screenHz: 60, touchSamplingRate: 120, defaultDpi: 460 },
  { id: 'apple-14-promax', name: 'iPhone 14 Pro Max', brand: 'Apple', tier: 'flagship', os: 'ios', screenHz: 120, touchSamplingRate: 240, defaultDpi: 460 },
  { id: 'apple-14-pro', name: 'iPhone 14 Pro', brand: 'Apple', tier: 'flagship', os: 'ios', screenHz: 120, touchSamplingRate: 240, defaultDpi: 460 },
  { id: 'apple-14', name: 'iPhone 14', brand: 'Apple', tier: 'intermediate', os: 'ios', screenHz: 60, touchSamplingRate: 120, defaultDpi: 460 },
  { id: 'apple-13-promax', name: 'iPhone 13 Pro Max', brand: 'Apple', tier: 'flagship', os: 'ios', screenHz: 120, touchSamplingRate: 240, defaultDpi: 460 },
  { id: 'apple-13', name: 'iPhone 13', brand: 'Apple', tier: 'intermediate', os: 'ios', screenHz: 60, touchSamplingRate: 120, defaultDpi: 460 },
  { id: 'apple-12-promax', name: 'iPhone 12 Pro Max', brand: 'Apple', tier: 'flagship', os: 'ios', screenHz: 60, touchSamplingRate: 120, defaultDpi: 460 },
  { id: 'apple-12', name: 'iPhone 12', brand: 'Apple', tier: 'intermediate', os: 'ios', screenHz: 60, touchSamplingRate: 120, defaultDpi: 460 },
  { id: 'apple-11', name: 'iPhone 11', brand: 'Apple', tier: 'intermediate', os: 'ios', screenHz: 60, touchSamplingRate: 120, defaultDpi: 326 },
  { id: 'apple-xr', name: 'iPhone XR', brand: 'Apple', tier: 'basic', os: 'ios', screenHz: 60, touchSamplingRate: 120, defaultDpi: 326 },
  { id: 'apple-8-plus', name: 'iPhone 8 Plus', brand: 'Apple', tier: 'basic', os: 'ios', screenHz: 60, touchSamplingRate: 120, defaultDpi: 401 },

  // ================= SAMSUNG =================
  { id: 'sam-s24-ultra', name: 'Galaxy S24 Ultra', brand: 'Samsung', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 480, defaultDpi: 411 },
  { id: 'sam-s24-plus', name: 'Galaxy S24+', brand: 'Samsung', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 480, defaultDpi: 411 },
  { id: 'sam-s24', name: 'Galaxy S24', brand: 'Samsung', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-s23-ultra', name: 'Galaxy S23 Ultra', brand: 'Samsung', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 480, defaultDpi: 411 },
  { id: 'sam-s23', name: 'Galaxy S23', brand: 'Samsung', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-s23-fe', name: 'Galaxy S23 FE', brand: 'Samsung', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-s22-ultra', name: 'Galaxy S22 Ultra', brand: 'Samsung', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-s21-fe', name: 'Galaxy S21 FE', brand: 'Samsung', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-s20-fe', name: 'Galaxy S20 FE', brand: 'Samsung', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-a55', name: 'Galaxy A55 5G', brand: 'Samsung', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-a54', name: 'Galaxy A54 5G', brand: 'Samsung', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-a35', name: 'Galaxy A35 5G', brand: 'Samsung', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-a34', name: 'Galaxy A34 5G', brand: 'Samsung', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-a25', name: 'Galaxy A25 5G', brand: 'Samsung', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-a15', name: 'Galaxy A15 (4G/5G)', brand: 'Samsung', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 384 },
  { id: 'sam-a14', name: 'Galaxy A14', brand: 'Samsung', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 384 },
  { id: 'sam-a05s', name: 'Galaxy A05s', brand: 'Samsung', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 384 },
  { id: 'sam-a04e', name: 'Galaxy A04e', brand: 'Samsung', tier: 'basic', os: 'android', screenHz: 60, touchSamplingRate: 120, defaultDpi: 384 },
  { id: 'sam-m54', name: 'Galaxy M54 5G', brand: 'Samsung', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-m34', name: 'Galaxy M34 5G', brand: 'Samsung', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sam-z-fold5', name: 'Galaxy Z Fold 5', brand: 'Samsung', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 420 },
  { id: 'sam-z-flip5', name: 'Galaxy Z Flip 5', brand: 'Samsung', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },

  // ================= XIAOMI =================
  { id: 'mi-14-ultra', name: 'Xiaomi 14 Ultra', brand: 'Xiaomi', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 480, defaultDpi: 440 },
  { id: 'mi-14', name: 'Xiaomi 14', brand: 'Xiaomi', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 480, defaultDpi: 440 },
  { id: 'mi-13t-pro', name: 'Xiaomi 13T Pro', brand: 'Xiaomi', tier: 'flagship', os: 'android', screenHz: 144, touchSamplingRate: 480, defaultDpi: 440 },
  { id: 'mi-13t', name: 'Xiaomi 13T', brand: 'Xiaomi', tier: 'flagship', os: 'android', screenHz: 144, touchSamplingRate: 480, defaultDpi: 440 },
  { id: 'mi-12', name: 'Xiaomi 12', brand: 'Xiaomi', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 480, defaultDpi: 440 },
  { id: 'mi-11-lite', name: 'Xiaomi 11 Lite 5G NE', brand: 'Xiaomi', tier: 'intermediate', os: 'android', screenHz: 90, touchSamplingRate: 240, defaultDpi: 392 },

  // ================= REDMI =================
  { id: 'redmi-note13-proplus', name: 'Redmi Note 13 Pro+ 5G', brand: 'Redmi', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 480, defaultDpi: 440 },
  { id: 'redmi-note13-pro', name: 'Redmi Note 13 Pro 5G', brand: 'Redmi', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 392 },
  { id: 'redmi-note13', name: 'Redmi Note 13 4G/5G', brand: 'Redmi', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 392 },
  { id: 'redmi-note12-pro', name: 'Redmi Note 12 Pro 5G', brand: 'Redmi', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 392 },
  { id: 'redmi-note12', name: 'Redmi Note 12 4G', brand: 'Redmi', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 392 },
  { id: 'redmi-note11', name: 'Redmi Note 11', brand: 'Redmi', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 392 },
  { id: 'redmi-note10-pro', name: 'Redmi Note 10 Pro', brand: 'Redmi', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 392 },
  { id: 'redmi-note9s', name: 'Redmi Note 9S / 9 Pro', brand: 'Redmi', tier: 'basic', os: 'android', screenHz: 60, touchSamplingRate: 120, defaultDpi: 392 },
  { id: 'redmi-13c', name: 'Redmi 13C', brand: 'Redmi', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 360 },
  { id: 'redmi-12', name: 'Redmi 12', brand: 'Redmi', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 360 },
  { id: 'redmi-10c', name: 'Redmi 10C', brand: 'Redmi', tier: 'basic', os: 'android', screenHz: 60, touchSamplingRate: 120, defaultDpi: 360 },
  { id: 'redmi-9a', name: 'Redmi 9A', brand: 'Redmi', tier: 'basic', os: 'android', screenHz: 60, touchSamplingRate: 120, defaultDpi: 360 },

  // ================= POCO =================
  { id: 'poco-f6-pro', name: 'Poco F6 Pro', brand: 'Poco', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 480, defaultDpi: 440 },
  { id: 'poco-f6', name: 'Poco F6', brand: 'Poco', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 480, defaultDpi: 440 },
  { id: 'poco-x6-pro', name: 'Poco X6 Pro 5G', brand: 'Poco', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 480, defaultDpi: 440 },
  { id: 'poco-x6', name: 'Poco X6 5G', brand: 'Poco', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 392 },
  { id: 'poco-f5', name: 'Poco F5', brand: 'Poco', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 480, defaultDpi: 392 },
  { id: 'poco-x5-pro', name: 'Poco X5 Pro 5G', brand: 'Poco', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 392 },
  { id: 'poco-x3-pro', name: 'Poco X3 Pro', brand: 'Poco', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 392 },
  { id: 'poco-m6-pro', name: 'Poco M6 Pro', brand: 'Poco', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 392 },
  { id: 'poco-c65', name: 'Poco C65', brand: 'Poco', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 360 },

  // ================= MOTOROLA =================
  { id: 'moto-edge-50-ultra', name: 'Motorola Edge 50 Ultra', brand: 'Motorola', tier: 'flagship', os: 'android', screenHz: 144, touchSamplingRate: 360, defaultDpi: 411 },
  { id: 'moto-edge-50-pro', name: 'Motorola Edge 50 Pro', brand: 'Motorola', tier: 'flagship', os: 'android', screenHz: 144, touchSamplingRate: 360, defaultDpi: 411 },
  { id: 'moto-edge-40-neo', name: 'Motorola Edge 40 Neo', brand: 'Motorola', tier: 'intermediate', os: 'android', screenHz: 144, touchSamplingRate: 360, defaultDpi: 411 },
  { id: 'moto-edge-30', name: 'Motorola Edge 30', brand: 'Motorola', tier: 'intermediate', os: 'android', screenHz: 144, touchSamplingRate: 360, defaultDpi: 411 },
  { id: 'moto-g84', name: 'Moto G84 5G', brand: 'Motorola', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'moto-g54', name: 'Moto G54 5G', brand: 'Motorola', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'moto-g34', name: 'Moto G34 5G', brand: 'Motorola', tier: 'basic', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 384 },
  { id: 'moto-g24', name: 'Moto G24 Power', brand: 'Motorola', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 384 },
  { id: 'moto-g14', name: 'Moto G14', brand: 'Motorola', tier: 'basic', os: 'android', screenHz: 60, touchSamplingRate: 120, defaultDpi: 384 },
  { id: 'moto-g73', name: 'Moto G73 5G', brand: 'Motorola', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'moto-g53', name: 'Moto G53 5G', brand: 'Motorola', tier: 'basic', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 384 },
  { id: 'moto-g22', name: 'Moto G22', brand: 'Motorola', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 384 },
  { id: 'moto-e22', name: 'Moto E22 / E13', brand: 'Motorola', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 360 },

  // ================= REALME =================
  { id: 'realme-gt5-pro', name: 'Realme GT 5 Pro', brand: 'Realme', tier: 'flagship', os: 'android', screenHz: 144, touchSamplingRate: 480, defaultDpi: 420 },
  { id: 'realme-12-proplus', name: 'Realme 12 Pro+ 5G', brand: 'Realme', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 400 },
  { id: 'realme-11-proplus', name: 'Realme 11 Pro+ 5G', brand: 'Realme', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 360, defaultDpi: 400 },
  { id: 'realme-c67', name: 'Realme C67 (4G/5G)', brand: 'Realme', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 380 },
  { id: 'realme-c55', name: 'Realme C55', brand: 'Realme', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 380 },
  { id: 'realme-c53', name: 'Realme C53', brand: 'Realme', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 380 },

  // ================= INFINIX =================
  { id: 'infinix-gt20-pro', name: 'Infinix GT 20 Pro (Gaming)', brand: 'Infinix', tier: 'flagship', os: 'android', screenHz: 144, touchSamplingRate: 360, defaultDpi: 400 },
  { id: 'infinix-hot40-pro', name: 'Infinix Hot 40 Pro', brand: 'Infinix', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 390 },
  { id: 'infinix-note30-5g', name: 'Infinix Note 30 5G', brand: 'Infinix', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 390 },
  { id: 'infinix-smart8', name: 'Infinix Smart 8 Pro', brand: 'Infinix', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 360 },

  // ================= TECNO =================
  { id: 'tecno-pova-6-pro', name: 'Tecno Pova 6 Pro 5G', brand: 'Tecno', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 360, defaultDpi: 400 },
  { id: 'tecno-camon-30', name: 'Tecno Camon 30 Pro', brand: 'Tecno', tier: 'intermediate', os: 'android', screenHz: 144, touchSamplingRate: 240, defaultDpi: 400 },
  { id: 'tecno-spark-20-pro', name: 'Tecno Spark 20 Pro+', brand: 'Tecno', tier: 'basic', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 380 },

  // ================= ASUS ROG / ZENFONE =================
  { id: 'asus-rog8-pro', name: 'Asus ROG Phone 8 Pro', brand: 'Asus ROG', tier: 'flagship', os: 'android', screenHz: 165, touchSamplingRate: 720, defaultDpi: 420 },
  { id: 'asus-rog7-ultimate', name: 'Asus ROG Phone 7 Ultimate', brand: 'Asus ROG', tier: 'flagship', os: 'android', screenHz: 165, touchSamplingRate: 720, defaultDpi: 420 },
  { id: 'asus-rog6', name: 'Asus ROG Phone 6', brand: 'Asus ROG', tier: 'flagship', os: 'android', screenHz: 165, touchSamplingRate: 720, defaultDpi: 420 },
  { id: 'asus-zenfone10', name: 'Asus Zenfone 10', brand: 'Asus ROG', tier: 'flagship', os: 'android', screenHz: 144, touchSamplingRate: 240, defaultDpi: 440 },

  // ================= NUBIA / REDMAGIC =================
  { id: 'nubia-redmagic-9pro', name: 'RedMagic 9 Pro (Gamer)', brand: 'Nubia / RedMagic', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 720, defaultDpi: 420 },
  { id: 'nubia-redmagic-8spro', name: 'RedMagic 8S Pro', brand: 'Nubia / RedMagic', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 720, defaultDpi: 420 },

  // ================= ONEPLUS =================
  { id: 'oneplus-12', name: 'OnePlus 12', brand: 'OnePlus', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 480, defaultDpi: 450 },
  { id: 'oneplus-11', name: 'OnePlus 11', brand: 'OnePlus', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 360, defaultDpi: 450 },
  { id: 'oneplus-nord-3', name: 'OnePlus Nord 3 5G', brand: 'OnePlus', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 360, defaultDpi: 400 },

  // ================= OPPO =================
  { id: 'oppo-find-x7-ultra', name: 'Oppo Find X7 Ultra', brand: 'Oppo', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 420 },
  { id: 'oppo-reno11-pro', name: 'Oppo Reno 11 Pro', brand: 'Oppo', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 400 },
  { id: 'oppo-a78', name: 'Oppo A78 5G', brand: 'Oppo', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 380 },

  // ================= VIVO =================
  { id: 'vivo-x100-pro', name: 'Vivo X100 Pro', brand: 'Vivo', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 300, defaultDpi: 420 },
  { id: 'vivo-v30', name: 'Vivo V30 5G', brand: 'Vivo', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 300, defaultDpi: 400 },
  { id: 'vivo-y36', name: 'Vivo Y36', brand: 'Vivo', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 380 },

  // ================= GOOGLE PIXEL =================
  { id: 'pixel-9-pro', name: 'Google Pixel 9 Pro XL', brand: 'Google Pixel', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 420 },
  { id: 'pixel-8-pro', name: 'Google Pixel 8 Pro', brand: 'Google Pixel', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 420 },
  { id: 'pixel-8a', name: 'Google Pixel 8a', brand: 'Google Pixel', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'pixel-7a', name: 'Google Pixel 7a', brand: 'Google Pixel', tier: 'intermediate', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 411 },

  // ================= HUAWEI & HONOR =================
  { id: 'huawei-pura70-ultra', name: 'Huawei Pura 70 Ultra', brand: 'Huawei', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 300, defaultDpi: 420 },
  { id: 'honor-magic6-pro', name: 'Honor Magic 6 Pro', brand: 'Honor', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 360, defaultDpi: 420 },
  { id: 'honor-90', name: 'Honor 90 5G', brand: 'Honor', tier: 'intermediate', os: 'android', screenHz: 120, touchSamplingRate: 300, defaultDpi: 400 },

  // ================= SONY =================
  { id: 'sony-xperia-1vi', name: 'Sony Xperia 1 VI', brand: 'Sony', tier: 'flagship', os: 'android', screenHz: 120, touchSamplingRate: 240, defaultDpi: 411 },
  { id: 'sony-xperia-10v', name: 'Sony Xperia 10 V', brand: 'Sony', tier: 'intermediate', os: 'android', screenHz: 60, touchSamplingRate: 120, defaultDpi: 390 },

  // ================= NOKIA =================
  { id: 'nokia-g42', name: 'Nokia G42 5G', brand: 'Nokia', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 360 },
  { id: 'nokia-c32', name: 'Nokia C32', brand: 'Nokia', tier: 'basic', os: 'android', screenHz: 60, touchSamplingRate: 120, defaultDpi: 360 },

  // ================= LG =================
  { id: 'lg-velvet', name: 'LG Velvet', brand: 'LG', tier: 'intermediate', os: 'android', screenHz: 60, touchSamplingRate: 120, defaultDpi: 400 },
  { id: 'lg-k62', name: 'LG K62 / K52', brand: 'LG', tier: 'basic', os: 'android', screenHz: 60, touchSamplingRate: 120, defaultDpi: 360 },

  // ================= ZTE & ITEL =================
  { id: 'zte-blade-v50', name: 'ZTE Blade V50 Smart', brand: 'ZTE', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 360 },
  { id: 'itel-p55-plus', name: 'Itel P55+', brand: 'Itel', tier: 'basic', os: 'android', screenHz: 90, touchSamplingRate: 180, defaultDpi: 360 },
  { id: 'itel-s23-plus', name: 'Itel S23+', brand: 'Itel', tier: 'basic', os: 'android', screenHz: 60, touchSamplingRate: 120, defaultDpi: 360 },

  // ================= LENOVO =================
  { id: 'lenovo-legion-y90', name: 'Lenovo Legion Y90 (Gaming)', brand: 'Lenovo', tier: 'flagship', os: 'android', screenHz: 144, touchSamplingRate: 720, defaultDpi: 420 },
];

/**
 * Obtém a lista de marcas disponíveis de forma única e ordenada
 */
export function getAllBrands(): string[] {
  const brandSet = new Set<string>();
  DEVICE_DATABASE.forEach(dev => brandSet.add(dev.brand));
  return Array.from(brandSet).sort((a, b) => {
    // Prioriza marcas muito populares no topo
    const priority = ['Samsung', 'Apple', 'Xiaomi', 'Redmi', 'Poco', 'Motorola', 'Realme'];
    const indexA = priority.indexOf(a);
    const indexB = priority.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });
}

/**
 * Filtra modelos por marca e termo de busca opcional
 */
export function getModels(brand?: string, searchQuery?: string): DeviceInfo[] {
  return DEVICE_DATABASE.filter(item => {
    const matchesBrand = brand ? item.brand.toLowerCase() === brand.toLowerCase() : true;
    if (!searchQuery) return matchesBrand;

    const term = searchQuery.toLowerCase().trim();
    const matchesQuery = item.name.toLowerCase().includes(term) || item.brand.toLowerCase().includes(term);
    return matchesBrand && matchesQuery;
  });
}

/**
 * Encontra um aparelho pelo ID
 */
export function getDeviceById(id: string): DeviceInfo | undefined {
  return DEVICE_DATABASE.find(item => item.id === id);
}

/**
 * Cria um dispositivo customizado para quem selecionou "Meu modelo não está aqui"
 */
export function createCustomDevice(params: {
  customName: string;
  tier: DeviceTier;
  os: DeviceOS;
}): DeviceInfo {
  const defaultsByTier: Record<DeviceTier, { screenHz: 60 | 90 | 120; touchSamplingRate: number; defaultDpi: number }> = {
    basic: { screenHz: 60, touchSamplingRate: 120, defaultDpi: 360 },
    intermediate: { screenHz: 90, touchSamplingRate: 240, defaultDpi: 392 },
    flagship: { screenHz: 120, touchSamplingRate: 360, defaultDpi: 411 },
  };

  const defaults = defaultsByTier[params.tier];

  return {
    id: `custom-${Date.now()}-${params.customName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    name: params.customName.trim() || 'Aparelho Personalizado',
    brand: 'Personalizado',
    tier: params.tier,
    os: params.os,
    screenHz: defaults.screenHz,
    touchSamplingRate: defaults.touchSamplingRate,
    defaultDpi: params.os === 'ios' ? 460 : defaults.defaultDpi,
  };
}
