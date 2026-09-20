import {useEffect, useState} from 'react';
import {
    createProduct,
    deleteProduct,
    listProducts,
    updateProduct
} from '../../services/productService';

const initialForm = {
    name: '',
    barcode: '',
    description: '',
    stockQuantity: 1,
    category: 'ELETRÔNICOS',
    expirationDate: '',
    categoryOther: '',
};

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState(initialForm);  
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);

    async function loadProducts() {
        try{
            setError('');
            const data = await listProducts();
            setProducts(data);
        }
        catch(apiError) {
            setError(apiError.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    function handleChange(event) {
        const {name, value} = event.target;
        setForm((currentForm) => ({
            ...currentForm,
            [name]: name === 'stockQuantity' ? Number(value) : value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setError('');
            setMessage('');

            if (editingId) {
                await updateProduct(editingId, form);
                setMessage('Produto atualizado com sucesso!');
                setEditingId(null);
            } else {
                await createProduct(form);
                setMessage('Produto criado com sucesso!');
            }

            setForm(initialForm);
            await loadProducts();

        }catch(apiError) {
            setError(apiError.message);
        }

    }
    function handleEdit(product) {
        setEditingId(product.id);
        setForm({
            name: product.name || '',
            barcode: product.barcode || '',
            description: product.description || '',
            stockQuantity: product.stockQuantity || 0,
            category: product.category || 'ELETRÔNICOS',
            expirationDate: product.expirationDate 
            ? product.expirationDate.slice(0, 10) : '',
            categoryOther: product.categoryOther || '',
        });
        setMessage('');
        setError('');
    }

    async function handleDelete(id) {
        const confirmed =window.confirm('Tem certeza que deseja excluir este produto?');
        if (!confirmed) {
            return;
        }
        try{
            setError('');
            await deleteProduct(id);
            setMessage('Produto excluído com sucesso!');
            await loadProducts();
        }
        catch(apiError) {
            setError(apiError.message);
        }
    }
    if (loading) {
        return <p>Carregando produtos...</p>;
    }   

    return (
        <main>
            <h1>Produtos</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {message && <p style={{color: 'green'}}>{message}</p>}

            <form onSubmit={handleSubmit}>

                <input
                    name ="name"
                    placeholder="Nome"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="barcode"
                    type="text"
                    inputMode="numeric"
                    placeholder="Ex.: 7891234567890 (13 dígitos)"
                    value={form.barcode}
                    onChange={handleChange}
                    maxLength={13}
                    pattern="[0-9]{13}"
                    title="Digite exatamente 13 números"
                    required
                />
                <textarea
                    name ="description"
                    placeholder="Descrição do produto"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows="4"
                />
                <input
                    name ="stockQuantity"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Quantidade em estoque"
                    value={form.stockQuantity}
                    onChange={handleChange}
                    required    
                />
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                >
                    <option value="ELETRÔNICOS">Eletrônicos</option>
                    <option value="ALIMENTOS">Alimentos</option>
                    <option value="VESTUÁRIO">Vestuário</option>
                    <option value="OUTROS">Outros</option>
                </select>
                <input
                    name ="expirationDate"
                    type="date"
                    value={form.expirationDate}
                    onChange={handleChange}
                />  
                {form.category === 'OUTROS' && (
                    <input
                        name="categoryOther"
                        placeholder="Informe a categoria"
                        value={form.categoryOther}
                        onChange={handleChange}
                        required
                    />
                )}

                <button type="submit">{editingId ? 'Atualizar Produto' : 'Cadastrar Produto'}</button>
            </form>
            <section>
                <h2>Produtos Cadastrados</h2>

                {products.length === 0 ? (
                    <p>Nenhum produto cadastrado.</p>
                ) : (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <strong>{product.name}</strong> 
                                Estoque: {product.stockQuantity}

                                <button type="button"
                                    onClick={() => handleEdit(product)}
                                >

                                    Editar
                                </button>

                                <button type="button"
                                    onClick={() => handleDelete(product.id)}
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

export default ProductsPage;