export default function TransactionsPanel({ transactions = [], className = "" }) {
  return (
    <div className={`card trans ${className}`}>
      <div className="trans__head">
        <strong>Transactions</strong>
        <a href="#" className="muted">View all</a>
      </div>

      <div className="trans__tabs muted">
        All &nbsp;·&nbsp; Expenses &nbsp;·&nbsp; Income
      </div>

      <div className="trans__list">
        {transactions.length === 0 ? (
          <div style={{ color: "red", padding: "10px" }}>
            ⚠️ No hay transacciones disponibles
          </div>
        ) : (
          transactions.map((t, i) => (
            <div key={i} className="trans__item">
              <div className="trans__left">
                <div className="trans__icon">{t.icon}</div>
                <div>
                  <div className="trans__name">{t.name}</div>
                  <div className="muted">{t.tag}</div>
                </div>
              </div>
              <div className={`trans__amount ${t.positive ? "pos" : ""}`}>
                {t.amount}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
