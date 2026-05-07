import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Credentials ──────────────────────────────────────────────────────────────
const ADMIN_USER = "admin";
const ADMIN_PASS = "velour2025";

// Guest accounts — email + password
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
    borderRadius: 2,
    transition: "border-color 0.25s",
};

// ─── Floating particles ───────────────────────────────────────────────────────
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

// ─── Main Login Component ─────────────────────────────────────────────────────
export default function Login({ onAdmin, onGuest }) {
    const [tab, setTab] = useState("admin"); // "admin" | "guest"
    const [u, setU] = useState("");
    const [p, setP] = useState("");
    const [email, setEmail] = useState("");
    const [guestPass, setGuestPass] = useState("");
    const [err, setErr] = useState("");
    const [shakeKey, setShakeKey] = useState(0);
    const [loading, setLoading] = useState(false);

    const shake = (msg) => {
        setErr(msg);
        setShakeKey(k => k + 1);
    };

    const handleAdmin = () => {
        if (u === ADMIN_USER && p === ADMIN_PASS) {
            setLoading(true);
            setTimeout(() => onAdmin(), 800);
        } else {
            shake("Invalid credentials. Check username & password.");
        }
    };

    const handleGuest = () => {
        const match = GUEST_ACCOUNTS.find(
            a => a.email === email && a.password === guestPass
        );
        if (match) {
            setLoading(true);
            setTimeout(() => onGuest(), 800);
        } else {
            shake("No account found. Check your email & password.");
        }
    };

    const handleKey = (e) => {
        if (e.key === "Enter") tab === "admin" ? handleAdmin() : handleGuest();
    };

    return (
        <div style={{
            minHeight: "100vh", background: BG,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
        }}>
            {/* Background glow */}
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
                transition={{ duration: shakeKey > 0 ? 0.4 : 0.7, ease: "easeOut" }}
                style={{
                    width: 420, position: "relative", zIndex: 1,
                    border: `0.5px solid ${BORDER}`, background: CARD,
                    padding: "2.75rem 2.5rem",
                }}
            >
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
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
                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
                        <div style={{ flex: 1, height: "0.5px", background: BORDER }} />
                        <div style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.2em", fontFamily: "'Lato', sans-serif", textTransform: "uppercase" }}>Sign In</div>
                        <div style={{ flex: 1, height: "0.5px", background: BORDER }} />
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", marginBottom: "2rem", borderBottom: `0.5px solid ${BORDER}` }}>
                    {[["admin", "Admin Portal"], ["guest", "Guest Access"]].map(([id, label]) => (
                        <button key={id} onClick={() => { setTab(id); setErr(""); }}
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

                {/* Forms */}
                <AnimatePresence mode="wait">
                    {tab === "admin" ? (
                        <motion.div key="admin"
                            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.28 }}
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                <div>
                                    <div style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "7px" }}>Username</div>
                                    <input style={inputSt} value={u} onChange={e => setU(e.target.value)} onKeyDown={handleKey}
                                        placeholder="admin"
                                        onFocus={e => e.target.style.borderColor = G}
                                        onBlur={e => e.target.style.borderColor = BORDER} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "7px" }}>Password</div>
                                    <input style={inputSt} type="password" value={p} onChange={e => setP(e.target.value)} onKeyDown={handleKey}
                                        placeholder="••••••••"
                                        onFocus={e => e.target.style.borderColor = G}
                                        onBlur={e => e.target.style.borderColor = BORDER} />
                                </div>
                                {err && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        style={{ fontSize: "12px", color: "#e05555", fontFamily: "'Lato', sans-serif" }}>
                                        {err}
                                    </motion.div>
                                )}
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    onClick={handleAdmin}
                                    style={{
                                        background: G, color: BG, border: "none", padding: "14px",
                                        fontFamily: "'Lato', sans-serif", fontSize: "12px",
                                        letterSpacing: "0.18em", textTransform: "uppercase",
                                        cursor: "pointer", borderRadius: 2, marginTop: "4px",
                                        opacity: loading ? 0.7 : 1,
                                    }}>
                                    {loading ? "Signing in..." : "Enter Admin Panel"}
                                </motion.button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="guest"
                            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.28 }}
                        >
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                <div>
                                    <div style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "7px" }}>Email Address</div>
                                    <input style={inputSt} type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKey}
                                        placeholder="you@example.com"
                                        onFocus={e => e.target.style.borderColor = G}
                                        onBlur={e => e.target.style.borderColor = BORDER} />
                                </div>
                                <div>
                                    <div style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "7px" }}>Password</div>
                                    <input style={inputSt} type="password" value={guestPass} onChange={e => setGuestPass(e.target.value)} onKeyDown={handleKey}
                                        placeholder="••••••••"
                                        onFocus={e => e.target.style.borderColor = G}
                                        onBlur={e => e.target.style.borderColor = BORDER} />
                                </div>
                                {err && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        style={{ fontSize: "12px", color: "#e05555", fontFamily: "'Lato', sans-serif" }}>
                                        {err}
                                    </motion.div>
                                )}
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    onClick={handleGuest}
                                    style={{
                                        background: "transparent", color: G,
                                        border: `0.5px solid rgba(200,168,96,0.45)`,
                                        padding: "14px", fontFamily: "'Lato', sans-serif", fontSize: "12px",
                                        letterSpacing: "0.18em", textTransform: "uppercase",
                                        cursor: "pointer", borderRadius: 2, marginTop: "4px",
                                        opacity: loading ? 0.7 : 1,
                                    }}>
                                    {loading ? "Signing in..." : "View Restaurant"}
                                </motion.button>

                                {/* Demo hint */}
                                <div style={{ borderTop: `0.5px solid ${BORDER}`, paddingTop: "1rem", textAlign: "center" }}>
                                    <div style={{ fontSize: "11px", color: MUTED, fontFamily: "'Lato', sans-serif", marginBottom: "6px", letterSpacing: "0.05em" }}>Demo credentials</div>
                                    <div style={{ fontSize: "12px", color: "rgba(200,168,96,0.5)", fontFamily: "'Lato', sans-serif" }}>guest@velour.lk / guest123</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <div style={{ marginTop: "2rem", textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "rgba(245,237,216,0.2)", fontFamily: "'Lato', sans-serif", letterSpacing: "0.1em" }}>
                        Colombo · Sri Lanka
                    </div>
                </div>
            </motion.div>
        </div>
    );
}