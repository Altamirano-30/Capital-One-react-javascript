// src/pages/ChatDashboard.jsx
import Sidebar from "../components/Sidebar";
import Chat from "./Chat";

/* ===== Helpers SVG para semicírculo ===== */
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

/* ======================= Cards ======================= */

/** 1) Predicted Total Balance (siguiente mes) */
/* ✅ Predicted Total Balance (mejorado) */
function PredictedBalanceCard() {
  const nextMonthBalance = 40210.75; // placeholder
  const deltaPercent = 1.85;

  return (
    <div
      className="card stat stat--tight fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minWidth: 0
      }}
    >
      {/* Encabezado */}
      <div
        className="stat__head"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 6
        }}
      >
        <span
          className="stat__title"
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            whiteSpace: "nowrap"
          }}
        >
          Predicted Total Balance
        </span>

        <span
          className="badge-circle"
          style={{
            color: deltaPercent >= 0 ? "#16A34A" : "#DC2626",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: "0.85rem",
            whiteSpace: "nowrap"
          }}
        >
          {deltaPercent >= 0 ? "+" : "-"}
          {Math.abs(deltaPercent).toFixed(2)}%
        </span>
      </div>

      {/* Monto principal */}
      <div
        className="stat__amount stat__amount--center"
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          lineHeight: "1.2",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}
      >
        USD {nextMonthBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </div>

      {/* KPIs */}
      <div className="stat__foot stat__foot--split" style={{ fontSize: "0.8rem" }}>
        <div className="kpi" style={{ gap: 2 }}>
          <span className="kpi__dot kpi__dot--up" />
          <strong>+3200 USD</strong>
        </div>
        <span className="divider-vert" />
        <div className="kpi" style={{ gap: 2 }}>
          <span className="kpi__dot kpi__dot--down" />
          <strong>-1570 USD</strong>
        </div>
      </div>
    </div>
  );
}


