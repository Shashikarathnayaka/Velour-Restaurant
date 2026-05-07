import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// ─── Data ───────────────────────────────────────────────────────────────────

const menuData = {
  Starters: [
    { name: "Seared Scallops", desc: "Pan-seared scallops with cauliflower purée & truffle oil", price: "LKR 2,800", img: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?w=400&q=80" },
    { name: "Beef Tartare", desc: "Hand-cut Angus beef with capers, egg yolk & brioche crisps", price: "LKR 2,400", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
    { name: "Burrata Salad", desc: "Fresh burrata with heirloom tomatoes, basil oil & sea salt", price: "LKR 1,900", img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=80" },
  ],
  Mains: [
    { name: "Wagyu Ribeye", desc: "300g A4 wagyu, roasted bone marrow butter & seasonal greens", price: "LKR 8,500", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80" },
    { name: "Lobster Risotto", desc: "Saffron-infused arborio rice with half-lobster & lobster bisque", price: "LKR 6,200", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80" },
    { name: "Duck Confit", desc: "Slow-cooked duck leg, cherry gastrique & pomme purée", price: "LKR 4,800", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80" },
    { name: "Mushroom Wellington", desc: "Wild mushroom duxelles in golden puff pastry, truffle jus", price: "LKR 3,600", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80" },
  ],
  Desserts: [
    { name: "Valrhona Chocolate Soufflé", desc: "Dark chocolate soufflé, 72% cacao, vanilla bean ice cream", price: "LKR 1,800", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80" },
    { name: "Crème Brûlée", desc: "Classic vanilla custard with caramelised demerara crust", price: "LKR 1,400", img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80" },
    { name: "Tarte Tatin", desc: "Caramelised apple tart, Calvados cream & almond praline", price: "LKR 1,600", img: "https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?w=400&q=80" },
  ],
};

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", label: "Signature Plating", span: "2" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80", label: "Wine Cellar" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", label: "Chef's Table" },
  { src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80", label: "The Ambience" },
  { src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80", label: "Artisan Desserts" },
];

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Mouse-follower image (appears near cursor on menu hover) ────────────────

function MouseFollowerImage({ src, visible }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const move = (e) => { x.set(e.clientX + 24); y.set(e.clientY - 80); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      style={{ position: "fixed", top: 0, left: 0, zIndex: 999, pointerEvents: "none", x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.72 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      <motion.div
        animate={{ rotate: visible ? [-3, 3, -3] : 0 }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        style={{ position: "relative", width: 220, height: 150 }}
      >
        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, border: "0.5px solid rgba(200,168,96,0.45)", background: "linear-gradient(135deg, rgba(200,168,96,0.1) 0%, transparent 60%)" }} />
      </motion.div>
    </motion.div>
  );
}

// ─── Hero floating dishes with parallax mouse tracking ───────────────────────

function HeroParallaxBg() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sX = useSpring(mouseX, { stiffness: 55, damping: 18 });
  const sY = useSpring(mouseY, { stiffness: 55, damping: 18 });
  const imgX = useTransform(sX, [-0.5, 0.5], [-22, 22]);
  const imgY = useTransform(sY, [-0.5, 0.5], [-14, 14]);
  const orb1X = useTransform(sX, [-0.5, 0.5], [-35, 35]);
  const orb2X = useTransform(sX, [-0.5, 0.5], [25, -25]);

  useEffect(() => {
    const move = (e) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const dishes = [
    { src: "https://images.unsplash.com/photo-1558030006-450675393462?w=320&q=80", top: "14%", left: "4%", w: 185, floatDur: 3.8, delay: 0 },
    { src: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=320&q=80", top: "58%", left: "2%", w: 155, floatDur: 4.2, delay: 0.5 },
    { src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=320&q=80", top: "11%", right: "4%", w: 172, floatDur: 3.5, delay: 0.25 },
    { src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=320&q=80", top: "60%", right: "3%", w: 160, floatDur: 4.6, delay: 0.7 },
  ];

  return (
    <>
      <motion.div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,168,96,0.07) 0%, transparent 70%)", top: "18%", left: "18%", x: orb1X, pointerEvents: "none" }} />
      <motion.div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,168,96,0.05) 0%, transparent 70%)", bottom: "12%", right: "14%", x: orb2X, pointerEvents: "none" }} />
      {dishes.map((d, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 1.1 + d.delay, duration: 1.1, ease: "easeOut" }}
          style={{ position: "absolute", top: d.top, left: d.left, right: d.right, width: d.w, pointerEvents: "none", x: imgX, y: imgY }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: d.floatDur, ease: "easeInOut", delay: i * 0.4 }}
            style={{ position: "relative" }}
          >
            <img src={d.src} alt="" style={{ width: "100%", height: d.w * 0.68, objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(10,8,6,0.55) 100%)", border: "0.5px solid rgba(200,168,96,0.22)" }} />
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["Home", "About", "Menu", "Gallery", "Reserve"];
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,8,6,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "0.5px solid rgba(200,168,96,0.18)" : "none",
        transition: "background 0.4s, border 0.4s",
        padding: "0 2.5rem", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "72px",
      }}
    >
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#C8A860", letterSpacing: "0.05em" }}>VELOUR</div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map(l => (
          <motion.button key={l} whileHover={{ y: -2 }}
            onClick={() => { setActive(l); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: active === l ? "#C8A860" : "rgba(255,255,255,0.58)",
              fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase",
              fontFamily: "'Lato', sans-serif",
              borderBottom: active === l ? "1px solid #C8A860" : "1px solid transparent",
              paddingBottom: "2px", transition: "color 0.3s",
            }}>
            {l}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="home" style={{
      height: "100vh", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      background: "linear-gradient(135deg, #0A0806 0%, #1A1108 45%, #0D0B07 100%)",
    }}>
      <HeroParallaxBg />
      {[...Array(20)].map((_, i) => (
        <motion.div key={i} style={{
          position: "absolute", borderRadius: "50%",
          width: i % 3 === 0 ? 2 : 1, height: i % 3 === 0 ? 2 : 1,
          background: `rgba(200,168,96,${0.2 + (i % 4) * 0.12})`,
          left: `${5 + i * 4.6}%`, top: `${10 + (i * 37) % 80}%`,
        }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 2 + (i % 3), delay: i * 0.22 }}
        />
      ))}
      <div style={{ position: "relative", textAlign: "center", maxWidth: "720px", padding: "0 2rem" }}>
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontSize: "11px", letterSpacing: "0.38em", color: "#C8A860", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "1.5rem" }}>
          Fine Dining · Est. 2019
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 1 }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 8vw, 88px)", color: "#F5EDD8", lineHeight: 1.08, margin: "0 0 1.2rem", fontWeight: 400 }}>
          Where Every<br />
          <span style={{ color: "#C8A860", fontStyle: "italic" }}>Meal Becomes</span><br />
          a Memory
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.9 }}
          style={{ color: "rgba(245,237,216,0.5)", fontSize: "15px", lineHeight: 1.75, fontFamily: "'Lato', sans-serif", maxWidth: "460px", margin: "0 auto 2.5rem" }}>
          An intimate fine-dining experience crafted with the rarest ingredients and unwavering passion.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <motion.button whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "#C8A860", color: "#0A0806", border: "none", padding: "14px 36px", fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer" }}>
            Reserve a Table
          </motion.button>
          <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "transparent", color: "#C8A860", border: "1px solid rgba(200,168,96,0.45)", padding: "14px 36px", fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer" }}>
            View Menu
          </motion.button>
        </motion.div>
      </div>
      <motion.div style={{ position: "absolute", bottom: "2rem", left: "50%", x: "-50%", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <span style={{ fontSize: "10px", color: "rgba(200,168,96,0.42)", letterSpacing: "0.2em", fontFamily: "'Lato', sans-serif" }}>SCROLL</span>
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, #C8A860, transparent)" }} />
      </motion.div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  const [ref, inView] = useInView();
  const stats = [
    { num: "5★", label: "Michelin Rating" },
    { num: "12+", label: "Years of Craft" },
    { num: "200+", label: "Wine Labels" },
    { num: "98%", label: "Guest Satisfaction" },
  ];
  return (
    <section id="about" style={{ background: "#0D0B08", padding: "8rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <motion.div ref={ref} initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9 }}>
            <div style={{ fontSize: "11px", color: "#C8A860", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "1.2rem" }}>Our Story</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "46px", color: "#F5EDD8", lineHeight: 1.15, marginBottom: "1.5rem", fontWeight: 400 }}>
              Crafted With<br /><span style={{ fontStyle: "italic", color: "#C8A860" }}>Passion</span>
            </h2>
            <p style={{ color: "rgba(245,237,216,0.52)", lineHeight: 1.85, fontFamily: "'Lato', sans-serif", fontSize: "15px", marginBottom: "1.2rem" }}>
              Born from a dream to redefine Sri Lankan fine dining, Velour brings together the world's finest ingredients and a philosophy that food is the highest form of art.
            </p>
            <p style={{ color: "rgba(245,237,216,0.52)", lineHeight: 1.85, fontFamily: "'Lato', sans-serif", fontSize: "15px", marginBottom: "2rem" }}>
              Our head chef, trained across Paris, Tokyo, and New York, brings a unique perspective — marrying classical French technique with the bold, aromatic spirit of the East.
            </p>
            <div style={{ width: 48, height: 1, background: "#C8A860" }} />
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.7 }}
                whileHover={{ borderColor: "rgba(200,168,96,0.6)", background: "rgba(200,168,96,0.04)", y: -5 }}
                style={{ border: "0.5px solid rgba(200,168,96,0.2)", padding: "2rem 1.5rem", textAlign: "center" }}
              >
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", color: "#C8A860", marginBottom: "0.5rem" }}>{s.num}</div>
                <div style={{ fontSize: "11px", color: "rgba(245,237,216,0.45)", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Menu with mouse-follower images ─────────────────────────────────────────

function Menu() {
  const [activeTab, setActiveTab] = useState("Starters");
  const [animKey, setAnimKey] = useState(0);
  const [hoveredImg, setHoveredImg] = useState(null);
  const [ref, inView] = useInView();

  return (
    <section id="menu" style={{ background: "#0A0806", padding: "8rem 2rem" }}>
      <MouseFollowerImage src={hoveredImg || ""} visible={!!hoveredImg} />
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontSize: "11px", color: "#C8A860", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "1rem" }}>Curated Selection</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "52px", color: "#F5EDD8", fontWeight: 400 }}>Our Menu</h2>
          <p style={{ color: "rgba(245,237,216,0.32)", fontFamily: "'Lato', sans-serif", fontSize: "13px", marginTop: "0.75rem", letterSpacing: "0.05em" }}>hover over a dish to preview</p>
        </motion.div>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "3.5rem", borderBottom: "0.5px solid rgba(200,168,96,0.15)" }}>
          {Object.keys(menuData).map(tab => (
            <motion.button key={tab} whileHover={{ y: -1 }}
              onClick={() => { setActiveTab(tab); setAnimKey(k => k + 1); }}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: "0.75rem 2.5rem",
                fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase",
                color: activeTab === tab ? "#C8A860" : "rgba(245,237,216,0.36)",
                borderBottom: activeTab === tab ? "1px solid #C8A860" : "1px solid transparent",
                transition: "color 0.3s", transform: "translateY(0.5px)",
              }}>
              {tab}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={animKey} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.38 }}>
            {menuData[activeTab].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }}
                onHoverStart={() => setHoveredImg(item.img)}
                onHoverEnd={() => setHoveredImg(null)}
                whileHover={{ paddingLeft: 14, x: 2 }}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                  padding: "1.75rem 0", paddingLeft: 0,
                  borderBottom: "0.5px solid rgba(200,168,96,0.1)",
                  borderLeft: "2px solid transparent",
                  transition: "border-left-color 0.3s",
                  cursor: "default",
                }}
              >
                <div style={{ flex: 1, paddingRight: "2rem" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#F5EDD8", marginBottom: "0.4rem", fontWeight: 400 }}>{item.name}</div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "rgba(245,237,216,0.4)", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#C8A860", whiteSpace: "nowrap" }}>{item.price}</div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Gallery with 3D tilt on mouse move ──────────────────────────────────────

function GalleryCard({ img }) {
  const cardRef = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sX = useSpring(rotX, { stiffness: 180, damping: 22 });
  const sY = useSpring(rotY, { stiffness: 180, damping: 22 });
  const sc = useMotionValue(1);
  const sSc = useSpring(sc, { stiffness: 200, damping: 20 });
  const [hovered, setHovered] = useState(false);
  const [inRef, inView] = useInView(0.1);

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    rotX.set(((e.clientY - r.top - r.height / 2) / r.height) * -14);
    rotY.set(((e.clientX - r.left - r.width / 2) / r.width) * 14);
    sc.set(1.045);
  };
  const onLeave = () => { rotX.set(0); rotY.set(0); sc.set(1); setHovered(false); };

  return (
    <motion.div ref={inRef}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
      style={{ gridColumn: img.span ? `span ${img.span}` : "span 1" }}
    >
      <motion.div ref={cardRef}
        onMouseMove={onMove} onMouseLeave={onLeave}
        onHoverStart={() => setHovered(true)}
        style={{
          rotateX: sX, rotateY: sY, scale: sSc,
          transformStyle: "preserve-3d", perspective: 700,
          overflow: "hidden", height: img.span === "2" ? 340 : 240,
          cursor: "default", position: "relative",
        }}
      >
        <motion.img src={img.src} alt={img.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          animate={{ scale: hovered ? 1.1 : 1 }} transition={{ duration: 0.55 }}
        />
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
          style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,8,6,0.75) 0%, transparent 55%)", display: "flex", alignItems: "flex-end", padding: "1.25rem" }}
        >
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", color: "#C8A860", letterSpacing: "0.25em", textTransform: "uppercase" }}>{img.label}</div>
        </motion.div>
        <div style={{ position: "absolute", inset: 0, border: "0.5px solid rgba(200,168,96,0.2)", pointerEvents: "none" }} />
      </motion.div>
    </motion.div>
  );
}

