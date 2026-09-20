import { useEffect, useState } from 'react';
import {
  createSupplier,
  deleteSupplier,
  listSuppliers,
  updateSupplier,
} from '../../services/supplierService';

// estado inicial do formulário
const initialForm = {
  name: '',
  cnpj: '',
  address: '',
  phone: '',
  email: '',
  mainContact: '',
};
// estados do componente SuppliersPage
function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
// carregamento dos fornecedores da API
  async function loadSuppliers() {
    try {
      setError('');
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
      setError('');
      setMessage('');

      if (editingId) {
        await updateSupplier(editingId, form);
        setMessage('Fornecedor atualizado com sucesso!');
      } else {
        await createSupplier(form);
        setMessage('Fornecedor cadastrado com sucesso!');
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
      name: supplier.name || '',
      cnpj: supplier.cnpj || '',
      address: supplier.address || '',
      phone: supplier.phone || '',
      email: supplier.email || '',
      mainContact: supplier.mainContact || '',
    });

    setMessage('');
    setError('');
  }
// cancelar edição
  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    setMessage('');
    setError('');
  }
// exclui fornecedores
  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir este fornecedor?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');
      setMessage('');

      await deleteSupplier(id);

      setMessage('Fornecedor excluído com sucesso!');
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
    <main>
      <h1>Fornecedores</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nome do fornecedor"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="cnpj"
          placeholder="00.000.000/0000-00"
          value={form.cnpj}
          onChange={handleChange}
          pattern="[0-9]{2}\.[0-9]{3}\.[0-9]{3}/[0-9]{4}-[0-9]{2}"
          title="Use o formato 00.000.000/0000-00"
          required
        />

        <input
          name="address"
          placeholder="Endereço"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="(00) 00000-0000"
          value={form.phone}
          onChange={handleChange}
          pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}"
          title="Use o formato (00) 00000-0000"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="mainContact"
          placeholder="Nome do contato principal"
          value={form.mainContact}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? 'Atualizar Fornecedor' : 'Cadastrar Fornecedor'}
        </button>

        {editingId && (
          <button type="button" onClick={handleCancelEdit}>
            Cancelar edição
          </button>
        )}
      </form>

      <section>
        <h2>Fornecedores cadastrados</h2>

        {suppliers.length === 0 ? (
          <p>Nenhum fornecedor cadastrado.</p>
        ) : (
          <ul>
            {suppliers.map((supplier) => (
              <li key={supplier.id}>
                <div>
                  <strong>{supplier.name}</strong>
                  <br />
                  CNPJ: {supplier.cnpj}
                  <br />
                  Contato: {supplier.mainContact}
                  <br />
                  Telefone: {supplier.phone}
                  <br />
                  E-mail: {supplier.email}
                </div>

                <button
                  type="button"
                  onClick={() => handleEdit(supplier)}
                >
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(supplier.id)}
                >
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

