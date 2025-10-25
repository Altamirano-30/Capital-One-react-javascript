// src/components/QuickTransfer.jsx
import PlusIcon from "../assets/plus.svg";   // círculo + “+” dentro (svg completo)
import UserIcon from "../assets/user.svg";   // círculo + user (svg completo)

export default function QuickTransfer({
  title = "Quick Transfer",
  contacts = ["Emiliano Enriquez", "Emiliano Altamirano", "Diego Ferra"],
  onAddNew = () => {},
  onClickContact = () => {},
}) {
  return (
    <div className="card qtCard" role="region" aria-label={title}>
      <strong className="qt__title">{title}</strong>

      <div className="qt__list">
        {/* Add new */}
        <button type="button" className="qt__item" onClick={onAddNew}>
          <img src={PlusIcon} alt="" className="qt__icon" draggable="false" />
          <span className="qt__label">
            <span className="qt__labelLine">Add</span>
            <span className="qt__labelLine">new</span>
          </span>
        </button>

        {/* Todos los contactos usan el mismo user.svg */}
        {contacts.map((name, i) => (
          <button
            type="button"
            key={i}
            className="qt__item"
            onClick={() => onClickContact(name, i)}
            aria-label={`Send to ${name}`}
          >
            <img src={UserIcon} alt="" className="qt__icon" draggable="false" />
            <span className="qt__label">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
