import { useState } from "react";
import CardItem from "./CardItem";

const ArrowLeft = (p) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M15 6L9 12L15 18" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrowRight = (p) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M9 6L15 12L9 18" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CardCarousel({ items = [] }) {
  const [index, setIndex] = useState(0);
  const [cvvVisible, setCvvVisible] = useState(false); // solo para la activa
  const len = items.length || 1;

  function prev() {
    setIndex(i => (i - 1 + len) % len);
    setCvvVisible(false); // al cambiar de tarjeta, ocultar CVV
  }
  function next() {
    setIndex(i => (i + 1) % len);
    setCvvVisible(false);
  }

  return (
    <div className="cardCarousel">
      <button className="carousel__nav carousel__nav--left" onClick={prev} aria-label="previous">
        <ArrowLeft />
      </button>

      <div className="carousel__viewport">
        {items.map((it, i) => {
          const pos = ((i - index) + len) % len; // 0 activa, 1 derecha, len-1 izquierda
          let className = "cardItem cardItem--hidden";
          let z = 10;
          if (pos === 0) { className = "cardItem cardItem--active"; z = 30; }
          else if (pos === 1) { className = "cardItem cardItem--next"; z = 20; }
          else if (pos === len - 1) { className = "cardItem cardItem--prev"; z = 20; }

          const isActive = pos === 0;

          return (
            <div key={it.id ?? i} className={className} style={{ zIndex: z }}>
              <CardItem
                {...it}
                showDetails={isActive}
                cvvVisible={isActive ? cvvVisible : false}
                onToggleCvv={isActive ? () => setCvvVisible(v => !v) : undefined}
              />
            </div>
          );
        })}
      </div>

      <button className="carousel__nav carousel__nav--right" onClick={next} aria-label="next">
        <ArrowRight />
      </button>
    </div>
  );
}
