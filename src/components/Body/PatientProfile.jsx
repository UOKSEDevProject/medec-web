import React, {useState} from 'react';
import {Button, Col, Form, Image, Row} from 'react-bootstrap';
import {userProfile} from '../../temp/data-store';
import {bloodGroups} from "../../const/const";
import defaultProfilePicture from '../../assets/images/defaultprofilepic.png'
import EditProfileModal from "./editProfileModal";

function PatientProfile(props) {
    const [modalShow, setModalShow] = useState(false);

    const [profile, setProfile] = useState(userProfile);

    const onChange = (e) => {
      setProfile({...profile,[e.target.name]:e.target.value})
    }

    return (
        <div className='patient-profile'>
            <div className='patient-profile-body'>
                <div className='patient-profile-image-section'>
                    <Image
                        className='patient-profile-profilePicture'
                        src={profile.profilePicture? profile.profilePicture : defaultProfilePicture }
                        roundedCircle={true}
                        alt='Profile'/>
                    <Image className='patient-profile-qr' src={profile.QRCode} alt='QR'/>
                    <div className='patient-profile-qrTopic'>MY QR</div>
                </div>
                <div className='patient-profile-detailsSection'>
                    <div className='patient-profile-nameContainer'>
                        <div
                            className='patient-profile-name'>{profile.tittle}. {profile.firstName} {profile.lastName}</div>
                        <Button className='patient-profile-historyBtn'>Medical History</Button>
                    </div>
                    <div className='patient-profile-form'>
                       <Row className="mb-3">
                           <Col className='patient-profile-details-labels' sm={3}>Date Of Birth</Col>
                           <Col className='patient-profile-details' sm={3}><div>{profile.birthDate}</div></Col>
                       </Row>
                        <Row className="mb-3">
                            <Col className='patient-profile-details-labels' sm={3}>Blood Group</Col>
                            <Col className='patient-profile-details' sm={1}><div>{profile.bloodGroup}</div></Col>
                        </Row>
                            <Row className="mb-3">
                                <Col className='patient-profile-details-labels' sm={3}>phone Number</Col>
                                <Col className='patient-profile-details' sm={3}><div>{profile.phoneNumber}</div></Col>
                            </Row>
                            <Row  className="mb-3">
                                <Col className='patient-profile-details-labels patient-profile-address' sm={3}>Address</Col>
                                <Col className='patient-profile-details'><div>{profile.address}</div></Col>
                            </Row>
                            <Row className="mb-3">
                                <Col className='patient-profile-details-labels patient-profile-description' sm={3}>Description</Col>
                                <Col className='patient-profile-details'><div>{profile.description}</div></Col>
                            </Row>
                        <Button variant="primary"  onClick={()=>setModalShow(true)}>Edit</Button>
                        <EditProfileModal
                            profile={profile}
                            visibility={modalShow}
                            closeModal={()=> setModalShow(false)}
                            updateProfile={(profile)=>{setModalShow(false);setProfile(profile)}}/>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default PatientProfile;