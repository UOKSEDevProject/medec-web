import React from 'react';
import {Button} from "react-bootstrap";
import {configuration} from "../../config";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/client";
import mutations from "../../graphql/mutations";
import Spinner from "./Spinner";
import {notifyMessage} from "../../utils/notification";

function Session(props) {
    const [addAppointment, {loading}] = useMutation(mutations.addAppointment);
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
                if (sessionStorage.getItem("usrId")) {
                    addAppointment({
                        variables: {
                            sessionId: props.id ,
                            pId: sessionStorage.getItem("usrId")
                        }
                    }).then(r=>{
                            if (r.data.addAppointment.statusCode === 'S0000'){
                                notifyMessage("Successfully added", '1');
                            } else if (r.data.addAppointment.statusCode === 'E0009'){
                            notifyMessage("Already added appointment", '3');
                        } else{
                                notifyMessage("Something went wrong", '3');
                            }
                    }
                    ).catch(r=>notifyMessage("Something went wrong", '3'));
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
            {loading && <Spinner isOverLay={true}/>}
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