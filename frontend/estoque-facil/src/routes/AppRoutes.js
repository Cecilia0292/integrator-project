import { Navigate, Route, Routes } from "react-router-dom";
import ProductsPage from "../pages/products/ProductsPage";
import SuppliersPage from "../pages/suppliers/SuppliersPage";
import AssociationsPage from "../pages/associations/AssociationsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/suppliers" element={<SuppliersPage />} />
      <Route path="/associations" element={<AssociationsPage />} />

      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  );
}

export default AppRoutes;
