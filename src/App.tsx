// App.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import './App.css'
import { WallPaper } from "./components/Wallpaper/Wallpaper";
import { Suspense } from "react";
function PSPModel() {
  const { scene } = useGLTF("/models/psp.glb");
  return <primitive className ='model' object={scene} />;
}

// function App() {
//   return (
//     <div className="background">
//     {/* <Canvas className="canvas">
//       <ambientLight />
//       <pointLight position={[12, 0, 10]} />
//       <PSPModel/>
//       <OrbitControls />
//     </Canvas> */}
//     <Canvas className="canvas">
//     <WallPaper/>
//     </Canvas>
//     </div>
//   );
// }

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
        backgroundColor: '#1a1a1a',
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />

        <Suspense fallback={null}>
          <WallPaper />
        </Suspense>
      </Canvas>
    </div>
    </div>
  );
};

export default App;
