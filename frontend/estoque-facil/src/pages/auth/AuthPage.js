import { useState } from 'react';

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    if (mode === 'register') {
      if (form.password !== form.confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }

      localStorage.setItem(
        'temporaryUser',
        JSON.stringify({
          email: form.email,
          password: form.password,
        })
      );

      setMessage('Cadastro realizado. Agora faça login.');
      setMode('login');
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem('temporaryUser')
    );

    if (
      !savedUser ||
      savedUser.email !== form.email ||
      savedUser.password !== form.password
    ) {
      setError('E-mail ou senha inválidos.');
      return;
    }

    localStorage.setItem('temporaryLoggedIn', 'true');
    onLogin();
  }

  return (
    <main>
      <h1>{mode === 'login' ? 'Entrar' : 'Criar conta'}</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Seu e-mail"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Sua senha"
          value={form.password}
          onChange={handleChange}
          required
        />

        {mode === 'register' && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit">
          {mode === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === 'login' ? 'register' : 'login');
          setError('');
          setMessage('');
        }}
      >
        {mode === 'login'
          ? 'Ainda não tenho cadastro'
          : 'Já tenho uma conta'}
      </button>
    </main>
  );
}

export default AuthPage;