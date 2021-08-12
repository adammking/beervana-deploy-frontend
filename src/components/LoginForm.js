import React, { useState } from "react";
import { useFormik } from 'formik'
import "./LoginForm.css"
import Alert from "./Alert"


function LoginForm({login}) {

    

    const formik = useFormik({
      initialValues: {
        username: "", 
        password: "",
      }, 
      onSubmit: values => {
        login(values)
      }
    })


    return (

<div className="container">   
<form onSubmit={formik.handleSubmit}> 
  <div className="mb-3">
    <input id="loginform-username" 
            onChange={formik.handleChange} 
            aria-describedby="username" 
            name="username" 
            className="form-control" 
            value={formik.values.username}
            placeholder="Username"/>
  </div>

  <div className="mb-3">
    <input type="password" 
    className="form-control" 
    onChange={formik.handleChange} 
    id="loginform-password" 
    name="password" 
    value={formik.values.password} 
    placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-warning btn-sm">Login</button>
</form>
</div> 
    )
    
}

export default LoginForm;