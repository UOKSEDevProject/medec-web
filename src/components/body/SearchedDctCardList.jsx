import React, {useEffect, useState} from 'react';
import store from "../../data-store/reducer/root-reducer";
import {doctorActions} from "../../data-store/actions/doctor-actions";
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import {useSelector} from "react-redux";
import {Row} from "react-bootstrap";
import Spinner from "./Spinner";
import DataNotAvailable from "./DataNotAvailable";
import DctCard from "./DctCard";
import {useHistory} from "react-router-dom";

const addDoctorsToStore = (doctors) => {
    store.dispatch(doctorActions.addSearchList(doctors.getDoctors));
};

function SearchedDctCardList() {
    const {loading, error} = useQuery(queries.getDoctors, {onCompleted: addDoctorsToStore});
    const searchList = useSelector(state => state.doctorDS.searchList);
    const [doctors, setDoctors] = useState(undefined);
    const history = useHistory();

    const onDoctorClick = (props) => {
        history.push(`./dct-prf/${props.doctor._id}`)
    }

    useEffect(() => {
        if (searchList) {
            setDoctors(searchList);
        }
    }, [searchList]);

    return (
        <Row className='dct-list scroll-view'>
            {loading && <Spinner isOverLay={true}/>}
            {doctors && doctors.map((dr, index) => (
                <DctCard
                    key={index}
                    doctor={dr}
                    onDoctorClick={onDoctorClick}
                />
            ))}
            {doctors && doctors.length === 0 && <DataNotAvailable customMessage={'Data Not Available'}/>}
            {error && <DataNotAvailable customMessage={'Data Not Available'}/>}
        </Row>
    );
}

export default SearchedDctCardList;