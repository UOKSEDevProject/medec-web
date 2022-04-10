import React, {useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {bloodGroups, tittle} from "../../const/const";

function EditProfileModal(props) {

    const [profile, setProfile] = useState(props.profile);

    const onChange = (e) => {
        setProfile({...profile,[e.target.name]:e.target.value})
    }

    return (
            <Modal show={props.visibility} onHide={props.closeModal}  backdrop="static"  size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>
                                Tittle
                            </Form.Label>
                            <Col sm={2}>
                                <Form.Select
                                    id='input'
                                    defaultValue={profile.tittle}
                                    name='tittle'
                                    onChange={onChange}>
                                    {tittle.map((item, index) => (
                                        <option key={index} value={item.tittle}>{item.tittle}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>
                                First Name
                            </Form.Label>
                            <Col sm={7}>
                            <Form.Control name='firstName' placeholder={'enter First Name'} value={profile.firstName} onChange={onchange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>
                                Last Name
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control name='lastName' placeholder={'enter Last Name'} value={profile.lastName} onChange={onchange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>
                                Date Of Birth
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control
                                    id='input'
                                    type='date'
                                    name='birthDate'
                                    value={profile.birthDate}
                                    onChange={onChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>
                                Blood Group
                            </Form.Label>
                            <Col sm={2}>
                                <Form.Select
                                    id='input'
                                    defaultValue={profile.bloodGroup}
                                    name='bloodGroup'
                                    onChange={onChange}>
                                    <option value={'Add blood group'}>select blood group</option>
                                    {bloodGroups.map((item, index) => (
                                        <option key={index} value={item.bloodGroup}>{item.bloodGroup}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>
                                phone Number
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control
                                    id='input'
                                    type='text'
                                    name='phoneNumber'
                                    value={profile.phoneNumber}
                                    placeholder='Enter your mobile number'
                                    required pattern="+94\d{9}"
                                    onChange={onChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>
                                Address
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    id="input"
                                    type='text'
                                    name='address'
                                    value={profile.address}
                                    placeholder='Enter your Address'
                                    onChange={onChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>
                                Description
                            </Form.Label>
                            <Col sm={7}>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    id='input'
                                    type='text'
                                    name='description'
                                    placeholder='Enter your allergies, special conditions here'
                                    value={profile.description}
                                    onChange={onChange}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.closeModal}>
                        Discard
                    </Button>
                    <Button variant="primary" onClick={()=>{props.updateProfile(profile)}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
}

export default EditProfileModal;