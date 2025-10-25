import Logo from "../assets/logo.svg";
import Avatar from "../assets/avatar.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <header
        style={{
          padding: "12px 0",
          backgroundColor: "#113F63",
          color: "#fff",
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
          {/* 🏦 Logo clickeable */}
          <Link to="/">
            <img
              src={Logo}
              alt="Capital One"
              style={{ height: "32px", objectFit: "contain" }}
            />
          </Link>

          {/* 👋 Texto + Avatar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: 14 }}>Hola, Emiliano</span>
            <img
              src={Avatar}
              alt="Foto de perfil"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </header>

      {/* 💙 Franja azul debajo */}
      <div
        style={{
          height: "6px",
          backgroundColor: "#004481",
        }}
      ></div>
    </>
  );
}
