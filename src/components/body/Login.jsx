import React, {useState} from 'react';
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import dp from '../../assets/images/dp.png'
import {checkForm, setErrors} from "../../func/formUtility";

function Login() {

    const [credentials, setCredentials] = useState({
        email:'',
        password:''
    });
    const [errors, seterrors] = useState({error:{}});
    const [hasEdit, setHasEdit] = useState(false);

    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value});
        setHasEdit(true);
    }

    const clientSideValidation = (event) => {
        let error = setErrors(event, errors);
        seterrors({...errors,error});
    }

    const handleAria = (errorName, elementName) => {
        if (errorName === '' || errorName === undefined){
            document.getElementById(elementName).removeAttribute("aria-invalid");
        } else {
            document.getElementById(elementName).setAttribute("aria-invalid",true);
        }
    }

    const handleInputAria = (event) => {
        let error = errors;
        if (event.target.id === 'email'){
            handleAria(error["email"], event.target.id);
        } else if (event.target.id === 'password'){
            handleAria(error['password'], event.target.id);
        }
    }

    const isLoginDisabled = () => {
        let formElements = document.querySelectorAll("[aria-required='true']");
        let isFormFiled = checkForm(formElements);
        if (isFormFiled){
            return(!hasEdit || Object.keys(errors).length>1)
        } else {
            return (hasEdit || !Object.keys(errors).length>1)
        }
    }

    const handleForgetPassword= () =>{
        //forget pwd
    }

    const toRegister = () =>{
        //redirect
    }

    const login = () => {
      //login
        console.log(credentials);
    }
    return (
        <div className='login-form'>
            <div className='login-form-body'>
                <Image className='login-form-dp' src={dp} roundedCircle={true}/>
                <div className='login-form-inputs'>
                    <input className='login-form-inputs'
                        id='email'
                        type='email'
                        name='email'
                        placeholder={'Enter Email'}
                        value={credentials.email}
                        aria-required={true}
                        aria-describedby='mail'
                        onChange={onChange}
                        onBlur={clientSideValidation}
                        onFocus={handleInputAria}/>
                    <span id='mail' className='form-error' role='status'>{errors.email}</span>
                </div>
                <div className='login-form-inputs'>
                    <input className='login-form-inputs'
                        id='password'
                        type='password'
                        name='password'
                        placeholder={'password'}
                        value={credentials.password}
                        aria-required={true}
                        aria-describedby='pwd'
                        onChange={onChange}
                        onBlur={clientSideValidation}
                        onFocus={handleInputAria}/>
                    <span id='pwd' className='form-error' role='status'>{errors.password}</span>
                </div>
                <p className='login-form-link1' onClick={handleForgetPassword}>Forget password?</p>
                <Button className='login-btn' variant="primary" disabled={isLoginDisabled()} onClick={login}>Log in</Button>
                <p className='login-form-link2' onClick={toRegister}>CREATE ACCOUNT</p>
            </div>
        </div>

    );
}

export default Login;