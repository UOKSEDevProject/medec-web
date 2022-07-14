import {Image} from 'react-bootstrap';
import {manualAppointmentDoctorProfile} from '../../temp/data-store';
import Session from "./Session";

const ManualAppointmentDoctorProfile = () => {
    return (
        <div className='dct-profile'>
            <div className='dct-profile-body align-items-center'>
                <div className='dct-profile-details'>
                    <Image className='dct-Profile-Picture' src={manualAppointmentDoctorProfile?.profilePicture}
                           fluid={true} alt='profile'/>
                    <div
                        className='dct-name'>Dr. {manualAppointmentDoctorProfile?.firstName} {manualAppointmentDoctorProfile?.lastName}</div>
                    <div className='dct-specialization'>{manualAppointmentDoctorProfile?.specialization}</div>
                </div>
                <div className='justify-content-center align-items-center m-5'>
                    {manualAppointmentDoctorProfile?.sessionList?.map((item, index) => (
                        <Session
                            key={index}
                            date={item.date}
                            time={item.time}
                            appointments={item.appointments}
                            maximumAppointments={item.maximumAppointments}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ManualAppointmentDoctorProfile;