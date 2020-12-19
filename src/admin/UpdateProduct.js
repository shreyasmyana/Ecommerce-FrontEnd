import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {getProduct,updateProduct, getCategories} from '../admin/apiAdmin';
import { Redirect } from 'react-router-dom';



const UpdateProduct = ({match})=>{

    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:Boolean,
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:''
    })
    
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const init = (productId)=>{
        getProduct(productId).then(res=>{
            if(res.error){
                console.log(res.error)
            }
            else{
                console.log(res);
                setValues({
                        ...values,
                        name:res.name,
                        description:res.description,
                        price:res.price,
                        shipping: res.shipping,
                        quantity: res.quantity,
                        formData: new FormData()    
                    })
                initCategories();
            }
        })
    }


    const initCategories = ()=>{
        getCategories()
        .then((res)=>{
            if(res.Error){
                setValues({...values, error:res.Error})
            }
            setValues({ categories:res, formData:new FormData()})
        })
    }

    useEffect(()=>{
        init(match.params.productId);
    }, [])
    
    const redirectUser = ()=>{
        if(redirectToProfile){
            if(!error){
                return <Redirect to="/"/>
            }
        }
    }

    const showError=()=>{
        return (
        <h4 className="alert alert-danger" style={{display:error?'':'none'}}>{error}</h4>
        )
    }

    const showSuccess = ()=>{
        return (
        <h4 className="alert alert-success" style={{display:createdProduct?'':'none'}}>{createdProduct} has been Updated successfullys</h4>
        )
    }

    const showLoading = ()=>{
        return (
            <h4 className="alert alert-infi" style={{display:loading?'':'none'}}>Loading...</h4>
        )
    }

    const handleChange = name => event =>{
        const value =  name === 'photo' ? event.target.files[0] : event.target.value ;
        formData.set(name,value);
        setValues({...values, [name]:value});
    }

    const clickSubmit = (event)=>{
        event.preventDefault();
        setValues({...values, error:"", loading:true});
        console.log(formData);
        updateProduct(match.params.productId, user._id, token, formData).then(
            (res)=>{
                if(res.error){
                    setValues({...values, error:res.error})
                }else{
                setValues({...values, error:false, createdProduct:res.name,
                    name:'', description:'', price:'', photo:'', quantity:'',
                    loading:false, redirectToProfile:true
                })
                
            }
            }
        )
    };

    const addProductForm=()=>{
        return (
            <form className="mb-md-3" onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted">Product Name</label>
                    <input className="form-control" type="text" onChange={handleChange('name')} value={name} />
                </div>

                <div className="form-group">
                    <h6 className="text-muted">Upload Photo</h6>
                    <label className="btn btn-dark">
                    <input type="file" name="photo" accept="image/*" onChange={handleChange('photo')} />
                    </label>
                </div>

                <div className="form-group">
                    <label className="text-muted">Product Description</label>
                    <textarea className="form-control"onChange={handleChange('description')} value={description} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Product Price</label>
                    <input className="form-control" type="number" onChange={handleChange('price')} value={price} />
                </div>
            
                <div className="form-group">
                    <label className="text-muted">Product Category</label>
                    <select className="form-control" onChange={handleChange('category')} >
                        <option>Please Select</option>
                        {categories && categories.map((category, i )=>{
                            return (
                                <option key={i} value={category._id}>{category.name}</option>
                                )
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label className="text-muted">Quantity</label>
                    <input className="form-control" type="number" onChange={handleChange('quantity')} value={quantity} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Shipping</label>
                    <select className="form-control" onChange={handleChange('shipping')}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <button className="btn btn-outline-dark"> Update Product</button>
            </form>
        )
    }

    return (
        <Layout title="Update Product" description="Update Product to ecommerce app">
            <div className="col-md-8 offset-md-2">
                {showError()}
                {showSuccess()}
                {showLoading()}
                {addProductForm()}
                {redirectUser()}
            </div>
        </Layout>
    )
}

export default UpdateProduct;