import {get, post, patch, remove} from './api';

export function listAssociations(){
    return get('/product-suppliers');
}

export function createAssociation(data){
    return post('/product-suppliers', data);
}

export function getProductSuppliers(productId){
    return get(`/product-suppliers/product/${productId}`);
}
export function getAssociation(id){
    return get(`/product-suppliers/${id}`);
}
export function updateAssociation(id, data){
    return patch(`/product-suppliers/${id}`, data);
}
export function deleteAssociation(id){
    return remove(`/product-suppliers/${id}`);
}