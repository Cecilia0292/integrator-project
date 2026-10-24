function ProductList({ products, onEdit, onDelete }) {
  return (
    <section className="mt-5">
      <h2 className="h3 mb-3">Produtos cadastrados</h2>

      {products.length === 0 ? (
        <p className="text-secondary">Nenhum produto cadastrado.</p>
      ) : (
        <ul className="list-group">
          {products.map((product) => (
            <li
              key={product.id}
              className="list-group-item d-flex flex-wrap align-items-center gap-4"
            >
              <div className="me-auto">
                <strong>{product.name}</strong>

                <div className="text-secondary small">
                  Código de barras: {product.barcode}
                  <br />
                  Categoria:{" "}
                  {product.category === "OUTROS"
                    ? product.categoryOther
                    : product.category}
                  <br />
                  Validade: {product.expirationDate || "Não informada"}
                  <br />
                  Descrição: {product.description}
                </div>
              </div>

              <span className="badge bg-secondary">
                Estoque: {product.stockQuantity}
              </span>

              <button
                type="button"
                className="btn btn-warning btn-sm"
                onClick={() => onEdit(product)}
                title="Editar produto"
              >
                <i className="bi bi-pencil-square me-1" aria-hidden="true"></i>
                Editar produto
              </button>

              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(product.id)}
                title="Excluir produto"
              >
                <i className="bi bi-trash me-1" aria-hidden="true"></i>
                Excluir produto
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ProductList;
