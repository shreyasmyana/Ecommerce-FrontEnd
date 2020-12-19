import React, {useState,useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {read, update, updateUser} from '../user/apiUser';
import { Redirect, Link } from 'react-router-dom';

const Profile = ({match})=>{

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:false,
        success:false
    })

  

    const {name, email, password, error, success} = values;

    const {token, user} = isAuthenticated();

    const init = ()=>{
        read(match.params.userId, token).then((data)=>{
            if(data.error){
                setValues({...values,error:data.error})            
            }
            else{
                setValues({...values, name:data.name , email:data.email, })
            }
        })
    }

    useEffect(()=>{
        init();
    },[])

    const handleChange = name => e =>{
        setValues({ ...values, error:false, [name]: e.target.value })
    }

    const clickSubmit = e =>{
        e.preventDefault()
        update(match.params.userId, token, {name, email, password}).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                updateUser(data, ()=>{
                    setValues({...values, name:data.name, email:data.email, success:true})
                })
            }
        })
    }

    const redirectUser = (success)=>{
        if(success){
            return <Redirect to="/user/dashboard" />
        }
    }

    const profileUpdate = (name, email, password)=>(
        <form>
            
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input className="form-control" onChange={handleChange('name')} value={name}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input className="form-control" onChange={handleChange('email')} value={email}></input>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input className="form-control" onChange={handleChange('password')}></input>
            </div>

            <button className="btn btn-dark col-md-2 offset-md-5 mt-2" onClick={clickSubmit}>Submit</button>

        </form>
    )

    return ( 
        <Layout title={`Profile`} description="Update Profile " className="container col-md-6 offset-md-3">
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
    </Layout>
    )
}

export default Profile;