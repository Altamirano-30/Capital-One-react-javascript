import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionsPanel from "../components/TransactionsPanel";

export default function Dashboard() {
  return (
    <div className="dash">
      <Sidebar />

      <div className="dash__content">
  {/* TOP: 2 columnas — izquierda (grid propio) + derecha (Transactions) */}
  <section className="dash__top">
    {/* IZQUIERDA: su propio grid */}
    <div className="dash__left">
      <div className="statsRow">
        <StatCard
          className="compact"
          title="Total Balance"
          amount="USD 10,000.00"
          delta="2.36 %"
          subtitleLeft="▲ Income USD 30,000"
          subtitleRight="▼ Expenses USD 20,000"
        />
        <StatCard
          className="compact"
          title="Total Savings"
          amount="USD 5,000.00"
          delta="2.36 %"
        />
      </div>

      <div className="card h-260">Statistics</div>
    </div>

    {/* DERECHA: Transactions aislado en su propia columna */}
    <TransactionsPanel />
  </section>

  {/* FILA INFERIOR */}
  <section className="dash__bottom">
    <div className="card h-180">Goals</div>
    <div className="card h-180">Spending Overview</div>
    <div className="card h-180">Quick Transfer</div>
  </section>
</div>
    </div>
  );
}
