import "../styles/animations.css";
import Sidebar from "../components/Sidebar";

import { useState, useEffect } from "react";

export default function Twin() {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    // Desactiva la animación después de que termine
    const timer = setTimeout(() => setAnimating(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dash">
      <Sidebar />

      {/* Animación a pantalla completa */}
      {animating && (
        <div transition-style="full:cinematic">
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Twin Model</h1>
          <p>Bienvenido a la página de TwinModel.</p>
        </div>
      )}

      {/* Contenido normal (se muestra después de la animación) */}
      {!animating && (
        <div className="dash__content" style={{ padding: "40px" }}>
          <h1>Twin Model</h1>
          <p>Bienvenido a la página de TwinModel.</p>
        </div>
      )}
    </div>
  );
}
