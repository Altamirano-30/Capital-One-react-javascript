// src/pages/ChatDashboard.jsx
import Sidebar from "../components/Sidebar";
import Chat from "./Chat";

/* =========================
   Paneles (placeholders)
   ========================= */

function PredictedBalanceCard() {
  // TODO: reemplazar con valor real de tu forecast
  const amount = 0;
  const percent = 0;

  return (
    <div className="card fade-in">
      <h3 style={{ marginBottom: 8 }}>Total Balance</h3>
      <p style={{ fontSize: 22, fontWeight: 700 }}>
        USD {amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>
      <span style={{ color: percent >= 0 ? "#16a34a" : "#dc2626" }}>
        {percent >= 0 ? "+" : ""}
        {percent.toFixed(2)}%
      </span>
    </div>
  );
}

function FinancialScoreCard() {
  // TODO: reemplazar con score real (0-100)
  const score = 0;

  // Semicírculo con SVG (pista + progreso)
  const size = 140;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = Math.PI * radius; // semicircle length
  const clamped = Math.max(0, Math.min(100, score));
  const progress = (clamped / 100) * circumference;
  const dashArray = `${progress} ${circumference - progress}`;

  return (
    <div className="card slide-up">
      <h3 style={{ marginBottom: 8 }}>Financial Score</h3>

      <div style={{ display: "grid", placeItems: "center", paddingTop: 4 }}>
        <svg
          width={size}
          height={size / 2}
          viewBox={`0 0 ${size} ${size / 2}`}
          style={{ display: "block" }}
        >
          {/* Track */}
          <path
            d={describeArc(size / 2, size / 2, radius, 180, 360)}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          {/* Progress */}
          <path
            className="score-arc"
            d={describeArc(size / 2, size / 2, radius, 180, 180 + (clamped / 100) * 180)}
            fill="none"
            stroke="#2563eb"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={dashArray}
          />
        </svg>
        <div style={{ marginTop: 6, fontWeight: 700 }}>{clamped} / 100</div>
      </div>
    </div>
  );
}

// Helpers para arco SVG
function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", r, r, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}

function PredictedBalanceChart() {
  // Placeholder del panel central de gráfica
  return (
    <div className="card fade-in" style={{ height: 260 }}>
      <h3 style={{ marginBottom: 8 }}>Balance Forecast</h3>
      <div
        className="chart-skeleton"
        style={{
          height: "100%",
          border: "1px dashed #e2e8f0",
          borderRadius: 8,
          display: "grid",
          placeItems: "center",
          fontSize: 14,
          color: "#475569",
        }}
      >
        (Chart here)
      </div>
    </div>
  );
}

function PredictedGoals() {
  return (
    <div className="card fade-in">
      <h3 style={{ marginBottom: 8 }}>Goals Forecast</h3>
      <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
        <li>Meta 1 (predicción)…</li>
        <li>Meta 2 (predicción)…</li>
        <li>Meta 3 (predicción)…</li>
      </ul>
    </div>
  );
}

function SpendingByCategory() {
  return (
    <div className="card slide-up">
      <h3 style={{ marginBottom: 8 }}>Predicted Spending by Category</h3>
      <div
        className="chart-skeleton"
        style={{
          height: 200,
          border: "1px dashed #e2e8f0",
          borderRadius: 8,
          display: "grid",
          placeItems: "center",
          color: "#475569",
        }}
      >
        (Donut/Bars here)
      </div>
    </div>
  );
}

/* =========================
   Página
   ========================= */

export default function ChatDashboard() {
  return (
    <div className="dash">
      {/* Estilos de animación inlined para que funcione sin tocar tus CSS */}
      <style>{cssAnimations}</style>

      <Sidebar />

      <div className="dash__content">
        {/* TOP: izquierda paneles + centro chart, derecha chat */}
        <section className="dash__top">
          <div className="dash__left">
            <div className="statsRow">
              <PredictedBalanceCard />
              <FinancialScoreCard />
            </div>

            <PredictedBalanceChart />
          </div>

          {/* Chat a la derecha en su card */}
          <div
            className="fade-in"
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
          </div>
        </section>

        {/* BOTTOM: goals + spending */}
        <section className="dash__bottom">
          <PredictedGoals />
          <SpendingByCategory />
        </section>
      </div>
    </div>
  );
}

/* =========================
   CSS de animaciones (MISMA PALETA)
   ========================= */
const cssAnimations = `
.fade-in {
  animation: fadeIn 0.8s ease forwards;
  opacity: 0;
}

.slide-up {
  animation: slideUp 0.9s ease forwards;
  transform: translateY(20px);
  opacity: 0;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 20px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
}

.score-arc {
  animation: pulse 2.4s infinite ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.06); }
  100% { transform: scale(1); }
}

/* Opcional: un pequeño brillo en placeholders de chart */
.chart-skeleton {
  position: relative;
  overflow: hidden;
}
.chart-skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(226,232,240,.8), transparent);
  transform: translateX(-100%);
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  to { transform: translateX(100%); }
}
`;
