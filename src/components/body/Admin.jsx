import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";

function Admin(props) {
    const [profile, setProfile] = useState({});

    const onChange = (e) => {setProfile({...profile,[e.target.name]:e.target.value});}


    return (
        <Form style={{width:'60vw',margin:'auto', padding:'10px'}}>
            <Form.Group className="mb-3">
                <Form.Label>Channel Center Name</Form.Label>
                <Form.Control type="text" name='name' placeholder="Enter name"  aria-required={true} onChange={onChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" aria-required={true} onChange={onChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name='address' placeholder="Enter address" aria-required={true} onChange={onChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" name='cntNumber' placeholder="Enter phone number" aria-required={true} onChange={onChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default Admin;