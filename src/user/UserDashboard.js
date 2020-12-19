import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {getPurchaseHistory} from '../user/apiUser';
import moment from 'moment';

const Dashboard = ()=>{
    const {user:{_id,name,email,role}} = isAuthenticated();
    const {token} = isAuthenticated();
    console.log(token)
    const [history, setHistory] = useState([])

    const init = (userId, token)=>{
            getPurchaseHistory(userId,token).then(res=>{
                if(res.error){
                    
                }
                else{
                    setHistory(res);
                }
            })
    }

    useEffect(()=>{
        console.log(token)
        init(_id, token)
    },[])

    const userLinks = ()=>{
        return (
            <div className="card">
                <h3 className="card-header"> User Links</h3>
                <ul className="list-group">
                    <Link className="nav-link" to="/user/cart">My Cart</Link>
                    <Link className="nav-link" to={`/user/${_id}`}>Profile</Link>
                </ul>
            </div>
        )
    }

    const userInfo = ()=>{
        return (
            <div className="card mb-5">
                <h3 className="card-header">Dashboard</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 0 ? 'user':'admin'}</li>
                </ul>
            </div>
        )
    }

    const userHistory = (history)=>{
        return (
            <div className="card">
                <h3 className="card-header">Purchase History</h3>
                {history.map((h)=>{
                    return (
                  h.products.map((p,i)=>(
                      
                    <div key={i}>
                        <hr/>
                    <h6>Product Name: {p.name}</h6>
                    <h6>Product Price: {p.price}</h6>
                    <h6>Product Date: {moment(p.createdAt).fromNow()}</h6>
                </div>
                  ))
                  )
                }
            )}
            </div>
        )
    }
    return (
        <Layout title="Dashboard" description="Dashboard of ecommerce app" className="container-fluid">
            <div className="row">
                <div className="col-sm-3 mb-4">
                    {userLinks()}
                </div>
                <div className="col-sm-9">
                    {userInfo()}
                    {userHistory(history)}
                </div>
            </div>
            
        </Layout>
    )
}

export default Dashboard