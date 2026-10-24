function SupplierForm({ form, editingId, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="card border-0 shadow-sm p-4">
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
              onClick={onCancel}
            >
              Cancelar edição
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default SupplierForm;
