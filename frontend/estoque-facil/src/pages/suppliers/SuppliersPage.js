import { useEffect, useState } from "react";
import {
  createSupplier,
  deleteSupplier,
  listSuppliers,
  updateSupplier,
} from "../../services/supplierService";
import SupplierForm from "./SupplierForm";
import SupplierList from "./SupplierList";

// estado inicial do formulário
const initialForm = {
  name: "",
  cnpj: "",
  address: "",
  phone: "",
  email: "",
  mainContact: "",
};
// estados do componente SuppliersPage
function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // carregamento dos fornecedores da API
  async function loadSuppliers() {
    try {
      setError("");
      const data = await listSuppliers();
      setSuppliers(data);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }
  // executando a pagina de fornecedores
  useEffect(() => {
    loadSuppliers();
  }, []);
  //Alteração dos campos
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }
  // cadastro e atualização de fornecedores
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setMessage("");

      if (editingId) {
        await updateSupplier(editingId, form);
        setMessage("Fornecedor atualizado com sucesso!");
      } else {
        await createSupplier(form);
        setMessage("Fornecedor cadastrado com sucesso!");
      }

      setForm(initialForm);
      setEditingId(null);
      await loadSuppliers();
    } catch (apiError) {
      setError(apiError.message);
    }
  }
  // editar fornecedores
  function handleEdit(supplier) {
    setEditingId(supplier.id);

    setForm({
      name: supplier.name || "",
      cnpj: supplier.cnpj || "",
      address: supplier.address || "",
      phone: supplier.phone || "",
      email: supplier.email || "",
      mainContact: supplier.mainContact || "",
    });

    setMessage("");
    setError("");
  }
  // cancelar edição
  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    setMessage("");
    setError("");
  }
  // exclui fornecedores
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este fornecedor?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      await deleteSupplier(id);

      setMessage("Fornecedor excluído com sucesso!");
      // carrega a lista de fornecedores atualizada após a exclusão
      await loadSuppliers();
    } catch (apiError) {
      setError(apiError.message);
    }
  }
  // redenrização condicional
  if (loading) {
    return <p>Carregando fornecedores...</p>;
  }

  return (
    <main className="container py-4">
      <h1 className="text-primary mb-4">Fornecedores</h1>

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

      <SupplierForm
        form={form}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
      />
      <SupplierList
        suppliers={suppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  );
}
export default SuppliersPage;
