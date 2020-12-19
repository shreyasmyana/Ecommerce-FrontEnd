import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import Profile from './user/Profile';
import AdminRoute from './auth/AdminRoute';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Orders from './admin/Orders';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';

const Routes = ()=>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path='/shop' exact component={Shop}/>
                <Route path="/cart" exact component={Cart}/>
                <Route path="/product/:productId" exact component={Product}/>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
                <PrivateRoute path="/user/:userId" exact component={Profile}/>
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}/>
                <AdminRoute path='/create/category' exact component={AddCategory}/>
                <AdminRoute path='/create/product' exact component={AddProduct}/>
                <AdminRoute path='/list/orders' exact component={Orders}/>
                <AdminRoute path='/admin/products' exact component={ManageProducts}/>
                <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;