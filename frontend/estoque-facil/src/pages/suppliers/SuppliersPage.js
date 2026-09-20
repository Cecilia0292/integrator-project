import { useEffect, useState } from "react";
import {
  createSupplier,
  deleteSupplier,
  listSuppliers,
  updateSupplier,
} from "../../services/supplierService";

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

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Nome do fornecedor
            </label>
            <input
              id="name"
              name="name"
              className="form-control"
              placeholder="Nome do fornecedor"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="cnpj" className="form-label">
              CNPJ
            </label>
            <input
              id="cnpj"
              name="cnpj"
              className="form-control"
              placeholder="00.000.000/0000-00"
              value={form.cnpj}
              onChange={handleChange}
              pattern="[0-9]{2}\.[0-9]{3}\.[0-9]{3}/[0-9]{4}-[0-9]{2}"
              title="Use o formato 00.000.000/0000-00"
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="address" className="form-label">
              Endereço
            </label>
            <input
              id="address"
              name="address"
              className="form-control"
              placeholder="Endereço completo"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Telefone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="form-control"
              placeholder="(00) 00000-0000"
              value={form.phone}
              onChange={handleChange}
              pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}"
              title="Use o formato (00) 00000-0000"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="contato@empresa.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="mainContact" className="form-label">
              Contato principal
            </label>
            <input
              id="mainContact"
              name="mainContact"
              className="form-control"
              placeholder="Nome do contato principal"
              value={form.mainContact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 col-md-6 mx-auto">
            <button type="submit" className="btn btn-primary w-100">
              {editingId ? "Atualizar fornecedor" : "Cadastrar fornecedor"}
            </button>
          </div>

          {editingId && (
            <div className="col-12 col-md-6 mx-auto">
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={handleCancelEdit}
              >
                Cancelar edição
              </button>
            </div>
          )}
        </div>
      </form>

      <section className="mt-5">
        <h2 className="h3 mb-3">Fornecedores cadastrados</h2>

        {suppliers.length === 0 ? (
          <p className="text-secondary">Nenhum fornecedor cadastrado.</p>
        ) : (
          <ul className="list-group">
            {suppliers.map((supplier) => (
              <li
                key={supplier.id}
                className="list-group-item d-flex flex-wrap align-items-center gap-3"
              >
                <div className="me-auto">
                  <strong>{supplier.name}</strong>
                  <div className="text-secondary small">
                    CNPJ: {supplier.cnpj}
                    <br />
                    Contato: {supplier.mainContact}
                    <br />
                    Telefone: {supplier.phone}
                    <br />
                    E-mail: {supplier.email}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(supplier)}
                >
                  <i className="bi bi-pencil-square me-1"></i>
                  Editar
                </button>

                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(supplier.id)}
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

export default SuppliersPage;
