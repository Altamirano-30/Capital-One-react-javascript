import Logo from "../assets/logo.svg";

export default function Navbar() {
  return (
    <>
      <header
        style={{
          padding: "12px 0",
          backgroundColor: "#113F63",
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
          <img
            src={Logo}
            alt="Capital One"
            style={{ height: "32px", objectFit: "contain" }}
          />
          <span style={{ color: "#f6f3f3ff", fontSize: 14, marginRight: "20px" }}>
            Hola, Emiliano
          </span>
        </div>
      </header>

      {/* 💙 Franja azul debajo */}
      <div
        style={{
          height: "6px",
          backgroundColor: "#113F63", // color azul corporativo
        }}
      ></div>
    </>
  );
}
