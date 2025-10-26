// src/pages/ChatDashboard.jsx
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Chat from "./Chat";

/* =========================
   Helpers SVG (Financial Score)
   ========================= */
function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", r, r, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}

/* =========================
   Paneles (placeholders con animación)
   ========================= */

const cardVariant = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { type: "spring", stiffness: 120, damping: 16 } }
};
const listVariant = { show: { transition: { staggerChildren: 0.08 } } };

function PredictedBalanceCard() {
  const amount = 0;
  const percent = 0;

  return (
    <motion.div className="card fm-card" variants={cardVariant}>
      <h3 style={{ marginBottom: 4 }}>Total Balance</h3>
      <div style={{ fontSize: 22, fontWeight: 700 }}>
        USD {amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </div>
      <div style={{ color: percent >= 0 ? "#16a34a" : "#dc2626" }}>
        {percent >= 0 ? "+" : ""}
        {percent.toFixed(2)}%
      </div>
    </motion.div>
  );
}

function FinancialScoreCard() {
  const score = 0; // 0–100
  const size = 140;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const clamped = Math.max(0, Math.min(100, score));
  const arcD = useMemo(
    () => describeArc(size / 2, size / 2, radius, 180, 180 + (clamped / 100) * 180),
    [clamped, size, radius]
  );

  return (
    <motion.div className="card fm-card" variants={cardVariant}>
      <h3 style={{ marginBottom: 4 }}>Financial Score</h3>
      <div style={{ display: "grid", placeItems: "center" }}>
        <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
          <path
            d={describeArc(size / 2, size / 2, radius, 180, 360)}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <motion.path
            d={arcD}
            fill="none"
            stroke="#2563eb"
            strokeWidth={stroke}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: clamped / 100 }}
            transition={{ type: "spring", duration: 1.2 }}
          />
        </svg>
        <motion.div
          style={{ marginTop: 6, fontWeight: 700 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {clamped} / 100
        </motion.div>
      </div>
    </motion.div>
  );
}

function PredictedBalanceChart() {
  return (
    <motion.div className="card fm-card" style={{ paddingBottom: 16 }} variants={cardVariant}>
      <h3 style={{ marginBottom: 10 }}>Balance Forecast</h3>

      {/* Contenedor arreglado: sin desbordes, shimmer interno */}
      <div className="chart-frame">
        <div className="chart-skeleton">
          <span>(Chart here)</span>
        </div>
      </div>
    </motion.div>
  );
}

function GoalsPredicted() {
  return (
    <motion.div className="card fm-card" variants={cardVariant}>
      <h3 style={{ marginBottom: 8 }}>Goals (Predicted)</h3>
      <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
        <li>Meta 1 (predicción)…</li>
        <li>Meta 2 (predicción)…</li>
        <li>Meta 3 (predicción)…</li>
      </ul>
    </motion.div>
  );
}

function SpendingPredictionByCategory() {
  return (
    <motion.div className="card fm-card" variants={cardVariant}>
      <h3 style={{ marginBottom: 8 }}>Predicted Spending by Category</h3>
      <div className="chart-frame" style={{ height: 200 }}>
        <div className="chart-skeleton">
          <span>(Donut/Bars here)</span>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================
   Toggle de inversión de colores
   ========================= */
function ThemeInvertToggle({ on }) {
  return (
    <button
      aria-label="Invert colors"
      title="Invert colors"
      className="invert-btn"
      onClick={on}
    >
      ⟳ Invert
    </button>
  );
}

/* =========================
   Página (misma distribución)
   ========================= */
export default function ChatDashboard() {
  const [invert, setInvert] = useState(false);

  // opcional: recordar preferencia
  useEffect(() => {
    const saved = localStorage.getItem("invertColors");
    if (saved === "1") setInvert(true);
  }, []);
  useEffect(() => {
    localStorage.setItem("invertColors", invert ? "1" : "0");
  }, [invert]);

  return (
    <div className={`dash ${invert ? "theme-invert" : ""}`}>
      {/* CSS inline: animaciones + fixes */}
      <style>{cssAnimations}</style>

      <Sidebar />

      <div className="dash__content">
        <div className="top-actions">
          <ThemeInvertToggle on={() => setInvert(v => !v)} />
        </div>

        {/* TOP */}
        <section className="dash__top">
          <motion.div
            className="dash__left"
            variants={listVariant}
            initial="hidden"
            animate="show"
          >
            <div className="statsRow">
              <PredictedBalanceCard />
              <FinancialScoreCard />
            </div>

            <PredictedBalanceChart />
          </motion.div>

          {/* Chat a la derecha */}
          <AnimatePresence>
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              style={{
                flex: 1,
                display: "grid",
                height: "100%",
                padding: 16,
                background: "#ffffff",
                borderRadius: 12,
                border: "1px solid #e2e8f0",
              }}
            >
              <Chat />
            </motion.div>
          </AnimatePresence>
        </section>

        {/* BOTTOM */}
        <motion.section
          className="dash__bottom"
          variants={listVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <GoalsPredicted />
          <SpendingPredictionByCategory />
          <motion.div className="card fm-card" variants={cardVariant}>
            <h3 style={{ marginBottom: 8 }}>Quick Transfer</h3>
            <p style={{ color: "#475569" }}>
              (Aquí puedes renderizar tu <code>QuickTransfer</code>)
            </p>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

/* =========================
   CSS (inline) — Fixes + Animaciones
   ========================= */
const cssAnimations = `
/* Botón de invertir colores (discreto, sin cambiar paleta por defecto) */
.top-actions { display: flex; justify-content: flex-end; margin-bottom: 8px; }
.invert-btn {
  padding: 6px 10px; border: 1px solid #e2e8f0; border-radius: 10px;
  background: #fff; cursor: pointer; font-size: 12px;
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.invert-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 14px rgba(15,23,42,.08); }
.theme-invert .dash__content { filter: invert(1) hue-rotate(180deg); }
.theme-invert img, .theme-invert video, .theme-invert svg:not([data-allow-invert]) { filter: invert(1) hue-rotate(180deg); }

/* Tarjetas base + microinteracciones */
.card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 20px;
}
.fm-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.fm-card:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12); }

/* Contenedor de la gráfica (fix: sin desbordes, radio limpio) */
.chart-frame {
  width: 100%;
  height: 260px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;            /* ← evita que el shimmer se salga */
  background: #f8fafc;
  border: 1px dashed #e2e8f0;  /* el borde se mantiene interno */
  display: grid;
  place-items: center;
}
.chart-skeleton {
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  place-items: center;
  color: #475569;
}
.chart-skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(226,232,240,.85), transparent);
  transform: translateX(-100%);
  animation: shimmer 1.6s infinite;
}
@keyframes shimmer { to { transform: translateX(100%); } }

/* Framer + CSS helper (reduced motion) */
@media (prefers-reduced-motion: reduce) {
  .fm-card, .invert-btn, .chart-skeleton::after { animation: none !important; transition: none !important; }
}

/* Opcional: halo sutil al hacer focus con teclado */
.card:focus-within { box-shadow: 0 0 0 3px rgba(37,99,235,.2); border-color: rgba(37,99,235,.6); }
`;
