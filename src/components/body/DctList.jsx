import {Row} from 'react-bootstrap';
import Doctor from './Doctor';
import {memo, useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import store from "../../data-store/reducer/root-reducer";
import {doctorActions} from "../../data-store/actions/doctor-actions";
import Spinner from "./Spinner";
import {useSelector} from "react-redux";
import DataNotAvailable from "./DataNotAvailable";
import {configuration} from "../../config";
import {component} from "../../constants/constants";

const addDoctorsToStore = (doctors) => {
    console.log(doctors);
    configuration.component === component.user?
         store.dispatch(doctorActions.addSearchListWithStatus(doctors.getAvailableDoctors))

        : store.dispatch(doctorActions.addSearchList(doctors.getDoctorList.payload));
};

const DctList = () => {
    const userId = useSelector(state => state.userDs.usrId);
    const {loading, error} = useQuery(configuration.component === component.user? queries.getAvailableDoctors
        :queries.getDoctorList, {onCompleted: addDoctorsToStore,
        variables: {
            chId: userId,
        }
    });
    const searchList = useSelector(state => state.doctorDS.searchList);
    const [doctors, setDoctors] = useState(undefined);

    useEffect(() => {
        if (searchList) {
            setDoctors(searchList);
        }
    }, [searchList]);

    return (
        <Row className='dct-list'>
            {loading && <Spinner isOverLay={true}/>}
            {doctors && doctors.map((dr, index) => (
                <Doctor
                    key={index}
                    id={dr._id}
                    disName={dr.disName}
                    specialization={dr.specialization}
                    status={dr.status}
                    imageSrc={dr.imageSrc}
                    no={index}
                />
            ))}
            {doctors && doctors.length === 0 && <DataNotAvailable customMessage={'Data Not Available'}/>}
            {error && <DataNotAvailable customMessage={'Data Not Available'}/>}
        </Row>
    );
};

export default memo(DctList);