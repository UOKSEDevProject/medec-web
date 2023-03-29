import React, {useEffect, useState} from "react";
import {Image} from "react-bootstrap";
import Drawer from "./Drawer";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import Spinner from "./Spinner";
import {doctorActions} from "../../data-store/actions/doctor-actions";
import store from "../../data-store/reducer/root-reducer";
import {useSelector} from "react-redux";
import mutations from "../../graphql/mutations";
import {notifyMessage} from "../../utils/notification";
import {getAge} from "../../utils/commonFunctions";


const addPatientListToStore = (data) => {
    store.dispatch(doctorActions.addPatientList(data.getPatientList.payload));
}

const PatientList = () => {
    const sessionId = useParams();
    const [isShow, setIsShow] = useState(true);
    const { search } = useLocation()
    let query = React.useMemo(() => new URLSearchParams(search), [search]);
    const lastIndex = parseInt(query.get('index'));
    const [index, setIndex] = useState(lastIndex ? lastIndex: 0);
    const [toggle, setToggle] = useState(false);
    const history = useHistory();
    const {loading} = useQuery(queries.getPatientList, {
        onCompleted: addPatientListToStore,
        variables: {sessionId: sessionId.sessionId}
    });
    const patientList = useSelector(state => state.doctorDS.patientList);
    const [patientsList, setPatientsList] = useState([]);
    const [sendSessionStatusUpdate] = useMutation(mutations.UpdateSessionStatus);

    const onComplete = () => {
      patientsList.length - 1 === index
            ? sessionUpdate('finished')
            : sessionUpdate('ongoing');
        index + 1 < patientsList.length && setIndex((index) => (index = index + 1))
    };

    const sessionUpdate = (status) => {
        sendSessionStatusUpdate({
            variables: {
                sessionId: sessionId.sessionId,
                status: status,
                curAptNo: index + 1,
                aptId: patientsList[index].aptId
            }, fetchPolicy: "no-cache"
        }).then(r => {
            if (status === 'active' && r.data.updateSessionStatus.statusCode === 'S0000') {
                setIsShow(false);
                notifyMessage("Session Started", '1');
            }
            if (status === 'finished' && r.data.updateSessionStatus.statusCode === 'S0000') {
                notifyMessage("Session completed", '1');
            }
        })
    }
    useEffect(() => {
        if (patientList) {
            setPatientsList(patientList);
            console.log(patientsList)
        }
    }, [patientList]);

    return (
        <div className="pt-container d-flex">
            {loading && <Spinner isOverLay={true}/>}
            <Drawer title="Appointments" items={patientsList} index={index} setIndex={setIndex} toggle={toggle}
                    setToggle={setToggle}/>
            <div className="pt p-5 flex-grow-1">
                <button className="button px-3 py-2" hidden={index !== 0 || !isShow} onClick={() => sessionUpdate('active')}>Start</button>
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div className="pt-content">
                        <h2 className="pt-number">
                            #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </h2>
                        <h1 className="pt-name">
                            {patientsList[index]?.name}
                        </h1>
                        <button className="button px-3 py-2" id="show-button" onClick={() => setToggle(false)}>View All
                            Appointments
                        </button>
                    </div>
                    <Image
                        src={patientsList[index]?.prfImgUrl}
                        fluid={true}
                        roundedCircle
                        className="pt-image"
                    />
                </div>
                <div className="pt-details my-4">
                    <div className="d-flex align-items-center mb-3">
                        <p className="pt-detail-label">Age</p>
                        <p className="pt-detail-value d-flex px-4 py-2">
                            {patientsList[index]?.birthDate && getAge(patientsList[index]?.birthDate)}
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
                        <p className="pt-detail-value d-flex px-4 py-2 " style={{minWidth: '200px'}}>
                            {patientsList[index]?.phoneNumber}
                        </p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <p className="pt-detail-label">Address</p>
                        <p className="pt-detail-value d-flex px-4 py-2 flex-grow-1" style={{minHeight: '100px'}}>
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
                            onClick={() => history.push(`/add-pre/${patientsList[index]?._id}/${sessionId.sessionId}/${index}`)}>Add
                        Prescription
                    </button>
                    <button className="button px-3 py-2"
                            onClick={() => history.push(`/med-his/${patientsList[index]?._id}`)}>View
                        Medical History
                    </button>
                    <button className="button px-3 py-2" onClick={() => onComplete()}>{patientsList.length - 1 === index ?'Complete':'Next'}</button>
                </div>
            </div>
        </div>
    );
};

export default PatientList;
