import { fireEvent, render, screen } from "@testing-library/react";
import ProductsPage from "./ProductsPage";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../../services/productService";
import userEvent from "@testing-library/user-event";

jest.mock("../../services/productService", () => ({
  createProduct: jest.fn(),
  deleteProduct: jest.fn(),
  listProducts: jest.fn(),
  updateProduct: jest.fn(),
}));

describe("ProductsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    listProducts.mockResolvedValue([]);
  });

  test("exibe o formulário e a mensagem quando não há produtos", async () => {
    render(<ProductsPage />);

    expect(
      await screen.findByRole("heading", { name: "Produtos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Produtos cadastrados" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Nenhum produto cadastrado.")).toBeInTheDocument();
    expect(screen.getByLabelText("Quantidade em estoque")).toHaveValue("0");
  });

  test("informa quando são digitados caracteres inválidos no estoque", async () => {
    render(<ProductsPage />);

    const stockInput = await screen.findByLabelText("Quantidade em estoque");

    fireEvent.change(stockInput, {
      target: {
        name: "stockQuantity",
        value: "abc",
      },
    });

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Informe somente números inteiros.",
    );

    expect(stockInput).toHaveValue("");
  });

  test("cadastra produto com estoque zero", async () => {
    createProduct.mockResolvedValue({
      id: 1,
      name: "Produto sem estoque",
      barcode: "0000000000000",
      description: "Produto cadastrado sem unidades disponíveis",
      stockQuantity: 0,
      category: "ELETRÔNICOS",
    });

    render(<ProductsPage />);

    await screen.findByRole("heading", { name: "Produtos" });

    await userEvent.type(
      screen.getByLabelText("Nome do produto"),
      "Produto sem estoque",
    );

    await userEvent.type(
      screen.getByLabelText("Código de barras"),
      "0000000000000",
    );

    await userEvent.type(
      screen.getByLabelText("Descrição"),
      "Produto cadastrado sem unidades disponíveis",
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Cadastrar produto" }),
    );

    expect(createProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Produto sem estoque",
        barcode: "0000000000000",
        stockQuantity: 0,
      }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Produto criado com sucesso!",
    );
  });

  test("cancela a edição e restaura o formulário inicial", async () => {
    listProducts.mockResolvedValue([
      {
        id: 1,
        name: "Produto existente",
        barcode: "1234567890123",
        description: "Descrição do produto",
        stockQuantity: 10,
        category: "ELETRÔNICOS",
        expirationDate: "",
        categoryOther: "",
      },
    ]);

    render(<ProductsPage />);

    expect(await screen.findByText("Produto existente")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Editar produto" }),
    );

    expect(screen.getByDisplayValue("Produto existente")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Atualizar produto" }),
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Cancelar edição" }),
    );

    expect(screen.getByLabelText("Nome do produto")).toHaveValue("");
    expect(
      screen.getByRole("button", { name: "Cadastrar produto" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Cancelar edição" }),
    ).not.toBeInTheDocument();
  });

  test("atualiza um produto existente", async () => {
    listProducts.mockResolvedValue([
      {
        id: 1,
        name: "Produto existente",
        barcode: "1234567890123",
        description: "Descrição do produto",
        stockQuantity: 10,
        category: "ELETRÔNICOS",
        expirationDate: "",
        categoryOther: "",
      },
    ]);

    updateProduct.mockResolvedValue({
      id: 1,
      name: "Produto existente",
      barcode: "1234567890123",
      description: "Descrição do produto",
      stockQuantity: 25,
      category: "ELETRÔNICOS",
    });

    render(<ProductsPage />);

    expect(await screen.findByText("Produto existente")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Editar produto" }),
    );

    const stockInput = screen.getByLabelText("Quantidade em estoque");

    await userEvent.clear(stockInput);
    await userEvent.type(stockInput, "25");

    await userEvent.click(
      screen.getByRole("button", { name: "Atualizar produto" }),
    );

    expect(updateProduct).toHaveBeenCalledWith(
      1,
      expect.objectContaining({
        stockQuantity: 25,
      }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Produto atualizado com sucesso!",
    );
  });

  test("exclui um produto e exibe mensagem de sucesso", async () => {
    listProducts.mockResolvedValue([
      {
        id: 1,
        name: "Produto para excluir",
        barcode: "1234567890123",
        description: "Descrição do produto",
        stockQuantity: 10,
        category: "ELETRÔNICOS",
        expirationDate: "",
        categoryOther: "",
      },
    ]);

    deleteProduct.mockResolvedValue({});

    const confirmSpy = jest.spyOn(window, "confirm").mockReturnValue(true);

    render(<ProductsPage />);

    expect(await screen.findByText("Produto para excluir")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Excluir produto" }),
    );

    expect(confirmSpy).toHaveBeenCalledWith(
      "Tem certeza que deseja excluir este produto?",
    );

    expect(deleteProduct).toHaveBeenCalledWith(1);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Produto excluído com sucesso!",
    );

    confirmSpy.mockRestore();
  });

  test("não exclui o produto quando a exclusão é cancelada", async () => {
    listProducts.mockResolvedValue([
      {
        id: 1,
        name: "Produto mantido",
        barcode: "1234567890123",
        description: "Descrição do produto",
        stockQuantity: 10,
        category: "ELETRÔNICOS",
        expirationDate: "",
        categoryOther: "",
      },
    ]);

    const confirmSpy = jest.spyOn(window, "confirm").mockReturnValue(false);

    render(<ProductsPage />);

    expect(await screen.findByText("Produto mantido")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: "Excluir produto" }),
    );

    expect(confirmSpy).toHaveBeenCalledWith(
      "Tem certeza que deseja excluir este produto?",
    );

    expect(deleteProduct).not.toHaveBeenCalled();
    expect(
      screen.queryByText("Produto excluído com sucesso!"),
    ).not.toBeInTheDocument();

    confirmSpy.mockRestore();
  });
});
