import { useGLTF } from '@react-three/drei';

export const PspModel = () => {
  const { scene } = useGLTF('/models/psp.glb');

  return (
    <group position={[0, -1, 0]} rotation={[Math.PI / 2, Math.PI, Math.PI]} scale={[1, 1, 1]}>
      <primitive object={scene} position={[0, 0.6, 0]} />
    </group>
  );
};
