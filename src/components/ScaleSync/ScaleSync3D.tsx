import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { BASE_VIEWPORT_WIDTH, BASE_VIEWPORT_HEIGHT, SCALE_FACTOR } from '../../constants';

/**
 * Компонент внутри Canvas для синхронизации CSS переменных с реальным viewport из three.js
 * Использует реальный viewport, чтобы точно соответствовать масштабированию Wallpaper
 */
export const ScaleSync3D = () => {
  const { viewport } = useThree();

  useEffect(() => {
    // Вычисляем масштаб точно так же, как в Wallpaper
    const scaleX = viewport.width / BASE_VIEWPORT_WIDTH;
    const scaleY = viewport.height / BASE_VIEWPORT_HEIGHT;
    
    // Используем минимальное значение
    let calculatedScale = Math.min(scaleX, scaleY);
    
    // Добавляем те же коэффициенты безопасности, что и в Wallpaper
    if (viewport.width < BASE_VIEWPORT_WIDTH * 0.5) {
      calculatedScale *= 0.7;
    } else if (viewport.width < BASE_VIEWPORT_WIDTH * 0.8) {
      calculatedScale *= 0.85;
    }
    
    // Вычисляем базовый размер в vw единицах
    // Для эталонного разрешения 1920x1080: 0.6vw = базовый размер
    // SCALE_FACTOR применяется отдельно через CSS transform на interface-overlay
    const baseSizeVw = 0.7 * calculatedScale;
    
    // Ограничиваем базовый размер
    const clampedBaseSize = Math.max(0.25, Math.min(1.8, baseSizeVw));
    
    // Обновляем CSS переменную
    document.documentElement.style.setProperty('--base-size', `${clampedBaseSize}vw`);
  }, [viewport.width, viewport.height]);

  return null;
};

