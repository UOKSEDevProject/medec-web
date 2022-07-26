import React, {useState} from "react";
import {Image} from "react-bootstrap";
import {ptList} from "../../temp/data-store";
import Drawer from "./Drawer";

const PatientList = () => {
    const [index, setIndex] = useState(1);
    const [toggle, setToggle] = useState(false);


    const onComplete = () => {
        index + 1 < 20 && setIndex((index) => (index = index + 1));
    };

    return (
        <div className="pt-container d-flex">
            <Drawer title="Appointments" items={ptList} index={index} setIndex={setIndex} toggle={toggle}
                    setToggle={setToggle}/>
            <div className="pt p-5 flex-grow-1">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div className="pt-content">
                        <h2 className="pt-number">
                            #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </h2>
                        <h1 className="pt-name">
                            {`${ptList[index]?.tittle}. ${ptList[index]?.firstName} ${ptList[index]?.lastName}`}
                        </h1>
                        <button className="button px-3 py-2" id="show-button" onClick={()=>setToggle(false)}>View All Appointments</button>
                    </div>
                    <Image
                        src="https://docs.google.com/uc?id=1Tey5rRf84gaJyR2e-fJJN_J015bAW-KN"
                        fluid={true}
                        className="pt-image"
                    />
                </div>
                <div className="pt-details my-4">
                    <div className="d-flex align-items-center mb-3">
                        <p className="pt-detail-label">Age</p>
                        <p className="pt-detail-value d-flex px-4 py-2">
                            {new Date(Date.now()).getFullYear() - new Date(ptList[index]?.birthDate).getFullYear()}
                        </p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <p className="pt-detail-label">Blood Group</p>
                        <p className="pt-detail-value d-flex px-4 py-2">
                            {ptList[index]?.bloodGroup}
                        </p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <p className="pt-detail-label">Phone Number</p>
                        <p className="pt-detail-value d-flex px-4 py-2 ">
                            {`${ptList[index]?.country} ${ptList[index]?.phoneNumber}`}
                        </p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <p className="pt-detail-label">Address</p>
                        <p className="pt-detail-value d-flex px-4 py-2 flex-grow-1">
                            {ptList[index]?.address}
                        </p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <p className="pt-detail-label">Description</p>
                        <p className="pt-detail-value d-flex px-4 py-2 flex-grow-1">
                            {ptList[index]?.description}
                        </p>
                    </div>
                </div>
                <div className="d-flex flex-wrap align-items-center justify-content-around">
                    <button className="button px-3 py-2">Add Prescription</button>
                    <button className="button px-3 py-2">View Medical History</button>
                    <button className="button px-3 py-2" onClick={() => onComplete()}>Complete</button>
                </div>
            </div>
        </div>
    );
};

export default PatientList;
