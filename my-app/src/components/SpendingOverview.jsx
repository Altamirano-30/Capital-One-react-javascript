export default function SpendingOverview({
  title = "Spending Overview",
  items = [62, 50, 40, 10], // porcentajes (0–100)
}) {
  return (
    <div className="card spendCard" role="region" aria-label={title}>
      <div className="spend__head">
        <strong>{title}</strong>
      </div>

      <div className="spend__list">
        {items.map((pct, i) => {
          const clamped = Math.max(0, Math.min(100, pct));
          return (
            <div key={i} className="spend__row">
              <div className="spend__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={clamped}>
                <div className="spend__fill" style={{ width: `${clamped}%` }} />
              </div>

              <div className="spend__label">
                <strong>{clamped}%</strong>&nbsp;<span>reached</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
