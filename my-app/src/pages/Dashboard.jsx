import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionsPanel from "../components/TransactionsPanel";
import StatisticsCard from "../components/StatisticsCard";
import GoalsCard from "../components/GoalsCard";
import GoalIcon from "../assets/goal-sign.svg";
import SpendingOverview from "../components/SpendingOverview";
import QuickTransfer from "../components/QuickTransfer";

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
                variant="balance"
                title="Total Balance"
                amount="USD 10,000.00"
                percent="2.36 %"
                income="USD 30,000"
                expenses="USD 20,000"
              />

              <StatCard
                variant="savings"
                title="Total Savings"
                amount="USD 5,000.00"
                percent="2.36 %"
                sparkData={[1, 2, 3, 5, 8, 13, 21]}
              />
            </div>

            {/* Statistics real */}
            <StatisticsCard />
          </div>

          {/* DERECHA: Transactions aislado en su propia columna */}
          <TransactionsPanel />
        </section>

        {/* FILA INFERIOR */}
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
