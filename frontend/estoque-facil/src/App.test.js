import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, "", "/login");
  });

  test("exibe a tela de login quando o usuário não está logado", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Estoque Fácil" }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  test("exibe erro ao tentar logar com credenciais inválidas", () => {
    render(<App />);

    userEvent.type(
      screen.getByLabelText("E-mail"),
      "usuario-invalido@email.com",
    );

    userEvent.type(screen.getByLabelText("Senha"), "senha-incorreta");

    userEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "E-mail ou senha inválidos.",
    );
  });

  test("permite cadastrar e entrar com credenciais válidas", () => {
    render(<App />);

    userEvent.click(
      screen.getByRole("button", { name: "Ainda não tenho cadastro" }),
    );

    userEvent.type(screen.getByLabelText("E-mail"), "usuario@email.com");

    userEvent.type(screen.getByLabelText("Senha"), "senha-segura");

    userEvent.type(screen.getByLabelText("Confirmar senha"), "senha-segura");

    userEvent.click(screen.getByRole("button", { name: "Cadastrar" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Cadastro realizado. Agora faça login.",
    );

    userEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(localStorage.getItem("temporaryLoggedIn")).toBe("true");
  });

  test.each(["/products", "/suppliers", "/associations"])(
    "redireciona usuário não autenticado ao acessar %s",
    (path) => {
      window.history.replaceState({}, "", path);

      render(<App />);

      expect(
        screen.getByRole("heading", { name: "Estoque Fácil" }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: "Entrar" }),
      ).toBeInTheDocument();

      expect(window.location.pathname).toBe("/login");
    },
  );

  test("encerra a sessão ao clicar em Sair", () => {
    localStorage.setItem("temporaryLoggedIn", "true");
    window.history.replaceState({}, "", "/products");

    render(<App />);

    userEvent.click(screen.getByRole("button", { name: "Sair" }));

    expect(localStorage.getItem("temporaryLoggedIn")).toBeNull();

    expect(
      screen.getByRole("heading", { name: "Estoque Fácil" }),
    ).toBeInTheDocument();

    expect(window.location.pathname).toBe("/login");
  });
});
