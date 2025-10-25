import Logo from "../assets/logo.svg"; 

export default function Navbar() {
  return (
    <header
      style={{
        padding: "12px 0",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        backgroundColor: "var(--color-fondo, #fff)", 
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px", 
        }}
      >
        {/* 🏦 Logo */}
        <img
          src={Logo}
          alt="Capital One"
          style={{ height: "32px", objectFit: "contain" }}
        />

        {/* 👋 Texto a la derecha */}
        <span
          style={{
            color: "var(--color-texto-suave, #666)",
            fontSize: 14,
            marginRight: "20px",
          }}
        >
          Hola, Emiliano
        </span>
      </div>
    </header>
  );
}
