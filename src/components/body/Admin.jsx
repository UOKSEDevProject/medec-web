import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {notifyMessage} from '../../utils/notification.js';
import {authConstants, component, gender} from "../../constants/constants";
import {useMutation} from "@apollo/client";
import mutations from "../../graphql/mutations";
import {ErrorMessage} from '../../constants/constants.js'
import {isInvaliedPhoneNumber} from '../../utils/clientSideValidation.jsx'
import {useHistory} from "react-router-dom";
import {configuration} from '../../config.js';
import FileUpLoader from "./FileUploader";
import {AiFillFolderAdd} from "react-icons/ai";

function Admin(props) {
    const [profile, setProfile] = useState({});
    const [logo,setLogo] = useState(null);

    const history = useHistory();
    useEffect(()=>{
        (window.sessionStorage.getItem('usrId') === undefined || window.sessionStorage.getItem('usrId') === null || configuration.component!==component.admin) && history.push('/login');
    },[])

    const [sendRegisterReq, {loading}] = useMutation(mutations.register);
    const onChange = (e) => {setProfile({...profile,[e.target.name]:e.target.value});}
    let fileInput = useRef();

    const onFileSelect = () => {
        fileInput.click();
    }
    async function setProfileImages(url) {
        setLogo(url);
    }
    const UpdateServer = (data) => {
        sendRegisterReq({
            variables: {
                usr: profile.usrName,
                pwd: " ",
                userArgs: {
                  chanCenterArgs: {
                    address: profile.address,
                    cntNo: profile.cntNo,
                    logoUrl: logo,
                    name: profile.name,
                    type:profile.type||'ChannelCenter'
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
        else if (typeof(profile.usrName)==='undefined'|| profile.usrName=='')
            notifyMessage(ErrorMessage[0].emptyUsername,3);
        else if(!(profile.usrName.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)))
            notifyMessage(ErrorMessage[0].wrongEmail,3);
        else if (logo===null || typeof(logo)==='undefined')
            notifyMessage(ErrorMessage[0].emptyLogoImage,3);
        else
            UpdateServer();
        }

    const submitButtonHandler = () => {
        // console.log(profile)
        validation();
    }

    return (
        <div className='admin'>
            {<Form style={{width: '60vw', margin: 'auto', padding: '10px'}}>
                <Form.Group className="mb-3">
                    <Form.Label>Logo</Form.Label><br/>
                    <AiFillFolderAdd size={50} onClick={onFileSelect}/>
                    <FileUpLoader
                        setProfileImages={(url) => {
                            setProfileImages(url);
                        }}
                        accepts={["image/png", "image/jpg", "image/jpeg"]}
                        cRef={(e)=>fileInput=e}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Channel Center Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter name" aria-required={true}
                                  onChange={onChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="address" name='address' placeholder="Enter address" aria-required={true}
                                  onChange={onChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" name='cntNo' placeholder="Enter phone number" aria-required={true}
                                  onChange={onChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name='usrName' placeholder="Enter valied email" aria-required={true}
                                  onChange={onChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>
                        Type <span>*</span>
                    </Form.Label><br/>
                    <Form.Select
                        defaultValue={true}
                        name='type'
                        aria-required={true}
                        onChange={onChange}>
                        <option key={0} value={'ChannelCenter'}>Channel Center</option>
                        <option key={1} value={'Laboratory'}>Laboratory</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="button" onClick={() => submitButtonHandler()}>
                    Submit
                </Button>
            </Form>
            }
        </div>
    );
}

export default Admin;