import React, {useState,useEffect} from 'react';
import Layout from './Layout';
import {getCategories, getFilteredProducts} from './api.core';
import Checkbox from './Checkbox';
import {fixedPrices} from './fixedPrices';
import RadioBox from './Radiobox';
import Card from './Card';


const Shop = ()=>{

    const [myFilters, setMyFilters] = useState({
        filters:{ category:[], price:[] }
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResult, setFilteredResult] = useState([]);
    const [size, setSize] = useState(0);

    const init = ()=>{
        getCategories().then((res)=>{
            if(res.Error){
                setError(res.Error)
            }
            setCategories(res) 
        })
    }

    useEffect(()=>{
        init();
        loadFilteredProducts(skip, limit, myFilters.filters);
    },[])

    const handleFilters = (filters, filterBy)=>{
        console.log('shop',filters);
        const newFilters = {...myFilters}
        newFilters.filters[filterBy]=filters;
        
        if(filterBy == 'price'){
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;

        }

        loadFilteredProducts(myFilters.filters);

        setMyFilters(newFilters);
    }

    const handlePrice = (id)=>{
        const prices = fixedPrices;
        var pricevalue = []

        for (let value in prices){
            if(prices[value]._id === parseInt(id)){
                pricevalue=prices[value].array;
            }
        }
        return pricevalue
    }

    const loadFilteredProducts = (newFilters)=>{
        getFilteredProducts(skip, limit, newFilters).then((data)=>{
            if(data.error){
                setError(data.error);
            }
            else{
                console.log(data.products);
                setFilteredResult(data.products);
                setSize(data.size);
                setSkip(0);
            }
        })

    }

    const loadMore = ()=>{
        let toskip = skip+limit;
        getFilteredProducts(toskip, limit, myFilters.filters).then((data)=>{
            if(data.error){
                setError(data.error);
            }
            else{
                
                setFilteredResult([...filteredResult,...data.products]);
                setSize(data.size);
                setSkip(toskip);
            }
        })

    }

    const loadMoreButton = ()=>{
        return(
            size>0 && size>=limit &&(
            <button className="btn btn-outline-primary" onClick={loadMore}>Load More</button>
            ))
    }
    return (
        <Layout title="Shop Page" description="Shop products">
            <div className="row">
                
                <div className="col-4">
                <h4>categories</h4>
                    <ul> 
                        <Checkbox categories={categories} filters={(filters)=>{handleFilters(filters, 'category')}}/> 
                    </ul>
                    <h4>Prices</h4>
                <div>
                    <RadioBox prices={fixedPrices} handleFilters={filters=>handleFilters(filters,'price')}/>
                </div>        
                </div>
                <div className="col-8">
                    <h2 className="mb-3">Products</h2>
                    <div className="row">
                    
                    {
                        filteredResult.map((p,i)=>{
                            return (
                                <div className="col-md-4 mb-3">
                                <Card key={i} product={p}/>
                                </div>
                            )
                        })
                        
                    }
                   
                    </div>
                    {loadMoreButton()}
                </div>

            </div>
        </Layout>
    )
}

export default Shop;