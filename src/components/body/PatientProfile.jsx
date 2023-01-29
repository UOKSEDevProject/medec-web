import React, {useState} from 'react';
import {Col, Image, Row} from 'react-bootstrap';
import {userProfile} from '../../temp/data-store';
import defaultProfilePicture from '../../assets/images/defaultprofilepic.png'
import EditProfileModal from "./editProfileModal";
import {stringFormatter} from "../../utils/formUtility";
import camera from "../../assets/images/camera.png";
import {useHistory} from "react-router-dom";

function PatientProfile(props) {
    const [modalShow, setModalShow] = useState(false);
    const history = useHistory();
    const [profile, setProfile] = useState(userProfile);

    const openMedicalHistory = () => {
        history.push("/med-his")
    }

    const updateProfile = (profile) => {
        setModalShow(false);
        setProfile(profile);
    }

    const openModal = () => {
        setModalShow(true);
    }

    const closeModal = () => {
        setModalShow(false);
    }

    function dpUpload() {
        //image upload
    }

    return (
        <div className='patient-profile'>
            <div className='patient-profile-body'>
                <div className='patient-profile-image-section'>
                    <Image
                        className='patient-profile-profilePicture'
                        src={profile.profilePicture ? profile.profilePicture : defaultProfilePicture}
                        roundedCircle={true}
                        alt='Profile'/>
                    <Image className='patient-profile-profilePicture-selectIcon' src={camera}
                           roundedCircle={true} onClick={dpUpload}/>
                    <div>
                        <Image className='patient-profile-qr' src={profile.QRCode} alt='QR'/>
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
                                <div>{profile.birthDate}</div>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className='patient-profile-details-labels' xs={12} md={6} lg={4}>Blood Group</Col>
                            <Col className='patient-profile-details' xs={6} md={3} lg={2}>
                                <div>{profile.bloodGroup}</div>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col className='patient-profile-details-labels' xs={12} md={6} lg={4}>Phone Number</Col>
                            <Col className='patient-profile-details' xs={12} md={6} lg={4}>
                                <div>{profile.country} {profile.phoneNumber}</div>
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
        </div>
    );
}

export default PatientProfile;