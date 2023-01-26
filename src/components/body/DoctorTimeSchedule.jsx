import {Image,Form, Button, Col, Row} from 'react-bootstrap';
import {doctorProfile} from '../../temp/data-store';
import EditBtn from '../../assets/images/icon/buttons/btn-edit.png';
import DeletetBtn from '../../assets/images/icon/buttons/btn-delete.png';
import CalanderIcon from '../../assets/images/icon/calander-icon.png'; 
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker'
import { useState } from 'react';


const DoctorTimeSchedule = () => {
    const [dateValue, setDateValue] = useState(new Date());
    const [timeValue, setTimeValue] = useState('10:00');
    const [maxAppointmentValue, setMaxAppointmentValue] = useState('0');
    
    const scheduleList = [
        {
            id: 1,
            time: '10.50pm',
            date: '2020/02/03',
            currentAppontments: 1,
            totalAppontments: 10

        },
        {
            id: 2,
            time: '10.50pm',
            date: '2020/02/03',
            currentAppontments: 10,
            totalAppontments: 10
        },
        {
            id: 3,
            time: '10.50pm',
            date: '2020/02/03',
            currentAppontments: 10,
            totalAppontments: 10
        },
        {
            id: 4,
            time: '11.50pm',
            date: '2020/02/03',
            currentAppontments: 10,
            totalAppontments: 10
        },
        {
            id: 5,
            time: '11.50pm',
            date: '2020/02/03',
            currentAppontments: 10,
            totalAppontments: 10
        },

    ]

    const editSlot = (id) =>{
        console.log(id)
    }
    const deleteSlot = (id) =>{
        console.log(id)
    }
    const saveSlot = () =>{
        console.log('save')
    }

    const renderScheduleList = () => {
        let row=[];
        scheduleList.map((item,key) => {
          row.push (
            <div key={key} className='shedule-card'>
                <div className='date'>{item.date}</div>
                <div className='time'>{item.time}</div>
                <div className='appontments' style={item.currentAppontments>=item.totalAppontments ? {color: '#f70000' }:{ color:'#02b002'}}>{item.currentAppontments}<span style={{ fontWeight:'400px',fontSize:'0.5rem'}}>/{item.totalAppontments}</span></div>
                <div>
                    <Image className='btn-edit' onClick={()=>editSlot(item.id)} src={EditBtn} style={{height: '30px', margin: '0 5px'}}/>
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
                        <DatePicker onChange={setDateValue} value={dateValue} className='date-picker'clearIcon={null} 
                            calendarIcon={<Image className='calander-icon' src={CalanderIcon} />}

                        />
                        <TimePicker onChange={setTimeValue} value={timeValue} clearIcon={null} className='time-picker' clockIcon={null} />
                        <Form.Control
                            type="text"className='add-appoinment-number' maxLength={"3"}
                            onChange={(e)=>{
                                console.log(e.target.value)
                                if(/^\d+$/.test(e.target.value)) {
                                    setMaxAppointmentValue(parseInt(e.target.value));
                                }else{
                                    console.log('ss',e.target.value)
                                    if(!e.target.value.length || e.target.value.length<maxAppointmentValue.length){
                                        setMaxAppointmentValue('0');
                                    }
                                }
                            }}
                            value={maxAppointmentValue}
                        />
                    </div>
                    <div className='col2'>
                        <Button className='save-btn' variant="secondary" onClick={()=>saveSlot()}>Save</Button>
                    </div>
                </div>
               </div>
            </div>
        </div>
    );
}
export default DoctorTimeSchedule;