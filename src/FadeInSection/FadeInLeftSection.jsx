import React from "react";
import styles from "./FadeInLeftSection.module.css";

export default function FadeInLeftSection({ children }) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      className={`${styles.fadeInSection} ${isVisible ? styles.isVisible : ''}`}
      ref={domRef}
    >
      {children}
    </div>
  );
}
