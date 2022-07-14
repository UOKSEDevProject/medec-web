import React, {useEffect, useState} from "react";
import {Button, Form, Image, Row} from "react-bootstrap";
import {doctorProfile} from "../../temp/data-store";

const AddManualAppointment = () => {
    const [appointment, setAppointment] = useState({});
    const [errors, setErrors] = useState({});
    const [isFirstSubmit, setIsFirstSubmit] = useState(false)

    const onChange = (e) => {
        setAppointment({...appointment, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        if (!isFirstSubmit) {
            setIsFirstSubmit(true);
        }
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
                            id='input'
                            type='text'
                            name='name'
                            placeholder={'Enter Patient Name'}
                            value={appointment.name}
                            aria-required={true}
                            aria-describedby='name'
                            onChange={onChange}
                        />
                        {isFirstSubmit && <span id='name' className='form-error' role='status'>{errors.name}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="add-appointment-form-label">Age</Form.Label>
                        <Form.Control
                            id='input'
                            type='text'
                            name='age'
                            placeholder={'Enter Patient Age'}
                            value={appointment.age}
                            aria-required={true}
                            aria-describedby='age'
                            onChange={onChange}
                        />
                        {isFirstSubmit && <span id='age' className='form-error' role='status'>{errors.age}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="add-appointment-form-label">Contact Number</Form.Label>
                        <Form.Control
                            id='input'
                            type='text'
                            name='contactNumber'
                            placeholder={'Enter Patient Contact Number'}
                            value={appointment.contactNumber}
                            aria-required={true}
                            aria-describedby='contactNumber'
                            onChange={onChange}
                        />
                        {isFirstSubmit && <span id='contactNumber' className='form-error' role='status'>{errors.contactNumber}</span>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="add-appointment-form-label">Address</Form.Label>
                        <Form.Control
                            id='input'
                            type='text'
                            name='address'
                            placeholder={'Enter Patient Address'}
                            value={appointment.address}
                            aria-required={true}
                            aria-describedby='address'
                            onChange={onChange}
                        />
                        {isFirstSubmit && <span id='address' className='form-error' role='status'>{errors.address}</span>}
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