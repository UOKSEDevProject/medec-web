import React from 'react';
import {Button} from "react-bootstrap";

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
            <Button className='session-view-btn' disabled={props.maximumAppointments===props.appointments}>{props.text}</Button>
        </div>
    );
}

export default Session;