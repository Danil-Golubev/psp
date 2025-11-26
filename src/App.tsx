// App.tsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { WallPaper } from './components/Wallpaper/Wallpaper';
import { PspModel } from './components/PspModel/PspModel';
import { ScaleSync3D } from './components/ScaleSync/ScaleSync3D';
import './App.css';
import { Interface } from './components/Interface/Interface';
import { InterfaceHeader } from './components/InterfaceHeader/InterfaceHeader';

export const App = () => {
  return (
    <div className="background">
      <div className="psp-container">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }} 
          shadows
          gl={{ alpha: false }}
        >
          {/* Основное окружающее освещение - уменьшено для контраста */}
          <ambientLight intensity={0.3} />
          
          {/* Мягкое верхнее освещение */}
          <hemisphereLight 
            color={0xffffff} 
            groundColor={0x333333} 
            intensity={0.6} 
          />
          
          {/* Основной направленный свет (для теней) - более яркий и контрастный */}
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={2.0} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-bias={-0.0001}
          />
          
          {/* Дополнительный свет спереди-слева для объема */}
          <directionalLight 
            position={[-4, 5, 4]} 
            intensity={0.8} 
            color={0xffffff}
          />
          
          {/* Подсветка справа для контраста */}
          <directionalLight 
            position={[5, 3, -3]} 
            intensity={0.5} 
            color={0xffffff}
          />
          
          {/* Мягкая точечная подсветка спереди */}
          <pointLight 
            position={[0, 5, 5]} 
            intensity={0.4} 
            color={0xffffff}
            distance={25}
          />
          
          {/* Яркий направленный свет от камеры вперед (за камеру) - основной фронтальный свет */}
          <directionalLight 
            position={[0, 0, 15]} 
            intensity={2.5} 
            color={0xffffff}
          />
          
          {/* Дополнительная подсветка спереди-сверху */}
          <directionalLight 
            position={[0, 3, 12]} 
            intensity={1.5} 
            color={0xffffff}
          />
          
          {/* Точечный свет прямо от камеры для яркого фронтального освещения */}
          <pointLight 
            position={[0, 0, 8]} 
            intensity={1.2} 
            color={0xffffff}
            distance={30}
          />
          
          <Suspense fallback={null}>
            <PspModel />
            <WallPaper />
            <ScaleSync3D />
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
