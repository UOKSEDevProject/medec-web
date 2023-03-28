import React, {useRef, useState} from 'react';
import {Button, Col, Form, Image, Modal, Row} from "react-bootstrap";
import {bloodGroups, gender} from "../../constants/constants";
import {checkForm, formatPhoneNumber, setErrors} from "../../utils/formUtility";
import defaultProfilePicture from "../../assets/images/defaultprofilepic.png";
import camera from "../../assets/images/camera.png";
import FileUpLoader from './FileUploader';
import {uploadFile,fileURL} from '../../utils/awsFunctions';


function EditProfileModal(props) {

    const [profile, setProfile] = useState(props.profile ? props.profile: {});
    const [errors, seterrors] = useState({error:{}});
    const [hasEdit, setHasEdit] = useState(false);
    let inputFileRef = useRef();

    const onChange = (e) => {
        setProfile({...profile,[e.target.name]:e.target.value});
        setHasEdit(true);
        if(e.target.name==='phoneNumber'){
            let phoneNumber = formatPhoneNumber(e.target.value);
            setProfile({...profile,[e.target.name]:phoneNumber});
        }
    }

    const isSaveDisabled = () => {
      let formElements = document.querySelectorAll("[aria-required='true']");
      let isFormFiled = checkForm(formElements);
      if (isFormFiled){
          return(!hasEdit || Object.keys(errors).length>1)
      } else {
          return (hasEdit || !Object.keys(errors).length>1)
      }
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
      if (event.target.id === 'fullName'){
          handleAria(error["fullName"], event.target.id);
      } else if (event.target.id === 'disName'){
          handleAria(error['disName'], event.target.id);
      }else if (event.target.id === 'iName'){
          handleAria(error['iName'], event.target.id);
      } else if (event.target.id === 'address'){
          handleAria(error['address'], event.target.id);
      }  else if (event.target.id === 'phoneNumber'){
          handleAria(error['phoneNumber'], event.target.id);
      } else if (event.target.name === 'gender'){
          handleAria(error['gender'], event.target.name);
      } else if (event.target.name === 'birthDate'){
          handleAria(error['birthDate'], event.target.name);
      } else if (event.target.name === 'country'){
          handleAria(error['country'], event.target.name);
      }else if (event.target.name === 'bloodGroup'){
          handleAria(error['bloodGroup'], event.target.name);
      }
    }

    async function dpUpload(file) {
        uploadFile(file)
            .on('httpUploadProgress', (evt) => {
                console.log(Math.round((evt.loaded / evt.total) * 100));
            })
            .send((e,data) => {
                if (e) {
                    console.log(e);
                }else if(data){
                    // console.log(`https://medec-content.s3.ap-south-1.amazonaws.com/${file.name}`); 
                }
            });
            let profilePicture = await fileURL(file.name);
            profile.imageUrl=`${profilePicture}`;
            setProfile({...profile,profilePicture,});
            console.log(profile.profilePicture);
    }

    function imageSelectingHandler () {
        inputFileRef.click();
    }

    return (
            <Modal className='edit-profile-modal' show={props.visibility} onHide={props.closeModal}  backdrop="static"
                   size="lg" dialogClassName="modal-70w" aria-labelledby="example-custom-modal-styling-title" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='dev'>
                        <Image className='edit-profile-modal-profilePicture-selectIcon' src={camera}
                                                roundedCircle={true} onClick={imageSelectingHandler}/>
                        <div style={{display:'none'}}>
                            <FileUpLoader
                                pageType
                                sendImageData={(file) => {
                                    dpUpload(file);
                                }}
                                accepts={["image/png", "image/jpg", "image/jpeg"]}
                                cRef={(e)=>inputFileRef=e}
                            />
                        </div>
                        <Image className='edit-profile-modal-profilePicture' src={profile.profilePicture ? profile.profilePicture : defaultProfilePicture} 
                                fluid={true}  roundedCircle={true}/>
                    </div>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs={3} md={3} lg={3}>
                                Gender <span>*</span>
                            </Form.Label>
                            <Col xs={4} md={3} lg={2}>
                                <Form.Select
                                    id='gender'
                                    defaultValue={profile.tittle}
                                    name='gender'
                                    aria-required={true}
                                    aria-describedby='gender_'
                                    onBlur={clientSideValidation}
                                    onFocus={handleInputAria}
                                    onChange={onChange}>
                                    <option value={''}>select Your Gender</option>
                                    {gender.map((item, index) => (
                                        <option key={index} value={item.tittle}>{item.tittle}</option>
                                    ))}
                                </Form.Select>
                                <span id='gender_' className='form-error' role='status'>{errors.tittle}</span>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs={3} md={3} lg={3}>
                                Full Name <span>*</span>
                            </Form.Label>
                            <Col xs={9} md={8} lg={7}>
                            <Form.Control
                                id='fullName'
                                type='text'
                                name='fullName'
                                placeholder={'enter Full Name'}
                                value={profile.fullName}
                                aria-required={true}
                                aria-describedby='fName'
                                maxLength={17}
                                onChange={onChange}
                                onBlur={clientSideValidation}
                                onFocus={handleInputAria}/>
                                <span id='fName' className='form-error' role='status'>{errors.fullName}</span>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs={3} md={3} lg={3}>
                                Display Name <span>*</span>
                            </Form.Label>
                            <Col xs={9} md={8} lg={7}>
                                <Form.Control
                                    id='disName'
                                    type='text'
                                    name='disName'
                                    placeholder={'enter name for display'}
                                    value={profile.disName}
                                    aria-required={true}
                                    aria-describedby='dName'
                                    maxLength={17}
                                    onChange={onChange}
                                    onBlur={clientSideValidation}
                                    onFocus={handleInputAria}/>
                                <span id='dName' className='form-error' role='status'>{errors.disName}</span>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs={3} md={3} lg={3}>
                                Name with Initials <span>*</span>
                            </Form.Label>
                            <Col xs={9} md={8} lg={7}>
                                <Form.Control
                                    id='iName'
                                    type='text'
                                    name='iName'
                                    placeholder={'enter name with initials'}
                                    value={profile.iniName}
                                    aria-required={true}
                                    aria-describedby='iName_'
                                    maxLength={17}
                                    onChange={onChange}
                                    onBlur={clientSideValidation}
                                    onFocus={handleInputAria}/>
                                <span id='iName_' className='form-error' role='status'>{errors.iName}</span>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs={3} md={3} lg={3}>
                                Date Of Birth <span>*</span>
                            </Form.Label>
                            <Col xs={6} md={5} lg={4}>
                                <Form.Control
                                    id='input'
                                    type='date'
                                    name='birthDate'
                                    value={profile.birthDate}
                                    aria-required={true}
                                    aria-describedby='bDate'
                                    onBlur={clientSideValidation}
                                    onFocus={handleInputAria}
                                    onChange={onChange}/>
                                <span id='bDate' className='form-error' role='status'>{errors.birthDate}</span>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs={3} md={3} lg={3}>
                                Blood Group <span>*</span>
                            </Form.Label>
                            <Col xs={4} md={3} lg={2}>
                                <Form.Select
                                    id='input'
                                    defaultValue={profile.bloodGroup}
                                    name='bloodGroup'
                                    aria-required={true}
                                    aria-describedby='bGroup'
                                    onBlur={clientSideValidation}
                                    onFocus={handleInputAria}
                                    onChange={onChange}>
                                    <option value={''}>select blood group</option>
                                    {bloodGroups.map((item, index) => (
                                        <option key={index} value={item.bloodGroup}>{item.bloodGroup}</option>
                                    ))}
                                </Form.Select>
                                <span id='bGroup' className='form-error' role='status'>{errors.bloodGroup}</span>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs={12} md={9} lg={3}>
                                phone Number <span>*</span>
                            </Form.Label>
                                <Col xs={4} md={4} lg={2}>
                                    <Form.Select
                                        id='input'
                                        name='country'
                                        defaultValue={profile.country}
                                        aria-required={true}
                                        aria-describedby='countryCode'
                                        onBlur={clientSideValidation}
                                        onFocus={handleInputAria}
                                        onChange={onChange}>
                                        <option value={''}>select country code</option>
                                        <option value={'+94'}>+94</option>
                                        <option value={'+96'}>+96</option>
                                    </Form.Select>
                                    <span id='countryCode' className='form-error' role='status'>{errors.country}</span>
                                </Col>
                                <Col xs={8} md={8} lg={5}>
                                    <Form.Control
                                        id='phoneNumber'
                                        type='text'
                                        name='phoneNumber'
                                        placeholder='Enter your mobile number'
                                        value={profile.phoneNumber}
                                        maxLength={11}
                                        aria-required={true}
                                        aria-describedby='tp'
                                        onChange={onChange}
                                        onBlur={clientSideValidation}
                                        onFocus={handleInputAria}/>
                                    <span id='tp' className='form-error' role='status'>{errors.phoneNumber}</span>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs={12} md={3} lg={3}>
                                Address <span>*</span>
                            </Form.Label>
                            <Col xs={12} md={9} lg={7}>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    id="address"
                                    type='text'
                                    name='address'
                                    placeholder='Enter your Address'
                                    value={profile.address}
                                    aria-required={true}
                                    maxLength={100}
                                    aria-describedby='ad'
                                    onChange={onChange}
                                    onBlur={clientSideValidation}
                                    onFocus={handleInputAria}/>
                                <span id='ad' className='form-error' role='status'>{errors.address}</span>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column xs={12} md={3} lg={3}>
                                Description
                            </Form.Label>
                            <Col xs={12} md={9} lg={7}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    id='input'
                                    type='text'
                                    name='description'
                                    placeholder='Enter your allergies, special conditions here'
                                    value={profile.description}
                                    onChange={onChange}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.closeModal} disabled={!isSaveDisabled()}>
                        Discard
                    </Button>
                    <Button variant="primary" onClick={()=>{props.updateProfile(profile)}} disabled={isSaveDisabled()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
}

export default EditProfileModal;