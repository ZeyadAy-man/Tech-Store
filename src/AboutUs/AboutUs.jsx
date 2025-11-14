import { Canvas } from "@react-three/fiber";
import ModelLoader from "../Service/ModelLoader";
import { Center } from "@react-three/drei";
import styles from "./AboutUs.module.css";
import { Laptop, Headphones, Star, Heart } from "lucide-react";
import FadeInRightSection from "../FadeInSection/FadeInRightSection";
import FadeInLeftSection from "../FadeInSection/FadeInLeftSection";

export default function AboutUs() {
  return (
    <>
      {/* 3D Background */}
      <div className={styles.scrollContainer}>
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 2.2, 5], fov: 50 }} style={{backgroundColor: '#00306bff'}}>
          <directionalLight intensity={3} position={[12, 0, 0]} />
          <Center>
            <ModelLoader url={"/earth3.glb"} props={{ scale: [5, 5, 5] }} />
          </Center>
        </Canvas>
      </div>

      {/* ✨ Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Welcome to <span>TechNova</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Innovation. Design. Passion — powering the next generation of
              technology.
            </p>
            <button className={styles.heroButton}>Explore Our Story</button>
          </div>
          <div className={styles.scrollIndicator}>↓ Scroll Down</div>
        </section>

        {/* Main content (on top of canvas) */}
        <div className={styles.container}>
          <section className={styles.section}>
            <h1 className={styles.title}>
              About <span className={styles.brand}>TechNova</span>
            </h1>

            <p className={styles.description}>
              At <span className={styles.brand}>TechNova</span>, we believe
              technology should feel simple, stylish, and accessible. From
              powerful laptops to immersive headphones, we bring the latest tech
              to your fingertips — with care, passion, and trust.
            </p>

            {/* <div className={styles.cards}> */}
            <div className={styles.leftCardContainer}>
              <FadeInLeftSection>
                <div className={styles.card}>
                  <Laptop className={styles.icon} />
                  <h3 className={styles.cardTitle}>Our Story</h3>
                  <p className={styles.cardText}>
                    What started as a small corner shop grew into a community of
                    tech lovers. We’re here to help you find the perfect gear
                    for work, play, and everything in between.
                  </p>
                </div>
              </FadeInLeftSection>
            </div>
            <div className={styles.rightCardContainer}>
              <FadeInRightSection>
                <div className={styles.card}>
                  <Heart className={styles.icon} />
                  <h3 className={styles.cardTitle}>Our Mission</h3>
                  <p className={styles.cardText}>
                    To make technology friendly — not frustrating. We offer
                    honest advice, reliable service, and the kind of support
                    you’d expect from a friend.
                  </p>
                </div>
              </FadeInRightSection>
            </div>
            <div className={styles.leftCardContainer}>
              <FadeInLeftSection>
                <div className={styles.card}>
                  <Star className={styles.icon} />
                  <h3 className={styles.cardTitle}>Why Choose Us</h3>
                  <p className={styles.cardText}>
                    Great prices, trusted brands, and fast support — that’s the
                    TechNova promise. Because we know your tech should work as
                    hard as you do.
                  </p>
                </div>
              </FadeInLeftSection>
            </div>
            {/* </div> */}
            {/* 🌍 Reachable Everywhere Section */}
            {/* <FadeInSection> */}
            <section className={styles.reachSection}>
              <h2 className={styles.reachTitle}>We’re Reachable Everywhere</h2>
              <p className={styles.reachText}>
                From local customers to global partners, TechNova connects the
                world through innovation. Wherever you are, we’re just a click
                away.
              </p>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}
