import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Credentials ──────────────────────────────────────────────────────────────
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

const GUEST_ACCOUNTS = [
    { email: "guest@velour.lk", password: "guest123" },
    { email: "test@gmail.com", password: "test123" },
];

// ─── Theme ────────────────────────────────────────────────────────────────────
const G = "#C8A860";
const BG = "#0A0806";
const CARD = "#111009";
const BORDER = "rgba(200,168,96,0.15)";
const TEXT = "#F5EDD8";
const MUTED = "rgba(245,237,216,0.45)";

const inputSt = {
    background: "rgba(200,168,96,0.04)",
    border: `0.5px solid ${BORDER}`,
    padding: "12px 16px",
    color: TEXT,
    fontFamily: "'Lato', sans-serif",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: 2,
    transition: "border-color 0.25s",
};

const labelSt = {
    fontSize: "10px", color: MUTED,
    letterSpacing: "0.2em", textTransform: "uppercase",
    fontFamily: "'Lato', sans-serif", marginBottom: "7px",
};

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles() {
    return (
        <>
            {[...Array(22)].map((_, i) => (
                <motion.div key={i}
                    style={{
                        position: "absolute",
                        width: i % 3 === 0 ? 2 : 1,
                        height: i % 3 === 0 ? 2 : 1,
                        borderRadius: "50%",
                        background: `rgba(200,168,96,${0.15 + (i % 4) * 0.1})`,
                        left: `${4 + i * 4.4}%`,
                        top: `${8 + (i * 41) % 84}%`,
                    }}
                    animate={{ opacity: [0.15, 0.9, 0.15] }}
                    transition={{ repeat: Infinity, duration: 2.5 + (i % 3), delay: i * 0.18 }}
                />
            ))}
        </>
    );
}

// ─── Password Strength ────────────────────────────────────────────────────────
function StrengthBar({ password }) {
    if (!password) return null;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const colors = [
        "rgba(200,168,96,0.2)",
        "rgba(200,168,96,0.5)",
        "rgba(200,168,96,0.78)",
        "#C8A860",
    ];
    const labels = ["Too short", "Fair", "Good", "Strong"];

    return (
        <div style={{ marginTop: "7px" }}>
            <div style={{ display: "flex", gap: "4px", marginBottom: "5px" }}>
                {[0, 1, 2, 3].map(i => (
                    <div key={i} style={{
                        flex: 1, height: "2px", borderRadius: "1px",
                        background: i < score ? colors[Math.min(score - 1, 3)] : "rgba(200,168,96,0.1)",
                        transition: "background 0.3s",
                    }} />
                ))}
            </div>
            <div style={{ fontSize: "10px", color: MUTED, fontFamily: "'Lato', sans-serif" }}>
                {labels[Math.min(score, 3)]}
            </div>
        </div>
    );
}

