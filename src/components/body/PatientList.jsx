import React, {useRef, useState} from "react";
import {Col, Row, Offcanvas, Button, Container, Image} from "react-bootstrap";
import {ptList} from "../../temp/data-store";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

const PatientList = (props) => {
    const [index, setIndex] = useState(1);

    const onComplete = () => {
        index + 1 < 20 && setIndex((index) => (index = index + 1));
    };

    const [isExpanded, setIsExpanded] = useState(false);
    const tabbar = useRef();

    const onExpanding = () => {
        tabbar.current.style.transition = "transform ease-in-out 0.8s";
        tabbar.current.style.transform = `translateX(${-((tabbar.current.clientWidth / 11.7) * 10)}px)`;
        setIsExpanded(true);
    };

    const onUnexpanding = () => {
        tabbar.current.style.transition = "transform ease-in-out 0.8s";
        tabbar.current.style.transform = `translateX(${0}px)`;
        setIsExpanded(false);
    };

    return (
        <div className="d-flex justify-content-between">
            <div className="ptlist-left">
                <h2 className="ptlist-left-title p-3">Appointments</h2>
                <div className="pt-tab-container">
                    {ptList?.map((pt, idx) => (
                        <div className="pt-tab px-3 py-3 d-flex align-items-center"
                             id={idx === index ? "selected" : "unselected"}
                             onClick={() => setIndex(idx)}>
                            <p className="pt-tab-number">
                                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                            </p>
                            <p className="flex-grow-1">{`${pt?.tittle}. ${pt?.firstName} ${pt?.lastName}`}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="ptlist-right p-5">
                <div className="d-flex justify-content-around align-items-center">
                    <div className="ptlist-right-left">
                        <h2 className="pt-number">
                            #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </h2>
                        <h1 className="pt-name">
                            {`${ptList[index]?.tittle}. ${ptList[index]?.firstName} ${ptList[index]?.lastName}`}
                        </h1>
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
                <div className="d-flex align-items-center justify-content-around">
                    <button className="button px-3 py-2">Add Prescription</button>
                    <button className="button px-3 py-2">View Medical History</button>
                    <button className="button px-3 py-2" onClick={() => onComplete()}>Complete</button>
                </div>
            </div>
        </div>
    );
};

export default PatientList;
