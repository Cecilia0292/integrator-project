import { NavLink, Outlet } from "react-router-dom";

function MainLayout({ onLogout }) {
  function handleLogout() {
    localStorage.removeItem("temporaryLoggedIn");
    onLogout();
  }

  function getNavLinkClass({ isActive }) {
    return `btn ${isActive ? "btn-light text-primary" : "btn-outline-light"}`;
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-boxes fs-3" aria-hidden="true"></i>
            <span>Estoque Fácil</span>
          </span>

          <div className="d-flex flex-wrap gap-2">
            <NavLink to="/products" className={getNavLinkClass}>
              <i className="bi bi-box-seam me-1" aria-hidden="true"></i>
              Produtos
            </NavLink>
            <NavLink to="/suppliers" className={getNavLinkClass}>
              <i className="bi bi-truck me-1" aria-hidden="true"></i>
              Fornecedores
            </NavLink>
            <NavLink to="/associations" className={getNavLinkClass}>
              <i className="bi bi-link-45deg me-1" aria-hidden="true"></i>
              Associações
            </NavLink>

            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-1" aria-hidden="true"></i>
              Sair
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
