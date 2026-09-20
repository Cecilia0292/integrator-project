import { useState } from "react";
import ProductsPage from "../products/ProductsPage";
import SuppliersPage from "../suppliers/SuppliersPage";
import AssociationsPage from "../associations/AssociationsPage";

function MainLayout({ onLogout }) {
  const [activePage, setActivePage] = useState("products");

  function renderPage() {
    if (activePage === "suppliers") {
      return <SuppliersPage />;
    }

    if (activePage === "associations") {
      return <AssociationsPage />;
    }

    return <ProductsPage />;
  }

  function handleLogout() {
    localStorage.removeItem("temporaryLoggedIn");
    onLogout();
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
            <button
              type="button"
              className={`btn ${
                activePage === "products"
                  ? "btn-light text-primary"
                  : "btn-outline-light"
              }`}
              onClick={() => setActivePage("products")}
            >
              <i className="bi bi-box-seam me-1"></i>
              Produtos
            </button>

            <button
              type="button"
              className={`btn ${
                activePage === "suppliers"
                  ? "btn-light text-primary"
                  : "btn-outline-light"
              }`}
              onClick={() => setActivePage("suppliers")}
            >
              <i className="bi bi-truck me-1"></i>
              Fornecedores
            </button>

            <button
              type="button"
              className={`btn ${
                activePage === "associations"
                  ? "btn-light text-primary"
                  : "btn-outline-light"
              }`}
              onClick={() => setActivePage("associations")}
            >
              <i className="bi bi-link-45deg me-1"></i>
              Associações
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Sair
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">{renderPage()}</div>
    </div>
  );
}

export default MainLayout;
