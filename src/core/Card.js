import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {ShowImage} from './ShowImage';
import {addProduct, updateProductCount, removeProduct} from './cartHelpers';


const Card = ({product, showViewProductButton=true, showAddToCartButton=true, updateCount=false, removeProductButton=false, updateCart, setRun= f=>f, run=undefined})=>{

    const [redirectTo, setRedirectTo] = useState(false);
    const [count , setCount] = useState(product.count);

    const showViewButton = (showViewProductButton)=>{
        return (
            showViewProductButton && (
                <Link to={`product/${product._id}`}>
                        <button className="btn btn-outline-dark mr-3 mt-3 mb-3">
                        View Product</button></Link>
            )
        )
    }

    const addToCart = () =>{
        addProduct(product, ()=>{
            setRedirectTo(true)
        })
    }

    const handleChange = productId => event =>{
        setRun(!run);
        setCount(event.target.value < 1 ? 1 : event.target.value)

        if(event.target.value >= 1){
            updateProductCount(productId, event.target.value, updateCart);
            
        }
    }

    const shouldRedirect = ()=>{
        if(redirectTo){
            return <Redirect to="/cart"/>
        }
    }

    const showAddToCart = (showAddToCartButton)=>{
        return (
            showAddToCartButton &&<button onClick={(addToCart)} className="btn btn-outline-dark mt-2 ">Add to cart</button>)
    }

    const showStock = ()=>{
        return (product.quantity > 0 ? <span className="badge badge-primary badge-pill">In Stock</span> : <span>Out Of Stock</span> )
    }

    const showUpdateCount = (updateCount)=>{
        return (
            updateCount && <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> Quantity</span>
                    </div>
                    <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}></input>
                </div>
            </div>
        )
    }

    const showRemoveProductButton = (removeProductButton)=>{
        return (
            removeProductButton && <button onClick={()=>{removeProduct(product._id, updateCart); setRun(!run)}} className="btn btn-outline-danger">Remove</button>
        )
    }

    return (
        
            <div className="card">
                <div className="card-header name mb-2">
                    {shouldRedirect()}
                    {product.name}    
                </div>
                <ShowImage item={product} url={'product'}/>
                <div className="card-body">
                    <p className=" mt-2">{product.description.substring(0,100)}</p>
                    <p className="black-10">Price {product.price} &#8377;</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                    {showStock()}
                    <br/>
                    {showViewButton(showViewProductButton)}
                    {showAddToCart(showAddToCartButton)}
                    {showRemoveProductButton(removeProductButton)}
                    {showUpdateCount(updateCount)}
                </div>
            </div>
       
    )
}

export default Card;