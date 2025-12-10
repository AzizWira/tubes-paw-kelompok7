import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="wrapper-nav">
        <div className="logo">
          <img src="/Assets/logo-nav.jpg" alt="Logo" className="logo-img" />
        </div>

        {/* hamburger controls */}
        <input type="radio" name="slider" id="menu-btn-nav" />
        <input type="radio" name="slider" id="close-btn-nav" />

        <ul className="nav-links">
          <label htmlFor="close-btn-nav" className="btn close-btn-nav">
            <i className="fas fa-times"></i>
          </label>

          {/* BERANDA */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Beranda
            </NavLink>
          </li>

          {/* PENGETAHUAN */}
          <li>
            <NavLink
              to="/pengetahuan"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Pengetahuan
            </NavLink>
          </li>

          {/* TES PENGETAHUAN */}
          <li>
            <NavLink
              to="/tes-pengetahuan"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Tes Pengetahuan
            </NavLink>
          </li>

          {/* TENTANG */}
          <li>
            <NavLink
              to="/tentang"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Tentang
            </NavLink>
          </li>

          {/* ZIARAH */}
          <li>
            <NavLink
              to="/ziarah"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Ziarah
            </NavLink>
          </li>
        </ul>

        <div className="nav-right">
          <label htmlFor="menu-btn-nav" className="btn menu-btn-nav">
            <iconify-icon icon="pajamas:hamburger" width="30"></iconify-icon>
          </label>
        </div>
      </div>
    </nav>
  );
}
