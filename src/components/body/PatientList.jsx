import React, {useEffect, useState} from "react";
import {Image} from "react-bootstrap";
import Drawer from "./Drawer";
import {useHistory, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import Spinner from "./Spinner";
import {doctorActions} from "../../data-store/actions/doctor-actions";
import store from "../../data-store/reducer/root-reducer";
import {useSelector} from "react-redux";

const addPatientListToStore = (data) => {
    store.dispatch(doctorActions.addPatientList(data.getPatientList.payload));
}

const PatientList = () => {
    const {sessionId} = useParams();
    const [index, setIndex] = useState(0);
    const [toggle, setToggle] = useState(false);
    const history = useHistory();
    const {loading} = useQuery(queries.getPatientList, {
        onCompleted: addPatientListToStore,
        variables: {sessionId: sessionId}
    });
    const patientList = useSelector(state => state.doctorDS.patientList);
    const [patientsList, setPatientsList] = useState([]);

    const onComplete = () => {
        index + 1 < 20 && setIndex((index) => (index = index + 1));
    };

    useEffect(() => {
        if (patientList) {
            setPatientsList(patientList);
            setIndex(1);
        }
    }, [patientList]);

    return (
        <div className="pt-container d-flex">
            {loading && <Spinner isOverLay={true}/>}
            <Drawer title="Appointments" items={patientsList} index={index} setIndex={setIndex} toggle={toggle}
                    setToggle={setToggle}/>
            <div className="pt p-5 flex-grow-1">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div className="pt-content">
                        <h2 className="pt-number">
                            #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </h2>
                        <h1 className="pt-name">
                            {patientsList[index]?.disName}
                        </h1>
                        <button className="button px-3 py-2" id="show-button" onClick={() => setToggle(false)}>View All
                            Appointments
                        </button>
                    </div>
                    <Image
                        src={patientsList[index]?.prfImgUrl}
                        fluid={true}
                        className="pt-image"
                    />
                </div>
                <div className="pt-details my-4">
                    <div className="d-flex align-items-center mb-3">
                        <p className="pt-detail-label">Age</p>
                        <p className="pt-detail-value d-flex px-4 py-2">
                            {new Date(Date.now()).getFullYear() - new Date(patientsList[index]?.birthDate).getFullYear()}
                        </p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <p className="pt-detail-label">Blood Group</p>
                        <p className="pt-detail-value d-flex px-4 py-2">
                            {patientsList[index]?.bloodGroup}
                        </p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <p className="pt-detail-label">Phone Number</p>
                        <p className="pt-detail-value d-flex px-4 py-2 ">
                            {patientsList[index]?.phoneNumber}
                        </p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <p className="pt-detail-label">Address</p>
                        <p className="pt-detail-value d-flex px-4 py-2 flex-grow-1">
                            {patientsList[index]?.address}
                        </p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <p className="pt-detail-label">Description</p>
                        <p className="pt-detail-value d-flex px-4 py-2 flex-grow-1">
                            {patientsList[index]?.description}
                        </p>
                    </div>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-around">
                    <button className="button px-3 py-2"
                            onClick={() => history.push(`/add-pre/${patientsList[index]?._id}/${sessionId}/${index}`)}>Add
                        Prescription
                    </button>
                    <button className="button px-3 py-2"
                            onClick={() => history.push(`/med-his/${patientsList[index]?._id}`)}>View
                        Medical History
                    </button>
                    <button className="button px-3 py-2" onClick={() => onComplete()}>Complete</button>
                </div>
            </div>
        </div>
    );
};

export default PatientList;
