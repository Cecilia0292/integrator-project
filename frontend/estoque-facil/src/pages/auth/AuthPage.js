import { useState } from "react";

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (mode === "register") {
      if (form.password !== form.confirmPassword) {
        setError("As senhas não coincidem.");
        return;
      }

      localStorage.setItem(
        "temporaryUser",
        JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      );

      setMessage("Cadastro realizado. Agora faça login.");
      setMode("login");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("temporaryUser"));

    if (
      !savedUser ||
      savedUser.email !== form.email ||
      savedUser.password !== form.password
    ) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    localStorage.setItem("temporaryLoggedIn", "true");
    onLogin();
  }

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      <section
        className="card shadow-sm border-0 p-4 w-100"
        style={{ maxWidth: "520px" }}
      >
        <div className="card-body">
          <div className="text-center mb-4">
            <i className="bi bi-boxes text-primary display-4"></i>
            <h1 className="h2 text-primary fw-bold mt-2 mb-1">Estoque Fácil</h1>
            <p className="text-secundary mb-0">
              Gestão de produtos e fornecedores
            </p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form d-grid gap-3">
            <div>
              <label htmlFor="email" className="form-label">
                E-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Senha
              </label>

              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="Digite sua senha"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {mode === "register" && (
              <div>
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmar senha
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Repita sua senha"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              {mode === "login" ? "Entrar" : "Cadastrar"}
            </button>
          </form>

          <button
            type="button"
            className="btn btn-link w-100 mt-3"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
              setMessage("");
            }}
          >
            {mode === "login"
              ? "Ainda não tenho cadastro"
              : "Já tenho uma conta"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default AuthPage;
