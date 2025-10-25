export default function Navbar() {
  return (
    <header style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
      <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <strong>TuMarca</strong>
        <span style={{ color:'var(--color-texto-suave)', fontSize:14 }}>Navbar</span>
      </div>
    </header>
  )
}
