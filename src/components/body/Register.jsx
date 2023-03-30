import React, {useState} from 'react';
import {Button, Image} from "react-bootstrap";
import dp from '../../assets/images/dp.png'
import {checkForm, setErrors} from "../../utils/formUtility";
import {validatePassword2} from "../../utils/clientSideValidation";
import {useHistory} from "react-router-dom";
import EditProfileModal from "./editProfileModal";
import {useMutation} from "@apollo/client";
import mutations from "../../graphql/mutations";
import {authConstants} from "../../constants/constants";
import store from "../../data-store/reducer/root-reducer";
import {userActions} from "../../data-store/actions/user-actions";
import Spinner from "./Spinner";
import {notifyMessage} from "../../utils/notification";

const onAuthResponse = (data) => {
    if (data && data.register.authSts === authConstants.authRegisteredSuccess) {
        store.dispatch(userActions.authResponse(data.register));

    }
};

function Register() {
    const [modalShow, setModalShow] = useState(false);
    const [profile, setProfile] = useState();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        password2: ''
    });
    const [errors, seterrors] = useState({error: {}});
    const [hasEdit, setHasEdit] = useState(false);
    const [isAgree, setIsAgree] = useState(false);
    const history = useHistory();
    const [sendRegisterReq, {loading}] = useMutation(mutations.register);

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
        setHasEdit(true);
    }

    const clientSideValidation = (event) => {
        if (event.target.name === 'password2') {
            let error = validatePassword2(event.target.value, credentials.password, errors);
            seterrors({...errors, error})
        } else {
            let error = setErrors(event, errors);
            seterrors({...errors, error});
        }
    }

    const handleAria = (errorName, elementName) => {
        if (errorName === '' || errorName === undefined) {
            document.getElementById(elementName).removeAttribute("aria-invalid");
        } else {
            document.getElementById(elementName).setAttribute("aria-invalid", true);
        }
    }

    const handleInputAria = (event) => {
        let error = errors;
        if (event.target.id === 'email') {
            handleAria(error["email"], event.target.id);
        } else if (event.target.id === 'password') {
            handleAria(error['password'], event.target.id);
        } else if (event.target.id === 'password2') {
            handleAria(error['password2'], event.target.id);
        }
    }

    const isRegisterDisabled = () => {
        let formElements = document.querySelectorAll("[aria-required='true']");
        let isFormFiled = checkForm(formElements);
        if (isFormFiled && isAgree) {
            return (!hasEdit || Object.keys(errors).length > 1)
        } else {
            return (hasEdit || !Object.keys(errors).length > 1)
        }
    }

    const isChecked = () => {
        setIsAgree(!isAgree);
    }

    const toLogin = () => {
        history.push('/login')
    }

    const Register = () => {
        setModalShow(true);
    }

    const updateProfile = (profile) => {
        setModalShow(false);
        setProfile(profile);
        sendRegisterReq({
            variables: {
                usr: credentials.email,
                pwd: credentials.password,
                type: '',
                userArgs: {
                    patientArgs: {
                        fullName: profile.fullName,
                        disName: profile.disName,
                        nameWithInitials: profile.iName,
                        prfImgUrl: profile.imageUrl,
                        address: profile.address,
                        birthDate: profile.birthDate,
                        bldGrp: profile.bloodGroup,
                        des: profile.description,
                        sex: profile.gender,
                        cntNo: profile.country+' '+profile.phoneNumber
                    }
                }
            }, fetchPolicy: "no-cache",
            onCompleted: onAuthResponse
        }).then(r =>{
            if(r.data.register.authSts === authConstants.authRegisteredSuccess){
                notifyMessage("Successfully Registered", '1');
                history.push('/login')
            } else{
                notifyMessage(r.data.register.message, '3');
            }
        }).catch(()=>notifyMessage("Something Went Wrong", '3'));
    }

    const closeModal = () => {
        setModalShow(false);
    }


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
                <div className='login-form-inputs'>
                    <input className='login-form-inputs'
                           id='password2'
                           type='password'
                           name='password2'
                           placeholder={'password2'}
                           value={credentials.password2}
                           aria-required={true}
                           aria-describedby='pwd2'
                           onChange={onChange}
                           onBlur={clientSideValidation}
                           onFocus={handleInputAria}/>
                    <span id='pwd2' className='form-error' role='status'>{errors.password2}</span>
                </div>
                <div className='register-form-link'>
                    <input type='checkbox' onClick={isChecked} aria-required={true}/><span className='policies-stmt'>
                    I agree to the terms & conditions defined by MEDEC</span>
                </div>

                <Button className='login-btn' variant="primary" disabled={isRegisterDisabled()}
                        onClick={Register}>Register</Button>
                <div className='login-form-link2'><span className='register-form-link'>
                    Already a member ?</span> <span className='toSignIn-link' onClick={toLogin}> SIGN IN</span></div>
            </div>
            <EditProfileModal
                profile={profile}
                visibility={modalShow}
                closeModal={closeModal}
                updateProfile={(profile) => {updateProfile(profile)}}/>
        </div>
    );
}

export default Register;