import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Image, Form, Button} from 'react-bootstrap';
import EditBtn from '../../assets/images/icon/buttons/btn-edit.png';
import DeleteBtn from '../../assets/images/icon/buttons/btn-delete.png';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import {useMutation, useQuery, useSubscription} from "@apollo/client";
import queries from "../../graphql/queries";
import store from "../../data-store/reducer/root-reducer";
import {doctorActions} from "../../data-store/actions/doctor-actions";
import Spinner from "./Spinner";
import {useSelector} from "react-redux";
import CalendarIcon from '../../assets/images/icon/calander-icon.png';
import {notifyMessage} from '../../utils/notification';
import {convertDateObjectToStringDate, convertStringDateToDateObject} from "../../utils/DateConverter";
import mutations from "../../graphql/mutations";
import subscriptions from "../../graphql/subscriptions";

const addDoctorSessionListToStore = (data) => {
    store.dispatch(doctorActions.addDoctorSessionList(data.getDoctorSessionListForChannelCenter))
};

const onSubsDataFeed = (res) => {
    if (res && res.subscriptionData && res.subscriptionData.data && res.subscriptionData.data.sessionListener) {
        store.dispatch(doctorActions.updateSessionOfDoctorSessionList(res.subscriptionData.data.sessionListener));
    }
};

