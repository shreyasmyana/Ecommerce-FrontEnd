import {API} from '../config';
import { getBraintreeClientToken } from '../core/api.core';
import Product from '../core/Product';

export const addCategory =(userId, token, category)=>{

    return fetch(`${API}/category/create/${userId}`, {
        method:"POST",
        headers:{
        Accept:'application/json',
        "Content-Type":'application/json',
        Authorization:`Bearer ${token}` 
        },    
        body:JSON.stringify(category)
    })
    .then((res)=>{
        return res.json()
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const addProduct = (userId, token, product)=>{

    return fetch(`${API}/product/create/${userId}`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then((res)=>{
        return res.json();
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const getCategories = ()=>{
    return fetch(`${API}/categories`, {
        method:"GET"
    })
    .then((res)=>{
        return res.json()
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const listOrders = (userId, token) =>{
    return fetch(`${API}/order/list/${userId}`, {
        method:'GET',
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{
        return res.json();

    }).catch((err)=>{
        console.log(err)
    })
}

export const getStatusValues = (userId, token)=>{
    return fetch(`${API}/order/status-values/${userId}`, {
        method:'GET',
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{
        return res.json()
    })
}

export const updateStatusChange = (userId, token, orderId, status)=>{
    return fetch(`${API}/order/${orderId}/status/${userId}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({status,orderId})
    }).then((res)=>{
        return res.json()
    }) 

}

export const getProducts = ()=>{
    return fetch(`${API}/products?limit=undefined`, {
        method:'GET'
    }).then((res)=>{
        return res.json();
    }).catch(err=>{console.log(err)})
}

export const getProduct = (productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:'GET'      
    }).then((res)=>{
        return res.json();
    }).catch(err=>{console.log(err)})
}

export const updateProduct = (productId, userId, token, product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:'PUT',
        headers:{
            Authorization:`Bearer ${token}`,
            Accept:'application/json'
        },
        body:product
    }).then((res)=>{
        return res.json();
    }).catch(err=>{console.log(err)})
}

export const deleteProduct = (productId, userId, token)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:'DELETE',
        headers:{
            Authorization:`Bearer ${token}`,
            Accept: 'application/json'
        }
    }).then((res)=>{
        return res.json();
    }).catch(err=>{console.log(err)})
}