import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../../services/productService";

const initialForm = {
  name: "",
  barcode: "",
  description: "",
  stockQuantity: 1,
  category: "ELETRÔNICOS",
  expirationDate: "",
  categoryOther: "",
};

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  async function loadProducts() {
    try {
      setError("");
      const data = await listProducts();
      setProducts(data);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: name === "stockQuantity" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setMessage("");

      if (editingId) {
        await updateProduct(editingId, form);
        setMessage("Produto atualizado com sucesso!");
        setEditingId(null);
      } else {
        await createProduct(form);
        setMessage("Produto criado com sucesso!");
      }

      setForm(initialForm);
      await loadProducts();
    } catch (apiError) {
      setError(apiError.message);
    }
  }
  function handleEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      barcode: product.barcode || "",
      description: product.description || "",
      stockQuantity: product.stockQuantity || 0,
      category: product.category || "ELETRÔNICOS",
      expirationDate: product.expirationDate
        ? product.expirationDate.slice(0, 10)
        : "",
      categoryOther: product.categoryOther || "",
    });
    setMessage("");
    setError("");
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este produto?",
    );
    if (!confirmed) {
      return;
    }
    try {
      setError("");
      await deleteProduct(id);
      setMessage("Produto excluído com sucesso!");
      await loadProducts();
    } catch (apiError) {
      setError(apiError.message);
    }
  }
  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <main className="container py-4">
      <h1 className="text-primary mb-4">Produtos</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Nome do produto
            </label>

            <input
              id="name"
              name="name"
              className="form-control"
              placeholder="Nome do produto"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="barcode" className="form-label">
              Código de barras
            </label>

            <input
              id="barcode"
              name="barcode"
              className="form-control"
              type="text"
              inputMode="numeric"
              placeholder="7891234567890"
              value={form.barcode}
              onChange={handleChange}
              maxLength={13}
              pattern="[0-9]{13}"
              title="Digite exatamente 13 números"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="stockQuantity" className="form-label">
              Quantidade em estoque
            </label>

            <input
              id="stockQuantity"
              name="stockQuantity"
              className="form-control"
              type="number"
              min="1"
              step="1"
              value={form.stockQuantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="category" className="form-label">
              Categoria
            </label>

            <select
              id="category"
              name="category"
              className="form-select"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="ELETRÔNICOS">Eletrônicos</option>
              <option value="ALIMENTOS">Alimentos</option>
              <option value="VESTUÁRIO">Vestuário</option>
              <option value="OUTROS">Outros</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="expirationDate" className="form-label">
              Data de validade
            </label>

            <input
              id="expirationDate"
              name="expirationDate"
              type="date"
              className="form-control"
              value={form.expirationDate}
              onChange={handleChange}
            />
          </div>

          {form.category === "OUTROS" && (
            <div className="col-md-6">
              <label htmlFor="categoryOther" className="form-label">
                Outra categoria
              </label>

              <input
                id="categoryOther"
                name="categoryOther"
                className="form-control"
                placeholder="Informe a categoria"
                value={form.categoryOther}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Descrição
            </label>

            <textarea
              id="description"
              name="description"
              className="form-control"
              placeholder="Descrição do produto"
              value={form.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="col-12 col-md-6 mx-auto">
            <button type="submit" className="btn btn-primary w-100">
              {editingId ? "Atualizar produto" : "Cadastrar produto"}
            </button>
          </div>
        </div>
      </form>
      <section className="mt-5">
        <h2 className="h3 mb-3">Produtos Cadastrados</h2>

        {products.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <ul className="list-group">
            {products.map((product) => (
              <li
                key={product.id}
                className="list-group-item d-flex flex-wrap align-items-center gap-4"
              >
                <strong className="me-auto">{product.name}</strong>
                <span className="badge bg-secondary">
                  Estoque: {product.stockQuantity}
                </span>
                <button
                  type="button"
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(product)}
                  title="Editar produto"
                >
                  <i className="bi bi-pencil-square me-1"></i>
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <i className="bi bi-trash me-1"></i>
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default ProductsPage;
