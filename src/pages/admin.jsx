import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Default Data ─────────────────────────────────────────────────────────────

const defaultMenu = {
    Starters: [
        { id: 1, name: "Seared Scallops", desc: "Pan-seared scallops with cauliflower purée & truffle oil", price: 2800, img: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=400&q=80" },
        { id: 2, name: "Beef Tartare", desc: "Hand-cut Angus beef with capers, egg yolk & brioche crisps", price: 2400, img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
        { id: 3, name: "Burrata Salad", desc: "Fresh burrata with heirloom tomatoes, basil oil & sea salt", price: 1900, img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80" },
    ],
    Mains: [
        { id: 4, name: "Wagyu Ribeye", desc: "300g A4 wagyu, roasted bone marrow butter & seasonal greens", price: 8500, img: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80" },
        { id: 5, name: "Lobster Risotto", desc: "Saffron-infused arborio rice with half-lobster & lobster bisque", price: 6200, img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80" },
        { id: 6, name: "Duck Confit", desc: "Slow-cooked duck leg, cherry gastrique & pomme purée", price: 4800, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
    ],
    Desserts: [
        { id: 7, name: "Valrhona Chocolate Soufflé", desc: "Dark chocolate soufflé, 72% cacao, vanilla bean ice cream", price: 1800, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80" },
        { id: 8, name: "Crème Brûlée", desc: "Classic vanilla custard with caramelised demerara crust", price: 1400, img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80" },
    ],
};

const defaultReservations = [
    { id: 1, name: "Ashan Perera", email: "ashan@gmail.com", date: "2025-05-10", guests: 2, message: "Window seat preferred", status: "confirmed" },
    { id: 2, name: "Dilini Silva", email: "dilini@gmail.com", date: "2025-05-11", guests: 4, message: "Anniversary dinner", status: "pending" },
    { id: 3, name: "Roshan Fernando", email: "roshan@gmail.com", date: "2025-05-12", guests: 6, message: "Vegetarian options needed", status: "pending" },
    { id: 4, name: "Chamari Jayawardena", email: "chamari@gmail.com", date: "2025-05-09", guests: 2, message: "", status: "confirmed" },
    { id: 5, name: "Nuwan Wickrama", email: "nuwan@gmail.com", date: "2025-05-08", guests: 3, message: "Allergy: nuts", status: "cancelled" },
];

const defaultGallery = [
    { id: 1, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", label: "Signature Plating", span: "2" },
    { id: 2, src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80", label: "Wine Cellar", span: "1" },
    { id: 3, src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", label: "Chef's Table", span: "1" },
    { id: 4, src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80", label: "The Ambience", span: "1" },
    { id: 5, src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80", label: "Artisan Desserts", span: "1" },
];

const defaultInfo = {
    name: "VELOUR",
    tagline: "Fine Dining · Est. 2019",
    about1: "Born from a dream to redefine Sri Lankan fine dining, Velour brings together the world's finest ingredients and a philosophy that food is the highest form of art.",
    about2: "Our head chef, trained across Paris, Tokyo, and New York, brings a unique perspective — marrying classical French technique with the bold, aromatic spirit of the East.",
    address: "No. 12, Galle Face Row",
    city: "Colombo 03, Sri Lanka",
    phone: "+94 11 234 5678",
    email: "hello@velour.lk",
    hours: { tue_thu: "6pm – 11pm", fri_sat: "5:30pm – 12am", sun: "5:30pm – 10pm" },
};

// ─── Theme ────────────────────────────────────────────────────────────────────

const G = "#C8A860";
const BG = "#0A0806";
const BG2 = "#0D0B08";
const CARD = "#111009";
const BORDER = "rgba(200,168,96,0.15)";
const TEXT = "#F5EDD8";
const MUTED = "rgba(245,237,216,0.45)";

const inputSt = {
    background: "rgba(200,168,96,0.04)", border: `0.5px solid ${BORDER}`,
    padding: "10px 14px", color: TEXT, fontFamily: "'Lato', sans-serif",
    fontSize: "13px", outline: "none", width: "100%", borderRadius: 2,
    transition: "border-color 0.2s",
};
const btnPrimary = {
    background: G, color: BG, border: "none", padding: "10px 22px",
    fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.12em",
    textTransform: "uppercase", cursor: "pointer", borderRadius: 2,
};
const btnGhost = {
    background: "transparent", color: G, border: `0.5px solid ${BORDER}`,
    padding: "8px 18px", fontFamily: "'Lato', sans-serif", fontSize: "12px",
    letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({ label, children }) {
    return (
        <div>
            <div style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "6px" }}>{label}</div>
            {children}
        </div>
    );
}

function Modal({ children, onClose, title }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
            onClick={e => e.target === e.currentTarget && onClose()}>
            <motion.div initial={{ scale: 0.93, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.93, y: 20 }}
                style={{ background: "#111009", border: `0.5px solid ${BORDER}`, padding: "2rem", width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: TEXT, fontWeight: 400, marginBottom: "1.5rem" }}>{title}</div>
                {children}
            </motion.div>
        </motion.div>
    );
}

function StatusBadge({ status }) {
    const colors = { confirmed: "#4caf82", pending: G, cancelled: "#e05555" };
    return (
        <span style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", color: colors[status], border: `0.5px solid ${colors[status]}`, padding: "3px 10px", borderRadius: 2 }}>
            {status}
        </span>
    );
}

// ─── Login ────────────────────────────────────────────────────────────────────

function Login({ onLogin }) {
    const [u, setU] = useState("");
    const [p, setP] = useState("");
    const [err, setErr] = useState("");
    const [shakeKey, setShakeKey] = useState(0);

    const handleLogin = () => {
        if (u === "admin" && p === "velour2025") {
            onLogin();
        } else {
            setErr("Invalid credentials — try admin / velour2025");
            setShakeKey(k => k + 1);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <motion.div
                key={shakeKey}
                initial={{ opacity: 0, y: 30 }}
                animate={shakeKey > 0 ? { x: [-10, 10, -8, 8, 0], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: shakeKey > 0 ? 0.4 : 0.7 }}
                style={{ width: 380, padding: "3rem 2.5rem", border: `0.5px solid ${BORDER}`, background: CARD }}
            >
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", color: G, marginBottom: "0.5rem" }}>VELOUR</div>
                    <div style={{ fontSize: "11px", color: MUTED, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif" }}>Admin Portal</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <Field label="Username">
                        <input style={inputSt} value={u} onChange={e => setU(e.target.value)}
                            onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER}
                            onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="admin" />
                    </Field>
                    <Field label="Password">
                        <input style={inputSt} type="password" value={p} onChange={e => setP(e.target.value)}
                            onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER}
                            onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="••••••••" />
                    </Field>
                    {err && <div style={{ fontSize: "12px", color: "#e05555", fontFamily: "'Lato', sans-serif" }}>{err}</div>}
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        onClick={handleLogin} style={{ ...btnPrimary, padding: "13px", marginTop: "6px" }}>
                        Sign In
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "⬡" },
    { id: "menu", label: "Menu", icon: "◈" },
    { id: "reservations", label: "Reservations", icon: "◇" },
    { id: "gallery", label: "Gallery", icon: "▣" },
    { id: "info", label: "Restaurant Info", icon: "◉" },
];

function Sidebar({ active, setActive, onLogout }) {
    return (
        <div style={{ width: 220, minHeight: "100vh", background: BG2, borderRight: `0.5px solid ${BORDER}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
            <div style={{ padding: "2rem 1.5rem 1.5rem", borderBottom: `0.5px solid ${BORDER}` }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: G }}>VELOUR</div>
                <div style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginTop: "4px" }}>Admin Panel</div>
            </div>
            <nav style={{ flex: 1, padding: "1rem 0" }}>
                {navItems.map(item => (
                    <motion.button key={item.id} whileHover={{ x: 4 }}
                        onClick={() => setActive(item.id)}
                        style={{
                            display: "flex", alignItems: "center", gap: "12px", width: "100%",
                            background: active === item.id ? "rgba(200,168,96,0.08)" : "transparent",
                            border: "none", borderLeft: active === item.id ? `2px solid ${G}` : "2px solid transparent",
                            padding: "12px 1.5rem", cursor: "pointer",
                            color: active === item.id ? G : MUTED,
                            fontFamily: "'Lato', sans-serif", fontSize: "13px", letterSpacing: "0.05em",
                            textAlign: "left", transition: "all 0.2s",
                        }}>
                        <span style={{ fontSize: "15px" }}>{item.icon}</span>
                        {item.label}
                    </motion.button>
                ))}
            </nav>
            <div style={{ padding: "1.5rem", borderTop: `0.5px solid ${BORDER}` }}>
                <button onClick={onLogout} style={{ ...btnGhost, width: "100%", fontSize: "11px" }}>Sign Out</button>
            </div>
        </div>
    );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ menu, reservations, gallery, setPage }) {
    const totalItems = Object.values(menu).flat().length;
    const pending = reservations.filter(r => r.status === "pending").length;
    const confirmed = reservations.filter(r => r.status === "confirmed").length;

    const stats = [
        { label: "Menu Items", value: totalItems, icon: "◈", page: "menu" },
        { label: "Pending", value: pending, icon: "◇", alert: pending > 0, page: "reservations" },
        { label: "Confirmed", value: confirmed, icon: "✦", page: "reservations" },
        { label: "Gallery Images", value: gallery.length, icon: "▣", page: "gallery" },
    ];

    return (
        <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: TEXT, fontWeight: 400, marginBottom: "0.4rem" }}>Dashboard</h2>
            <p style={{ color: MUTED, fontFamily: "'Lato', sans-serif", fontSize: "13px", marginBottom: "2.5rem" }}>Welcome back. Here's what's happening at Velour.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "2.5rem" }}>
                {stats.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        whileHover={{ borderColor: "rgba(200,168,96,0.35)", y: -3 }}
                        onClick={() => setPage(s.page)}
                        style={{ background: CARD, border: `0.5px solid ${s.alert ? "rgba(200,168,96,0.35)" : BORDER}`, padding: "1.5rem", cursor: "pointer", transition: "all 0.2s" }}>
                        <div style={{ fontSize: "20px", marginBottom: "0.75rem" }}>{s.icon}</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "38px", color: s.alert ? G : TEXT, marginBottom: "0.25rem" }}>{s.value}</div>
                        <div style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif" }}>{s.label}</div>
                    </motion.div>
                ))}
            </div>

            <div style={{ background: CARD, border: `0.5px solid ${BORDER}`, padding: "1.5rem" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: TEXT, fontWeight: 400, marginBottom: "1.25rem" }}>Recent Reservations</h3>
                {reservations.slice(0, 5).map((r, i) => (
                    <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 0", borderBottom: i < 4 ? `0.5px solid ${BORDER}` : "none" }}>
                        <div>
                            <div style={{ color: TEXT, fontFamily: "'Lato', sans-serif", fontSize: "14px" }}>{r.name}</div>
                            <div style={{ color: MUTED, fontFamily: "'Lato', sans-serif", fontSize: "12px", marginTop: "3px" }}>{r.date} · {r.guests} guests</div>
                        </div>
                        <StatusBadge status={r.status} />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Menu Manager ─────────────────────────────────────────────────────────────

function MenuManager({ menu, setMenu }) {
    const [activeTab, setActiveTab] = useState("Starters");
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: "", desc: "", price: "", img: "", category: "Starters" });
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const openAdd = () => { setForm({ name: "", desc: "", price: "", img: "", category: activeTab }); setEditing(null); setShowForm(true); };
    const openEdit = (item, cat) => { setForm({ ...item, price: item.price.toString(), category: cat }); setEditing(item.id); setShowForm(true); };

    const save = () => {
        if (!form.name || !form.price) return;
        const item = { ...form, price: parseInt(form.price), id: editing || Date.now() };
        setMenu(prev => {
            const next = { ...prev };
            if (editing) Object.keys(next).forEach(cat => { next[cat] = next[cat].filter(x => x.id !== editing); });
            next[form.category] = [...(next[form.category] || []), item];
            return next;
        });
        setShowForm(false);
    };

    const remove = (id) => {
        setMenu(prev => {
            const next = { ...prev };
            Object.keys(next).forEach(cat => { next[cat] = next[cat].filter(x => x.id !== id); });
            return next;
        });
        setDeleteConfirm(null);
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: TEXT, fontWeight: 400 }}>Menu Manager</h2>
                    <p style={{ color: MUTED, fontFamily: "'Lato', sans-serif", fontSize: "13px", marginTop: "4px" }}>Add, edit or remove menu items</p>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={openAdd} style={btnPrimary}>+ Add Item</motion.button>
            </div>

            <div style={{ display: "flex", marginBottom: "1.5rem", borderBottom: `0.5px solid ${BORDER}` }}>
                {Object.keys(menu).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{
                        background: "none", border: "none", cursor: "pointer", padding: "0.65rem 1.75rem",
                        fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase",
                        color: activeTab === tab ? G : MUTED,
                        borderBottom: activeTab === tab ? `1px solid ${G}` : "1px solid transparent",
                        transform: "translateY(0.5px)", transition: "color 0.2s",
                    }}>{tab} ({menu[tab].length})</button>
                ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <AnimatePresence>
                    {menu[activeTab].map(item => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                            style={{ background: CARD, border: `0.5px solid ${BORDER}`, padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                            {item.img && <img src={item.img} alt="" style={{ width: 64, height: 48, objectFit: "cover", flexShrink: 0, opacity: 0.85 }} />}
                            <div style={{ flex: 1 }}>
                                <div style={{ color: TEXT, fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 400 }}>{item.name}</div>
                                <div style={{ color: MUTED, fontFamily: "'Lato', sans-serif", fontSize: "12px", marginTop: "3px" }}>{item.desc}</div>
                            </div>
                            <div style={{ color: G, fontFamily: "'Playfair Display', serif", fontSize: "16px", marginRight: "1rem", whiteSpace: "nowrap" }}>LKR {item.price.toLocaleString()}</div>
                            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                                <button onClick={() => openEdit(item, activeTab)} style={{ ...btnGhost, padding: "6px 14px", fontSize: "11px" }}>Edit</button>
                                <button onClick={() => setDeleteConfirm(item.id)} style={{ background: "rgba(224,85,85,0.08)", color: "#e05555", border: "0.5px solid rgba(224,85,85,0.3)", padding: "6px 14px", fontFamily: "'Lato', sans-serif", fontSize: "11px", cursor: "pointer", borderRadius: 2 }}>Delete</button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {showForm && (
                    <Modal onClose={() => setShowForm(false)} title={editing ? "Edit Menu Item" : "Add Menu Item"}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            <Field label="Item Name"><input style={inputSt} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                            <Field label="Description"><textarea style={{ ...inputSt, minHeight: 70, resize: "vertical" }} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                <Field label="Price (LKR)"><input style={inputSt} type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                                <Field label="Category">
                                    <select style={{ ...inputSt, cursor: "pointer" }} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                        {Object.keys(menu).map(c => <option key={c} value={c} style={{ background: BG }}>{c}</option>)}
                                    </select>
                                </Field>
                            </div>
                            <Field label="Image URL"><input style={inputSt} value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} placeholder="https://images.unsplash.com/..." onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                            {form.img && <img src={form.img} alt="preview" style={{ width: "100%", height: 110, objectFit: "cover", opacity: 0.8 }} onError={e => e.target.style.display = "none"} />}
                            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "6px" }}>
                                <button onClick={() => setShowForm(false)} style={btnGhost}>Cancel</button>
                                <motion.button whileHover={{ scale: 1.02 }} onClick={save} style={btnPrimary}>{editing ? "Save Changes" : "Add Item"}</motion.button>
                            </div>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {deleteConfirm && (
                    <Modal onClose={() => setDeleteConfirm(null)} title="Delete Item?">
                        <p style={{ color: MUTED, fontFamily: "'Lato', sans-serif", fontSize: "14px", marginBottom: "1.5rem" }}>This action cannot be undone.</p>
                        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                            <button onClick={() => setDeleteConfirm(null)} style={btnGhost}>Cancel</button>
                            <button onClick={() => remove(deleteConfirm)} style={{ ...btnPrimary, background: "#e05555" }}>Delete</button>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Reservations Manager ─────────────────────────────────────────────────────

function ReservationsManager({ reservations, setReservations }) {
    const [filter, setFilter] = useState("all");
    const [selected, setSelected] = useState(null);

    const filtered = filter === "all" ? reservations : reservations.filter(r => r.status === filter);

    const updateStatus = (id, status) => {
        setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
        setSelected(prev => prev?.id === id ? { ...prev, status } : prev);
    };

    const remove = (id) => { setReservations(prev => prev.filter(r => r.id !== id)); setSelected(null); };

    return (
        <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: TEXT, fontWeight: 400, marginBottom: "0.4rem" }}>Reservations</h2>
            <p style={{ color: MUTED, fontFamily: "'Lato', sans-serif", fontSize: "13px", marginBottom: "2rem" }}>Manage guest bookings</p>

            <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
                {["all", "pending", "confirmed", "cancelled"].map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{
                        background: filter === f ? "rgba(200,168,96,0.1)" : "transparent",
                        border: `0.5px solid ${filter === f ? G : BORDER}`,
                        color: filter === f ? G : MUTED, padding: "6px 16px",
                        fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.12em",
                        textTransform: "uppercase", cursor: "pointer", borderRadius: 2, transition: "all 0.2s",
                    }}>
                        {f} ({f === "all" ? reservations.length : reservations.filter(r => r.status === f).length})
                    </button>
                ))}
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                    <AnimatePresence>
                        {filtered.map(r => (
                            <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setSelected(r)}
                                style={{
                                    background: selected?.id === r.id ? "rgba(200,168,96,0.06)" : CARD,
                                    border: `0.5px solid ${selected?.id === r.id ? "rgba(200,168,96,0.4)" : BORDER}`,
                                    padding: "1rem 1.25rem", cursor: "pointer",
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    transition: "all 0.2s",
                                }}>
                                <div>
                                    <div style={{ color: TEXT, fontFamily: "'Lato', sans-serif", fontSize: "14px" }}>{r.name}</div>
                                    <div style={{ color: MUTED, fontFamily: "'Lato', sans-serif", fontSize: "12px", marginTop: "3px" }}>{r.date} · {r.guests} guests</div>
                                </div>
                                <StatusBadge status={r.status} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filtered.length === 0 && <div style={{ color: MUTED, fontFamily: "'Lato', sans-serif", fontSize: "13px", padding: "2rem", textAlign: "center" }}>No reservations found</div>}
                </div>

                <AnimatePresence>
                    {selected && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                            style={{ width: 280, background: CARD, border: `0.5px solid ${BORDER}`, padding: "1.5rem", flexShrink: 0, alignSelf: "flex-start" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: TEXT, fontWeight: 400 }}>{selected.name}</div>
                                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: "16px" }}>×</button>
                            </div>
                            {[["Email", selected.email], ["Date", selected.date], ["Guests", selected.guests], ["Special Request", selected.message || "—"]].map(([k, v]) => (
                                <div key={k} style={{ marginBottom: "0.85rem" }}>
                                    <div style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "3px" }}>{k}</div>
                                    <div style={{ color: TEXT, fontFamily: "'Lato', sans-serif", fontSize: "13px" }}>{v}</div>
                                </div>
                            ))}
                            <div style={{ marginBottom: "0.85rem" }}>
                                <div style={{ fontSize: "10px", color: MUTED, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "6px" }}>Status</div>
                                <StatusBadge status={selected.status} />
                            </div>
                            <div style={{ borderTop: `0.5px solid ${BORDER}`, paddingTop: "1rem", marginTop: "1rem", display: "flex", flexDirection: "column", gap: "8px" }}>
                                {selected.status !== "confirmed" && (
                                    <button onClick={() => updateStatus(selected.id, "confirmed")} style={{ ...btnPrimary, background: "#4caf82", width: "100%", fontSize: "11px" }}>✓ Confirm Booking</button>
                                )}
                                {selected.status !== "pending" && (
                                    <button onClick={() => updateStatus(selected.id, "pending")} style={{ ...btnGhost, width: "100%", fontSize: "11px" }}>↩ Mark Pending</button>
                                )}
                                {selected.status !== "cancelled" && (
                                    <button onClick={() => updateStatus(selected.id, "cancelled")} style={{ background: "transparent", border: "0.5px solid rgba(224,85,85,0.3)", color: "#e05555", padding: "8px", fontFamily: "'Lato', sans-serif", fontSize: "11px", cursor: "pointer", borderRadius: 2, letterSpacing: "0.1em", textTransform: "uppercase" }}>✕ Cancel</button>
                                )}
                                <button onClick={() => remove(selected.id)} style={{ background: "transparent", border: "none", color: MUTED, fontFamily: "'Lato', sans-serif", fontSize: "11px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>Remove Record</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ─── Gallery Manager ──────────────────────────────────────────────────────────

function GalleryManager({ gallery, setGallery }) {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ src: "", label: "", span: "1" });

    const add = () => {
        if (!form.src || !form.label) return;
        setGallery(prev => [...prev, { ...form, id: Date.now() }]);
        setShowForm(false);
        setForm({ src: "", label: "", span: "1" });
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: TEXT, fontWeight: 400 }}>Gallery</h2>
                    <p style={{ color: MUTED, fontFamily: "'Lato', sans-serif", fontSize: "13px", marginTop: "4px" }}>Manage gallery images ({gallery.length} images)</p>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowForm(true)} style={btnPrimary}>+ Add Image</motion.button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                <AnimatePresence>
                    {gallery.map(img => (
                        <motion.div key={img.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
                            style={{ gridColumn: img.span === "2" ? "span 2" : "span 1", position: "relative", overflow: "hidden", height: img.span === "2" ? 220 : 160 }}>
                            <img src={img.src} alt={img.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                            <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
                                style={{ position: "absolute", inset: 0, background: "rgba(10,8,6,0.6)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                <div style={{ color: TEXT, fontFamily: "'Lato', sans-serif", fontSize: "13px", letterSpacing: "0.1em" }}>{img.label}</div>
                                <button onClick={() => setGallery(prev => prev.filter(g => g.id !== img.id))}
                                    style={{ background: "rgba(224,85,85,0.9)", color: "white", border: "none", padding: "6px 16px", fontFamily: "'Lato', sans-serif", fontSize: "11px", cursor: "pointer", borderRadius: 2 }}>
                                    Remove
                                </button>
                            </motion.div>
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.5rem 0.75rem", background: "rgba(10,8,6,0.65)", pointerEvents: "none" }}>
                                <div style={{ fontSize: "10px", color: G, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif" }}>{img.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {showForm && (
                    <Modal onClose={() => setShowForm(false)} title="Add Gallery Image">
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                            <Field label="Image URL"><input style={inputSt} value={form.src} onChange={e => setForm({ ...form, src: e.target.value })} placeholder="https://images.unsplash.com/..." onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                            <Field label="Label"><input style={inputSt} value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} placeholder="e.g. Chef's Special" onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                            <Field label="Size">
                                <select style={{ ...inputSt, cursor: "pointer" }} value={form.span} onChange={e => setForm({ ...form, span: e.target.value })}>
                                    <option value="1" style={{ background: BG }}>Normal (1 column)</option>
                                    <option value="2" style={{ background: BG }}>Wide (2 columns)</option>
                                </select>
                            </Field>
                            {form.src && <img src={form.src} alt="preview" style={{ width: "100%", height: 120, objectFit: "cover", opacity: 0.8 }} onError={e => e.target.style.display = "none"} />}
                            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                                <button onClick={() => setShowForm(false)} style={btnGhost}>Cancel</button>
                                <motion.button whileHover={{ scale: 1.02 }} onClick={add} style={btnPrimary}>Add Image</motion.button>
                            </div>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Info Manager ─────────────────────────────────────────────────────────────

function InfoManager({ info, setInfo }) {
    const [saved, setSaved] = useState(false);
    const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
    const update = (key, val) => setInfo(prev => ({ ...prev, [key]: val }));
    const updateHours = (key, val) => setInfo(prev => ({ ...prev, hours: { ...prev.hours, [key]: val } }));

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: TEXT, fontWeight: 400 }}>Restaurant Info</h2>
                    <p style={{ color: MUTED, fontFamily: "'Lato', sans-serif", fontSize: "13px", marginTop: "4px" }}>Update public restaurant information</p>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={save}
                    style={{ ...btnPrimary, background: saved ? "#4caf82" : G, transition: "background 0.3s" }}>
                    {saved ? "✓ Saved!" : "Save Changes"}
                </motion.button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ background: CARD, border: `0.5px solid ${BORDER}`, padding: "1.5rem" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: G, fontWeight: 400, marginBottom: "1.25rem" }}>Basic Info</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <Field label="Restaurant Name"><input style={inputSt} value={info.name} onChange={e => update("name", e.target.value)} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                        <Field label="Tagline"><input style={inputSt} value={info.tagline} onChange={e => update("tagline", e.target.value)} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                        <Field label="About — Paragraph 1"><textarea style={{ ...inputSt, minHeight: 80, resize: "vertical" }} value={info.about1} onChange={e => update("about1", e.target.value)} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                        <Field label="About — Paragraph 2"><textarea style={{ ...inputSt, minHeight: 80, resize: "vertical" }} value={info.about2} onChange={e => update("about2", e.target.value)} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ background: CARD, border: `0.5px solid ${BORDER}`, padding: "1.5rem" }}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: G, fontWeight: 400, marginBottom: "1.25rem" }}>Contact Details</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <Field label="Address"><input style={inputSt} value={info.address} onChange={e => update("address", e.target.value)} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                            <Field label="City"><input style={inputSt} value={info.city} onChange={e => update("city", e.target.value)} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                            <Field label="Phone"><input style={inputSt} value={info.phone} onChange={e => update("phone", e.target.value)} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                            <Field label="Email"><input style={inputSt} value={info.email} onChange={e => update("email", e.target.value)} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                        </div>
                    </div>
                    <div style={{ background: CARD, border: `0.5px solid ${BORDER}`, padding: "1.5rem" }}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: G, fontWeight: 400, marginBottom: "1.25rem" }}>Opening Hours</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <Field label="Tuesday – Thursday"><input style={inputSt} value={info.hours.tue_thu} onChange={e => updateHours("tue_thu", e.target.value)} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                            <Field label="Friday – Saturday"><input style={inputSt} value={info.hours.fri_sat} onChange={e => updateHours("fri_sat", e.target.value)} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                            <Field label="Sunday"><input style={inputSt} value={info.hours.sun} onChange={e => updateHours("sun", e.target.value)} onFocus={e => e.target.style.borderColor = G} onBlur={e => e.target.style.borderColor = BORDER} /></Field>
                            <div style={{ fontSize: "11px", color: MUTED, fontFamily: "'Lato', sans-serif", borderTop: `0.5px solid ${BORDER}`, paddingTop: "10px" }}>Monday is always closed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AdminPanel() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [page, setPage] = useState("dashboard");
    const [menu, setMenu] = useState(defaultMenu);
    const [reservations, setReservations] = useState(defaultReservations);
    const [gallery, setGallery] = useState(defaultGallery);
    const [info, setInfo] = useState(defaultInfo);

    const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0A0806; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #0A0806; }
    ::-webkit-scrollbar-thumb { background: rgba(200,168,96,0.25); border-radius: 2px; }
    input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
    select option { background: #0A0806; }
  `;

    if (!loggedIn) return (<><style>{styles}</style><Login onLogin={() => setLoggedIn(true)} /></>);

    return (
        <>
            <style>{styles}</style>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <Sidebar active={page} setActive={setPage} onLogout={() => { setLoggedIn(false); setPage("dashboard"); }} />
                <main style={{ flex: 1, padding: "2.5rem", overflowY: "auto", background: BG }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={page} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>
                            {page === "dashboard" && <Dashboard menu={menu} reservations={reservations} gallery={gallery} setPage={setPage} />}
                            {page === "menu" && <MenuManager menu={menu} setMenu={setMenu} />}
                            {page === "reservations" && <ReservationsManager reservations={reservations} setReservations={setReservations} />}
                            {page === "gallery" && <GalleryManager gallery={gallery} setGallery={setGallery} />}
                            {page === "info" && <InfoManager info={info} setInfo={setInfo} />}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </>
    );
}