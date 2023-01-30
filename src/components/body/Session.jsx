import React from 'react';
import {Button} from "react-bootstrap";
import {configuration} from "../../config";
import {useHistory} from "react-router-dom";

function Session(props) {
    const history = useHistory();

    const onClick = () => {
        switch (configuration.component) {
            case "CHAN_CENTER": {
                history.push("/add-mnl-app");
                break;
            }
            case "DOCTOR": {
                history.push("/pnt-lst");
                break;
            }
            case "USER": {
                if (sessionStorage.key(0)) {
                    console.log("test")
                } else {
                    history.push("/login");
                }
                break;
            }
            default: {
                history.push("/login");
                break;
            }
        }
    }

    return (
        <div className='session-item-body'>
            <div>{props.date}</div>
            <div>{props.time}</div>
            <div>
                <div className='session-appointment-name'>Appointments</div>
                <div
                    className={props.maximumAppointments === props.appointments ? 'max-appointments' : 'lower-appointments'}>
                    {props.appointments}
                </div>
            </div>
            <Button className='session-view-btn'
                    onClick={onClick}
                    disabled={
                        configuration.component === 'DOCTOR' ? false : props.maximumAppointments === props.appointments}
            >
                {props.text}</Button>
        </div>
    );
}

export default Session;