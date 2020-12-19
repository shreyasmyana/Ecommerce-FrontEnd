import React, {useState,useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './api.core';
import SearchBar from './Search';
import Card from './Card';

const Home = ()=>{

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState('');

    const loadProductsBySell = ()=>{
        getProducts('sold').then((data)=>{
            if(data.error){
                setError(data.error)
            }
            setProductsBySell(data)
        })
    }

    const loadProductsByArrival = ()=>{getProducts('createdAt').then((data)=>{
        if(data.error){
            setError(data.error)
        }
        setProductsByArrival(data)
    })} 

    useEffect(()=>{
        loadProductsByArrival();
        loadProductsBySell();
    },[])

    return (
        <Layout title="Home" description='Home page of ecommerce app'>
            <div className="container-fluid md">
            <SearchBar/>
            <h3>Products By Sale</h3>
            <hr/>
            <div className="row">
                   { productsBySell.map((product, i)=>(
                       <div className="col-md-4 mb-3">
                        <Card key={i} product={product} />
                        </div>    
                ))  }
            </div>
            
            </div>

        </Layout>
    )
}

export default Home