// src/components/WallPaper.tsx
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ShaderMaterial } from 'three';
import { fragmentShader, vertexShader } from '../../utils/shaders';
import { BASE_VIEWPORT_WIDTH, BASE_VIEWPORT_HEIGHT, SCALE_FACTOR, WALLPAPER_POSITION } from '../../constants';

export const WallPaper = () => {
  const matRef = useRef<ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(() => ({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(size.width, size.height) }
  }), []);

  // Вычисляем масштаб на основе viewport для сохранения пропорций
  const scale = useMemo(() => {
    const scaleX = viewport.width / BASE_VIEWPORT_WIDTH;
    const scaleY = viewport.height / BASE_VIEWPORT_HEIGHT;
    // Используем минимальное значение для сохранения пропорций
    // Это гарантирует, что wallpaper уменьшится при маленькой ширине или высоте
    let calculatedScale = Math.min(scaleX, scaleY);
    
    // Добавляем коэффициент безопасности для маленьких экранов
    // Если viewport очень маленький, дополнительно уменьшаем масштаб
    if (viewport.width < BASE_VIEWPORT_WIDTH * 0.5) {
      calculatedScale *= 0.7; // Дополнительное уменьшение на 30% для очень маленьких экранов
    } else if (viewport.width < BASE_VIEWPORT_WIDTH * 0.8) {
      calculatedScale *= 0.85; // Дополнительное уменьшение на 15% для маленьких экранов
    }
    
    calculatedScale *= SCALE_FACTOR;
    
    // Ограничиваем масштаб для экстремальных соотношений сторон
    // Минимум: 0.1 (для очень маленьких экранов), Максимум: 2.0 (для очень больших экранов)
    return Math.max(0.1 * SCALE_FACTOR, Math.min(2.0 * SCALE_FACTOR, calculatedScale));
  }, [viewport.width, viewport.height]);

  useFrame(({ clock }) => {
    if (matRef.current && matRef.current.uniforms) {
      const elapsedTime = clock.getElapsedTime();
      if (isFinite(elapsedTime) && elapsedTime >= 0) {
        matRef.current.uniforms.iTime.value = elapsedTime;
      }
      const currentRes = matRef.current.uniforms.iResolution.value;
      if (currentRes.x !== size.width || currentRes.y !== size.height) {
        matRef.current.uniforms.iResolution.value.set(size.width, size.height);
      }
    }
  });

  return (
    <mesh position={WALLPAPER_POSITION} receiveShadow scale={[scale, scale, 1]}>
      <planeGeometry args={[BASE_VIEWPORT_WIDTH, BASE_VIEWPORT_HEIGHT]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
