import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/auth/AuthPage";
import MainLayout from "./pages/layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("temporaryLoggedIn") === "true",
  );

  function handleLogin() {
    setLoggedIn(true);
  }
  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <BrowserRouter>
      <AppContent
        loggedIn={loggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </BrowserRouter>
  );
}

function AppContent({ loggedIn, onLogin, onLogout }) {
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
        <Route path="/*" element={<MainLayout onLogout={onLogout} />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={loggedIn ? "/products" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
