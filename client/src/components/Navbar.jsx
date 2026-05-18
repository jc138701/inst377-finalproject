import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const { pathname } = useLocation();
    const linkStyle = (path) => ({
        color: pathname === path ? "#61dafb" : "white",
        textDecoration: "none",
        fontWeight: pathname === path ? "600" : "400",
        borderBottom : pathname === path ? "2px solid #61dafb" : "2px solid transparent",
        paddingBottom: "2px",
        transition: "color 0.2s",
    });


    return ( 
        <nav
            style ={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                padding: '1rem 2rem',
                background: "#111",
                position: "sticky",
                top: 0,
                zIndex: 100,
                color: "white",
            }}
    >
      <h2 style={{ margin: 0, fontSize: "1.5rem" }}> 👔 IntelliFit</h2>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/" style={{ color: "white" }}>Home</Link>
        <Link to="/about" style={{ color: "white" }}>About</Link>
        <Link to="/outfit" style={{ color: "white" }}>Outfit</Link>
      </div>
    </nav>
  );
}

export default Navbar;
