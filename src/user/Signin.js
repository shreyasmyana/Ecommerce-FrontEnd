import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {signin, authenticate, isAuthenticated} from '../auth';
const Signin = ()=>{
    const [values, setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectToReferrer:false
    });

    const {email, password, error, loading, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event =>{
        setValues({...values, error:false, [name]:event.target.value})
    }

    const clickSignIn = (event)=>{
        event.preventDefault(); 
        setValues({...values, error:false, loading:true})
        signin({email,password})
        .then((res)=>{
            if(res.error){
                setValues({...values, error:res.error, loading:false})
            }
            else{
                authenticate(res,()=>{
                    setValues({...values, redirectToReferrer:true})
                })
                
                
            }
        })

    }
    const signInForm = ()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input className="form-control" type="text" value={email} onChange={handleChange("email")}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input className="form-control" type="password" value={password} onChange={handleChange("password")}></input>
            </div>
            <button className="btn btn-dark col-md-2 offset-md-5 mt-2" onClick={clickSignIn}>SignIn</button>
        </form>
    )
    
    const redirectUser = ()=>{
        if(redirectToReferrer){
            if(user.role===1){
            return <Redirect to='/admin/dashboard'/>
            }
            else{
                return <Redirect to='/user/dashboard'/>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    }

    const showError = ()=>(
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
        </div>
    )

    const showLoading = ()=>(
        <div className="alert alert-info" style={{display:loading? '' : 'none'}}>
            Loading...
        </div>
    )
    return (
       <Layout title="SignIN" description="SignIN to ecommerce app" className="container col-md-6 offset-md-3">
           {showError()}
           {showLoading()}
           {signInForm()}
           {redirectUser()}
       </Layout>
       
    )
}

export default Signin;