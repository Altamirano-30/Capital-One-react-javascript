import ArrowUp from "../assets/icon-arrow-up.svg";
import ArrowDown from "../assets/icon-arrow-down.svg";

export default function StatCard({
  variant = "balance", // "balance" | "savings"
  title,
  amount,
  percent = "2.36 %",
  income = "USD 30,000",
  expenses = "USD 20,000",
  sparkData = [2, 3, 4, 6, 9, 12, 14], // ⬅️ datos del spark (opcional)
  className = "",
}) {
  // Normalizar alturas del spark
  const max = Math.max(...sparkData);
  const bars = sparkData.map((v) => Math.max(4, Math.round((v / max) * 42))); // 4–42px

  // --- NUEVO: analizar si el porcentaje es positivo o negativo ---
  const numericPercent = parseFloat(percent);
  const isPositive = numericPercent >= 0;

  // Definir color y flecha segun el valor
  const percentColor = isPositive ? "#16a34a" : "#dc2626"; // verde o rojo
  const arrowIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <div className={`card stat stat--tight ${className}`}>
      <div className="stat__head">
        <span className="stat__title">{title}</span>

        <span
          className="badge-circle"
          style={{
            color: percentColor,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span className="ring">
            <img src={arrowIcon} alt="" width={12} height={12} />
          </span>
          {Math.abs(numericPercent)} %
        </span>
      </div>

      <div className="stat__amount stat__amount--center">{amount}</div>

      {variant === "balance" ? (
        <div className="stat__foot stat__foot--split">
          <div className="kpi">
            <span className="kpi__dot kpi__dot--up" />
            <span className="kpi__label">Income</span>
            <strong className="kpi__value">{income}</strong>
          </div>

          <span className="divider-vert" />

          <div className="kpi">
            <span className="kpi__dot kpi__dot--down" />
            <span className="kpi__label">Expenses</span>
            <strong className="kpi__value">{expenses}</strong>
          </div>
        </div>
      ) : (
        <div className="stat__spark center">
          {bars.map((h, i) => (
            <span
              key={i}
              className="stat__bar"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
