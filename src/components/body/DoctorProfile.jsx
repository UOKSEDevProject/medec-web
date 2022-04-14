import {Image} from 'react-bootstrap';
import {doctorProfile} from '../../temp/data-store';
import SessionCard from "./SessionCard";

const DoctorProfile = () => {
    return (
        <div className='dct-profile'>
            <div className='dct-profile-body'>
                <div className='dct-profile-details'>
                    <Image className='dct-Profile-Picture' src={doctorProfile.profilePicture} fluid={true} alt='profile'/>
                    <div className='dct-name'>Dr. {doctorProfile.firstName} {doctorProfile.lastName}</div>
                    <div className='dct-specialization'>{doctorProfile.specialization}</div>
                </div>
                <div className='dct-profile-session-list'>
                    {doctorProfile.sessions.map((session,index)=>(
                        <SessionCard
                            key={index}
                            hospitalName={session.hospitalName}
                            sessionList={session.sessionList}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default DoctorProfile;