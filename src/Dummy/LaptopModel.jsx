import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

export default function LaptopModel() {
  const ref = useRef();
  const laptop = useGLTF("/laptop.glb");

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handler = (e) => setScroll(e.detail);
    window.addEventListener("scroll-progress", handler);
    return () => window.removeEventListener("scroll-progress", handler);
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    // Example animation:
    ref.current.rotation.y = scroll * Math.PI * 2;  // spin
    ref.current.position.y = scroll * -2;           // move upwards
    ref.current.scale.set(1 + scroll, 1 + scroll, 1 + scroll); // scale up
  });

  return <primitive ref={ref} object={laptop.scene} />;
}
