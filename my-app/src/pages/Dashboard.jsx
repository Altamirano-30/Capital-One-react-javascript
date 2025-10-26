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
    percent: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);        // <-- estado para todos los goals
  const [currentGoalIdx, setCurrentGoalIdx] = useState(0); // <-- índice del goal mostrado
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

        const filtered = transactionsData.filter(
          (t) =>
            t.merchant_name &&
            !t.merchant_name.toLowerCase().includes("synthetic")
        );

        const mappedTransactions = filtered.slice(0, 5).map((t) => {
          const name = t.merchant_name || t.description;
          const amountValue = Number(t.amount) || 0;

          let tag = t.category || t.type || "Other";
          tag = tag.split("_")[0];
          tag = tag.charAt(0).toUpperCase() + tag.slice(1);

          return {
            icon: name.charAt(0).toUpperCase(),
            name: name,
            tag: tag,
            amount: `${amountValue < 0 ? '-' : '+'}${Math.abs(amountValue).toLocaleString("en-US", { style: 'currency', currency: 'USD' })}`,
            positive: amountValue > 0,
          };
        });

        setTransactions(mappedTransactions);

        // --- Goals ---
        const resGoals = await fetch("/api/users/cust_001/goals");
        const goalsData = await resGoals.json();

        const mappedGoals = goalsData.map(goal => ({
          id: goal.id,
          goalName: goal.name,
          current: goal.current_progress,
          total: goal.target_amount,
          icon: GoalIcon
        }));

        setGoals(mappedGoals);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrevGoal = () => {
    setCurrentGoalIdx((prev) => (prev > 0 ? prev - 1 : goals.length - 1));
  };

  const handleNextGoal = () => {
    setCurrentGoalIdx((prev) => (prev < goals.length - 1 ? prev + 1 : 0));
  };

  const currentGoal = goals[currentGoalIdx];

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
                amount={loading ? "Cargando..." : `USD ${balanceData.balance.toLocaleString("en-US")}`}
                percent={`${balanceData.percent || 0} %`}
                income={loading ? "Cargando..." : `USD ${balanceData.income.toLocaleString("en-US")}`}
                expenses={loading ? "Cargando..." : `USD ${balanceData.expenses.toLocaleString("en-US")}`}
              />

              <StatCard
                variant="savings"
                title="Total Savings"
                amount="USD 5,214.72"
                percent="2.36 %"
                sparkData={[1, 2, 3, 5, 8, 13, 21]}
              />
            </div>

            <StatisticsCard />
          </div>

          <TransactionsPanel transactions={transactions} />
        </section>

        <section className="dash__bottom">
          {currentGoal ? (
            <GoalsCard
              key={currentGoal.id}
              title="Goal"
              goalName={currentGoal.goalName}
              current={currentGoal.current}
              total={currentGoal.total}
              icon={currentGoal.icon}
              onPrev={handlePrevGoal}
              onNext={handleNextGoal}
            />
          ) : (
            <div>Loading goals...</div>
          )}

          <SpendingOverview items={[62, 50, 40, 10]} />
          <QuickTransfer contacts={["Emiliano Enriquez", "Emiliano Altamirano", "Diego Ferra"]} />
        </section>
      </div>
    </div>
  );
}
