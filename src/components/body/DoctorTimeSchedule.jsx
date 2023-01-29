import {useState} from 'react';
import {useParams} from "react-router-dom";
import {Image, Form, Button} from 'react-bootstrap';
import EditBtn from '../../assets/images/icon/buttons/btn-edit.png';
import DeleteBtn from '../../assets/images/icon/buttons/btn-delete.png';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import store from "../../data-store/reducer/root-reducer";
import {doctorActions} from "../../data-store/actions/doctor-actions";
import Spinner from "./Spinner";
import {useSelector} from "react-redux";
import CalendarIcon from '../../assets/images/icon/calander-icon.png';
import {notifyMessage} from '../../utils/notification';

const addDoctorSessionListToStore = (data) => {
    store.dispatch(doctorActions.addDoctorSessionList(data.getDoctorSessionListForChannelCenter))
}

const DoctorTimeSchedule = () => {
    const {dctId} = useParams();
    const {loading} = useQuery(queries.getDoctorSessionListsForChannelCenter, {
        onCompleted: addDoctorSessionListToStore,
        variables: {
            getDoctorSessionListForChannelCenterId: dctId,
            chId: "62c0b0d10ae48667baa01a30"
        }
    });
    const doctorProfile = useSelector(state => state.doctorDS.sessionList);
    const [dateValue, setDateValue] = useState(new Date());
    const [timeValue, setTimeValue] = useState('10:00');
    const [maxAppointmentValue, setMaxAppointmentValue] = useState('0');
    const [isEdit, setIsEdit] = useState({bool: false, id: null});

    const editSlot = (id) => {
        doctorProfile?.sessionsList?.find((item) => {
            if (item.id === id) {
                setIsEdit({bool: true, id: id});
                setDateValue(item.date);
                setTimeValue(item.time, true);
                setMaxAppointmentValue(item.appointments);
            }
        })
    }

    const deleteSlot = (id) => {
        console.log(id)
    }

    const saveSlot = () => {

        //make edited date
        let date = new Date(dateValue);
        date.setHours(timeValue.split(':')[0]);
        date.setMinutes(timeValue.split(':')[1]);

        //validation
        if (maxAppointmentValue > 0) {
            if (isEdit.bool) {
                console.log('call the save API  :date-', date, 'update id- ', isEdit.id);
            } else {
                console.log('call the save API  :date-', date);
            }

            //chaneg input fileds to initials
            setIsEdit({bool: false, id: null});
            setDateValue(new Date());
            setTimeValue('10:00');
            setMaxAppointmentValue('0');
        } else {
            notifyMessage("Current appointment number should be grater than Zero", '2');
        }
    }

    const formatedTime = (date, is24) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let strTime;

        if (is24) {
            console.log(hours + ':' + minutes);
            strTime = hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0");
        } else {
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            strTime = hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0") + ' ' + ampm;
        }

        return (strTime).trim();
    }

    const formatedDate = (date) => {
        let day = date.getDate().toString().padStart(2, "0");
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let year = date.getFullYear();
        var strDate = day + '/' + month + '/' + year;

        return (strDate);
    }

    const renderScheduleList = () => {
        let row = [];

        doctorProfile?.sessionsList?.map((item, key) => {
            let date = new Date(item.date);
            row.push(
                <div key={key} className='shedule-card'>
                    <div className='details'>
                        <div className='date'>{formatedDate(date)}</div>
                        <div className='time'>{formatedTime(date, false)}</div>
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

        return row;
    }

    return (
        <div className='dct-time-sch'>
            {loading && <Spinner isOverLay={true}/>}
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
                            <TimePicker onChange={setTimeValue} value={timeValue} clearIcon={null}
                                        className='time-picker' clockIcon={null}/>
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