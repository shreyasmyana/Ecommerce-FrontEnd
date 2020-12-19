import React,{useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {getProducts, deleteProduct} from '../admin/apiAdmin';
import {isAuthenticated} from '../auth/index';
import { Link } from 'react-router-dom';

const ManageProducts = ()=>{

    const [products, setProducts] = useState([]);

    const {user, token} = isAuthenticated();

    const loadProducts = ()=>{
        getProducts().then((res)=>{
            if(res.error){
                console.log(res.error)
            }
            else{
                setProducts(res);
            }
        })
    }

    const removeProduct = (productId)=>{
        deleteProduct(productId, user._id, token).then((res)=>{
            if(res.error){
                console.log(res.error)
            }
            else{
                loadProducts();
            }
        })
    }

    useEffect(()=>{
        loadProducts();
    }, [])

    return (
        <Layout title="Manage Products" description="Manage Your Products" className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">Total Products: {products.length}</h2>
                    <hr/>
                    <ul className="list-group">
                        {products.map((p, i)=>(
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span onClick={()=>{removeProduct(p._id)}} className="badge badge-danger badge Pill">
                                    Delete
                                </span>
                            </li>
                        
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default ManageProducts;