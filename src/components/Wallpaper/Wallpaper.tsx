// src/components/WallPaper.tsx
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ShaderMaterial } from 'three';
import { fragmentShader, vertexShader } from '../../utils/shaders';

export const WallPaper = () => {
  const matRef = useRef<ShaderMaterial>(null);
  const { size, viewport } = useThree();

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.iTime.value = clock.getElapsedTime();
      matRef.current.uniforms.iResolution.value.set(size.width, size.height);
    }
  });

  return (
    <mesh position={[0, 0, -3.5]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2(size.width, size.height) }
        }}
      />
    </mesh>
  );
};
