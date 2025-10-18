// ContactPage.jsx
import React, { useState } from "react";
import styles from "./ContactUs.module.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success"|"error", text }

  // Replace these with your EmailJS credentials (if you use EmailJS)
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Please enter a valid email.";
    if (!form.message.trim()) return "Please write your message.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    const v = validate();
    if (v) {
      setStatus({ type: "error", text: v });
      return;
    }
    setLoading(true);

    try {
      // If you want to use EmailJS uncomment below and set IDs above
      /*
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        from_phone: form.phone,
        subject: form.subject,
        message: form.message,
      };
      await send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      */

      // For now we simulate success (remove simulation when using EmailJS)
      await new Promise((r) => setTimeout(r, 900));

      setStatus({ type: "success", text: "Message sent — we will reply soon." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", text: "Failed to send message. Try again later." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.gridBackground} aria-hidden="true" />

      <main className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.cardInner}>
            <header className={styles.header}>
              <h1 className={styles.title}>Contact Us</h1>
              <p className={styles.subtitle}>
                Questions about products, shipping, warranty or bulk orders? Send us a message — we’re here to help.
              </p>
            </header>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {status && (
                <div
                  className={status.type === "success" ? styles.alertSuccess : styles.alertError}
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
                <button className={styles.sendBtn} type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <div className={styles.quick}>
                  <a href="mailto:zeyad4wonly@gmail.com" className={styles.quickLink}>zeyad4wonly@gmail.com</a>
                  <a href="tel:+20 1011823873" className={styles.quickLink}>+20 1011823873</a>
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
  );
}
