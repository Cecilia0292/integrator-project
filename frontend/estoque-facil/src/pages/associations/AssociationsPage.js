import { useEffect, useState } from "react";
import { listProducts } from "../../services/productService";
import { listSuppliers } from "../../services/supplierService";
import {
  createAssociation,
  deleteAssociation,
  listAssociations,
} from "../../services/associationService";
// estados da pagina
function AssociationsPage() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [associations, setAssociations] = useState([]);
  const [productId, setProductId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // carregando os dados- funcao assincrona para carregar produtos, fornecedores e associações
  async function loadData() {
    try {
      setError("");

      const [productsData, suppliersData, associationsData] = await Promise.all(
        [listProducts(), listSuppliers(), listAssociations()],
      );

      setProducts(productsData);
      setSuppliers(suppliersData);
      setAssociations(associationsData);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }
  // carregando a pagina ao abrir
  useEffect(() => {
    loadData();
  }, []);
  // Enviando uma associação
  async function handleSubmit(event) {
    event.preventDefault(); // evita recarregar a pagina
    // verifica se os dois campos foram escolhidos
    if (!productId || !supplierId) {
      setError("Selecione um produto e um fornecedor.");
      return;
    }

    try {
      setError("");
      setMessage("");

      await createAssociation({
        productId: Number(productId),
        supplierId: Number(supplierId),
      });

      setProductId("");
      setSupplierId("");
      setMessage("Fornecedor associado ao produto com sucesso!");

      await loadData();
    } catch (apiError) {
      setError(apiError.message);
    }
  }
  // removendo uma associação
  async function handleDelete(id) {
    const confirmed = window.confirm("Deseja remover esta associação?");

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      await deleteAssociation(id);
      setMessage("Associação removida com sucesso!");
      await loadData();
    } catch (apiError) {
      setError(apiError.message);
    }
  }
  // carregamento condicional
  if (loading) {
    return <p>Carregando associações...</p>;
  }
  // campos de selecao
  return (
    <main className="container py-4">
      <h1 className="text-primary mb-4">
        Associação de Produtos e Fornecedores
      </h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Produto</label>
            <select
              className="form-select"
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
              required
            >
              <option value="">Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Fornecedor</label>
            <select
              className="form-select"
              value={supplierId}
              onChange={(event) => setSupplierId(event.target.value)}
              required
            >
              <option value="">Selecione um fornecedor</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6 mx-auto">
            <button type="submit" className="btn btn-primary w-100">
              <i className="bi bi-link-45deg me-1"></i>
              Associar fornecedor
            </button>
          </div>
        </div>
      </form>

      <section className="mt-5">
        <h2 className="h3 mb-3">Associações cadastradas</h2>

        {associations.length === 0 ? (
          <p className="text-secondary">Nenhuma associação cadastrada.</p>
        ) : (
          <ul className="list-group">
            {associations.map((association) => {
              const product = products.find(
                (item) => item.id === association.productId,
              );

              const supplier = suppliers.find(
                (item) => item.id === association.supplierId,
              );

              return (
                <li
                  key={association.id}
                  className="list-group-item d-flex flex-wrap align-items-center gap-3"
                >
                  <div className="me-auto">
                    <strong>
                      <i className="bi bi-box-seam me-1"></i>
                      {product?.name || association.productId}
                    </strong>

                    <div className="text-secondary small">
                      Fornecedor: {supplier?.name || association.supplierId}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(association.id)}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Remover
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}

export default AssociationsPage;

// A ideia mais importante é esta: o estado guarda os dados da tela, as funções conversam com a API e o JSX exibe o estado atual.
