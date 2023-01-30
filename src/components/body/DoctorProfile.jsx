import {Image} from 'react-bootstrap';
import SessionCard from "./SessionCard";
import store from "../../data-store/reducer/root-reducer";
import {doctorActions} from "../../data-store/actions/doctor-actions";
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {configuration} from "../../config";
import {useParams} from "react-router-dom";
import Spinner from "./Spinner";
import DataNotAvailable from "./DataNotAvailable";

const addDoctorSessionListToStore = (sessionList) => {
    store.dispatch(doctorActions.addDoctorSessionList(sessionList.getDoctorSessionList))
}

const DoctorProfile = () => {
    const {dctId} = useParams();
    const {loading} = useQuery(queries.getDoctorProfile, {
        onCompleted: addDoctorSessionListToStore,
        variables: {getDoctorSessionListId: dctId}
    });
    const doctorProfile = useSelector(state => state.doctorDS.sessionList);
    const [doctor, setDoctor] = useState(undefined);

    useEffect(() => {
        if (doctorProfile) {
            setDoctor(doctorProfile);
        }
    }, [doctorProfile]);

    return (
        <div className='dct-profile'>
            {loading && <Spinner isOverLay={true}/>}
            <div className='dct-profile-body'>
                <div className='dct-profile-details'>
                    <Image className='dct-Profile-Picture' src={doctor?.prfImgUrl} fluid={true} alt='profile'/>
                    <div className='dct-name'>Dr. {doctor?.disName}</div>
                    <div className='dct-specialization'>{doctor?.spec}</div>
                </div>
                <div className='dct-profile-session-list'>
                    {doctor && doctor?.channelCenters.length === 0 && <DataNotAvailable customMessage={'Sessions Data Not Available'}/>}
                    {doctor?.channelCenters?.map((session,index)=>(
                        <SessionCard
                            key={index}
                            hospitalName={session.hospitalName}
                            sessionList={session.sessionsList}
                            buttonText={configuration.component === 'DOCTOR' ? 'View' : 'Chanel' }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default DoctorProfile;