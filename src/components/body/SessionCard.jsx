import React from 'react';
import Session from "./Session";

function SessionCard(props) {
    return (
        <div className='session-card-body'>
            <h3>{props.hospitalName}</h3>
            {props.sessionList?.map((item,index)=>(
                <Session
                    key={index}
                    date={item.date}
                    time={item.time}
                    appointments={item.appointments}
                    maximumAppointments={item.maximumAppointments}
                    text={props.buttonText}
                />
                ))}
        </div>
    );
}

export default SessionCard;