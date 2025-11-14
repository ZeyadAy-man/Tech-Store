import { Canvas } from "@react-three/fiber";
import LaptopModel from "./LaptopModel";
import { ScrollControls, OrbitControls } from "@react-three/drei";
import PageSections from "./PageSections";

export default function Result() {
  return (
    <>
      {/* 3D Scene */}

      <Canvas
        style={{ position: "fixed", inset: 0, backgroundColor: "white" }}
        camera={{ position: [36, 68, 8], fov: 85 }}
      >
        <ScrollControls pages={0} damping={0.1}>
          <directionalLight intensity={20} />
          {/* <OrbitControls/> */}
          <LaptopModel />
        </ScrollControls>
      </Canvas>

      {/* 2D Page Content */}
      <PageSections />
    </>
  );
}
