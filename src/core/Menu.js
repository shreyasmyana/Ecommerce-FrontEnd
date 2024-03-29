import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth';
import {totalProducts} from './cartHelpers';

const isActive =(history, path)=>{
    if(history.location.pathname === path){
        return {color:'#ff9900'}
    }
    else{
        return {color:'#ffffff'}
    }
}

const Menu = ({history})=>{

    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">Shop</Link>
                </li>
                {
                    isAuthenticated() && isAuthenticated().user.role===0 && <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                    </li> 
                }
                {
                    isAuthenticated() && isAuthenticated().user.role===1 && <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    </li> 
                }

                {!isAuthenticated() && <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">SignIN</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,'/signup')} to="/signup">SignUP</Link>
                    </li>
                </Fragment>}

                {isAuthenticated() && <li className="nav-item">
                    <span className="nav-link" 
                          style={{cursor:'pointer',color:' #ffffff'}}
                          onClick={()=>{
                            signout(()=>{
                                history.push('/')
                            })
                          }}>SignOut</span>
                </li>}

                
                <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,'/cart')} to="/cart">
                            Cart <sup><small className="cart-badge">{totalProducts()}</small></sup></Link>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Menu);