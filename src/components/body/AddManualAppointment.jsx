import React, {useEffect, useState} from "react";
import {Button, Form, Image, Row} from "react-bootstrap";
import {doctorProfile} from "../../temp/data-store";
import {setErrors} from "../../func/formUtility";

const AddManualAppointment = () => {
    const [appointment, setAppointment] = useState({
        name: undefined,
        age: undefined,
        phoneNumber: undefined,
        address: undefined
    });
    const [errors, seterrors] = useState({});
    const [isFirstSubmit, setIsFirstSubmit] = useState(false)

    const validateFormFields = (e) => {
        if (e === undefined) {
            for (let name in appointment) {
                let error = setErrors({target: {name: name, value: appointment[name]}}, errors);
            }
        } else {
            let error = setErrors(e, errors);
            seterrors({...errors, error});
        }
    }

    const onChange = (e) => {
        validateFormFields(e);
        setAppointment({...appointment, [e.target.name]: e.target.value});
    }

    const onSubmit = () => {
        if (!isFirstSubmit) {
            validateFormFields();
            setIsFirstSubmit(true);
        }
        if (Object.keys(errors).length === 0) {
            saveAppointmentDetails();
        }
    }

    function saveAppointmentDetails() {
    }

    return (
        <div className="d-flex flex-wrap justify-content-around align-items-start py-5">
            <div className='dct-profile-details'>
                <Image className='dct-Profile-Picture' src={doctorProfile.profilePicture} fluid={true} alt='profile'/>
                <div className='dct-name'>Dr. {doctorProfile.firstName} {doctorProfile.lastName}</div>
                <div className='dct-specialization'>{doctorProfile.specialization}</div>
            </div>
            <div className="add-appointment-form">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="add-appointment-form-label">Name</Form.Label>
                        <Form.Control
                            type='text'
                            name='name'
                            placeholder={'Enter Patient Name'}
                            value={appointment.name}
                            onChange={onChange}
                        />
                        {isFirstSubmit && <span id='name' className='form-error' role='status'>{errors.name}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="add-appointment-form-label">Age</Form.Label>
                        <Form.Control
                            type='number'
                            name='age'
                            placeholder={'Enter Patient Age'}
                            value={appointment.age}
                            onChange={onChange}
                        />
                        {isFirstSubmit && <span id='age' className='form-error' role='status'>{errors.age}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="add-appointment-form-label">Contact Number</Form.Label>
                        <Form.Control
                            type='text'
                            name='phoneNumber'
                            placeholder={'Enter Patient Contact Number'}
                            value={appointment.phoneNumber}
                            onChange={onChange}
                        />
                        {isFirstSubmit &&
                            <span id='phoneNumber' className='form-error' role='status'>{errors.phoneNumber}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="add-appointment-form-label">Address</Form.Label>
                        <Form.Control
                            type='text'
                            name='address'
                            placeholder={'Enter Patient Address'}
                            value={appointment.address}
                            onChange={onChange}
                        />
                        {isFirstSubmit &&
                            <span id='address' className='form-error' role='status'>{errors.address}</span>}
                    </Form.Group>
                </Form>
                <div className="d-flex justify-content-center">
                    <button className='button px-3 py-2 my-2' variant="secondary" onClick={onSubmit}>Add Appointment
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddManualAppointment;