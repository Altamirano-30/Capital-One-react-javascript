import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionsPanel from "../components/TransactionsPanel";

export default function Dashboard() {
  return (
    <div className="dash">
      <Sidebar />

      <div className="dash__content">

        {/* GRID SUPERIOR (2 filas) */}
        <section className="dash__gridTop">
          {/* fila 1, col 1-2: stat cards compactas */}
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


          {/* col 3: Transactions ocupa 2 filas */}
          <TransactionsPanel className="span-span-2row col-3" />

          {/* fila 2, col 1-2: Statistics a lo ancho */}
          <div className="card h-260 span-2col">Statistics</div>
        </section>

        {/* FILA INFERIOR (Goals / Spending / Quick Transfer) */}
        <section className="dash__row">
          <div className="card h-180">Goals</div>
          <div className="card h-180">Spending Overview</div>
          <div className="card h-180">Quick Transfer</div>
        </section>
      </div>
    </div>
  );
}
