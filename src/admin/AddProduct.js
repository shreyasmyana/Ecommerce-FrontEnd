import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {addProduct, getCategories} from '../admin/apiAdmin';



const AddProduct = ()=>{

    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
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

    const init = ()=>{
        getCategories()
        .then((res)=>{
            if(res.Error){
                setValues({...values, error:res.Error})
            }
            setValues({...values, categories:res, formData:new FormData()})
        })
    }

    useEffect(()=>{
        init();
    }, [])
    
    const showError=()=>{
        return (
        <h4 className="alert alert-danger" style={{display:error?'':'none'}}>{error}</h4>
        )
    }

    const showSuccess = ()=>{
        return (
        <h4 className="alert alert-success" style={{display:createdProduct?'':'none'}}>{createdProduct} has been added successfullys</h4>
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
        addProduct(user._id, token, formData).then(
            (res)=>{
                if(res.error){
                    setValues({...values, error:res.error})
                }else{
                setValues({...values, error:false, createdProduct:res.name,
                    name:'', description:'', price:'', photo:'', quantity:'',
                    loading:false
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
                    <input className="form-control" type="text" onChange={handleChange('name')} value={name} required/>
                </div>

                <div className="form-group">
                    <h6 className="text-muted">Upload Photo</h6>
                    <label className="btn btn-dark">
                    <input type="file" name="photo" accept="image/*" onChange={handleChange('photo')} required/>
                    </label>
                </div>

                <div className="form-group">
                    <label className="text-muted">Product Description</label>
                    <textarea className="form-control"onChange={handleChange('description')} value={description} required/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Product Price</label>
                    <input className="form-control" type="number" onChange={handleChange('price')} value={price} required/>
                </div>
            
                <div className="form-group">
                    <label className="text-muted">Product Category</label>
                    <select className="form-control" onChange={handleChange('category')} required>
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
                    <input className="form-control" type="number" onChange={handleChange('quantity')} value={quantity} required/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Shipping</label>
                    <select className="form-control" onChange={handleChange('shipping')}>
                        <option >Please Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button className="btn btn-outline-dark"> Add Product</button>
            </form>
        )
    }

    return (
        <Layout title="Add Product" description="Add Product to ecommerce app">
            <div className="col-md-8 offset-md-2">
                {showError()}
                {showSuccess()}
                {showLoading()}
                {addProductForm()}
            </div>
        </Layout>
    )
}

export default AddProduct;