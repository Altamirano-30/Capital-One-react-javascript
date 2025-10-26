// src/components/CardCarousel.jsx
import { useState } from "react";
import CardItem from "./CardItem";

/* Flechas SVG inline (puedes cambiar por archivos) */
const ArrowLeft = ({className}) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 6L9 12L15 18" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ArrowRight = ({className}) => (
  <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CardCarousel({ items = [] }) {
  const [index, setIndex] = useState(0);
  const len = items.length;

  function prev() { setIndex(i => (i - 1 + len) % len); }
  function next() { setIndex(i => (i + 1) % len); }

  return (
    <div className="cardCarousel">
      <button className="carousel__nav carousel__nav--left" onClick={prev} aria-label="previous">
        <ArrowLeft />
      </button>

      <div className="carousel__viewport">
        {/* renderizamos los 3 elementos visibles: prev, current, next */}
        {items.map((it, i) => {
          const pos = ((i - index) + len) % len; // 0 = current, 1 = next, len-1 = prev
          const className = pos === 0 ? "cardItem cardItem--active" : pos === 1 ? "cardItem cardItem--next" : pos === len - 1 ? "cardItem cardItem--prev" : "cardItem cardItem--hidden";
          return <div key={it.id} className={className}><CardItem {...it} /></div>;
        })}
      </div>

      <button className="carousel__nav carousel__nav--right" onClick={next} aria-label="next">
        <ArrowRight />
      </button>
    </div>
  );
}
