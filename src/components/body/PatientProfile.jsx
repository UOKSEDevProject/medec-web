import React, {useEffect, useRef, useState} from 'react';
import {Col, Image, Row} from 'react-bootstrap';
import defaultProfilePicture from '../../assets/images/defaultprofilepic.png'
import EditProfileModal from "./editProfileModal";
import {stringFormatter} from "../../utils/formUtility";
import Spinner from "./Spinner";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import qrcode from 'qrcode-generator'

function PatientProfile(props) {
    const userProfile = useSelector(state => state.userDs.PatientProfileData);
    const [usrId,setUsrId] = useState(sessionStorage.getItem('usrId'));
    const [modalShow, setModalShow] = useState(false);
    const history = useHistory();
    const [profile, setProfile] = useState(null);
    const ref = useRef(0);

    useEffect(() => {
        if(usrId === null || usrId === ''){
            history.push("/login");
        }
    },[]);

    useEffect(() => {
            const typeNumber = 19;
            const errorCorrectionLevel = 'H';
            const qr = qrcode(typeNumber, errorCorrectionLevel);
            if(usrId){
                qr.addData(usrId);
                qr.make();
                if(document.getElementById('qrPlaceholder')){
                    document.getElementById('qrPlaceholder').innerHTML = qr.createImgTag();
                };
            }
    },[profile]);

    useEffect(()=>{
        if(userProfile){
            setProfile({
                profilePicture: userProfile.profileImgSrc,
                birthDate: userProfile.dob,
                bloodGroup: userProfile.bldGrp,
                address: userProfile.address,
                disName: userProfile.disName,
                phoneNumber: userProfile.cntNo,
                description: userProfile.des,
            });
        }
    },[userProfile])

    const openMedicalHistory = () => {
        history.push(`/med-his/${sessionStorage.getItem("usrId")}`)
    }

    const updateProfile = (profile) => {
        setModalShow(false);
        setProfile(profile);
        //todo update the patient profile
    }

    const openModal = () => {
        setModalShow(true);
    }

    const closeModal = () => {
        setModalShow(false);
    }

    return (
        profile?
        <div className='patient-profile'>
            <div className='patient-profile-body'>
                <div className='patient-profile-image-section'>
                    <Image
                        className='patient-profile-profilePicture'
                        src={profile.profilePicture ? profile.profilePicture : defaultProfilePicture}
                        roundedCircle={true}
                        alt='Profile'/>
                    <div>
                        <div id='qrPlaceholder' ref={ref} className='patient-profile-qr'/>
                        <div className='patient-profile-qrTopic'>MY QR</div>
                    </div>
                </div>
                <div className='patient-profile-detailsSection'>
                    <div className='patient-profile-nameContainer'>
                        <div

                            className='patient-profile-name'>Hi,  {stringFormatter(profile.disName)}</div>
                        <button className='patient-profile-historyBtn' onClick={openMedicalHistory}>Medical
                            History</button>
                    </div>
                    <div className='patient-profile-form'>
                        <Row className="mb-3">
                            <Col className='patient-profile-details-labels' xs={12} md={6} lg={4}>Date Of Birth</Col>
                            <Col className='patient-profile-details' xs={12} md={6} lg={4}>
                                <div>{profile?.birthDate}</div>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className='patient-profile-details-labels' xs={12} md={6} lg={4}>Blood Group</Col>
                            <Col className='patient-profile-details' xs={6} md={3} lg={2}>
                                <div>{profile?.bloodGroup}</div>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className='patient-profile-details-labels' xs={12} md={6} lg={4}>Phone Number</Col>
                            <Col className='patient-profile-details' xs={12} md={6} lg={4}>
                                <div>{profile.country} {profile?.phoneNumber}</div>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className='patient-profile-details-labels' xs={12} md={6} lg={4}>Address</Col>
                            <Col className='patient-profile-details patient-profile-address' xs={18} md={6} lg={7}>
                                <div>{profile.address}</div>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className='patient-profile-details-labels' xs={12} md={6} lg={4}>Description</Col>
                            <Col className='patient-profile-details patient-profile-description' xs={12} md={6} lg={7}>
                                <div>{profile.description}</div>
                            </Col>
                        </Row>
                        <div className='modalBtn'>
                            <button className='patient-profile-modal-popup-btn' onClick={openModal}>Edit</button>
                        </div>
                        <EditProfileModal
                            profile={profile}
                            visibility={modalShow}
                            closeModal={closeModal}
                            updateProfile={(profile) => {updateProfile(profile)}}/>
                    </div>
                </div>
            </div>
        </div>:
        <Spinner />
    );
}

export default PatientProfile;