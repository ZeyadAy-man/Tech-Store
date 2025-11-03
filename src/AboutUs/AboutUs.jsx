import { Canvas } from "@react-three/fiber";
import ModelLoader from "../Service/ModelLoader";
import { Center, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import styles from "./AboutUs.module.css"
import { Laptop, Headphones, Star, Heart } from "lucide-react";

export default function AboutUs() {
  return (
    <>
        <div className={styles.container}>
      <section className={styles.section}>
        <h1 className={styles.title}>
          About <span className={styles.brand}>TechNova</span>
        </h1>

        <p className={styles.description}>
          At <span className={styles.brand}>TechNova</span>, we believe technology should feel simple,
          stylish, and accessible. From powerful laptops to immersive headphones,
          we bring the latest tech to your fingertips — with care, passion, and trust.
        </p>

        <div className={styles.cards}>
          <div className={styles.card}>
            <Laptop className={styles.icon} />
            <h3 className={styles.cardTitle}>Our Story</h3>
            <p className={styles.cardText}>
              What started as a small corner shop grew into a community of tech lovers.
              We’re here to help you find the perfect gear for work, play, and everything in between.
            </p>
          </div>

          <div className={styles.card}>
            <Heart className={styles.icon} />
            <h3 className={styles.cardTitle}>Our Mission</h3>
            <p className={styles.cardText}>
              To make technology friendly — not frustrating. We offer honest advice,
              reliable service, and the kind of support you’d expect from a friend.
            </p>
          </div>

          <div className={styles.card}>
            <Star className={styles.icon} />
            <h3 className={styles.cardTitle}>Why Choose Us</h3>
            <p className={styles.cardText}>
              Great prices, trusted brands, and fast support — that’s the TechNova promise.
              Because we know your tech should work as hard as you do.
            </p>
          </div>
        </div>

        <div className={styles.footer}>
          <Headphones className={styles.footerIcon} />
          <p className={styles.footerText}>
            Join thousands of happy customers who trust TechNova for their daily tech needs.
          </p>
        </div>
      </section>
    </div>

      <Canvas
        style={{ width: "100vw", height: "100vh", backgroundColor: "#FFFF00" }}
        camera={{ position: [0, 2.2, 5], fov: 50 }}
      >
        <directionalLight intensity={3} position={[15, 0, 0]} />
        <OrbitControls />
        <Center>
          <ModelLoader url={"/earth.glb"} scale={[0.1, 0.1, 0.1]} />
        </Center>
      </Canvas>
    </>
  );
}
