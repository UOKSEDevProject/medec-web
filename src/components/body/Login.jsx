import React, {useState} from 'react';
import {Button, Image} from "react-bootstrap";
import dp from '../../assets/images/dp.png'
import {checkForm} from "../../utils/formUtility";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/client";
import mutations from "../../graphql/mutations";
import Spinner from "./Spinner";
import store from "../../data-store/reducer/root-reducer";
import {userActions} from "../../data-store/actions/user-actions";
import {authConstants} from "../../constants/constants";

const onAuthResponse = (data) => {
    if (data && data.login.authSts === authConstants.authSuccess) {
        store.dispatch(userActions.authResponse(data.login));
    }
};

function Login() {
    const [credentials, setCredentials] = useState({email:'', password:''});
    const [hasEdit, setHasEdit] = useState(false);
    const history = useHistory();
    const [sendLoginReq, {loading}] = useMutation(mutations.login);

    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value});
        setHasEdit(true);
    }

    const isLoginDisabled = () => {
        let formElements = document.querySelectorAll("[aria-required='true']");
        let isFormFiled = checkForm(formElements);
        if (isFormFiled){
            return !hasEdit;
        } else {
            return hasEdit;
        }
    }

    const handleForgetPassword= () =>{
        //forget pwd
    }

    const toRegister = () =>{
        history.push('/register');
    };

    const login = () => {
        sendLoginReq({
            variables: {
                usr: credentials.email,
                pwd: credentials.password
            }, fetchPolicy: "no-cache",
            onCompleted: onAuthResponse
        });
    };

    return (
        <div className='login-form'>
            {loading && <Spinner isOverLay={true}/>}
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
                        onChange={onChange}/>
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
                        onChange={onChange}/>
                </div>
                <p className='login-form-link1' onClick={handleForgetPassword}>Forget password?</p>
                <Button className='login-btn' variant="primary" disabled={isLoginDisabled()} onClick={login}>Log in</Button>
                <p className='login-form-link2' onClick={toRegister}>CREATE ACCOUNT</p>
            </div>
        </div>
    );
}

export default Login;