import React, {useEffect} from "react";
import {useState} from "react";
import {useQuery, useSubscription} from "@apollo/client";
import queries from "../../graphql/queries";
import {useSelector} from "react-redux";
import store from "../../data-store/reducer/root-reducer";
import {patientActions} from "../../data-store/actions/patient-actions";
import DataNotAvailable from "./DataNotAvailable";
import subscriptions from "../../graphql/subscriptions";

const addAppoinmentListToStore = (appoinments) => {
    store.dispatch(patientActions.addAppointmentList(appoinments.getAppointments));
};

const onSubsDataFeed = (res) => {
    if (res && res.subscriptionData && res.subscriptionData.data && res.subscriptionData.data.sessionListener) {
        store.dispatch(patientActions.updateAppointmentList(res.subscriptionData.data.sessionListener));
    }
};

const MyAppointments = () => {
    const {loading, error} = useQuery(queries.getAppointmentList, {
        onCompleted: addAppoinmentListToStore,
        variables: {getAppointmentsId: sessionStorage.getItem("usrId")}
    });
    const appointmentList = useSelector(state => state.patientDS.appointmentList);
    const [appointments, setAppointments] = useState(undefined);
    const [sessionIdList, setSessionIdList] = useState(undefined);

    useEffect(() => {
        if (appointmentList) {
            setAppointments(appointmentList);
            setSessionIdList(appointmentList.map((value) => {return value._id;}));
        }
    }, [appointmentList]);

    useSubscription(subscriptions.sessionListener, {
        variables: {sessionId: sessionIdList ? sessionIdList.join('|') : ''},
        onSubscriptionData: onSubsDataFeed
    });

    const renderTabRow = () => {
        let row = [];
        appointments?.map((item, key) => {
            row.push(
                <tr key={key}>
                    <td>{item.channelCenter}</td>
                    <td>{item.dctName}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.aptNo}</td>
                    <td>{item.refNo}</td>
                    <td>{item.currAptNo}</td>
                </tr>
            );
        });

        return row;
    };

    return appointments && appointments.length === 0 ? <DataNotAvailable customMessage={'Data Not Available'}/>
        : (<div className='myappointment-page'>
                <div className='myappointment-table-container' >
                        <table className='table'>
                            <thead>
                            <tr className='myappointment-page-table-head'>
                                <th scope='col'>Channeling Center</th>
                                <th scope='col'>Doctor</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Time</th>
                                <th scope='col'>No</th>
                                <th scope='col'>Reference Number</th>
                                <th scope='col'>Current Appointment Number</th>
                            </tr>
                            </thead>
                            <tbody>{renderTabRow()}</tbody>
                        </table>
                </div>

        </div>
    );
};

export default MyAppointments;
