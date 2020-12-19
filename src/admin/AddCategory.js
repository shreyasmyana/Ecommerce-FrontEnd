import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {isAuthenticated} from '../auth';
import Layout from '../core/Layout';
import {addCategory} from './apiAdmin';


const AddCategory = ()=>{
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user,token} = isAuthenticated();

    const clickSubmit =(e)=>{
        e.preventDefault();
        setError('');
        setSuccess(false);
        addCategory(user._id,token,{name})
        .then((res)=>{
            if(res.Error){
                setError(true);
            }else{
                setError(false);
                setSuccess(true);
        
            }
            })
    }

    const handleChange = (e)=>{
        setError('');
        setName(e.target.value);
    }

    const createCategoryForm = ()=>{
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} required/>
                </div>
                <button className="btn btn-outline-dark">Add Category</button>
            </form>
        )
    }

    const goBack=()=>(
        <div className="mt-5">
        <Link to="/admin/dashboard">Back To Dashboard</Link>
        </div>
    )

    const showError = ()=>{
        if(error){
            return <h3 className="text-danger">Category {name} already exist</h3>
        }
    }

    const showSuccess = ()=>{
        if(success){
            return <h3 className="text-success">Category {name} created</h3>
        }
    }

    return (
        <Layout title="Add Category" description="Add category to ecommerce app" className="container-fluid">
            <div className="col-md-8 offset-md-2">
                {showError()}
                {showSuccess()}
                {createCategoryForm()}
                {goBack()}    
            </div>
        </Layout>
    )
}

export default AddCategory;