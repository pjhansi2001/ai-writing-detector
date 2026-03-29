import { NavLink, Outlet } from "react-router-dom";

const navStyle = {
  display: "flex",
  justifyContent: "center",
  gap: 32,
  padding: "18px 20px",
  borderBottom: "1px solid #1a1a1a",
  background: "#0a0a0a",
  position: "sticky",
  top: 0,
  zIndex: 100,
  backdropFilter: "blur(12px)",
};

const linkBase = {
  fontSize: 12,
  letterSpacing: 2,
  textTransform: "uppercase",
  fontFamily: "'JetBrains Mono', monospace",
  fontWeight: 700,
  padding: "6px 0",
  borderBottom: "2px solid transparent",
  transition: "all 0.2s",
};

export default function Layout() {
  const getStyle = ({ isActive }) => ({
    ...linkBase,
    color: isActive ? "#ef4444" : "#666",
    borderBottomColor: isActive ? "#ef4444" : "transparent",
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav style={navStyle}>
        <NavLink to="/" style={getStyle} end>
          Detector
        </NavLink>
        <NavLink to="/patterns" style={getStyle}>
          All patterns
        </NavLink>
        <NavLink to="/about" style={getStyle}>
          About
        </NavLink>
      </nav>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "24px 20px",
          borderTop: "1px solid #1a1a1a",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "#444",
        }}
      >
        Based on Wikipedia's "Signs of AI writing" guide &middot; WikiProject AI
        Cleanup
      </footer>
    </div>
  );
}
