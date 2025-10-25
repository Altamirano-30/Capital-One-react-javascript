export default function StatCard({
  title,
  amount,
  delta = '+0%',
  subtitleLeft,
  subtitleRight,
  children,
  className = ""   // ✅ ahora sí recibimos className
}) {
  return (
    <div className={`card stat ${className}`}>
      <div className="stat__head">
        <span className="stat__title">{title}</span>
        <span className="badge badge--up">{delta}</span>
      </div>

      <div className="stat__amount">{amount}</div>

      {children}

      {(subtitleLeft || subtitleRight) && (
        <div className="stat__foot">
          {subtitleLeft && <span className="muted">{subtitleLeft}</span>}
          <span className="divider" />
          {subtitleRight && <span className="muted">{subtitleRight}</span>}
        </div>
      )}
    </div>
  );
}
