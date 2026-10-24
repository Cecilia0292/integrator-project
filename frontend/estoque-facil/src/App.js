import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

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
      <AppRoutes
        loggedIn={loggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </BrowserRouter>
  );
}

export default App;
