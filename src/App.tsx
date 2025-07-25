// App.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './App.css';
import { WallPaper } from './components/Wallpaper/Wallpaper';
import { Suspense } from 'react';
import { PspModel } from './components/PspModel/PspModel';

export const App = () => {
  return (
    <div className="background">
      <div
        style={{
          width: '960px',
          height: '544px',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          backgroundColor: '#1a1a1a'
        }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 5]} intensity={1} />
          <OrbitControls enablePan={false} />
          <Suspense fallback={null}>
            / <PspModel />
            <WallPaper />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default App;
