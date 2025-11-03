// ContactPage.jsx
import { useState, useEffect } from "react";
import styles from "./ContactUs.module.css";
import { Canvas } from "@react-three/fiber";
import { useAnimations, useGLTF, Html } from "@react-three/drei";
import { useSpring, animated, easings } from "@react-spring/three";
export default function ContactPage() {
  const [error, setError] = useState({ errorMessage: "Welcome to contact us page!", robotPositionStatus: -1 });
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function validate() {
    if (!form.name.trim()) {
      setError({
        errorMessage: "Please enter your name.",
        robotPositionStatus: 0,
      });
      return false;
    } else if (!form.email.trim()) {
      setError({
        errorMessage: "Please enter your email.",
        robotPositionStatus: 1,
      });
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError({
        errorMessage: "Please enter a valid email.",
        robotPositionStatus: 1,
      });
      return false;
    } else if (!form.subject.trim()) {
      setError({
        errorMessage: "Please write your subject.",
        robotPositionStatus: 2,
      })
      return false;
    }
      else if (!form.message.trim()) {
      setError({
        errorMessage: "Please write your message.",
        robotPositionStatus: 3,
      });
      return false;
    }
    setError({errorMessage: "Your Message is sent successfully!", robotPositionStatus: 4})
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    const v = validate();
    if (!v) {
      setStatus({ type: "error", text: v });
      return;
    }
    setLoading(true);

    try {
      console.log(v, "before");
      await new Promise((r) => setTimeout(r, 900));

      setStatus({
        type: "success",
        text: "Message sent — we will reply soon.",
      });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        text: "Failed to send message. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={styles.page}
      style={{ position: "relative", width: "100vw", height: "100vh" }}
    >
      {/* 3D Canvas as background */}
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 2.2, 5], fov: 50 }}
      >
        <directionalLight intensity={20} />
        <AnimatedModel
          message={error.errorMessage}
          robotPositionStatus={error.robotPositionStatus}
        />
      </Canvas>

      {/* 2D form overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none", // allows clicks to pass through if needed
        }}
      >
        <main
          className={styles.wrap}
          style={{ pointerEvents: "auto", zIndex: 10 }}
        >
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <header className={styles.header}>
                <h1 className={styles.title}>Contact Us</h1>
                <p className={styles.subtitle}>
                  Questions about products, shipping, warranty or bulk orders?
                  Send us a message — we’re here to help.
                </p>
              </header>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {status && (
                  <div
                    className={
                      status.type === "success"
                        ? styles.alertSuccess
                        : styles.alertError
                    }
                    role="status"
                    aria-live="polite"
                  >
                    {status.text}
                  </div>
                )}

                <div className={styles.row}>
                  <label className={styles.field}>
                    <span className={styles.labelText}>Full name</span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Jane Doe"
                      required
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.labelText}>Email</span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="you@company.com"
                      required
                    />
                  </label>
                </div>

                <div className={styles.row}>
                  <label className={styles.field}>
                    <span className={styles.labelText}>Phone (optional)</span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="+1 555 555 555"
                    />
                  </label>

                  <label className={styles.field}>
                    <span className={styles.labelText}>Subject</span>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Order question / Warranty"
                    />
                  </label>
                </div>

                <label className={styles.fieldFull}>
                  <span className={styles.labelText}>Message</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows="6"
                    placeholder="Tell us what's up..."
                    required
                  />
                </label>

                <div className={styles.actions}>
                  <button
                    className={styles.sendBtn}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>

                  <div className={styles.quick}>
                    <a
                      href="mailto:zeyad4wonly@gmail.com"
                      className={styles.quickLink}
                    >
                      zeyad4wonly@gmail.com
                    </a>
                    <a href="tel:+20 1011823873" className={styles.quickLink}>
                      +20 1011823873
                    </a>
                  </div>
                </div>
              </form>

              <div className={styles.footer}>
                <div className={styles.scanLine} aria-hidden="true" />
                <div className={styles.tint} />
                <div className={styles.badge}>We reply within 24 hours</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function AnimatedModel({ message, robotPositionStatus }) {
  const gltf = useGLTF("/robot3.glb");
  const { actions } = useAnimations(gltf.animations, gltf.scene);
  const getCurrentPosition = () => {
    if(robotPositionStatus == 0){
      return [-3, 0, 0]
    }
    else if(robotPositionStatus == 1 || robotPositionStatus == 4 || robotPositionStatus == -1){
      return [3, 0, 0]
    }
    else if(robotPositionStatus == 2){
      return [3, -0.4, 0]
    }
    else if(robotPositionStatus == 3){
      return [-3, -0.4, 0]
    }
  }
  console.log(robotPositionStatus)
  const spring = useSpring({
    position: getCurrentPosition(),
    rotation: robotPositionStatus == 2 || robotPositionStatus == 1 || robotPositionStatus == 4 || robotPositionStatus == -1 ? [0, - 0.15 * Math.PI, 0] : [0, 0.15 * Math.PI, 0],
    config: {
      duration: 1000,
      easing: easings.easeInOutQuad,
    },
  });

  useEffect(() => {
    if (actions) {
      const firstAction = Object.values(actions)[0];
      firstAction.play();
    }
  }, [actions]);

  return (
    <animated.group
      position={spring.position}
      rotation={spring.rotation}
      scale={[2, 2, 2]}
      style={{ cursor: "pointer" }}
    >
      <primitive object={gltf.scene} />
      <Html
        position={[0.05, 0.95, 0]}
        center
        transform
        distanceFactor={1}
        style={{ pointerEvents: "auto" }}
      >
        <div
          style={{
            background: robotPositionStatus == 4 || robotPositionStatus == -1 ? "rgba(0, 177, 35, 0.9)" : "rgba(177, 15, 0, 0.9)",
            padding: "8px 12px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            whiteSpace: "nowrap",
            fontWeight: "bold",
            // opacity: 0
          }}
        >
          {message}
        </div>
      </Html>
    </animated.group>
  );
}
