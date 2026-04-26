import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [error, setError] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    setError("");

    let register_url = window.location.origin + "/djangoapp/register";

    const res = await fetch(register_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName,
        password,
        firstName,
        lastName,
        email,
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      setError("A user with that username already exists. Please choose another.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* ── Header ── */}
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>Best Cars Dealership</p>
            <h2 style={styles.title}>Create Account</h2>
          </div>
          <a href="/" onClick={gohome} style={styles.closeBtn} title="Back to home">
            <img src={close_icon} alt="Close" style={{ width: 18, opacity: 0.6 }} />
          </a>
        </div>

        <div style={styles.divider} />

        {/* ── Error banner ── */}
        {error && <div style={styles.errorBanner}>⚠️ {error}</div>}

        {/* ── Form ── */}
        <form onSubmit={register} style={styles.form}>

          {/* Row: first + last name */}
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>First Name</label>
              <div style={styles.inputWrap}>
                <img src={user_icon} alt="" style={styles.icon} />
                <input
                  type="text"
                  placeholder="Jane"
                  style={styles.input}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Last Name</label>
              <div style={styles.inputWrap}>
                <img src={user_icon} alt="" style={styles.icon} />
                <input
                  type="text"
                  placeholder="Smith"
                  style={styles.input}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Username */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrap}>
              <img src={user_icon} alt="" style={styles.icon} />
              <input
                type="text"
                placeholder="janesmith92"
                style={styles.input}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrap}>
              <img src={email_icon} alt="" style={styles.icon} />
              <input
                type="email"
                placeholder="jane@example.com"
                style={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrap}>
              <img src={password_icon} alt="" style={styles.icon} />
              <input
                type="password"
                placeholder="••••••••"
                style={styles.input}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" style={styles.submitBtn}>
            Create Account →
          </button>
        </form>

        <p style={styles.loginHint}>
          Already have an account?{" "}
          <a href="/login" style={styles.loginLink}>Sign in</a>
        </p>
      </div>
    </div>
  );
};

/* ── Inline styles (teal theme matching the site) ── */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #008b9e 0%, darkturquoise 60%, #26c6da 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    padding: "24px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "40px 44px 36px",
    width: "100%",
    maxWidth: "520px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "6px",
  },
  eyebrow: {
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: "darkturquoise",
    marginBottom: "4px",
  },
  title: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#1a2332",
    margin: 0,
  },
  closeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#f1f5f9",
    marginTop: 4,
    transition: "background 0.2s",
  },
  divider: {
    height: 2,
    background: "#e0f7fa",
    borderRadius: 2,
    margin: "18px 0 24px",
  },
  errorBanner: {
    background: "#fff0f0",
    border: "1.5px solid #f87171",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "0.86rem",
    color: "#b91c1c",
    marginBottom: "18px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#4a5568",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    background: "#f8fafc",
    paddingLeft: "12px",
    transition: "border-color 0.2s",
  },
  icon: {
    width: 18,
    opacity: 0.45,
    marginRight: "10px",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: "none",
    background: "transparent",
    padding: "11px 12px 11px 0",
    fontSize: "0.93rem",
    color: "#1a2332",
    outline: "none",
    fontFamily: "inherit",
  },
  submitBtn: {
    marginTop: "6px",
    padding: "13px",
    background: "linear-gradient(135deg, #008b9e, darkturquoise)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: 700,
    letterSpacing: "0.4px",
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.15s",
  },
  loginHint: {
    textAlign: "center",
    fontSize: "0.86rem",
    color: "#718096",
    marginTop: "20px",
    marginBottom: 0,
  },
  loginLink: {
    color: "darkturquoise",
    fontWeight: 600,
    textDecoration: "none",
    borderBottom: "1px solid transparent",
  },
};

export default Register;