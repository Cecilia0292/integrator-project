function SupplierList({ suppliers, onEdit, onDelete }) {
  return (
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
                onClick={() => onEdit(supplier)}
              >
                <i className="bi bi-pencil me-1" aria-hidden="true"></i>
                Editar
              </button>

              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(supplier.id)}
              >
                <i className="bi bi-trash me-1" aria-hidden="true"></i>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SupplierList;
