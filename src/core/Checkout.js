import React, { useEffect, useState } from 'react';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {emptyCart} from '../core/cartHelpers';
import { getProducts, getBraintreeClientToken, processPayment, createOrder} from '../core/api.core';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({products, setRun = f=>f, run=undefined})=>{

    const [data, setData] = useState({
        loading:false,
        success:false,
        clientToken:null,
        error:'',
        instance:{},
        address:''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    

    useEffect(()=>{
        getToken(userId, token)
    },[])

    const handleAddress = event =>{
        setData({...data, address:event.target.value});
    }
    
    const getToken = (userId,token)=>{
        getBraintreeClientToken(userId, token)
        .then(data =>{
            if(data.error){
                setData({...data, error: data.error})
            }
            else{
                setData({clientToken: data.clientToken})
            }
        })
    }

    

    const getTotal = ()=>{
        return products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.price;
        },0)
    }

    const showCheckout =()=>{
        return (
            <div>
                {isAuthenticated() ? <div>{showDropIn()}</div> :
                 <Link to="/signin"><button className="btn btn-dark">Please Sign In</button></Link>}
            </div>
        )
    }

    const showError = (error)=>(
        <div className="alert alert-danger" style={{display: error? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = (success)=>(
        <div className="alert alert-info" style={{display:success?'':'none'}}>
            Your Payment Was Successful 
        </div>
    )

    const buy = ()=>{
        let deliveryAddress = data.address;
        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then((data)=>{
            nonce = data.nonce;
        
        let paymentData = {
            paymentMethodNonce:nonce,
            amount:getTotal(products)
        }
        
        
        console.log("address",deliveryAddress);
        processPayment(userId,token,paymentData)
            .then(response=>{

                const createOrderData = {
                    products:products,
                    transaction_id: response.transaction.id,
                    amount:response.transaction.amount,
                    address:deliveryAddress
                }

                createOrder(userId, token, createOrderData)
                    .then(res =>{
                        emptyCart(()=>{
                            setRun(!run);
                            console.log("payment Success");
                            setData({loading:false , success:true});
                        });
                    })                
            })
            .catch(error => {
                console.log(error)
                setData({loading:false});
            });

        }).catch((err)=>{
            setData({loading:false});
            setData({...data, error:err.message});
        }) 
    }

    const showLoading = (loading)=>( loading && <div className="alert alert-info">Loading...</div>)

    const showDropIn = ()=>(
        <div onBlur={()=>{setData({...data,error:''})}}> 
        {data.clientToken !== null && products.length >0 ? (
               <div>
                   <div className="form-group mb-3">
                       <label className="text-muted">Delivery address:</label>
                       <textarea 
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type Your Delivery Address here..."
                            />
                    </div>
                <DropIn 
                    options = {{
                        authorization: data.clientToken,
                        paypal: "vault"
                    }}
                    onInstance = {instance =>{data.instance = instance}}  />
                    <button onClick={buy} className="btn btn-success btn-block">Pay</button>
               </div>
            ) : null}
        </div>
        )

    return(
        <div>
            <h2>Your Total: {getTotal()} Rupees</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )

}

export default Checkout;
