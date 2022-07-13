import React, {useState} from 'react';
import {Button, Form, Image, Row} from "react-bootstrap";
import docProfilePic from '../../assets/images/dp.png';
import {genders, specializations} from "../../const/const";
import camera from '../../assets/images/camera.png';
import {checkForm, formatPhoneNumber, setErrors} from "../../func/formUtility";

function DoctorRegistration(props) {
    const [profile, setProfile] = useState({});
    const [errors, seterrors] = useState({error: {}});
    const [hasEdit, setHasEdit] = useState(false);

    const onChange = (e) => {
        setProfile({...profile, [e.target.name]: e.target.value});
        setHasEdit(true);
        if (e.target.name === 'phoneNumber') {
            let phoneNumber = formatPhoneNumber(e.target.value);
            setProfile({...profile, [e.target.name]: phoneNumber});
        }
    }
    const isSaveDisabled = () => {
        let formElements = document.querySelectorAll("[aria-required='true']");
        let isFormFiled = checkForm(formElements);
        if (isFormFiled) {
            return (!hasEdit || Object.keys(errors).length > 1)
        } else {
            return (hasEdit || !Object.keys(errors).length > 1)
        }
    }

    const clientSideValidation = (event) => {
        let error = setErrors(event, errors);
        seterrors({...errors, error});
    }

    const handleAria = (errorName, elementName) => {
        if (errorName === '' || errorName === undefined) {
            document.getElementById(elementName).removeAttribute("aria-invalid");
        } else {
            document.getElementById(elementName).setAttribute("aria-invalid", true);
        }
    }

    const handleInputAria = (event) => {
        console.log(errors)
        let error = errors;
        if (event.target.name === 'fullName') {
            handleAria(error["fullName"], event.target.name);
        } else if (event.target.id === 'address') {
            handleAria(error['address'], event.target.name);
        } else if (event.target.name === 'phoneNumber') {
            handleAria(error['phoneNumber'], event.target.name);
        }
        else if (event.target.name === 'medicalCouncilNumber') {
            handleAria(error['medicalCouncilNumber'], event.target.name);
        }
        else if (event.target.name === 'gender') {
            handleAria(error['gender'], event.target.name);
        }
        else if (event.target.name === 'specialization') {
            handleAria(error['specialization'], event.target.name);
        }
    }

    function saveDoctorDetails() {
        //save details
    }

    function dpUpload() {
        //image upload
    }

    return (
        <div className='doctor-registration'>
            <div className='doctor-registration-form-container'>
                <Form className='doctor-registration-form'>
                    <div className='doctor-registration-form-section1'>
                        <Image className='doctor-registration-form-section1-image' src={docProfilePic}
                               roundedCircle={true}/>
                        <Image className='doctor-registration-form-section1-image-selectIcon' src={camera}
                               roundedCircle={true} onClick={dpUpload}/>
                    </div>
                    <div className='doctor-registration-form-section2'>
                        <div className='doctor-registration-form-section2-part1'>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label row sm={3}>Medical Council Number
                                </Form.Label>
                                <Row sm={2}>
                                    <Form.Control
                                        id='input'
                                        type='text'
                                        name='medicalCouncilNumber'
                                        placeholder={'Enter Medical Council Number'}
                                        value={profile.medicalCouncilNumber}
                                        aria-required={true}
                                        aria-describedby='mcNumber'
                                        maxLength={17}
                                        onChange={onChange}
                                        onBlur={clientSideValidation}
                                        onFocus={handleInputAria}/>
                                </Row>
                                <span id='mcNumber' className='form-error'
                                      role='status'>{errors.medicalCouncilNumber}</span>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label row sm={3}>Name
                                </Form.Label>
                                <Row sm={2}>
                                    <Form.Control
                                        id='input'
                                        type='text'
                                        name='fullName'
                                        placeholder={'Enter Name'}
                                        value={profile.fullName}
                                        aria-required={true}
                                        aria-describedby='fName'
                                        maxLength={40}
                                        onChange={onChange}
                                        onBlur={clientSideValidation}
                                        onFocus={handleInputAria}/>
                                </Row>
                                <span id='fName' className='form-error' role='status'>{errors.fullName}</span>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label row sm={3}>
                                    Gender
                                </Form.Label>
                                <Row sm={2}>
                                    <Form.Select
                                        id='input'
                                        defaultValue={profile.gender}
                                        name='gender'
                                        aria-required={true}
                                        aria-describedby='genders'
                                        onChange={onChange}
                                        onBlur={clientSideValidation}
                                        onFocus={handleInputAria}>
                                        <option value={''}>Select gender</option>
                                        {genders.map((item, index) => (
                                            <option key={index} value={item.gender}>{item.gender}</option>
                                        ))}
                                    </Form.Select>
                                </Row>
                                <span id='genders' className='form-error' role='status'>{errors.gender}</span>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label row sm={3}>
                                    Specialization
                                </Form.Label>
                                <Row sm={2}>
                                    <Form.Select
                                        id='input'
                                        defaultValue={profile.specialization}
                                        name='specialization'
                                        aria-required={true}
                                        aria-describedby='spec'
                                        onChange={onChange}
                                        onBlur={clientSideValidation}
                                        onFocus={handleInputAria}>
                                        <option value={''}>Select specialization</option>
                                        {specializations.map((item, index) => (
                                            <option key={index}
                                                    value={item.specialization}>{item.specialization}</option>
                                        ))}
                                    </Form.Select>
                                </Row>
                                <span id='spec' className='form-error' role='status'>{errors.specialization}</span>
                            </Form.Group>
                        </div>
                        <div className='doctor-registration-form-section2-part2'>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label row sm={3}>
                                    phone Number
                                </Form.Label>
                                <Row sm={2}>
                                    <Form.Control
                                        id='input'
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
                                </Row>
                                <span id='tp' className='form-error' role='status'>{errors.phoneNumber}</span>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label row sm={3}>Email address</Form.Label>
                                <Row sm={2}>
                                    <Form.Control
                                        id='input'
                                        type='email'
                                        name='email'
                                        placeholder='Enter email'
                                        value={profile.email}
                                        aria-required={true}
                                        aria-describedby='mail'
                                        onChange={onChange}
                                        onBlur={clientSideValidation}
                                        onFocus={handleInputAria}/>
                                </Row>
                                <span id='mail' className='form-error' role='status'>{errors.email}</span>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label row sm={3}>
                                    Address
                                </Form.Label>
                                <Row sm={2}>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        id="input"
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
                                </Row>
                                <span id='ad' className='form-error' role='status'>{errors.address}</span>
                            </Form.Group>
                        </div>
                    </div>
                </Form>
                <Button className='doctor-registration-savebtn' variant="secondary" onClick={saveDoctorDetails}
                        disabled={isSaveDisabled()}>Add Doctor</Button>
            </div>

        </div>
    );
}

export default DoctorRegistration;