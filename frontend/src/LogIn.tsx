import React from 'react';
import NavB from './NavB';

import { useState, useEffect } from "react"; 
import './LogIn.css'

function LogIn(){
  const initialValues = {email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({email:"",password:""});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formValues, formErrors, isSubmit]);

  const validate = (values) => {
    const errors = {email:"",password:""};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };


    return (
      <>
      <div>
        <NavB/>
        <div className='margin_log'>
        <form onSubmit={handleSubmit}>
        <span className="title">¡Bienvenido de Vuelta!</span>
              <div className='input-style'> 
              
              <label>Correo electrónico</label><br></br>
              <div className='pad'></div>
              <input
                type="text"
                name="email"
                placeholder="Ingrese su correo electrónico"
                value={formValues.email}
                onChange={handleChange}
              />
            <p>{formErrors.email}</p>
            <div className='pad'></div>
            <label>Contraseña</label><br></br>
            <div className='pad'></div>
              <input
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                value={formValues.password}
                onChange={handleChange}
              />
            <p>{formErrors.password}</p>
            <div className='pad'></div>
            <button className="fluid ui button blue">INGRESAR</button>
          </div>
          </form>
          </div>
          </div>
          </>
    );
}

export default LogIn;