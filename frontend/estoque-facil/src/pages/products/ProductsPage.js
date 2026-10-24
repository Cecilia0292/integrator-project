import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../../services/productService";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const initialForm = {
  name: "",
  barcode: "",
  description: "",
  stockQuantity: 0,
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
  const [stockQuantityError, setStockQuantityError] = useState("");

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

    if (name === "stockQuantity") {
      const containsInvalidCharacter = /\D/.test(value);

      setStockQuantityError(
        containsInvalidCharacter ? "Informe somente números inteiros." : "",
      );

      const numericValue = value.replace(/\D/g, "").slice(0, 6);

      setForm((currentForm) => ({
        ...currentForm,
        stockQuantity: numericValue === "" ? "" : Number(numericValue),
      }));

      return;
    }

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
      ...(name === "category" && value !== "OUTROS"
        ? { categoryOther: "" }
        : {}),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setMessage("");
      setStockQuantityError("");

      if (editingId) {
        await updateProduct(editingId, form);
        setMessage("Produto atualizado com sucesso!");
      } else {
        await createProduct(form);
        setMessage("Produto criado com sucesso!");
      }
      setEditingId(null);
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
      stockQuantity: product.stockQuantity ?? 0,
      category: product.category || "ELETRÔNICOS",
      expirationDate: product.expirationDate
        ? product.expirationDate.slice(0, 10)
        : "",
      categoryOther: product.categoryOther || "",
    });
    setMessage("");
    setError("");
    setStockQuantityError("");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    setMessage("");
    setError("");
    setStockQuantityError("");
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
      setMessage("");
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

      <ProductForm
        form={form}
        editingId={editingId}
        stockQuantityError={stockQuantityError}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
      />

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default ProductsPage;
