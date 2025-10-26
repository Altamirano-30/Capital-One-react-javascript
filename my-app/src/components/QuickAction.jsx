export default function QuickAction({ icon, label, onClick }) {
  return (
    <button className="quickAction" onClick={onClick} type="button">
      {icon && <img src={icon} alt="" className="quickAction__icon" />}
      <span className="quickAction__label">{label}</span>
    </button>
  );
}
