function ProductForm({
  form,
  editingId,
  stockQuantityError,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="card border-0 shadow-sm p-4">
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
            onChange={onChange}
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
            placeholder="Digite 13 números"
            value={form.barcode}
            onChange={onChange}
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
            className={`form-control ${stockQuantityError ? "is-invalid" : ""}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]+"
            maxLength={6}
            value={form.stockQuantity}
            onChange={onChange}
            required
          />

          {stockQuantityError ? (
            <div className="invalid-feedback d-block" role="alert">
              {stockQuantityError}
            </div>
          ) : (
            <div className="form-text">
              Informe um número inteiro entre 0 e 999.999.
            </div>
          )}
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
            onChange={onChange}
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
            onChange={onChange}
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
              onChange={onChange}
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
            onChange={onChange}
            rows="4"
            required
          />
        </div>

        <div className="col-12 col-md-6 mx-auto">
          <button type="submit" className="btn btn-primary w-100">
            {editingId ? "Atualizar produto" : "Cadastrar produto"}
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

export default ProductForm;
