import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import styles from "./FAQ.module.css";
import { Html } from "@react-three/drei";

export default function RotatingCardAroundPoint({ containerRef }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.15;
  });

  const coords = Coordinates();

  return (
    <RotatingCardAroundPointGUI coords={coords} groupRef={groupRef} containerRef={containerRef}/>
  );
}

function RotatingCardAroundPointGUI({groupRef, coords, containerRef}) {
  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {coords.map((v) => (
        <mesh
          key={v.id}
          position={v.pos}
          rotation={v.rot}
          onClick={() => {
            const el = document.getElementById(`sec-${v.id}`);
            if (el && containerRef.current) {
              containerRef.current.scrollTo({
                top: el.offsetTop,
                behavior: "smooth",
              });
            }
          }}
        >
          <Html transform distanceFactor={1} style={{ pointerEvents: "auto" }}>
            <div
              className={styles.faqCard}
              onClick={() => {
                const el = document.getElementById(`sec-${v.id}`);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  console.warn("Not found: sec-" + v.id);
                }
              }}
            >
              <h3>{v.name}</h3>
              <p>Click to see section</p>
            </div>
          </Html>
        </mesh>
      ))}
    </group>
  );
}

const Coordinates = () => {
  return [
    {
      pos: [3, 0, 0],
      rot: [0, Math.PI / 2, 0],
      name: "General Questions",
      id: 0,
    },
    {
      pos: [-3, 0, 0],
      rot: [0, (3 * Math.PI) / 2, 0],
      name: "Ordering & Payment",
      id: 1,
    },
    { pos: [0, 0, 3], rot: [0, 0, 0], name: "Shipping & Delivery", id: 2 },
    {
      pos: [0, 0, -3],
      rot: [0, Math.PI, 0],
      name: "Returns & Warranty",
      id: 3,
    },
  ];
}
