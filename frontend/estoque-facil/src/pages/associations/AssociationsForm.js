function AssociationsForm({
  products,
  suppliers,
  productId,
  supplierId,
  onProductChange,
  onSupplierChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="card border-0 shadow-sm p-4">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Produto</label>
          <select
            className="form-select"
            value={productId}
            onChange={onProductChange}
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
            onChange={onSupplierChange}
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
  );
}

export default AssociationsForm;
