export default function Footer() {
  return (
    <footer style={{ padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.08)', marginTop: 24 }}>
      <div className="container" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', color:'var(--color-texto-suave)', fontSize:14 }}>
        <span>© {new Date().getFullYear()} Capital One</span>
      </div>
    </footer>
  )
}
