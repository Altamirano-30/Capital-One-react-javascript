import { useState, useEffect } from "react";
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
  });
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchBalance = async () => {
    try {
      const res = await fetch("/api/users/cust_001/balance_history");
      const data = await res.json();

      console.log("DATA DEL ENDPOINT:", data); // Para ver cómo llega

      const history = Array.isArray(data) ? data : data.balance_history || [];

      if (history.length > 0) {
        // Ordenamos por fecha descendente y tomamos el registro más reciente
        const sortedHistory = history.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const latestRecord = sortedHistory[0];

        console.log("Registro más reciente:", latestRecord);

        setBalanceData({
          balance: Number(latestRecord.balance) || 0,
          income: Number(latestRecord.daily_inflow) || 0,
          expenses: Number(latestRecord.daily_outflow) || 0,
        });
      } else {
        console.warn("No hay registros en balance_history");
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching balance:", err);
      setLoading(false);
    }
  };

  fetchBalance();
}, []);


  return (
    <div className="dash">
      <Sidebar />

      <div className="dash__content">
        <section className="dash__top">
          <div className="dash__left">
            <div className="statsRow">
              <StatCard
                variant="balance"
                title="Total Balance"
                amount={
                  loading
                    ? "Cargando..."
                    : `USD ${balanceData.balance.toLocaleString("en-US")}`
                }
                percent="2.36 %"
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
                amount="USD 5,000.00"
                percent="2.36 %"
                sparkData={[1, 2, 3, 5, 8, 13, 21]}
              />
            </div>

            <StatisticsCard />
          </div>

          <TransactionsPanel />
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
