import React, { useState, useEffect } from 'react';
import {getCategories, getSearchedProducts} from './api.core';
import Card from './Card';

const SearchBar = ()=>{
    const [data, setData] = useState({
        categories:[],
        category:"",
        search:"",
        results:[],
        searched:false    
    });

    const {categories, category, search, results, searched} = data;

    const loadCategories=()=>{
        getCategories().then((data)=>{
            if(data.Error){
                console.log(data.Error)
            }
            else{
                setData({...data,categories:data});
            }
        })
    }
    useEffect(()=>{
        loadCategories();
    },[])

    const searchProducts = ()=>{
        if(search){
            getSearchedProducts({search:search || undefined, category:category})
            .then((res)=>{
                if(res.error){
                    console.log(res.error)
                }else{
                setData({...data, searched:true, results:res})
                }
            })
        }
    }
    const submitSearch = (e)=>{
        e.preventDefault()
        searchProducts()
    }

    const handleChange = (name)=>(event)=>{
        setData({...data,[name]:event.target.value, searched:false})
    }

    const searchMessage = (searched, results)=>{

        if(searched && results.length > 0){
            return `Found ${results.length} Products`
        }
        if(searched && results.length < 1){
            return 'No Products Found';
        }

    }

    const showResuts = (results=[])=>{
        return(
        <div>   
        <div className="mt-4 mb-4"><h2>{searchMessage(searched, results)} </h2></div> 
        <div className="row">
           {results.map((p,i)=>{
               return (
                   <Card key={i} product={p}/>
               )
           })} 
        </div>
        </div>
        )
    }

    const searchForm = ()=>{
     return(
        <form onSubmit={submitSearch}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")}>
                            <option value="All">All</option>
                                {
                                    categories.map((c,i)=>{
                                        return(
                                        <option key={i} value={c._id}>{c.name}</option>
                                        )
                                    })
                                }
                        </select>
                    </div>
                
                    <input  type="search"
                            placeholder="Search By Name"
                            onChange = {handleChange('search')}
                            className="form-control"
                    />
                </div>
                <div className="btn input-group-append" style={{border:"none"}}>
                        <button className="btn  btn-outline-dark">Search</button>
                </div>
            </span>
        </form>
     )   
    }

    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}
            </div>
            <div className="container-fluid">{showResuts(results)}
            </div>
        </div>
        
    )
}

export default SearchBar;