import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";

/* ================= DonutChart (SVG animado) ================= */
function DonutChart({ data, size = 220, stroke = 28, animated = false }) {
  const R = (size - stroke) / 2;
  const C = 2 * Math.PI * R;

  // Prepara segmentos (longitud y offset acumulado)
  const segments = useMemo(() => {
    let acc = 0;
    return data.map((d, i) => {
      const frac = Math.max(0, Math.min(1, d.percent / 100));
      const len = C * frac;
      const offset = C * (1 - acc); // inicio del segmento
      acc += frac;
      return { ...d, len, offset, delay: i * 160 }; // delay progresivo
    });
  }, [data, C]);

  return (
    <svg
      className={`donut ${animated ? "is-animated" : ""}`}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* guía */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={R}
        fill="none"
        stroke="#eef2f7"
        strokeWidth={stroke}
      />
      {/* segmentos */}
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {segments.map((s, i) => (
          <circle
            key={i}
            className="donut__seg"
            cx={size / 2}
            cy={size / 2}
            r={R}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeLinecap="butt"
            strokeDasharray={`${s.len} ${C}`}
            /* estado inicial oculto */
            style={
              animated
                ? {
                    strokeDashoffset: s.offset,
                    transition: `stroke-dashoffset 900ms cubic-bezier(.2,.9,.2,1) ${s.delay}ms`,
                  }
                : { strokeDashoffset: C }
            }
          />
        ))}
      </g>
      {/* agujero central (estilo donut) */}
      <circle cx={size / 2} cy={size / 2} r={R - stroke / 1.2} fill="#fff" />
    </svg>
  );
}

/* ================= Counter animado ================= */
function Counter({ value, prefix = "", suffix = "", duration = 900 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const to = value;
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(from + (to - from) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  const formatted =
    typeof value === "number"
      ? n.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : n;
  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ================= Página ================= */
export default function InvestmentsPage() {
  const [animate, setAnimate] = useState(false);

  // Mock KPIs
  const portfolioValue = 12500;
  const perf30d = 1.85; // %
  const perfYtd = 7.2; // %

  // Mock distribución
  const distribution = [
    { label: "Global Tech ETF", percent: 30, color: "#2E5A88" },
    { label: "Corporate Bonds", percent: 25, color: "#4AA38C" },
    { label: "Gov Bonds 2028", percent: 15, color: "#0B8BD9" },
    { label: "Emerging Mkts", percent: 20, color: "#F39C5A" },
    { label: "Company Stock", percent: 10, color: "#E05263" },
  ];

  // Tabla de activos con números
  const assets = [
    { name: "Fondo Global Tech (ETF)", qty: 1, cost: 2, pl: "45%" },
    { name: "Bonos y Renta Fija", qty: 2, cost: 3, pl: "85%" },
    { name: "Bonos Gubernamentales (2028)", qty: 3, cost: 3, pl: "15%" },
    { name: "Bonos Gubern. (2028)", qty: 7, cost: 2, pl: "25%" },
    { name: "Acción de Empresa Local", qty: 2, cost: 3, pl: "10%" },
  ];

  // Lanzar animación al montar
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 180);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="dash">
      <Sidebar />
      <div className="dash__content">
        <div className="invest">
          {/* ===== Resumen ===== */}
          <section className="card invest__summary">
            <div className="invest__sumBox">
              <div className="muted">Total Portfolio Value</div>
              <div className="invest__big">
                <Counter value={portfolioValue} prefix={"USD "} />
              </div>
              <div className="muted small">Diversified across funds & stocks</div>
            </div>

            <div className="invest__sumBox">
              <div className="muted">Performance (Last 30 days)</div>
              <div className="invest__kpi pos">
                <Counter value={perf30d} suffix={"%"} />
              </div>
              <div className="muted small">
                Updated <Counter value={8} suffix={" min ago"} duration={600} />
              </div>
            </div>

            <div className="invest__sumBox">
              <div className="muted">Annual Return (YTD)</div>
              <div className="invest__kpi pos">
                <Counter value={perfYtd} suffix={"%"} />
              </div>
              <div className="muted small">Rolling basis</div>
            </div>
          </section>

          {/* ===== Distribución (Donut + tabla) ===== */}
          <section className="card invest__dist">
            <div className="invest__head">
              <strong>Portfolio Distribution</strong>
            </div>

            <div className="invest__distGrid">
              <div className="invest__donutWrap">
                <DonutChart data={distribution} animated={animate} />
                <div className="invest__donutLabels">
                  {distribution.map((d) => (
                    <div className="legend" key={d.label}>
                      <span className="dot" style={{ background: d.color }} />
                      <span className="legend__label">{d.label}</span>
                      <span className="legend__pct">{d.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="invest__tableWrap">
                <table className="invest__table">
                  <thead>
                    <tr>
                      <th>Asset Name</th>
                      <th>Qty</th>
                      <th>Cost</th>
                      <th>P/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((a, i) => (
                      <tr
                        key={i}
                        className={animate ? "row-anim" : ""}
                        style={{ ["--i"]: i }}
                      >
                        <td>{a.name}</td>
                        <td>{a.qty}</td>
                        <td>{a.cost}</td>
                        <td className="pos">{a.pl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ===== Oportunidades ===== */}
          <section className="card invest__explore">
            <div className="invest__head">
              <strong>Explore New Opportunities</strong>
            </div>
            <div className="invest__tiles">
              <div className={`tile ${animate ? "pop" : ""}`} style={{ ["--d"]: 0 }}>
                <div className="tile__icon">🛍️</div>
                <div className="tile__title">Shopping Portfolios</div>
                <div className="tile__txt">
                  Curated investment baskets with high yield.
                </div>
                <button className="btn light">See More</button>
              </div>
              <div className={`tile ${animate ? "pop" : ""}`} style={{ ["--d"]: 120 }}>
                <div className="tile__icon">🤖</div>
                <div className="tile__title">Automated Investing</div>
                <div className="tile__txt">
                  Set goals and let automation do the work.
                </div>
                <button className="btn light">Activate</button>
              </div>
              <div className={`tile ${animate ? "pop" : ""}`} style={{ ["--d"]: 240 }}>
                <div className="tile__icon">🌱</div>
                <div className="tile__title">ESG Funds</div>
                <div className="tile__txt">
                  Sustainable investments aligned with values.
                </div>
                <button className="btn light">Discover</button>
              </div>
            </div>
          </section>

          {/* ===== Panel lateral (mock de controles) ===== */}
          <section className="card invest__controls">
            <div className="invest__head">
              <strong>Card Control Settings</strong>
            </div>
            <div className="ctrl__row">
              <div className="muted">ATM Daily Limit</div>
              <div className="ctrl__val">USD 800.00</div>
            </div>
            <div className="ctrl__row">
              <div className="muted">Spending Limit</div>
              <select className="ctrl__input">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
            </div>
            <div className="ctrl__row">
              <div className="muted">Category Controls</div>
              <select className="ctrl__input">
                <option>Groceries</option>
                <option>Online</option>
                <option>Travel</option>
              </select>
            </div>
            <div className="ctrl__row">
              <button className="btn primary">View Details</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
