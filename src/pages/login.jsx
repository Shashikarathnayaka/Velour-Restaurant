import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import App from './App.jsx';
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        setError("");
        if (!form.email || !form.password) { setError("Please fill in all required fields."); return; }
        if (mode === "signup") {
            if (!form.name) { setError("Please enter your full name."); return; }
            if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
            if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
        }
        setSuccess(true);
    };

    const switchMode = (m) => {
        setMode(m);
        setError("");
        setForm({ name: "", email: "", password: "", confirm: "" });
        setSuccess(false);
    };

    const inputStyle = {
        width: "100%",
        background: "rgba(200,168,96,0.05)",
        border: "0.5px solid rgba(200,168,96,0.28)",
        padding: "14px 18px",
        color: "#F5EDD8",
        fontFamily: "'Lato', sans-serif",
        fontSize: "14px",
        outline: "none",
        transition: "border-color 0.3s",
        borderRadius: "0px",
        letterSpacing: "0.03em",
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }
        body { background: #0A0806; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #110e09 inset;
          -webkit-text-fill-color: #F5EDD8;
        }
        input[type="password"]::-ms-reveal { display: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0806; }
        ::-webkit-scrollbar-thumb { background: rgba(200,168,96,0.28); border-radius: 2px; }
      `}</style>

            <div style={{
                minHeight: "100vh",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                background: "#0A0806",
            }}>

                {/* ── Left panel — atmospheric image side ── */}
                <div style={{
                    position: "relative",
                    overflow: "hidden",
                    background: "#060504",
                }}>
                    {/* Background image */}
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "brightness(0.38)",
                    }} />

                    {/* Gold gradient overlay */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(135deg, rgba(200,168,96,0.08) 0%, transparent 50%, rgba(10,8,6,0.6) 100%)",
                    }} />

                    {/* Floating dish images */}
                    {[
                        { src: "https://images.unsplash.com/photo-1558030006-450675393462?w=320&q=80", top: "12%", left: "8%", w: 170, delay: 0.4 },
                        { src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=320&q=80", top: "55%", left: "55%", w: 145, delay: 0.7 },
                        { src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=320&q=80", top: "68%", left: "6%", w: 155, delay: 0.55 },
                    ].map((d, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 0.72, y: 0 }}
                            transition={{ delay: d.delay, duration: 1.1, ease: "easeOut" }}
                            style={{ position: "absolute", top: d.top, left: d.left, width: d.w, pointerEvents: "none" }}
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3.5 + i * 0.6, ease: "easeInOut" }}
                                style={{ position: "relative" }}
                            >
                                <img src={d.src} alt=""
                                    style={{ width: "100%", height: d.w * 0.68, objectFit: "cover", display: "block" }} />
                                <div style={{
                                    position: "absolute", inset: 0,
                                    background: "linear-gradient(to bottom, transparent 30%, rgba(6,5,4,0.6) 100%)",
                                    border: "0.5px solid rgba(200,168,96,0.22)",
                                }} />
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* Logo + tagline */}
                    <div style={{
                        position: "absolute", bottom: "2.5rem", left: "2.5rem", right: "2.5rem",
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.9 }}
                        >
                            <div style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "38px", color: "#C8A860", letterSpacing: "0.06em",
                                marginBottom: "0.5rem",
                            }}>VELOUR</div>
                            <div style={{
                                fontFamily: "'Lato', sans-serif",
                                fontSize: "13px", color: "rgba(245,237,216,0.45)",
                                letterSpacing: "0.08em", lineHeight: 1.7,
                            }}>
                                Fine Dining · Est. 2019<br />
                                Colombo, Sri Lanka
                            </div>
                        </motion.div>
                    </div>

                    {/* Particle dots */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div key={i}
                            style={{
                                position: "absolute", borderRadius: "50%",
                                width: i % 3 === 0 ? 2 : 1, height: i % 3 === 0 ? 2 : 1,
                                background: `rgba(200,168,96,${0.2 + (i % 4) * 0.15})`,
                                left: `${8 + i * 7.5}%`, top: `${15 + (i * 43) % 70}%`,
                            }}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ repeat: Infinity, duration: 2.2 + (i % 3), delay: i * 0.3 }}
                        />
                    ))}

                    {/* <Link to="/" style={{ textDecoration: "none" }}> */}
                    <motion.div
                        // onClick={() => alert("clicked")}
                        onClick={() => navigate("/")}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        whileHover={{ x: -5 }}
                        style={{
                            position: "absolute",
                            top: "1.8rem",
                            left: "2rem",
                            fontFamily: "'Lato', sans-serif",
                            fontSize: "11px",
                            color: "rgba(200,168,96,0.55)",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                        }}
                    >
                        <span style={{ fontSize: "16px" }}>←</span>
                        Back to Site
                    </motion.div>
                    {/* </Link> */}

                    {/* Top nav back link
                    <motion.a
                        href="./App.jsx"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        style={{
                            position: "absolute", top: "1.8rem", left: "2rem",
                            fontFamily: "'Lato', sans-serif", fontSize: "11px",
                            color: "rgba(200,168,96,0.55)", letterSpacing: "0.18em",
                            textTransform: "uppercase", textDecoration: "none",
                            display: "flex", alignItems: "center", gap: "8px",
                        }}
                    >
                        <span style={{ fontSize: "16px" }}>←</span> Back to Site
                    </motion.a> */}
                </div>

                {/* ── Right panel — form side ── */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "3rem 2rem",
                    background: "#0D0B08",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    {/* Subtle background texture lines */}
                    {[...Array(5)].map((_, i) => (
                        <div key={i} style={{
                            position: "absolute",
                            top: `${10 + i * 18}%`, left: 0, right: 0,
                            height: "0.5px",
                            background: "rgba(200,168,96,0.04)",
                            pointerEvents: "none",
                        }} />
                    ))}

                    <div style={{ width: "100%", maxWidth: "400px", position: "relative" }}>

                        {/* Corner accents */}
                        <div style={{ position: "absolute", top: -24, left: -24, width: 32, height: 32, borderTop: "1px solid rgba(200,168,96,0.4)", borderLeft: "1px solid rgba(200,168,96,0.4)" }} />
                        <div style={{ position: "absolute", top: -24, right: -24, width: 32, height: 32, borderTop: "1px solid rgba(200,168,96,0.4)", borderRight: "1px solid rgba(200,168,96,0.4)" }} />
                        <div style={{ position: "absolute", bottom: -24, left: -24, width: 32, height: 32, borderBottom: "1px solid rgba(200,168,96,0.4)", borderLeft: "1px solid rgba(200,168,96,0.4)" }} />
                        <div style={{ position: "absolute", bottom: -24, right: -24, width: 32, height: 32, borderBottom: "1px solid rgba(200,168,96,0.4)", borderRight: "1px solid rgba(200,168,96,0.4)" }} />

                        <AnimatePresence mode="wait">
                            {success ? (

                                /* ── Success state ── */
                                <motion.div key="success"
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.55 }}
                                    style={{ textAlign: "center", padding: "2rem 0" }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 0.9, delay: 0.15 }}
                                        style={{ fontSize: "44px", color: "#C8A860", marginBottom: "1.75rem", display: "block" }}
                                    >✦</motion.div>
                                    <div style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: "32px", color: "#F5EDD8",
                                        fontWeight: 400, marginBottom: "0.75rem",
                                    }}>
                                        {mode === "login" ? "Welcome Back" : (
                                            <><span style={{ fontStyle: "italic", color: "#C8A860" }}>Welcome</span> to Velour</>
                                        )}
                                    </div>
                                    {form.name && (
                                        <div style={{
                                            fontFamily: "'Playfair Display', serif",
                                            fontStyle: "italic", fontSize: "17px",
                                            color: "rgba(200,168,96,0.7)", marginBottom: "1.25rem",
                                        }}>{form.name}</div>
                                    )}
                                    <div style={{
                                        fontFamily: "'Lato', sans-serif",
                                        fontSize: "13px", color: "rgba(245,237,216,0.42)",
                                        lineHeight: 1.8, marginBottom: "2.5rem",
                                    }}>
                                        {mode === "login"
                                            ? "You are now signed in.\nEnjoy your exclusive access."
                                            : "Your membership has been created.\nWe look forward to hosting you."}
                                    </div>
                                    <div style={{ width: 36, height: "0.5px", background: "rgba(200,168,96,0.3)", margin: "0 auto 2rem" }} />
                                    <motion.button
                                        whileHover={{ y: -3, scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => switchMode("login")}
                                        style={{
                                            background: "#C8A860", color: "#0A0806",
                                            border: "none", padding: "14px 40px",
                                            fontFamily: "'Lato', sans-serif", fontSize: "11px",
                                            letterSpacing: "0.2em", textTransform: "uppercase",
                                            cursor: "pointer",
                                        }}
                                    >Continue</motion.button>
                                </motion.div>

                            ) : (

                                /* ── Form state ── */
                                <motion.div key="form"
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {/* Header */}
                                    <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15, duration: 0.7 }}
                                            style={{
                                                fontFamily: "'Playfair Display', serif",
                                                fontSize: "11px", color: "#C8A860",
                                                letterSpacing: "0.42em", textTransform: "uppercase",
                                                marginBottom: "1rem",
                                            }}
                                        >VELOUR</motion.div>

                                        <motion.h1
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.22, duration: 0.7 }}
                                            style={{
                                                fontFamily: "'Playfair Display', serif",
                                                fontSize: "36px", color: "#F5EDD8",
                                                fontWeight: 400, margin: "0 0 0.3rem",
                                            }}
                                        >
                                            {mode === "login"
                                                ? "Sign In"
                                                : <><span style={{ fontStyle: "italic", color: "#C8A860" }}>Join</span> Us</>
                                            }
                                        </motion.h1>
                                        <div style={{
                                            fontFamily: "'Lato', sans-serif",
                                            fontSize: "12px", color: "rgba(245,237,216,0.3)",
                                            letterSpacing: "0.06em",
                                        }}>
                                            {mode === "login"
                                                ? "Access your exclusive membership"
                                                : "Create your Velour membership"}
                                        </div>
                                        <div style={{ width: 36, height: "0.5px", background: "rgba(200,168,96,0.35)", margin: "1.25rem auto 0" }} />
                                    </div>

                                    {/* Tab switcher */}
                                    <div style={{
                                        display: "flex",
                                        marginBottom: "2rem",
                                        borderBottom: "0.5px solid rgba(200,168,96,0.12)",
                                    }}>
                                        {[
                                            { key: "login", label: "Sign In" },
                                            { key: "signup", label: "Create Account" },
                                        ].map(({ key, label }) => (
                                            <button key={key}
                                                onClick={() => switchMode(key)}
                                                style={{
                                                    flex: 1, background: "none", border: "none", cursor: "pointer",
                                                    padding: "0.65rem 0",
                                                    fontFamily: "'Lato', sans-serif", fontSize: "11px",
                                                    letterSpacing: "0.15em", textTransform: "uppercase",
                                                    color: mode === key ? "#C8A860" : "rgba(245,237,216,0.28)",
                                                    borderBottom: mode === key ? "1px solid #C8A860" : "1px solid transparent",
                                                    transform: "translateY(0.5px)",
                                                    transition: "color 0.3s, border-color 0.3s",
                                                }}
                                            >{label}</button>
                                        ))}
                                    </div>

                                    {/* Fields */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>

                                        <AnimatePresence>
                                            {mode === "signup" && (
                                                <motion.div key="name"
                                                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{ overflow: "hidden" }}
                                                >
                                                    <input
                                                        style={inputStyle}
                                                        placeholder="Full Name"
                                                        value={form.name}
                                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                                        onFocus={e => e.target.style.borderColor = "#C8A860"}
                                                        onBlur={e => e.target.style.borderColor = "rgba(200,168,96,0.28)"}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <input
                                            style={inputStyle}
                                            placeholder="Email Address"
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            onFocus={e => e.target.style.borderColor = "#C8A860"}
                                            onBlur={e => e.target.style.borderColor = "rgba(200,168,96,0.28)"}
                                        />

                                        <div style={{ position: "relative" }}>
                                            <input
                                                style={inputStyle}
                                                placeholder="Password"
                                                type="password"
                                                value={form.password}
                                                onChange={e => setForm({ ...form, password: e.target.value })}
                                                onFocus={e => e.target.style.borderColor = "#C8A860"}
                                                onBlur={e => e.target.style.borderColor = "rgba(200,168,96,0.28)"}
                                            />
                                        </div>

                                        <AnimatePresence>
                                            {mode === "signup" && (
                                                <motion.div key="confirm"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{ overflow: "hidden" }}
                                                >
                                                    <input
                                                        style={inputStyle}
                                                        placeholder="Confirm Password"
                                                        type="password"
                                                        value={form.confirm}
                                                        onChange={e => setForm({ ...form, confirm: e.target.value })}
                                                        onFocus={e => e.target.style.borderColor = "#C8A860"}
                                                        onBlur={e => e.target.style.borderColor = "rgba(200,168,96,0.28)"}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Error message */}
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                style={{
                                                    marginTop: "0.9rem",
                                                    fontFamily: "'Lato', sans-serif",
                                                    fontSize: "12px",
                                                    color: "rgba(220,100,80,0.9)",
                                                    letterSpacing: "0.03em",
                                                    display: "flex", alignItems: "center", gap: "6px",
                                                }}
                                            >
                                                <span style={{ fontSize: "14px" }}>⚠</span> {error}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Forgot password */}
                                    {mode === "login" && (
                                        <div style={{ textAlign: "right", marginTop: "0.6rem" }}>
                                            <button style={{
                                                background: "none", border: "none", cursor: "pointer",
                                                fontFamily: "'Lato', sans-serif", fontSize: "11px",
                                                color: "rgba(200,168,96,0.4)", letterSpacing: "0.06em",
                                                transition: "color 0.2s",
                                            }}
                                                onMouseOver={e => e.target.style.color = "rgba(200,168,96,0.75)"}
                                                onMouseOut={e => e.target.style.color = "rgba(200,168,96,0.4)"}
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                    )}

                                    {/* Submit button */}
                                    <motion.button
                                        whileHover={{ y: -3, scale: 1.01 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleSubmit}
                                        style={{
                                            width: "100%",
                                            marginTop: "1.75rem",
                                            background: "#C8A860", color: "#0A0806",
                                            border: "none", padding: "15px",
                                            fontFamily: "'Lato', sans-serif", fontSize: "11px",
                                            letterSpacing: "0.2em", textTransform: "uppercase",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {mode === "login" ? "Sign In" : "Create Account"}
                                    </motion.button>

                                    {/* Divider */}
                                    <div style={{
                                        display: "flex", alignItems: "center",
                                        gap: "14px", margin: "1.6rem 0",
                                    }}>
                                        <div style={{ flex: 1, height: "0.5px", background: "rgba(200,168,96,0.12)" }} />
                                        <span style={{
                                            fontFamily: "'Lato', sans-serif", fontSize: "10px",
                                            color: "rgba(200,168,96,0.35)", letterSpacing: "0.18em",
                                        }}>OR</span>
                                        <div style={{ flex: 1, height: "0.5px", background: "rgba(200,168,96,0.12)" }} />
                                    </div>

                                    {/* Social login */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        {[
                                            { label: "Continue with Google", icon: "G" },
                                            { label: "Continue with Apple", icon: "" },
                                        ].map(({ label, icon }, i) => (
                                            <motion.button key={i}
                                                whileHover={{ y: -2, borderColor: "rgba(200,168,96,0.5)" }}
                                                style={{
                                                    width: "100%", background: "transparent",
                                                    border: "0.5px solid rgba(200,168,96,0.18)",
                                                    color: "rgba(245,237,216,0.5)",
                                                    padding: "12px 16px",
                                                    fontFamily: "'Lato', sans-serif", fontSize: "12px",
                                                    letterSpacing: "0.07em", cursor: "pointer",
                                                    transition: "border-color 0.3s",
                                                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                                                }}
                                            >
                                                <span style={{ fontWeight: 700, fontSize: "14px", fontFamily: i === 0 ? "sans-serif" : "inherit" }}>
                                                    {i === 0 ? "G" : "⌘"}
                                                </span>
                                                {label}
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Switch mode */}
                                    <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
                                        <span style={{
                                            fontFamily: "'Lato', sans-serif", fontSize: "12px",
                                            color: "rgba(245,237,216,0.28)",
                                        }}>
                                            {mode === "login" ? "New to Velour? " : "Already a member? "}
                                        </span>
                                        <button
                                            onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                                            style={{
                                                background: "none", border: "none", cursor: "pointer",
                                                fontFamily: "'Lato', sans-serif", fontSize: "12px",
                                                color: "#C8A860",
                                                textDecoration: "underline",
                                                textDecorationColor: "rgba(200,168,96,0.35)",
                                            }}
                                        >
                                            {mode === "login" ? "Join Us" : "Sign In"}
                                        </button>
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </>
    );
}