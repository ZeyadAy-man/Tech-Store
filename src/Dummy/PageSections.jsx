import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect } from "react";

export default function PageSections() {
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const event = new CustomEvent("scroll-progress", {
      detail: latest,
    });
    window.dispatchEvent(event);
  });

  return (
    <div style={{ height: "300vh", paddingTop: "100vh" }}>
      <h1 style={{ fontSize: "3rem", textAlign: "center" }}>
        Scroll Down to Animate the Laptop
      </h1>
    </div>
  );
}
