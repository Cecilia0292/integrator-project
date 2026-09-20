import {get, post, patch, remove} from './api';

export function listProducts() {
  return get('/products');
}

export function createProduct(product) {
  return post('/products', product);
}

export function updateProduct(id, product) {
    return patch(`/products/${id}`, product);   
}

export function deleteProduct(id) {
    return remove(`/products/${id}`);
}   