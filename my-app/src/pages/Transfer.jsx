import Sidebar from "../components/Sidebar";

export default function TransferPage() {
  return (
    <div className="dash">
      {/* ⬅️ Sidebar a la izquierda */}
      <Sidebar />

      {/* ⬅️ Contenido principal a la derecha */}
      <div className="dash__content">
        <div
          style={{
            display: "flex",
            gap: "24px", // espacio entre columnas
            marginTop: "24px",
          }}
        >
          {/* IZQUIERDA: New Transfer */}
          <div
            style={{
              flex: 1, // ocupa la mitad del espacio
              backgroundColor: "#fff", // fondo blanco
              border: "1px solid #000", // borde negro
              borderRadius: "8px",
              padding: "24px",
              minHeight: "400px", // altura mínima para que se vea como un rectángulo
            }}
          >
            <h2>New Transfer</h2>
            {/* aquí irán los inputs después */}
          </div>

          {/* DERECHA: Shortcuts + Recent Transfers */}
          <div
            style={{
              flex: 1, // otra mitad
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Arriba: Shortcuts */}
            <div
              style={{
                backgroundColor: "#fff", // fondo blanco
                border: "1px solid #000", // borde negro
                borderRadius: "8px",
                padding: "16px",
                minHeight: "150px",
              }}
            >
              <h3>Shortcuts</h3>
            </div>

            {/* Abajo: Recent Transfers */}
            <div
              style={{
                backgroundColor: "#fff", // fondo blanco
                border: "1px solid #000", // borde negro
                borderRadius: "8px",
                padding: "16px",
                flex: 1, // ocupa el resto del espacio
                minHeight: "200px",
              }}
            >
              <h3>Recent Transfers</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
