// App.tsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { WallPaper } from './components/Wallpaper/Wallpaper';
import { PspModel } from './components/PspModel/PspModel';
import './App.css';
import { Interface } from './components/Interface/Interface';
import { InterfaceHeader } from './components/InterfaceHeader/InterfaceHeader';

export const App = () => {
  return (
    <div className="background">
      <div className="psp-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 5]} intensity={1} />
          <Suspense fallback={null}>
            <PspModel />
            <WallPaper />
          </Suspense>
        </Canvas>
        <div className="interface-overlay">
          <InterfaceHeader />
          <Interface />
        </div>
      </div>
    </div>
  );
};
export default App;
