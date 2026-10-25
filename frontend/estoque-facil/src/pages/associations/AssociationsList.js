function AssociationsList({ associations, products, suppliers, onDelete }) {
  return (
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
                    <i className="bi bi-box-seam me-1" aria-hidden="true"></i>
                    {product?.name || association.productId}
                  </strong>

                  <div className="text-secondary small">
                    Fornecedor: {supplier?.name || association.supplierId}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(association.id)}
                  title="Remover associação"
                >
                  <i className="bi bi-trash me-1" aria-hidden="true"></i>
                  Remover
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default AssociationsList;
