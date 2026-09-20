import { useState } from 'react';
import ProductsPage from '../products/ProductsPage';
import SuppliersPage from '../suppliers/SuppliersPage';
import AssociationsPage from '../associations/AssociationsPage';

function MainLayout({ onLogout }) {
  const [activePage, setActivePage] = useState('products');

  function renderPage() {
    if (activePage === 'suppliers') {
      return <SuppliersPage />;
    }

    if (activePage === 'associations') {
      return <AssociationsPage />;
    }

    return <ProductsPage />;
  }

  function handleLogout() {
    localStorage.removeItem('temporaryLoggedIn');
    onLogout();
  }

  return (
    <div>
      <header>
        <h1>Estoque Fácil</h1>

        <nav>
          <button type="button" onClick={() => setActivePage('products')}>
            Produtos
          </button>

          <button type="button" onClick={() => setActivePage('suppliers')}>
            Fornecedores
          </button>

          <button
            type="button"
            onClick={() => setActivePage('associations')}
          >
            Associações
          </button>

          <button type="button" onClick={handleLogout}>
            Sair
          </button>
        </nav>
      </header>

      {renderPage()}
    </div>
  );
}

export default MainLayout;