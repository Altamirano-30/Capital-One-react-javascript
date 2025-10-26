import { NavLink } from "react-router-dom";

// ✅ Importación de iconos desde Figma
import HomeIcon from "../assets/home.svg";
import TransferIcon from "../assets/transfer.svg";
import TxnIcon from "../assets/transaction.svg";
import AccountsIcon from "../assets/accounts.svg";
import CardsIcon from "../assets/cards.svg";
import InvestIcon from "../assets/invest.svg";
import TwinIcon from "../assets/twin.svg";

// ✅ Importación de avatar SVG
import AvatarIcon from "../assets/avatar.svg";

const items = [
  { to: "/", label: "Inicio", icon: HomeIcon },
  { to: "/transfer", label: "Transferencia", icon: TxnIcon },
  { to: "/accounts", label: "Cuentas", icon: AccountsIcon },
  { to: "/cards", label: "Tarjetas", icon: CardsIcon },
  { to: "/investments", label: "Inversiones", icon: InvestIcon },
  { to: "/twin", label: "TwinModel", icon: TwinIcon },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        {/* ✅ Avatar SVG */}
        <img src={AvatarIcon} alt="Avatar" className="avatar-img" />

        <div className="sidebar__name">Emiliano Altamirano Baez</div>
        <div className="sidebar__rule" />
      </div>

      <nav className="sidebar__nav">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end
            className={({ isActive }) =>
              `nav__item ${isActive ? "nav__item--active" : ""}`
            }
          >
            <img src={it.icon} alt="" className="nav__icon-img" />
            <span className="nav__label">{it.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
