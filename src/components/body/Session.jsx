import React from 'react';
import {Button} from "react-bootstrap";
import {configuration} from "../../config";
import {component} from "../../constants/constants";

function Session(props) {
    return (
        <div className='session-item-body'>
            <div>{props.date}</div>
            <div>{props.time}</div>
            <div>
                <div className='session-appointment-name'>Appointments</div>
                <div className={props.maximumAppointments===props.appointments?'max-appointments':'lower-appointments'}>
                    {props.appointments}
                </div>
            </div>
            <Button className='session-view-btn'
                    disabled={
                        configuration.component === 'DOCTOR' ? false : props.maximumAppointments===props.appointments}
            >
                {props.text}</Button>
        </div>
    );
}

export default Session;