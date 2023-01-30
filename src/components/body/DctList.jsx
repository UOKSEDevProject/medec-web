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

const addDoctorsToStore = (doctors) => {
    store.dispatch(doctorActions.addSearchList(doctors.getDoctors));
};

const DctList = () => {
    const {loading, error} = useQuery(queries.getDoctors, {onCompleted: addDoctorsToStore});
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
                    mediCenter={dr.mediCenter}
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