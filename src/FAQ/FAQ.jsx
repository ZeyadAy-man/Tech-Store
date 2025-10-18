import { useState, useRef } from "react";
import styles from "./FAQ.module.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { faqs } from "./FAQData";
import RotatingCardAroundPoint from "./RotatingCards";

export default function FAQPage() {
  const [open, setOpen] = useState(null);
  const containerRef = useRef(null);
  let i = 0;
  const toggle = (idx) => setOpen(open === idx ? null : idx);

  return (
    <div style={{ overflowX: "hidden" }}>
      <FAQPage3DSection containerRef={containerRef} />
      <FAQPage2DSection containerRef={containerRef} i={i} toggle={toggle}/>
    </div>
  );
}

function FAQPage2DSection({containerRef, i, toggle}) {
  return (
    <div ref={containerRef} className={styles.faqContainer}>
      <h1 className={styles.faqTitle}>Frequently Asked Questions</h1>

      {faqs.map((sec, sIndex) => (
        <div key={sIndex} id={`sec-${sIndex}`} className={styles.faqSection}>
          <h2 className={styles.faqCategory}>{sec.category}</h2>
          {sec.questions.map((qObj, qIndex) => {
            const idx = i++;
            const openNow = open === idx;
            return (
              <div
                key={qIndex}
                className={`${styles.faqItem} ${openNow ? styles.open : ""}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggle(idx)}
                >
                  {qObj.q}
                  <span className={styles.arrow}>{openNow ? "−" : "+"}</span>
                </button>
                <div
                  className={styles.faqAnswer}
                  style={{
                    maxHeight: openNow ? "200px" : "0px",
                    opacity: openNow ? 1 : 0,
                  }}
                >
                  <p>{qObj.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function FAQPage3DSection({ containerRef }) {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh", background: "#0096FF" }}
      gl={{ antialias: false }}
      dpr={[1, 2]}
    >
      <RotatingCardAroundPoint containerRef={containerRef} />
      <OrbitControls
        target={[0, 0, -1]}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
