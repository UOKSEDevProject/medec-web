import React, {useEffect, useRef, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import Spinner from './Spinner';
import {notifyMessage} from '../../utils/notification.js';
import {authConstants} from "../../constants/constants";
import {useMutation} from "@apollo/client";
import mutations from "../../graphql/mutations";
import FileUoloader from './FileUploader'
import {ErrorMessage} from '../../constants/constants.js'
import {isInvaliedPhoneNumber} from '../../utils/clientSideValidation.jsx'

function Admin(props) {
    const [profile, setProfile] = useState({});
    const [logo,setLogo] = useState(null);
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3JJZCI6ImFkbWluIiwiYXV0aFR5cGUiOiIxIiwiaWF0IjoxNjc1MzY3NDA1LCJleHAiOjE2NzU0MTA2MDV9.shfeufCxbbO-VY09XR3rsiSw00U1qgDltvc6lEV224w';
    // localStorage.setItem('token',token);
    useEffect(()=>{
        
    },[])

    const [sendRegisterReq, {loading}] = useMutation(mutations.register);
    const onChange = (e) => {setProfile({...profile,[e.target.name]:e.target.value});}

    const UpdateServer = (data) => {
        sendRegisterReq({
            variables: {
                usr: profile.usrName,
                pwd: "MC",
                userArgs: {
                  chanCenterArgs: {
                    address: profile.address,
                    cntNo: profile.cntNo,
                    logoUrl: logo.name,
                    name: profile.name,
                  }
                }
              }, fetchPolicy: "no-cache"
        }).then(r =>{
            if(r.data.register.authSts === authConstants.authRegisteredSuccess){
                notifyMessage("Successfully Registered", '1');
            } else{
                notifyMessage(r.data.register.message, '3');
            }
        }).catch(()=>notifyMessage("Something Went Wrong", '3'));
    };

    const validation = () => {
        console.log(profile.cntNo && isInvaliedPhoneNumber(profile.cntNo))
        if(typeof(profile.name)==='undefined' || profile.name=='')
            notifyMessage(ErrorMessage[0].emptyChannelCenterName,3);
        else if (typeof(profile.address)==='undefined' || profile.address=='')
            notifyMessage(ErrorMessage[0].emptyAddress,3);
        else if (typeof(profile.cntNo)==='undefined'|| profile.cntNo=='')
            notifyMessage(ErrorMessage[0].emptyPhoneNumber,3);
        // else if(isInvaliedPhoneNumber(profile.cntNo))
        //     notifyMessage(ErrorMessage[0].wrongPhoneNumber,3);
        else if (logo===null || typeof(logo.name)==='undefined')
            notifyMessage(ErrorMessage[0].emptyLogoImage,3);
        else if (typeof(profile.usrName)==='undefined'|| profile.usrName=='')
            notifyMessage(ErrorMessage[0].emptyUsername,3);
        else if (typeof(profile.psw1)==='undefined'|| profile.psw1=='')
            notifyMessage(ErrorMessage[0].emptyPassword,3);
        else if (typeof(profile.psw2)==='undefined'|| profile.psw2=='')
            notifyMessage(ErrorMessage[0].emptyPassword,3)
        else if (profile.psw1 !== profile.psw2)
            notifyMessage(ErrorMessage[0].passwordMissMatch,3)
        else
            UpdateServer();
        }

    const submitButtonHandler = () => {
        console.log(profile)
        validation();
    }

    return (
        <div className='admin'>
            {false?
                <Spinner isOverLay={true}/> : 
                <Form style={{width:'60vw',margin:'auto', padding:'10px'}}>
                    <Form.Group className="mb-3">
                        <Form.Label>Channel Center Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Enter name"  aria-required={true} onChange={onChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name='address' placeholder="Enter address" aria-required={true} onChange={onChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="number" name='cntNo' placeholder="Enter phone number" aria-required={true} onChange={onChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name='usrName' placeholder="Enter Username" aria-required={true} onChange={onChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='psw1' placeholder="Enter password" aria-required={true} onChange={onChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control type="password" name='psw2' placeholder="Enter password" aria-required={true} onChange={onChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Logo</Form.Label>
                        <FileUoloader
                                sendImageData={(file) => {
                                    setLogo(file);
                                }}
                                accepts={["image/png", "image/jpg", "image/jpeg"]}
                                item={
                                    <Form.Control type="text" placeholder="Select the image" aria-required={true} value={logo && logo.name} disabled/>
                                }
                            />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={()=>submitButtonHandler()}>
                        Submit
                    </Button>
                </Form>
            }
        </div>
    );
}

export default Admin;