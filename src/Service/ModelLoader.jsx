import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ModelLoader({ props, url }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      firstAction.setLoop(THREE.LoopRepeat); // Loop infinitely
      firstAction.clampWhenFinished = true;  // Optional: hold last frame if loop ends
      firstAction.enable = true;
      firstAction.play();
    }
  }, [actions]);
  console.log(props.scale)
  return <primitive ref={group} object={scene} scale={props.scale} />;
}
