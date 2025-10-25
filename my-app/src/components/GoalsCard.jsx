import React from "react";

/**
 * Props:
 * - title: string (ej. "Goals")
 * - goalName: string (ej. "Summer Vacation")
 * - current: number (lo alcanzado, ej. 1485)
 * - total: number (meta, ej. 2400)
 * - icon: string (ruta a tu SVG importado)
 * - onPrev / onNext: callbacks opcionales para las flechitas
 */
export default function GoalsCard({
  title = "Goals",
  goalName = "Summer Vacation",
  current = 1485,
  total = 2400,
  icon,
  onPrev,
  onNext,
}) {
  const pct = Math.max(0, Math.min(100, Math.round((current / total) * 100)));
  const formattedCurrent = current.toLocaleString();
  const formattedTotal = total.toLocaleString();

  return (
    <div className="card goalCard" role="region" aria-label={`${title}: ${goalName}`}>
      <div className="goal__head">
        <strong className="goal__title">{title}</strong>
        <div className="goal__nav">
          <button className="goal__btn" aria-label="Anterior" onClick={onPrev} type="button">
            ‹
          </button>
          <button className="goal__btn" aria-label="Siguiente" onClick={onNext} type="button">
            ›
          </button>
        </div>
      </div>

      <div className="goal__body">
        <div className="goal__meta">
          <div className="goal__iconWrap">
            {icon ? <img src={icon} alt="" className="goal__icon" /> : null}
          </div>

          <div className="goal__text">
            <div className="goal__name">{goalName}</div>
            <div className="goal__pct"><strong>{pct}%</strong> reached</div>

            <div className="goal__bar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} role="progressbar">
              <div className="goal__barFill" style={{ width: `${pct}%` }} />
            </div>

            <div className="goal__note">${formattedCurrent} out of {formattedTotal}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