/** 2) Financial Score (semicírculo 0–100) */
function FinancialScoreCard() {
  const score = 76; // placeholder 0–100
  const size = 140;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const clamped = Math.max(0, Math.min(100, score));
  const arcD = describeArc(size / 2, size / 2, radius, 180, 180 + (clamped / 100) * 180);

  return (
    <div className="card fade-in">
      <h3 className="card__title">Financial Score</h3>
      <div className="score">
        <svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`} data-allow-invert>
          <path
            d={describeArc(size / 2, size / 2, radius, 180, 360)}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path
            className="score-arc"
            d={arcD}
            fill="none"
            stroke="#2563eb"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
        </svg>
        <div className="score__number">{clamped} / 100</div>
      </div>
      <ul className="bullets">
        <li>Puntualidad en pagos</li>
        <li>Uso de crédito</li>
        <li>Ahorro promedio</li>
      </ul>
    </div>
  );
}

/** 3) Predicted Balance (gráfica placeholder) */
function PredictedBalanceChart() {
  return (
    <div className="card statsCard fade-in">
      <div className="statsCard__head">
        <strong>Predicted Balance</strong>
        <div className="statsCard__controls">
          <span className="legend"><span className="dot dot--inc" /> Trend</span>
          <div className="segmented">
            <button className="active">30 días</button>
            <button>90 días</button>
            <button>1 año</button>
          </div>
        </div>
      </div>

      <div className="chart-frame">
        <div className="chart-skeleton">
          <span>(Chart here)</span>
        </div>
      </div>
    </div>
  );
}

/** 4) Goals (Predicted) */
function PredictedGoals() {
  const goals = [
    { name: "Emergency Fund", pct: 68, note: "$3,400 / $5,000" },
    { name: "Summer Trip", pct: 51, note: "$1,530 / $3,000" },
    { name: "New Laptop", pct: 34, note: "$510 / $1,500" }
  ];
  return (
    <div className="card goalCard fade-in">
      <div className="goal__head">
        <strong className="goal__title">Goals (Predicted)</strong>
      </div>
      <div className="goal__body">
        {goals.map((g) => (
          <div key={g.name} className="goal__meta">
            <div className="goal__iconWrap">
              <img
                alt=""
                className="goal__icon"
                src="data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='12'%20cy='12'%20r='10'%20stroke='%23113F63'%20stroke-width='2'/%3e%3cpath%20d='M7%2013l3%203l7-7'%20stroke='%23113F63'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
              />
            </div>
            <div className="goal__text">
              <div className="goal__name">{g.name}</div>
              <div className="goal__pct"><strong>{g.pct}%</strong> predicted</div>
              <div className="goal__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={g.pct}>
                <div className="goal__barFill" style={{ width: `${g.pct}%` }} />
              </div>
              <div className="goal__note">{g.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 5) Predicted Spending by Category */
function PredictedSpendingByCategory() {
  const cats = [
    { name: "Groceries", pct: 28 },
    { name: "Transport", pct: 18 },
    { name: "Dining", pct: 21 },
    { name: "Utilities", pct: 16 },
    { name: "Shopping", pct: 17 }
  ];
  return (
    <div className="card spendCard fade-in">
      <div className="spend__head">
        <strong>Predicted Spending by Category</strong>
      </div>
      <div className="spend__list">
        {cats.map((c) => (
          <div key={c.name} className="spend__row">
            <div
              className="spend__bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={c.pct}
            >
              <div className="spend__fill" style={{ width: `${c.pct}%` }} />
            </div>
            <div className="spend__label">
              <strong>{c.pct}%</strong>&nbsp;<span>{c.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 6) Upcoming Bills (Predicted) — NUEVA CARD */
function UpcomingBillsCard() {
  const bills = [
    { name: "Rent",         due: "Nov 01", amount: 950.00 },
    { name: "Internet",     due: "Nov 05", amount: 45.90 },
    { name: "Electricity",  due: "Nov 10", amount: 63.20 },
    { name: "Gym",          due: "Nov 12", amount: 29.99 },
  ];
  const total = bills.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="card trans fade-in">
      <div className="trans__head">
        <strong>Upcoming Bills (Predicted)</strong>
        <span className="muted">Total: <strong>USD {total.toFixed(2)}</strong></span>
      </div>
      <div className="trans__list">
        {bills.map((b) => (
          <div key={b.name} className="trans__item">
            <div className="trans__left">
              <div className="trans__icon">{b.name.charAt(0)}</div>
              <div>
                <div className="trans__name">{b.name}</div>
                <div className="muted">Due {b.due}</div>
              </div>
            </div>
            <div className="trans__amount">-${b.amount.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======================= Página ======================= */
export default function ChatDashboard() {
  return (
    <div className="dash">
      {/* 🔧 CSS mínimo para forzar 2 filas de 3 y chat a la derecha sin tocar tu paleta */}
      <style>{`
        .dash__top{
          display: grid;
          grid-template-columns: minmax(0, 1fr) 380px; /* izquierda + chat */
          gap: 16px;
          align-items: start;
        }
        .dash__left{
          display: grid;
          grid-template-columns: repeat(3, minmax(260px, 1fr)); /* 3 columnas */
          gap: 16px;
        }
        @media (max-width: 1200px){
          .dash__top{ grid-template-columns: 1fr; }
          .dash__left{ grid-template-columns: 1fr; }
        }
      `}</style>

      <Sidebar />

      <div className="dash__content">
        <section className="dash__top">
          {/* IZQUIERDA: 6 cards (2 filas x 3) */}
          <div className="dash__left">
            <PredictedBalanceCard />
            <FinancialScoreCard />
            <PredictedBalanceChart />
            <PredictedGoals />
            <PredictedSpendingByCategory />
            <UpcomingBillsCard /> {/* ← nueva card */}
          </div>

          {/* DERECHA: Chat */}
          <div className="chat-card">
            <Chat />
          </div>
        </section>
      </div>
    </div>
  );
}
