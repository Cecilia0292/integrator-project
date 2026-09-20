import { useState } from 'react';
import './App.css';
import AuthPage from './pages/auth/AuthPage';
import MainLayout from './pages/layout/MainLayout';


function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('temporaryLoggedIn') === 'true');

  if (!loggedIn) {
    return <AuthPage onLogin={() => setLoggedIn(true)} />;
  }

  return <MainLayout onLogout={() => setLoggedIn(false)} />;
}

export default App;