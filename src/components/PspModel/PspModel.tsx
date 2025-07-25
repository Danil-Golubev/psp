import { useGLTF } from '@react-three/drei';

export const PspModel = () => {
  const { scene } = useGLTF('/models/psp.glb');

  return (
    <group
      position={[0, -1, 0]} // немного ниже центра
      rotation={[Math.PI / 2, Math.PI, Math.PI]} // поворот вручную: лежит экраном вверх
      scale={[1, 1, 1]}>
      {/* Компенсация кривого центра модели */}
      <primitive object={scene} position={[0, 0.6, 0]} />
    </group>
  );
};
