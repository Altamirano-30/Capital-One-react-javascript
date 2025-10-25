import ArrowUp from '../assets/icon-arrow-up.svg'   // % (círculo/flecha verdes)
import ArrowDown from '../assets/icon-arrow-down.svg' // si quieres usarlo en Expenses


export default function StatCard({
  variant = "balance",               // "balance" | "savings"
  title,
  amount,
  percent = "2.36 %",
  income = "USD 30,000",
  expenses = "USD 20,000",
  sparkData = [2,3,4,6,9,12,14],     // ⬅️ datos del spark (opcional)
  className = ""
}) {
  // normalizar alturas del spark
  const max = Math.max(...sparkData);
  const bars = sparkData.map(v => Math.max(4, Math.round((v / max) * 42))); // 4–42px

  return (
    <div className={`card stat stat--tight ${className}`}>
      <div className="stat__head">
        <span className="stat__title">{title}</span>
        <span className="badge-circle">
          <span className="ring"><img src={ArrowUp} alt="" width={12} height={12} /></span>
          {percent}
        </span>
      </div>

      <div className="stat__amount stat__amount--center">{amount}</div>

      {variant === 'balance' ? (
        <div className="stat__foot stat__foot--split">
          <div className="kpi"><span className="kpi__dot kpi__dot--up" /><span className="kpi__label">Income</span><strong className="kpi__value">{income}</strong></div>
          <span className="divider-vert" />
          <div className="kpi"><span className="kpi__dot kpi__dot--down" /><span className="kpi__label">Expenses</span><strong className="kpi__value">{expenses}</strong></div>
        </div>
      ) : (
        <div className="stat__spark center">{/* ⬅️ centrado */}
          {bars.map((h,i)=> <span key={i} className="stat__bar" style={{ height: `${h}px` }} />)}
        </div>
      )}
    </div>
  )
}
