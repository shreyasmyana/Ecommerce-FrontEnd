import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {signup} from '../auth';

const Signup = ()=>{
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    })
    const {name, email, password, error, success} = values;

    
    const clickSubmit= event=>{
        event.preventDefault();
        signup({name, email, password})
        .then((data)=>{
            if(data.errors){
                setValues({...values,error:data.errors.msg,success:false})
            }
            else{
                setValues({...values,
                    name:'',
                    email:'',
                    password:'',
                    error:'',
                    success:true})
            }  
        })
    }
    const handleChange = name => event =>{
        
        setValues({...values, error:false, [name]:event.target.value})
    }

    const signUpForm = ()=>(
            <form>
                <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange("name")} 
                        value={name}>
                </input>
                </div>
                <div className="form-group">
                <label className="text-muted">Email-ID</label>
                <input type="email" className="form-control" onChange={handleChange("email")} value={email}></input>
                </div>
                <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" onChange={handleChange("password")} value={password}></input>
                </div>
                <button className="btn btn-dark col-md-2 offset-md-5 mt-2" onClick={clickSubmit}>Submit</button>
            </form>
    );
    
    const showError =()=>(
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
        </div>
    )

    const showSuccess=()=>(
        <div className="alert alert-info" style={{display:success?'':'none'}}>
            Account has been created. Please <Link to="/signin">SignIn</Link>
        </div>
    )

    return (
        <Layout title="SignUP" description="SignUP to ecommerce app" className="container col-md-6 offset-md-3">
        {showError()}
        {showSuccess()}
        {signUpForm()}
        
        </Layout>
    );
}

export default Signup;