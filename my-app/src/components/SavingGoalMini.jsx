export default function SavingGoalMini({
  title = "Savings Goals",
  name = "Vacation",
  current = 0,
  total = 1,
  nextDeposit = 0,
  schedule = "",
  due = "",
}) {
  const pct = Math.max(0, Math.min(100, Math.round((current / total) * 100)));

  return (
    <div className="goalMini">
      <div className="goalMini__title">{title}</div>

      <div className="goalMini__grid">
        {/* Col A: meta con barra */}
        <div className="goalMini__block">
          <div className="goalMini__name">{name}</div>
          <div className="goalMini__pct">
            <strong>{pct}%</strong>&nbsp;
            <span>(${current.toLocaleString()} of ${total.toLocaleString()})</span>
          </div>

          <div className="goalMini__bar">
            <div className="goalMini__fill" style={{ width: `${pct}%` }} />
          </div>

          <div className="goalMini__subline">${current.toLocaleString()} of ${total.toLocaleString()}</div>
        </div>

        {/* Col B: info lateral */}
        <div className="goalMini__block">
          <div className="goalMini__metaRow">
            <span className="goalMini__metaLabel">Emergency / Last Deposit:</span>
            <span className="goalMini__metaValue">${nextDeposit.toLocaleString()}</span>
          </div>
          <div className="goalMini__metaRow">
            <span className="goalMini__metaLabel">Scheduled:</span>
            <span className="goalMini__metaValue">{schedule}</span>
          </div>
          <button type="button" className="goalMini__cta">Pay Now</button>
        </div>

        {/* Col C: botón derecha */}
        <div className="goalMini__block goalMini__right">
          <div className="goalMini__metaRow">
            <span className="goalMini__metaLabel">Planned Due:</span>
            <span className="goalMini__metaValue">{due}</span>
          </div>
          <button type="button" className="goalMini__cta goalMini__cta--secondary">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
