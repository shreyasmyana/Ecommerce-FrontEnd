import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';

const AdminDashboard = ()=>{

    const {user:{name,email,role}} = isAuthenticated()

    const adminLinks =()=>{
        return (
           <div className="card">
               <h3 className="card-header">User Links</h3>
               <Link className="nav-link" to="/create/category">Add Category</Link>
               <Link className="nav-link" to="/create/product">Add Product</Link>
               <Link className="nav-link" to="/list/orders">View Orders</Link>
               <Link className="nav-link" to="/admin/products">Manage Products</Link>
           </div> 
        )
    }

    const adminInfo =()=>{
        return (
            <div className="card">
                <h3 className="card-header">User Info</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role===0?'user':'admin'}</li>
                </ul>
            </div>
        )
    }
    return (
        <Layout title="Admin Dashboard" description="admin dashboard for ecommerce app" className="container-fluid">
            <div className="row">
                <div className="col-sm-3 mb-3">
                    {adminLinks()}
                </div>
                <div className="col-sm-9">
                {adminInfo()}
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;