const DoctorTimeSchedule = () => {
    const {dctId} = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [dateValue, setDateValue] = useState(new Date());
    const [timeValue, setTimeValue] = useState('10:00');
    const [maxAppointmentValue, setMaxAppointmentValue] = useState('0');
    const [isEdit, setIsEdit] = useState({bool: false, id: null});
    const [sessionIdList, setSessionIdLists] = useState([]);

    const {loading} = useQuery(queries.getDoctorSessionListsForChannelCenter, {
        onCompleted: addDoctorSessionListToStore,
        variables: {
            getDoctorSessionListForChannelCenterId: dctId,
            chId: "62c0b0d10ae48667baa01a30"
        }
    });
    const [sendCreateSessionReq] = useMutation(mutations.addSession);
    const [sendDeleteSessionReq] = useMutation(mutations.deleteSession);
    const [sendUpdateSessionReq] = useMutation(mutations.updateSession);

    const doctorProfile = useSelector(state => state.doctorDS.sessionList);

    useEffect(() => {
        if (doctorProfile && doctorProfile.sessionsList) {
            setSessionIdLists(doctorProfile.sessionsList.map((value) => {return value.id;}));
        }
    }, [doctorProfile]);

    useSubscription(subscriptions.sessionListener, {
        variables: {sessionId: sessionIdList ? sessionIdList.join('|') : ''},
        onSubscriptionData: onSubsDataFeed
    });

    const editSlot = (id) => {
        doctorProfile?.sessionsList?.find((item) => {
            if (item.id === id) {
                setIsEdit({bool: true, id: id});
                setDateValue(convertStringDateToDateObject(item.date));
                setTimeValue(item.time);
                setMaxAppointmentValue(item.maximumAppointments);
            }
        })
    }

    const saveSlot = () => {
        if (maxAppointmentValue > 0) {
            if (isEdit.bool) {
                updateSession();
            } else {
                createSession();
            }

            setIsEdit({bool: false, id: null});
            setDateValue(new Date());
            setTimeValue('10:00');
            setMaxAppointmentValue('0');
        } else {
            notifyMessage("Current appointment number should be grater than Zero", '2');
        }
    }

    const createSession = () => {
        const session = {
            chId: "62c0b0d10ae48667baa01a30",
            dctId: dctId,
            date: convertDateObjectToStringDate(dateValue),
            maxApts: maxAppointmentValue,
            strTime: timeValue
        }

        setIsLoading(true);

        sendCreateSessionReq({
            variables: {
                session: session
            }, fetchPolicy: "no-cache"
        }).then(res => {
            if (res.data.createSession.statusCode === "E0004") {
                notifyMessage("Doctor Id or Channel Center Id is not Valid", '2');
            } else if (res.data.createSession.statusCode === "E0009") {
                notifyMessage("Sorry. Can't create the session. Doctor already has a session on that time", '2');
            } else {
                store.dispatch(doctorActions.addNewSessionToDoctorSessionList(res.data.createSession.payload));
                notifyMessage("Session has been added successfully", '1');
            }
        }).catch(() => {
            notifyMessage("Something went wrong", '3');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const updateSession = () => {
        const session = {
            strTime: timeValue,
            date: convertDateObjectToStringDate(dateValue),
            maxApts: maxAppointmentValue
        }

        setIsLoading(true);

        sendUpdateSessionReq({
            variables: {
                sessionId: isEdit.id,
                session: session
            }, fetchPolicy: "no-cache"
        }).then(res => {
            if (res.data.updateSession.statusCode === "E0004") {
                notifyMessage("Session could not be found", '2');
            } else {
                store.dispatch(doctorActions.updateSessionOfDoctorSessionList(res.data.updateSession.payload));
                notifyMessage("Session has been updated successfully", '1');
            }
        }).catch((e) => {
            console.log(e)
            notifyMessage("Something went wrong", '3');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const deleteSlot = (id) => {
        setIsLoading(true);

        sendDeleteSessionReq({
            variables: {
                sessionId: id
            }, fetchPolicy: "no-cache"
        }).then(res => {
            if (res.data.deleteSession.statusCode === "E0001") {
                notifyMessage("Session could not be found", '2');
            } else {
                console.log('lllll-',id);
                store.dispatch(doctorActions.deleteSessionFromDoctorSessionList(id));
                notifyMessage("Session has been deleted successfully", '1');
            }
        }).catch(() => {
            notifyMessage("Something went wrong", '3');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const renderScheduleList = () => {
        let row = [];
        if(doctorProfile?.sessionsList?.length>0){
            doctorProfile?.sessionsList?.map((item, key) => {
                row.push(
                    <div key={key} className='shedule-card'>
                        <div className='details'>
                            <div className='date'>{item.date}</div>
                            <div className='time'>{item.time}</div>
                            <div className='appontments'>
                                <div className='appontments-title'>
                                    {'Appointments'}
                                </div>
                                <div className='appontments-number'
                                    style={item.appointments >= item.maximumAppointments ? {color: '#f70000'} : {color: '#02b002'}}>
                                    {item.appointments.toString().padStart(2, "0")}
                                    <span style={{
                                        fontWeight: '400px',
                                        fontSize: '0.6rem'
                                    }}>/{item.maximumAppointments.toString().padStart(2, "0")}</span>
                                </div>
                            </div>
                        </div>
                        <div className='buttons'>
                            <Image className='btn-edit' onClick={() => editSlot(item.id)} src={EditBtn}
                                style={{height: '30px', margin: '0 5px'}}/>
                            <Image className='btn-edit' onClick={() => deleteSlot(item.id)} src={DeleteBtn}
                                style={{height: '30px', margin: '0 5px'}}/>
                        </div>
                    </div>
                );
            })
        }else{
            row.push(<div className='error-message' >{'Data Not Available'}</div>)
        }

        return row;
    }

    return (
        <div className='dct-time-sch'>
            {(loading || isLoading) && <Spinner isOverLay={true}/>}
            <div className='center-card'>
                <div className='profile-details'>
                    <Image className='dct-Profile-Picture' src={doctorProfile?.prfImgUrl} fluid={true}
                           alt='profile'/>
                    <div className='dct-name'>Dr. {doctorProfile?.disName}</div>
                    <div className='dct-specialization'>{doctorProfile?.spec}</div>
                </div>
                <div className='schedule-details'>
                    <div className='title'>Time Schedule</div>
                    <div className='schedule-list'>
                        {renderScheduleList()}
                    </div>
                    <div className='add-time-slot'>
                        <div className='col1'>
                            <DatePicker onChange={setDateValue} value={dateValue} className='date-picker'
                                        clearIcon={null} format="dd/MM/yyyy"
                                        calendarIcon={<Image className='calander-icon' src={CalendarIcon}/>}
                            />
                            <TimePicker onChange={setTimeValue} value={timeValue} clearIcon={null} clockIcon={null} disableClock={true}
                                        className='time-picker'/>
                            <Form.Control
                                type="text" className='add-appoinment-number' maxLength={"2"}
                                onChange={(e) => {
                                    if (/^\d+$/.test(e.target.value)) {
                                        setMaxAppointmentValue(parseInt(e.target.value));
                                    } else {
                                        if (!e.target.value.length || e.target.value.length < maxAppointmentValue.length) {
                                            setMaxAppointmentValue('0');
                                        }
                                    }
                                }}
                                value={maxAppointmentValue}
                            />
                        </div>
                        <div className='col2'>
                            <Button className='save-btn' variant="secondary"
                                    onClick={() => saveSlot()}>{isEdit.bool ? 'Save' : 'Add New'}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorTimeSchedule;