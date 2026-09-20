import{get, post, patch,remove} from './api';

export function listSuppliers() {
    return get('/suppliers');
}

export function createSupplier(supplier) {
    return post('/suppliers', supplier);
}

export function updateSupplier(id, supplier) {
    return patch(`/suppliers/${id}`, supplier);
}

export function deleteSupplier(id) {
    return remove(`/suppliers/${id}`);
}