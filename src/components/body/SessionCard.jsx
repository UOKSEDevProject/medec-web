import React, {useState} from 'react';
import Session from "./Session";
import store from "../../data-store/reducer/root-reducer";
import {doctorActions} from "../../data-store/actions/doctor-actions";
import {useSubscription} from "@apollo/client";
import subscriptions from "../../graphql/subscriptions";
import {configuration} from "../../config";

const onSubsDataFeed = (res) => {
    if (res && res.subscriptionData && res.subscriptionData.data && res.subscriptionData.data.sessionListener) {
        store.dispatch(doctorActions.updateDoctorSession(res.subscriptionData.data.sessionListener));
    }
};

function SessionCard(props) {
    const [sessionList, setSessionList] = useState(props.sessionList.map((value) => {
        return value.id;
    }));

    useSubscription(subscriptions.sessionListener, {
        variables: {sessionId: sessionList ? sessionList.join('|') : ''},
        onSubscriptionData: onSubsDataFeed
    });

    return (
        <div className='session-card-body'
             hidden={configuration.component === "CHAN_CENTER" && (sessionStorage.getItem("usrId") !== props.hospitalId)}>
            <h3>{props.hospitalName}</h3>
            {props.sessionList?.map((item, index) => (
                <Session
                    key={index}
                    id={item.id}
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