import {Image,Form, Button,} from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker'
import { useState } from 'react';
import {doctorProfile} from '../../temp/data-store';
import EditBtn from '../../assets/images/icon/buttons/btn-edit.png';
import DeletetBtn from '../../assets/images/icon/buttons/btn-delete.png';
import CalanderIcon from '../../assets/images/icon/calander-icon.png'; 
import {notifyMessage} from '../../utils/notification';




const DoctorTimeSchedule = () => {
    const [dateValue, setDateValue] = useState(new Date());
    const [timeValue, setTimeValue] = useState('10:00');
    const [maxAppointmentValue, setMaxAppointmentValue] = useState('0');
    const [isEdit, setIsEdit] = useState({bool:false,id: null});
    
    const scheduleList = [
        {
            id: 1,
            date: 'Sat Jan 28 2023 11:00:15 GMT+0530',
            currentAppontments: 1,
            totalAppontments: 5

        },
        {
            id: 2,
            date: 'Sat Dec 1 2023 12:00:15 GMT+0530',
            currentAppontments: 10,
            totalAppontments: 10
        },
        {
            id: 3,
            date: 'Sat Jan 2 2023 1:00:15 GMT+0530',
            currentAppontments: 10,
            totalAppontments: 10
        },
        {
            id: 4,
            date: 'Sat Jan 3 2023 2:00:15 GMT+0530',
            currentAppontments: 10,
            totalAppontments: 10
        },
        {
            id: 5,
            date: 'Sat Jan 8 2023 11:30:15 GMT+0530',
            currentAppontments: 10,
            totalAppontments: 10
        },

    ]


    const editSlot = (id) =>{
     scheduleList.find((item)=>{
            if(item.id==id){
                setIsEdit({bool:true,id: id});
                setDateValue(new Date(item.date));
                setTimeValue(formatedTime(new Date(item.date),true));
                setMaxAppointmentValue(item.totalAppontments);
            }
        })   
    }

    const deleteSlot = (id) =>{
        console.log(id)
    }

    const saveSlot = () => {

        //make edited date
        let date = new Date(dateValue);
        date.setHours(timeValue.split(':')[0]);
        date.setMinutes(timeValue.split(':')[1]);

        //validation
        if(maxAppointmentValue>0){
            if(isEdit.bool){
                console.log('call the save API  :date-',date,'update id- ',isEdit.id);
            }else{
                console.log('call the save API  :date-',date);
            }

            //chaneg input fileds to initials
            setIsEdit({bool:false,id: null});
            setDateValue(new Date());
            setTimeValue('10:00');
            setMaxAppointmentValue('0');
        }else{
            notifyMessage("Current appointment number should be grater than Zero",'2');
        }
    }

    const formatedTime = (date,is24) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let strTime;

        if(is24){
            console.log(hours+':'+minutes);
            strTime = hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0");
        }else{
            let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            strTime = hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0") + ' ' + ampm;
        }

        return (strTime).trim();
    }

    const formatedDate = (date) => {
        let day = date.getDate().toString().padStart(2, "0");
        let month = (date.getMonth()+1).toString().padStart(2, "0");
        let year = date.getFullYear();
        var strDate = day+'/'+month+'/'+year;

        return (strDate);
    }

    const renderScheduleList = () => {
        let row=[];
        scheduleList.map((item,key) => {
            let date = new Date(item.date);
          row.push (
            <div key={key} className='shedule-card'>
                <div className='details'>
                    <div className='date'>{formatedDate(date)}</div>
                    <div className='time'>{formatedTime(date,false)}</div>
                    <div className='appontments'>
                        <div className='appontments-title'>
                            {'Appointments'}
                        </div>
                        <div className='appontments-number' style={item.currentAppontments>=item.totalAppontments ? {color: '#f70000' }:{ color:'#02b002'}}>
                            {item.currentAppontments.toString().padStart(2, "0")}
                            <span style={{ fontWeight:'400px',fontSize:'0.6rem'}}>/{item.totalAppontments.toString().padStart(2, "0")}</span>
                        </div>
                    </div>
                </div>                
                <div className='buttons'>
                    <Image className='btn-edit' onClick={() => editSlot(item.id)} src={EditBtn} style={{height: '30px', margin: '0 5px'}}/>
                    <Image className='btn-edit' onClick={()=>deleteSlot(item.id)} src={DeletetBtn} style={{height: '30px', margin: '0 5px'}}/>
                </div>
            </div>
          );
        })

        return row;
    }

    return (
        <div className='dct-time-sch'>
            <div className='center-card'>
               <div className='profile-details'>
                    <Image className='dct-Profile-Picture' src={doctorProfile.profilePicture} fluid={true} alt='profile'/>
                    <div className='dct-name'>Dr. {doctorProfile.firstName} {doctorProfile.lastName}</div>
                    <div className='dct-specialization'>{doctorProfile.specialization}</div>
               </div>
               <div className='schedule-details'>
                <div className='title'>Time Schedule</div>
                <div className='schedule-list'>
                    {renderScheduleList()}
                </div>
                <div className='add-time-slot'>
                    <div className='col1'>
                        <DatePicker onChange={setDateValue} value={dateValue} className='date-picker'clearIcon={null} format="dd/MM/yyyy"
                            calendarIcon={<Image className='calander-icon' src={CalanderIcon} />}
                        />
                        <TimePicker onChange={setTimeValue} value={timeValue} clearIcon={null} className='time-picker' clockIcon={null} />
                        <Form.Control
                            type="text"className='add-appoinment-number' maxLength={"2"}
                            onChange={(e)=>{
                                if(/^\d+$/.test(e.target.value)) {
                                    setMaxAppointmentValue(parseInt(e.target.value));
                                }else{
                                    if(!e.target.value.length || e.target.value.length<maxAppointmentValue.length){
                                        setMaxAppointmentValue('0');
                                    }
                                }
                            }}
                            value={maxAppointmentValue}
                        />
                    </div>
                    <div className='col2'>
                        <Button className='save-btn' variant="secondary" onClick={()=>saveSlot()}>{isEdit.bool? 'Save' : 'Add New'}</Button>
                    </div>
                </div>
               </div>
            </div>
        </div>
    );
}
export default DoctorTimeSchedule;