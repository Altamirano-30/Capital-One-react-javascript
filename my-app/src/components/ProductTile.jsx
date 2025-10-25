export default function ProductTile({ title, text, cta = "Activate Now", variant }) {
  return (
    <div className={`prodTile ${variant === "dark" ? "prodTile--dark" : ""}`}>
      <div className="prodTile__left">
        <div className="prodTile__title">{title}</div>
        <div className="prodTile__text">{text}</div>
      </div>
      <div className="prodTile__right">
        <button type="button" className={`prodTile__cta ${variant === "dark" ? "is-dark" : ""}`}>
          {cta}
        </button>
      </div>
    </div>
  );
}
