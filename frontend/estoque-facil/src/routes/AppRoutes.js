import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProductsPage from "../pages/products/ProductsPage";
import SuppliersPage from "../pages/suppliers/SuppliersPage";
import AssociationsPage from "../pages/associations/AssociationsPage";
import AuthPage from "../pages/auth/AuthPage";
import MainLayout from "../pages/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes({ loggedIn, onLogin, onLogout }) {
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/products";

  return (
    <Routes>
      <Route
        path="/login"
        element={
          loggedIn ? (
            <Navigate to={redirectPath} replace />
          ) : (
            <AuthPage onLogin={() => onLogin(redirectPath)} />
          )
        }
      />

      <Route element={<ProtectedRoute isAuthenticated={loggedIn} />}>
        <Route element={<MainLayout onLogout={onLogout} />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="associations" element={<AssociationsPage />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to={loggedIn ? "/products" : "/login"} replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
