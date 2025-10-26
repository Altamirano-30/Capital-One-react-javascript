import Sidebar from "../components/Sidebar";

export default function Invest() {
  return (
     <div className="dash">
      {/* ⬅️ Sidebar a la izquierda */}
      <Sidebar />

      {/* ⬅️ Contenido principal a la derecha */}
      <div className="dash__content">
        {/* Por el momento dejamos vacío */}
      </div>
    </div>
  );
}