// ─── Switch Link ──────────────────────────────────────────────────────────────
function SwitchLink({ text, linkText, onClick }) {
    const [hover, setHover] = useState(false);
    return (
        <div style={{ marginTop: "1.4rem", textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: "12px", color: MUTED }}>
            {text}{" "}
            <span
                onClick={onClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ color: hover ? G : "rgba(200,168,96,0.7)", cursor: "pointer", transition: "color 0.2s" }}
            >
                {linkText}
            </span>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Login({ onAdmin, onGuest }) {
    const [tab, setTab] = useState("login"); // "login" | "register"
    const [shakeKey, setShakeKey] = useState(0);
    const [loading, setLoading] = useState(false);

    // Login state
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loginErr, setLoginErr] = useState("");
    const [loginOk, setLoginOk] = useState("");

    // Register state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [regPass, setRegPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [regErr, setRegErr] = useState("");
    const [regOk, setRegOk] = useState("");

    const shake = () => setShakeKey(k => k + 1);

    const switchTab = (t) => {
        setTab(t);
        setLoginErr(""); setLoginOk("");
        setRegErr(""); setRegOk("");
    };

    // ── Login handler ─────────────────────────────────────────────────────────
    const handleLogin = () => {
        setLoginErr(""); setLoginOk("");
        if (!identifier || !password) {
            setLoginErr("Please enter your credentials."); shake(); return;
        }
        // Admin check — silent, no tab needed
        if (identifier === ADMIN_USER && password === ADMIN_PASS) {
            setLoading(true);
            setTimeout(() => onAdmin(), 800);
            return;
        }
        // Registered guest check
        const match = GUEST_ACCOUNTS.find(
            a => a.email === identifier && a.password === password
        );
        if (match) {
            setLoading(true);
            setTimeout(() => onGuest(), 800);
            return;
        }
        // Any valid email format → allow as guest
        if (identifier.includes("@")) {
            setLoading(true);
            setTimeout(() => onGuest(), 800);
            return;
        }
        setLoginErr("Invalid credentials. Use your email address or admin login.");
        shake();
    };

    // ── Register handler ──────────────────────────────────────────────────────
    const handleRegister = () => {
        setRegErr(""); setRegOk("");
        if (!firstName || !lastName || !email || !regPass || !confirm) {
            setRegErr("Please fill in all fields."); shake(); return;
        }
        if (!email.includes("@")) {
            setRegErr("Please enter a valid email address."); shake(); return;
        }
        if (regPass.length < 6) {
            setRegErr("Password must be at least 6 characters."); shake(); return;
        }
        if (regPass !== confirm) {
            setRegErr("Passwords do not match."); shake(); return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setRegOk(`Welcome, ${firstName}! Your account has been created.`);
            setTimeout(() => onGuest(), 1200);
        }, 800);
    };

    const handleKey = (e, fn) => { if (e.key === "Enter") fn(); };

    return (
        <div style={{
            minHeight: "100vh", background: BG,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
        }}>
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse at 30% 50%, rgba(200,168,96,0.05) 0%, transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(200,168,96,0.04) 0%, transparent 55%)",
            }} />
            <Particles />

            <motion.div
                key={shakeKey}
                initial={{ opacity: 0, y: 32 }}
                animate={shakeKey > 0
                    ? { x: [-10, 10, -7, 7, 0], opacity: 1, y: 0 }
                    : { opacity: 1, y: 0 }}
                transition={{ duration: shakeKey > 0 ? 0.38 : 0.7, ease: "easeOut" }}
                style={{
                    width: 440, position: "relative", zIndex: 1,
                    border: `0.5px solid ${BORDER}`, background: CARD,
                    padding: "2.75rem 2.5rem",
                }}
            >
                {/* ── Logo ── */}
                <div style={{ textAlign: "center", marginBottom: "0" }}>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", color: G, letterSpacing: "0.06em", marginBottom: "0.35rem" }}
                    >
                        VELOUR
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.32em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif" }}
                    >
                        Fine Dining · Est. 2019
                    </motion.div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
                        <div style={{ flex: 1, height: "0.5px", background: BORDER }} />
                        <div style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.2em", fontFamily: "'Lato', sans-serif", textTransform: "uppercase" }}>Welcome</div>
                        <div style={{ flex: 1, height: "0.5px", background: BORDER }} />
                    </div>
                </div>

                {/* ── Tabs ── */}
                <div style={{ display: "flex", marginBottom: "1.8rem", marginTop: "1.6rem", borderBottom: `0.5px solid ${BORDER}` }}>
                    {[["login", "Sign In"], ["register", "Create Account"]].map(([id, label]) => (
                        <button key={id} onClick={() => switchTab(id)}
                            style={{
                                flex: 1, background: "none", border: "none", cursor: "pointer",
                                padding: "0.65rem 0",
                                fontFamily: "'Lato', sans-serif", fontSize: "11px",
                                letterSpacing: "0.18em", textTransform: "uppercase",
                                color: tab === id ? G : MUTED,
                                borderBottom: tab === id ? `1px solid ${G}` : "1px solid transparent",
                                transform: "translateY(0.5px)", transition: "color 0.25s",
                            }}>
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── Forms ── */}
                <AnimatePresence mode="wait">
                    {tab === "login" ? (
                        <motion.div key="login"
                            initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 14 }} transition={{ duration: 0.26 }}
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                <div>
                                    <div style={labelSt}>Username or Email</div>
                                    <input style={inputSt} value={identifier}
                                        onChange={e => setIdentifier(e.target.value)}
                                        onKeyDown={e => handleKey(e, handleLogin)}
                                        placeholder="admin or email@example.com"
                                        onFocus={e => e.target.style.borderColor = G}
                                        onBlur={e => e.target.style.borderColor = BORDER} />
                                </div>
                                <div>
                                    <div style={labelSt}>Password</div>
                                    <input style={inputSt} type="password" value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onKeyDown={e => handleKey(e, handleLogin)}
                                        placeholder="••••••••"
                                        onFocus={e => e.target.style.borderColor = G}
                                        onBlur={e => e.target.style.borderColor = BORDER} />
                                </div>

                                {loginErr && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        style={{ fontSize: "12px", color: "#e05555", fontFamily: "'Lato', sans-serif" }}>
                                        {loginErr}
                                    </motion.div>
                                )}
                                {loginOk && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        style={{ fontSize: "12px", color: "#7cba6e", fontFamily: "'Lato', sans-serif" }}>
                                        ✓ {loginOk}
                                    </motion.div>
                                )}

                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    onClick={handleLogin}
                                    style={{
                                        background: G, color: BG, border: "none", padding: "14px",
                                        fontFamily: "'Lato', sans-serif", fontSize: "12px",
                                        letterSpacing: "0.18em", textTransform: "uppercase",
                                        cursor: "pointer", borderRadius: 2, marginTop: "4px",
                                        opacity: loading ? 0.7 : 1,
                                    }}>
                                    {loading ? "Signing in..." : "Sign In"}
                                </motion.button>
                            </div>
                            <SwitchLink
                                text="Don't have an account?"
                                linkText="Create one"
                                onClick={() => switchTab("register")}
                            />
                        </motion.div>

                    ) : (
                        <motion.div key="register"
                            initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.26 }}
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {/* Name row */}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                                    <div>
                                        <div style={labelSt}>First Name</div>
                                        <input style={inputSt} value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                            onKeyDown={e => handleKey(e, handleRegister)}
                                            placeholder="Amal"
                                            onFocus={e => e.target.style.borderColor = G}
                                            onBlur={e => e.target.style.borderColor = BORDER} />
                                    </div>
                                    <div>
                                        <div style={labelSt}>Last Name</div>
                                        <input style={inputSt} value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                            onKeyDown={e => handleKey(e, handleRegister)}
                                            placeholder="Perera"
                                            onFocus={e => e.target.style.borderColor = G}
                                            onBlur={e => e.target.style.borderColor = BORDER} />
                                    </div>
                                </div>

                                <div>
                                    <div style={labelSt}>Email Address</div>
                                    <input style={inputSt} type="email" value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onKeyDown={e => handleKey(e, handleRegister)}
                                        placeholder="you@example.com"
                                        onFocus={e => e.target.style.borderColor = G}
                                        onBlur={e => e.target.style.borderColor = BORDER} />
                                </div>

                                <div>
                                    <div style={labelSt}>Password</div>
                                    <input style={inputSt} type="password" value={regPass}
                                        onChange={e => setRegPass(e.target.value)}
                                        onKeyDown={e => handleKey(e, handleRegister)}
                                        placeholder="••••••••"
                                        onFocus={e => e.target.style.borderColor = G}
                                        onBlur={e => e.target.style.borderColor = BORDER} />
                                    <StrengthBar password={regPass} />
                                </div>

                                <div>
                                    <div style={labelSt}>Confirm Password</div>
                                    <input style={inputSt} type="password" value={confirm}
                                        onChange={e => setConfirm(e.target.value)}
                                        onKeyDown={e => handleKey(e, handleRegister)}
                                        placeholder="••••••••"
                                        onFocus={e => e.target.style.borderColor = G}
                                        onBlur={e => e.target.style.borderColor = BORDER} />
                                </div>

                                {regErr && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        style={{ fontSize: "12px", color: "#e05555", fontFamily: "'Lato', sans-serif" }}>
                                        {regErr}
                                    </motion.div>
                                )}
                                {regOk && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        style={{ fontSize: "12px", color: "#7cba6e", fontFamily: "'Lato', sans-serif" }}>
                                        ✓ {regOk}
                                    </motion.div>
                                )}

                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    onClick={handleRegister}
                                    style={{
                                        background: G, color: BG, border: "none", padding: "14px",
                                        fontFamily: "'Lato', sans-serif", fontSize: "12px",
                                        letterSpacing: "0.18em", textTransform: "uppercase",
                                        cursor: "pointer", borderRadius: 2, marginTop: "4px",
                                        opacity: loading ? 0.7 : 1,
                                    }}>
                                    {loading ? "Creating Account..." : "Create Account"}
                                </motion.button>
                            </div>
                            <SwitchLink
                                text="Already have an account?"
                                linkText="Sign in"
                                onClick={() => switchTab("login")}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <div style={{ marginTop: "1.75rem", textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "rgba(245,237,216,0.18)", fontFamily: "'Lato', sans-serif", letterSpacing: "0.1em" }}>
                        Colombo · Sri Lanka
                    </div>
                </div>
            </motion.div>
        </div>
    );
}