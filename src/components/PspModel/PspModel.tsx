import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { BASE_VIEWPORT_WIDTH, BASE_VIEWPORT_HEIGHT, DEFAULT_MODEL_POSITION, DEFAULT_MODEL_ROTATION } from '../../constants';

export const PspModel = () => {
  const { scene } = useGLTF('/models/psp.glb');
  const { viewport } = useThree();
  const modelRef = useRef<THREE.Group>(null);
  const scrollY = useRef(0);
  const targetRotation = useRef<[number, number, number]>(DEFAULT_MODEL_ROTATION);
  const targetPosition = useRef<[number, number, number]>(DEFAULT_MODEL_POSITION);

  // Вычисляем масштаб на основе viewport для сохранения пропорций
  // Используем ту же логику, что и в Wallpaper, но без SCALE_FACTOR
  const scale = useMemo(() => {
    const scaleX = viewport.width / BASE_VIEWPORT_WIDTH;
    const scaleY = viewport.height / BASE_VIEWPORT_HEIGHT;
    // Используем минимальное значение для сохранения пропорций
    // Это гарантирует, что модель уменьшится при маленькой ширине или высоте
    let calculatedScale = Math.min(scaleX, scaleY);
    
    // Добавляем коэффициент безопасности для маленьких экранов (такой же как в Wallpaper)
    // Если viewport очень маленький, дополнительно уменьшаем масштаб
    if (viewport.width < BASE_VIEWPORT_WIDTH * 0.5) {
      calculatedScale *= 0.7; // Дополнительное уменьшение на 30% для очень маленьких экранов
    } else if (viewport.width < BASE_VIEWPORT_WIDTH * 0.8) {
      calculatedScale *= 0.85; // Дополнительное уменьшение на 15% для маленьких экранов
    }
    
    // Ограничиваем масштаб для экстремальных соотношений сторон
    // Минимум: 0.1 (для очень маленьких экранов), Максимум: 2.0 (для очень больших экранов)
    return Math.max(0.1, Math.min(2.0, calculatedScale));
  }, [viewport.width, viewport.height]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Улучшаем материалы для лучшего отображения света
        if (child.material) {
          // Если материал - массив
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhongMaterial) {
                mat.needsUpdate = true;
              } else if (mat instanceof THREE.MeshBasicMaterial) {
                // Конвертируем MeshBasicMaterial в MeshStandardMaterial для реакции на свет
                const newMat = new THREE.MeshStandardMaterial({
                  color: mat.color,
                  map: mat.map,
                  transparent: mat.transparent,
                  opacity: mat.opacity,
                });
                child.material = newMat;
              }
            });
          } else {
            if (child.material instanceof THREE.MeshStandardMaterial || child.material instanceof THREE.MeshPhongMaterial) {
              child.material.needsUpdate = true;
            } else if (child.material instanceof THREE.MeshBasicMaterial) {
              const newMat = new THREE.MeshStandardMaterial({
                color: child.material.color,
                map: child.material.map,
                transparent: child.material.transparent,
                opacity: child.material.opacity,
              });
              child.material = newMat;
            }
          }
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollY.current += e.deltaY * 0.001;
      
      const rotationY = DEFAULT_MODEL_ROTATION[1] + scrollY.current * 2;
      
      targetRotation.current = [DEFAULT_MODEL_ROTATION[0], rotationY, DEFAULT_MODEL_ROTATION[2]];
    };

    const handleDoubleClick = () => {
      scrollY.current = 0;
      targetRotation.current = DEFAULT_MODEL_ROTATION;
      targetPosition.current = DEFAULT_MODEL_POSITION;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('dblclick', handleDoubleClick);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('dblclick', handleDoubleClick);
    };
  }, []);

  // Smooth animation
  useFrame(() => {
    if (modelRef.current) {
      const currentRotation = modelRef.current.rotation;
      const currentPosition = modelRef.current.position;

      // Smooth rotation
      currentRotation.x = THREE.MathUtils.lerp(
        currentRotation.x,
        targetRotation.current[0],
        0.1
      );
      currentRotation.y = THREE.MathUtils.lerp(
        currentRotation.y,
        targetRotation.current[1],
        0.1
      );
      currentRotation.z = THREE.MathUtils.lerp(
        currentRotation.z,
        targetRotation.current[2],
        0.1
      );

      // Smooth position
      currentPosition.x = THREE.MathUtils.lerp(
        currentPosition.x,
        targetPosition.current[0],
        0.1
      );
      currentPosition.y = THREE.MathUtils.lerp(
        currentPosition.y,
        targetPosition.current[1],
        0.1
      );
      currentPosition.z = THREE.MathUtils.lerp(
        currentPosition.z,
        targetPosition.current[2],
        0.1
      );
    }
  });

  return (
    <group position={[0, 0, 0]} rotation={[Math.PI / 2, Math.PI, Math.PI]} scale={[scale, scale, scale]}>
      <group
        ref={modelRef}
        position={DEFAULT_MODEL_POSITION} 
        rotation={DEFAULT_MODEL_ROTATION}
        castShadow
        receiveShadow
      >
        <primitive 
          object={scene}
        />
      </group>
    </group>
  );
};
