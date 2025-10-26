// src/pages/ChatDashboard.jsx
import { useEffect, useMemo, useState } from "react";
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

/* =============== Sparkline (mini chart SVG) =============== */
function Sparkline({ data = [], width = 520, height = 120, pad = 8 }) {
  if (!data.length) {
    return (
      <div className="chart-skeleton">
        <span>(sin datos)</span>
      </div>
    );
  }
  // normalizar
  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const dx = Math.max(1, maxX - minX);
  const dy = Math.max(1e-6, maxY - minY);

  const points = data.map((d) => {
    const x = pad + ((d.x - minX) / dx) * (width - 2 * pad);
    // invertimos y para que valores altos vayan arriba
    const y = pad + (1 - (d.y - minY) / dy) * (height - 2 * pad);
    return `${x},${y}`;
  });

  const last = data[data.length - 1]?.y ?? 0;
  const first = data[0]?.y ?? 0;
  const up = last >= first;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Predicted balance sparkline">
      {/* grid base ligera */}
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#e2e8f0" strokeWidth="1" />
      <polyline
        fill="none"
        stroke={up ? "#16A34A" : "#DC2626"}
        strokeWidth="2"
        points={points.join(" ")}
        vectorEffect="non-scaling-stroke"
      />
      {/* punto final */}
      {points.length > 0 && (
        <circle
          cx={points[points.length - 1].split(",")[0]}
          cy={points[points.length - 1].split(",")[1]}
          r="3.5"
          fill="#2563eb"
        />
      )}
    </svg>
  );
}

/* ======================= Cards ======================= */

/* 2) Financial Score — grande */
function FinancialScoreCard() {
  const score = 76; // 0–100
  const size = 160;   // antes 118
  const stroke = 14;  // antes 10
  const radius = (size - stroke) / 2;
  const clamped = Math.max(0, Math.min(100, score));
  const arcD = describeArc(size / 2, size / 2, radius, 180, 180 + (clamped / 100) * 180);

  return (
    <div className="card card--compact card--emph fade-in" style={{ minWidth: 0 }}>
      <h3 className="card__title" style={{ marginBottom: 6, fontSize: "1.02rem", fontWeight: 800 }}>
        Financial Score
      </h3>

      <div className="score score--big" style={{ gap: 6, paddingTop: 0 }}>
        <svg
          width={size}
          height={size / 2}
          viewBox={`0 0 ${size} ${size / 2}`}
          data-allow-invert
          style={{ display: "block" }}
        >
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
        <div className="score__number score__number--big">
          {clamped} / 100
        </div>
      </div>

      <ul className="bullets" style={{ marginTop: 6, fontSize: "0.9rem" }}>
        <li>Puntualidad en pagos</li>
        <li>Uso de crédito</li>
        <li>Ahorro promedio</li>
      </ul>
    </div>
  );
}