function Gallery() {
  const [ref, inView] = useInView();
  return (
    <section id="gallery" style={{ background: "#0D0B08", padding: "8rem 2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontSize: "11px", color: "#C8A860", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "1rem" }}>Visual Journey</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "52px", color: "#F5EDD8", fontWeight: 400 }}>Gallery</h2>
          <p style={{ color: "rgba(245,237,216,0.32)", fontFamily: "'Lato', sans-serif", fontSize: "13px", marginTop: "0.75rem" }}>hover to tilt & explore</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {galleryImages.map((img, i) => <GalleryCard key={i} img={img} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Reserve ──────────────────────────────────────────────────────────────────

function Reserve() {
  const [form, setForm] = useState({ name: "", email: "", date: "", guests: "2", message: "" });
  const [sent, setSent] = useState(false);
  const [ref, inView] = useInView();
  const inputStyle = {
    width: "100%", background: "rgba(200,168,96,0.04)",
    border: "0.5px solid rgba(200,168,96,0.25)",
    padding: "14px 16px", color: "#F5EDD8",
    fontFamily: "'Lato', sans-serif", fontSize: "14px",
    outline: "none", transition: "border-color 0.3s",
  };
  return (
    <section id="reserve" style={{ background: "#0A0806", padding: "8rem 2rem" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "11px", color: "#C8A860", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "1rem" }}>Secure Your Evening</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "48px", color: "#F5EDD8", fontWeight: 400 }}>Reserve a Table</h2>
        </motion.div>
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key="form" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <input style={inputStyle} placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  onFocus={e => e.target.style.borderColor = "#C8A860"} onBlur={e => e.target.style.borderColor = "rgba(200,168,96,0.25)"} />
                <input style={inputStyle} placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  onFocus={e => e.target.style.borderColor = "#C8A860"} onBlur={e => e.target.style.borderColor = "rgba(200,168,96,0.25)"} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <input style={inputStyle} type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                  onFocus={e => e.target.style.borderColor = "#C8A860"} onBlur={e => e.target.style.borderColor = "rgba(200,168,96,0.25)"} />
                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })}>
                  {[1, 2, 3, 4, 5, 6, "7+"].map(n => <option key={n} value={n} style={{ background: "#0A0806" }}>Guests: {n}</option>)}
                </select>
              </div>
              <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }} placeholder="Special requests or dietary requirements..."
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                onFocus={e => e.target.style.borderColor = "#C8A860"} onBlur={e => e.target.style.borderColor = "rgba(200,168,96,0.25)"} />
              <motion.button whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.97 }}
                onClick={() => { if (form.name && form.email && form.date) setSent(true); }}
                style={{ background: "#C8A860", color: "#0A0806", border: "none", padding: "16px", fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", marginTop: "8px" }}>
                Confirm Reservation
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="thanks"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
              style={{ textAlign: "center", padding: "4rem 2rem", border: "0.5px solid rgba(200,168,96,0.3)" }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, delay: 0.3 }}
                style={{ fontSize: "40px", marginBottom: "1rem", display: "inline-block" }}>✦</motion.div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#C8A860", marginBottom: "1rem" }}>Thank You, {form.name}</div>
              <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "rgba(245,237,216,0.48)", lineHeight: 1.7 }}>
                Your reservation has been received.<br />We'll confirm your table shortly via email.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "#060504", padding: "4rem 2rem 2rem", borderTop: "0.5px solid rgba(200,168,96,0.1)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#C8A860", marginBottom: "1rem" }}>VELOUR</div>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "rgba(245,237,216,0.36)", lineHeight: 1.8, maxWidth: "280px" }}>
              An intimate fine-dining sanctuary in the heart of Colombo, where every detail is intentional.
            </p>
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "#C8A860", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "1.2rem" }}>Hours</div>
            {["Tue–Thu: 6pm – 11pm", "Fri–Sat: 5:30pm – 12am", "Sun: 5:30pm – 10pm", "Mon: Closed"].map(h => (
              <div key={h} style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "rgba(245,237,216,0.4)", marginBottom: "0.5rem" }}>{h}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "#C8A860", letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Lato', sans-serif", marginBottom: "1.2rem" }}>Contact</div>
            {["No. 12, Galle Face Row", "Colombo 03, Sri Lanka", "+94 11 234 5678", "hello@velour.lk"].map(c => (
              <div key={c} style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "rgba(245,237,216,0.4)", marginBottom: "0.5rem" }}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "0.5px solid rgba(200,168,96,0.1)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: "rgba(245,237,216,0.2)", letterSpacing: "0.08em" }}>© 2025 Velour Fine Dining.</div>
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: "rgba(200,168,96,0.35)", letterSpacing: "0.08em" }}>Colombo · Sri Lanka</div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const sections = ["home", "about", "menu", "gallery", "reserve"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); });
    }, { threshold: 0.35 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0A0806; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0806; }
        ::-webkit-scrollbar-thumb { background: rgba(200,168,96,0.28); border-radius: 2px; }
      `}</style>
      <Nav active={active} setActive={setActive} />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reserve />
      <Footer />
    </>
  );
}