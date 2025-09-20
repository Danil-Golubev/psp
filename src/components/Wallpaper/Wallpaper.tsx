// src/components/WallPaper.tsx
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ShaderMaterial } from 'three';
import { fragmentShader, vertexShader } from '../../utils/shaders';

export const WallPaper = () => {
  const matRef = useRef<ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(() => ({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(size.width, size.height) }
  }), []);

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
    <mesh position={[0, 0, -3.5]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
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