/* 1) Predicted Total Balance — enfatizado */
/* 1) Predicted Total Balance — énfasis visual */
function PredictedBalanceCard({ nextMonthBalance, deltaPercent }) {
  const positive = deltaPercent >= 0;
  const deltaAbs = Math.abs(deltaPercent || 0).toFixed(2);

  return (
    <div className="card card--compact card--emph card--accent stat fade-in" style={{ minWidth: 0 }}>
      {/* Head */}
      <div className="stat__head stat__head--tight">
        <span className="stat__title stat__title--bold">Predicted Total Balance</span>
        <span className={`badge-pill ${positive ? "pill--up" : "pill--down"}`}>
          {positive ? "+" : "-"}{deltaAbs}%
        </span>
      </div>

      {/* Monto XL */}
      <div
        className="stat__amount stat__amount--xl"
        title={`USD ${Number(nextMonthBalance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
      >
        <span className="stat__currency">USD</span>
        <span className="stat__value">
          {Number(nextMonthBalance || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Divider suave */}
      <div className="soft-sep" />

      {/* KPIs apilados (llenan el hueco y anclan al fondo) */}
      <div className="stat__foot stat__foot--stack">
        <div className="kpiCell">
          <span className="kpiDot kpiDot--up" />
          <span className="kpi__label">Pred. Change</span>
        </div>
        <strong className="kpi__value">{positive ? "↑" : "↓"} {deltaAbs}%</strong>

        <div className="kpiCell">
          <span className="kpiDot kpiDot--down" />
          <span className="kpi__label">Confidence</span>
        </div>
        <strong className="kpi__value">—</strong>
      </div>
    </div>
  );
}


/* 3) Predicted Balance (gráfica Sparkline) */
function PredictedBalanceChart({ series = [] }) {
  return (
    <div className="card statsCard fade-in">
      <div className="statsCard__head">
        <strong>Predicted Balance</strong>
        <div className="statsCard__controls">
          <span className="legend"><span className="dot dot--inc" /> Trend</span>
          <div className="segmented">
            <button className="active" disabled>30 días</button>
            <button disabled>90 días</button>
            <button disabled>1 año</button>
          </div>
        </div>
      </div>
      <div className="chart-frame">
        <Sparkline data={series} />
      </div>
    </div>
  );
}

/* 4) Goals (Predicted) — placeholder por ahora */
function PredictedGoals() {
  const goals = [
    { name: "Emergency Fund", pct: 68, note: "$3,400 / $5,000" },
    { name: "Summer Trip", pct: 51, note: "$1,530 / $3,000" },
    { name: "New Laptop", pct: 34, note: "$510 / $1,500" }
  ];
  return (
    <div className="card goalCard fade-in">
      <div className="goal__head"><strong className="goal__title">Goals (Predicted)</strong></div>
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

/* 5) Predicted Spending by Category — ahora con props reales */
function PredictedSpendingByCategory({ cats = [] }) {
  return (
    <div className="card spendCard fade-in">
      <div className="spend__head">
        <strong>Predicted Spending by Category</strong>
      </div>
      <div className="spend__list">
        {cats.length === 0 && (
          <div className="muted" style={{ padding: "8px 0" }}>Sin datos</div>
        )}
        {cats.map((c) => (
          <div key={c.name} className="spend__row">
            <div className="spend__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={c.pct}>
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

/* 6) Upcoming Bills (Predicted) — placeholder por ahora */
function UpcomingBillsCard() {
  const bills = [
    { name: "Rent",         due: "Nov 01", amount: 950.0 },
    { name: "Internet",     due: "Nov 05", amount: 45.9 },
    { name: "Electricity",  due: "Nov 10", amount: 63.2 },
    { name: "Gym",          due: "Nov 12", amount: 29.99 }
  ];
  const total = bills.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="card trans fade-in">
      <div className="trans__head">
        <strong>Upcoming Bills (Predicted)</strong>
        <span className="muted">
          Total: <strong>USD {total.toFixed(2)}</strong>
        </span>
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [balanceSeries, setBalanceSeries] = useState([]); // [{x: timestamp, y: yhat}]
  const [nextMonthBalance, setNextMonthBalance] = useState(0);
  const [deltaPercent, setDeltaPercent] = useState(0);
  const [catsPct, setCatsPct] = useState([]); // [{name, pct}]

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError("");
      try {
        // 1) Balance predictions
        const r1 = await fetch("/api/users/cust_001/predictions/balance");
        if (!r1.ok) throw new Error(`Balance HTTP ${r1.status}`);
        const balanceJson = await r1.json(); // array [{ ds, yhat, ... }, ...]
        const sorted = [...balanceJson]
          .filter(d => d?.ds && typeof d?.yhat === "number")
          .sort((a, b) => new Date(a.ds) - new Date(b.ds));

        const series = sorted.map(d => ({ x: new Date(d.ds).getTime(), y: Number(d.yhat) }));
        setBalanceSeries(series);

        if (sorted.length >= 2) {
          const last = sorted[sorted.length - 1].yhat;
          const prev = sorted[sorted.length - 2].yhat;
          setNextMonthBalance(last);
          setDeltaPercent(((last - prev) / (prev || 1)) * 100);
        } else if (sorted.length === 1) {
          setNextMonthBalance(sorted[0].yhat);
          setDeltaPercent(0);
        }

        // 2) Category predictions
        const r2 = await fetch("/api/users/cust_001/predictions/category");
        if (!r2.ok) throw new Error(`Category HTTP ${r2.status}`);
        const catJson = await r2.json(); // array
        // Tomar el conjunto más reciente por (year, month) usando created_at
        const byKey = new Map(); // key = `${year}-${month}`
        for (const row of catJson) {
          const key = `${row.year}-${String(row.month).padStart(2, "0")}`;
          const prev = byKey.get(key);
          if (!prev || new Date(row.created_at) > new Date(prev.created_at)) {
            byKey.set(key, { created_at: row.created_at });
          }
        }
        // último año-mes por fecha de creación más reciente global
        const latestCreated = [...byKey.values()].reduce((acc, cur) => {
          if (!acc) return cur;
          return new Date(cur.created_at) > new Date(acc.created_at) ? cur : acc;
        }, null);

        // si no se puede, usamos el año-mes máximo
        let yearMonthToUse = null;
        if (latestCreated) {
          // encontrar el (year, month) correspondiente al created_at más reciente
          let bestYM = null;
          let bestDate = null;
          for (const row of catJson) {
            const d = new Date(row.created_at);
            if (!bestDate || d > bestDate) {
              bestDate = d;
              bestYM = { year: row.year, month: row.month };
            }
          }
          yearMonthToUse = bestYM;
        } else if (catJson.length) {
          const maxRow = catJson.reduce((a, b) =>
            a.year > b.year || (a.year === b.year && a.month >= b.month) ? a : b
          );
          yearMonthToUse = { year: maxRow.year, month: maxRow.month };
        }

        const filtered = yearMonthToUse
          ? catJson.filter(r => r.year === yearMonthToUse.year && r.month === yearMonthToUse.month)
          : catJson;

        const total = filtered.reduce((s, r) => s + Number(r.predicted_spent || 0), 0);
        const cats = filtered
          .map(r => ({
            name: (r.category || "").replace(/_/g, " ").replace(/\b\w/g, m => m.toUpperCase()),
            pct: total > 0 ? Math.round((Number(r.predicted_spent) / total) * 100) : 0
          }))
          .sort((a, b) => b.pct - a.pct);
        setCatsPct(cats);
      } catch (e) {
        setError(e.message || "Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Tomar últimos 30 puntos para la sparkline (si hay muchos)
  const last30 = useMemo(() => {
    const n = balanceSeries.length;
    return n > 30 ? balanceSeries.slice(n - 30) : balanceSeries;
  }, [balanceSeries]);

  return (
    <div className="dash">
      {/* CSS mínimo: grid 3×2 a la izquierda + chat a la derecha + compact cards */}
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
          align-content: start;
        }
        .card--compact{
          padding: 12px 14px;
          min-height: 140px;
          display:flex;
          flex-direction:column;
          gap:8px;
        }
        .card--compact .stat__amount--center{
          /* este valor ahora lo sobrescribe .stat__amount--big */
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          margin: 2px 0 6px;
        }
        .card--compact .badge-circle .ring{ display:none; }
        .card--compact .bullets{ line-height: 1.5; }
        .chart-frame{ padding: 8px 0 0; }
        .chart-skeleton{
          height: 120px;
          border: 1px dashed #CBD5E1;
          border-radius: 8px;
          display:flex; align-items:center; justify-content:center;
          font-size: .9rem; color:#64748B;
        }

        /* === Nuevos estilos de énfasis y tamaños grandes === */
        .card--emph{ padding: 16px 18px; }

        .stat__amount--big{
          font-size: clamp(1.6rem, 2.8vw, 2.2rem);
          font-weight: 900;
          line-height: 1.05;
          margin: 6px 0 10px;
        }

        .score__number--big{
          font-size: clamp(1.15rem, 2.1vw, 1.5rem);
          font-weight: 900;
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
            <PredictedBalanceCard nextMonthBalance={nextMonthBalance} deltaPercent={deltaPercent} />
            <FinancialScoreCard />
            <PredictedBalanceChart series={last30} />
            <PredictedGoals />
            <PredictedSpendingByCategory cats={catsPct} />
            <UpcomingBillsCard />
          </div>

          {/* DERECHA: Chat */}
          <div className="chat-card">
            {loading && <div className="muted">Cargando predicciones…</div>}
            {error && <div className="error">Error: {error}</div>}
            <Chat />
          </div>
        </section>
      </div>
    </div>
  );
}
