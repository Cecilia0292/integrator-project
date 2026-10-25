import { useEffect, useState } from "react";
import { listProducts } from "../../services/productService";
import { listSuppliers } from "../../services/supplierService";
import {
  createAssociation,
  deleteAssociation,
  listAssociations,
} from "../../services/associationService";
import AssociationsList from "../../pages/associations/AssociationsList";
import AssociationsForm from "../../pages/associations/AssociationsForm";
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

      <AssociationsForm
        products={products}
        suppliers={suppliers}
        productId={productId}
        supplierId={supplierId}
        onProductChange={(event) => setProductId(event.target.value)}
        onSupplierChange={(event) => setSupplierId(event.target.value)}
        onSubmit={handleSubmit}
      />

      <AssociationsList
        associations={associations}
        products={products}
        suppliers={suppliers}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default AssociationsPage;

// A ideia mais importante é esta: o estado guarda os dados da tela, as funções conversam com a API e o JSX exibe o estado atual.
