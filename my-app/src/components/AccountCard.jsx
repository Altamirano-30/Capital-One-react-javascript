export default function AccountCard({ name, balance, mask, actions = [] }) {
  return (
    <article className="accCard card">
      <div className="accCard__head">
        <div className="accCard__name">{name}</div>
        <div className="accCard__balance">${balance.toLocaleString()}</div>
        <div className="accCard__mask">{mask}</div>
      </div>

      <div className="accCard__actions">
        {actions.map((a, i) => (
          <button key={i} type="button" className="accBtn">
            {/* ⬇️ importante: usar <img src={a.icon} /> */}
            <img src={a.icon} alt="" className="accBtn__icon" />
            <span>{a.label}</span>
          </button>
        ))}
      </div>
    </article>
  );
}
