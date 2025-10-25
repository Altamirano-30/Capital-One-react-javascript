export default function AccountCard({ name, balance, mask, actions = [] }) {
  return (
    <div className="accCard">
      <div className="accCard__head">
        <div className="accCard__name">{name}</div>
        <div className="accCard__balance">${balance.toLocaleString()}</div>
        <div className="accCard__mask">{mask}</div>
      </div>

      <div className="accCard__actions">
        {actions.map((a, i) => (
          <button key={i} type="button" className="accBtn">
            <span className="accBtn__icon">{a.icon}</span>
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}
