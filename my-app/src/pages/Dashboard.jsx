// src/pages/ChatDashboard.jsx
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionsPanel from "../components/TransactionsPanel";
import StatisticsCard from "../components/StatisticsCard";
import GoalsCard from "../components/GoalsCard";
import GoalIcon from "../assets/goal-sign.svg";
import SpendingOverview from "../components/SpendingOverview";
import QuickTransfer from "../components/QuickTransfer";

export default function Dashboard() {
  const [balanceData, setBalanceData] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    percent: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- Balance history ---
        const resBalance = await fetch("/api/users/cust_001/balance_history");
        const balanceHistory = await resBalance.json();

        const history = Array.isArray(balanceHistory)
          ? balanceHistory
          : balanceHistory.balance_history || [];

        if (history.length > 0) {
          const sortedHistory = history.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );

          const latestRecord = sortedHistory[0];
          const previousRecord = sortedHistory[1] || latestRecord;

          const balanceChangePercent =
            previousRecord.balance !== 0
              ? ((latestRecord.balance - previousRecord.balance) / previousRecord.balance) * 100
              : 0;

          setBalanceData({
            balance: Number(latestRecord.balance) || 0,
            income: Number(latestRecord.daily_inflow) || 0,
            expenses: Number(latestRecord.daily_outflow) || 0,
            percent: balanceChangePercent.toFixed(2),
          });
        }

        // --- Transactions ---
        const resTransactions = await fetch("/api/users/cust_001/transactions");
        const transactionsData = await resTransactions.json();

        // Filtrar transacciones reales (descartar las "synthetic" o "test")
        const filtered = transactionsData.filter(
          (t) =>
            t.merchant_name &&
            !t.merchant_name.toLowerCase().includes("synthetic")
        );

        // Mapear al formato necesario
        const mappedTransactions = filtered.slice(0, 5).map((t) => {
          const name = t.merchant_name || t.description;
          const amountValue = Number(t.amount) || 0;

          // Formatear categoría (tag)
          let tag = t.category || t.type || "Other";
          tag = tag.split("_")[0]; // tomar antes del guion bajo
          tag = tag.charAt(0).toUpperCase() + tag.slice(1); // primera mayúscula

          return {
            icon: name.charAt(0).toUpperCase(),
            name: name,
            tag: tag,
            amount: `${amountValue < 0 ? '-' : '+'}${Math.abs(amountValue).toLocaleString("en-US", { style: 'currency', currency: 'USD' })}`,
            positive: amountValue > 0,
          };
        });

        setTransactions(mappedTransactions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              <StatCard
                variant="balance"
                title="Total Balance"
                amount={
                  loading
                    ? "Cargando..."
                    : `USD ${balanceData.balance.toLocaleString("en-US")}`
                }
                percent={`${balanceData.percent || 0} %`}
                income={
                  loading
                    ? "Cargando..."
                    : `USD ${balanceData.income.toLocaleString("en-US")}`
                }
                expenses={
                  loading
                    ? "Cargando..."
                    : `USD ${balanceData.expenses.toLocaleString("en-US")}`
                }
              />

              <StatCard
                variant="savings"
                title="Total Savings"
                amount="USD 5,214.72"
                percent="2.36 %"
                sparkData={[1, 2, 3, 5, 8, 13, 21]}
              />
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

        <section className="dash__bottom">
          <GoalsCard
            title="Goals"
            goalName="Summer Vacation"
            current={1485}
            total={2400}
            icon={GoalIcon}
            onPrev={() => {}}
            onNext={() => {}}
          />
          <SpendingOverview items={[62, 50, 40, 10]} />
          <QuickTransfer
            contacts={["Emiliano Enriquez", "Emiliano Altamirano", "Diego Ferra"]}
          />
        </section>
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
