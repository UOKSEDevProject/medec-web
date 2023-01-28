import {Image} from 'react-bootstrap';
import {doctorProfile} from '../../temp/data-store';
import SessionCard from "./SessionCard";
import store from "../../data-store/reducer/root-reducer";
import {doctorActions} from "../../data-store/actions/doctor-actions";
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {configuration} from "../../config";

const addDoctorSessionListToStore = (sessionList) => {
    store.dispatch(doctorActions.addDoctorSessionList(sessionList.getDoctorSessionList))
}

const DoctorProfile = () => {
    const {loading, error} = useQuery(queries.getDoctorProfile, {onCompleted: addDoctorSessionListToStore, variables: { getDoctorSessionListId : "MBBS230943B"}});
    const doctorProfile = useSelector(state => state.doctorDS.sessionList);
    const [doctor, setDoctor] = useState(undefined);

    useEffect(() => {
        if (doctorProfile) {
            setDoctor(doctorProfile);
        }
    }, [doctorProfile]);

    return (
        <div className='dct-profile'>
            <div className='dct-profile-body'>
                <div className='dct-profile-details'>
                    <Image className='dct-Profile-Picture' src={doctor?.prfImgUrl} fluid={true} alt='profile'/>
                    <div className='dct-name'>Dr. {doctor?.disName}</div>
                    <div className='dct-specialization'>{doctor?.spec}</div>
                </div>
                <div className='dct-profile-session-list'>
                    {doctor?.channelCenters?.map((session,index)=>(
                        <SessionCard
                            key={index}
                            hospitalName={session.hospitalName}
                            sessionList={session.sessionsList}
                            buttonText={configuration.component === 'DOCTOR'  ? 'View' : 'Chanel' }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default DoctorProfile;