import React, {useState,useEffect} from 'react';
import { getProduct, getRelatedProducts } from './api.core';
import Card from './Card';
import Layout from './Layout';


const Product = (props)=>{
    const [product, setProduct] = useState({})
    const [error, setError] = useState("");
    const [relatedProducts, setRelatedProducts] = useState([]);

    const loadProduct = (productId)=>{
        getProduct(productId).then((res)=>{
            if(res.error){
                setError(res.error)
            }
            setProduct(res)
            getRelatedProducts(res._id).then((res)=>{
                if(res.error){
                    setError(res.error)
                }
                setRelatedProducts(res)
            })
        })
    }

    useEffect(()=>{
        const productId = props.match.params.productId;
        loadProduct(productId);
    },[]);

    return(
        <Layout title="Product Page" description="Product Page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        {
                            product && product.description && <Card product={product} showViewProductButton={false}/>
                        }
                    </div>
                    <div className="col-4">
                        <h3>Related Products</h3>
                        <hr/>
                        {
                           relatedProducts.length>0 ? relatedProducts.map((p,i)=>{
                                return (
                                <Card key={i} product={p}/>
                                )
                            }) : <h6 className="mt-4 ">No Related Products</h6>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product;