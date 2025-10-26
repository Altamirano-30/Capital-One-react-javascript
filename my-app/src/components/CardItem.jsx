// src/components/CardItem.jsx
import { useState } from "react";

export default function CardItem({ svg, title, last4, cvv }) {
  const [showCvv, setShowCvv] = useState(false);

  return (
    <div className="cardItem__wrap">
      {/* SVG de la tarjeta (puede ser una ilustración SVG completa) */}
      <div className="cardItem__svgWrap">
        <img src={svg} alt={title} className="cardItem__svg" />
      </div>

      <div className="cardItem__meta">
        <div className="cardItem__title">{title}</div>
        <div className="cardItem__pan">•••• •••• •••• {last4}</div>

        <div className="cardItem__row">
          <div className="cardItem__cvv">
            CVV:
            <span className="cardItem__cvvValue">{ showCvv ? cvv : "•••" }</span>
          </div>

          <button className="btn btn--ghost small" onClick={() => setShowCvv(v => !v)}>
            {showCvv ? "Hide CVV" : "Show CVV"}
          </button>
        </div>
      </div>
    </div>
  );
}
