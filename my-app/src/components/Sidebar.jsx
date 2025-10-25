export default function Sidebar() {
    return (
        <aside classname="sidebar">
            <div className="sidebar__profile">
                <div className="avatar" />
                <strong>Emiliano Altamirano Baez</strong>
            </div>
            <nav className="sidebar__nav">
                <a className="nav__item nav__item--active">Inicio</a>
                <a className="nav__item">Transferencia</a>
                <a className="nav__item">Transacción</a>
                <a className="nav__item">Cuentas</a>
                <a className="nav__item">Tarjetas</a>
                <a className="nav__item">Inversiones</a>
                <a className="nav__item">TwinModel</a>
            </nav>



        </aside>
    );



}