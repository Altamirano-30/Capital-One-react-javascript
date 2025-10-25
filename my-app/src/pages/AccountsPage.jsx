import AccountCard from "../components/AccountCard";
import SavingGoalMini from "../components/SavingGoalMini";
import ProductTile from "../components/ProductTile";

export default function AccountsPage() {
  // Mock data (luego vendrá de tu API)
  const summary = {
    title: "Accounts & Products",
    totalUSD: 15000,
    ytdLabel: "Year to Date (YTD)",
  };

  const accounts = [
    {
      name: "Primary Checking Account",
      balance: 10000,
      mask: "****4567",
      actions: [
        { icon: "📤", label: "Transfer" },
        { icon: "🔍", label: "Details" },
      ],
    },
    {
      name: "Vacation Savings",
      balance: 5000,
      mask: "****1234",
      actions: [
        { icon: "🏦", label: "Deposit" },
        { icon: "🎯", label: "Withdraw Goal" },
      ],
    },
    {
      name: "Business Current Account",
      balance: 28501,
      mask: "****8134",
      actions: [
        { icon: "🧾", label: "Pay Bill" },
        { icon: "🕓", label: "History" },
      ],
    },
    {
      name: "Business Savings",
      balance: 28501,
      mask: "tfr*98CT",
      actions: [
        { icon: "🧾", label: "Pay Bill" },
        { icon: "🕓", label: "History" },
      ],
    },
  ];

  const goal = {
    title: "Savings Goals",
    name: "Summer Vacation",
    current: 1485,
    total: 2400,
    nextDeposit: 300,
    schedule: "1st of every month",
    due: "01/NOV/25",
  };

  const products = [
    {
      title: "Increase Savings",
      text: "Consider a high-yield investment account.",
      cta: "Activate Now",
    },
    {
      title: "Line of Credit",
      text: "You’re pre-approved for a credit line.",
      cta: "Activate Now",
      variant: "dark",
    },
  ];

  return (
    <div className="accounts">
      {/* Header */}
      <header className="acc__header">
        <h1> {summary.title} </h1>
        <div className="acc__totalWrap">
          <div className="acc__totalLabel">Total in Accounts (USD)</div>
          <div className="acc__total">${summary.totalUSD.toLocaleString()}</div>
          <div className="acc__ytd">{summary.ytdLabel}</div>
        </div>
      </header>

      {/* Accounts grid */}
      <section className="acc__grid">
        {accounts.map((a, i) => (
          <AccountCard key={i} {...a} />
        ))}
      </section>

      {/* Savings goals row */}
      <section className="acc__row">
        <SavingGoalMini {...goal} />
      </section>

      {/* Additional products */}
      <section className="acc__products">
        {products.map((p, i) => (
          <ProductTile key={i} {...p} />
        ))}
      </section>
    </div>
  );
}
