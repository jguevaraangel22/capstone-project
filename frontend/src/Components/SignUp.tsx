import React from 'react';
import NavB from './NavB';

import { useState, useEffect } from "react"; 
import './SignUp.css'

/*https://github.com/Hacker0x01/react-datepicker*/
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function LogIn(){
  const [startDate, setStartDate] = useState(new Date());

  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({username:"",email:"",password:""});
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
    const errors = {username: "", email:"",password:""};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
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
      <div>
        <NavB/>,
        <div className = "box">
        <form onSubmit={handleSubmit}>
        <span className="text-center">login</span>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="input-container">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>
            <div className="input-container">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="input-container">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>

            <div className="input-container">
              <input
                type="number"
                name="Numero"
                placeholder="Numero"
              />

            </div>
            <div className="input-container">
              <input
                type="number"
                name="CC"
                placeholder="CC"
              />
            </div>

            <DatePicker id = "bir_date"selected={startDate} onChange={(date) => setStartDate(date)} />
            
            <button className="fluid ui button blue">Submit</button>
          </div>
          </form>
      </div>
      </div>
    );
}

export default LogIn;