import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {listOrders, getStatusValues, updateStatusChange} from '../admin/apiAdmin';
import moment from 'moment';

const Orders = ()=>{

    const [order, setOrder] = useState([]);

    const [status, setStatus] = useState([]);

    const {user, token} = isAuthenticated();

    const getOrders = ()=>{
        listOrders(user._id, token).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
            setOrder(data)
        }
        })
    }
    
    const getStatus = ()=>{
        getStatusValues(user._id, token).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            setStatus(data)
        })
    }


    useEffect(()=>{
        getOrders();
        getStatus();
    }, [])

    const handleStatusChange = (e, orderId)=>{
        updateStatusChange(user._id, token, orderId, e.target.value).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            getOrders();
        })
    }

    const orderLength = () =>{
        if (order.length >0 ){
            return (<h2 className="text-danger">Total Orders:{order.length}</h2>)
        } 
    }

    const showInput = (key, value)=>(
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly/>
        </div>
    )

    const showStatus = o =>(
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select className="form-control" onChange={(e)=>handleStatusChange(e,o._id)}>
                <option>Update Status</option>
                {status.map((status, index)=>(
                    <option value={status} key={index}>{status}</option>
                ))}
            </select>
        </div>
    )

    const showOrders = () =>(
            order.map((o , oIndex)=>{
                return (
                    <div className="mt-5" key={oIndex} style={{ borderBottom: "3px solid grey"}}>
                        <h3 className="text-primary mb-2">Order ID: {o._id}</h3>
                        <ul className="list-group mb-2">
                            <li className="list-group-item">{showStatus(o)}</li>
                            <li className="list-group-item">Transaction ID: {o.transaction_id}</li>
                            <li className="list-group-item">Amount: {o.amount}</li>
                            <li className="list-group-item">Ordered: {moment(o.createdAt).fromNow()}</li>
                            <li className="list-group-item">Delivery Address: {o.address}</li>
                        </ul>
                        <h4 className="mt-3 mb-3 font-italic">
                            Total Products in order: {o.products.length}
                        </h4>
                        {o.products.map((p, pIndex)=>(
                            <div className="mb-3" key={pIndex} style={{padding: '20px', border:'1px solid grey'}}>
                                {showInput('Product ID',p._id)}
                                {showInput('Product Name',p.name)}
                                {showInput('Product Price',p.price)}
                                {showInput('Product Count',p.count)}
                            </div>
                        ))}
                    </div>
                )
            })
    )

    return(
        <Layout title="Orders" description="Manage Your Orders">
            <div className="col-md-8 offset-md-2">
                {orderLength()}
                {showOrders()}
            </div>
        </Layout>
    )
}

export default Orders;