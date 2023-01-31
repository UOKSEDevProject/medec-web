import React from "react";
import {Col, Image, Row} from "react-bootstrap";
import Logo from "../../assets/images/MEDEC logo.png";
import Redux from "../../assets/images/redux.png";
import Graphql from "../../assets/images/graphql.png";
import Mongodb from "../../assets/images/mongo.png";
import Git from "../../assets/images/git.png";
import Aws from "../../assets/images/aws.png";
import Reactjs from "../../assets/images/react.png";
import NodeJs from "../../assets/images/nodejs.png";

const AboutUs = () => {
    return (
        <Row className='text-center py-5 justify-content-center t'>
            <Col xs={12} md={10} lg={10} className='about-us text-center'>
                <Col xs={8} lg={3} className='d-inline-block text-center'><Image className='py-2' src={Logo} fluid={true} alt='profile'/></Col>
                <div className='about-us-font'>Medec is an online medical assistant system which is coming to you through web and mobile applications. You can easily manage your medical reports, appointments, and time through this system.</div>
                <br/>
                <div className='about-us-font'>This project is part of the Software Engineering Third Year Second Semester System Design and Development course module at the University of Kelaniya in Sri Lanka. The course module helped us to gain hands-on experience in designing and developing complex software systems, and the project is a key component of the curriculum. Through this project, we could apply the theories and concepts they have learned in class to a real-world scenario. It also helped us develop essential software engineering skills, such as problem-solving, teamwork, and project management. With the support of experienced instructors and the resources of the University of Kelaniya, Our team could have the chance to make a meaningful contribution to the field of software engineering and to build a solid foundation for their future careers.</div>
                <Row>
                    <Col xs={12} className='text-start py-4 about-us-title'>Technologies</Col>
                    <Col xs={4} className='d-flex align-content-center flex-wrap justify-content-center'><Image className='' src={Reactjs} fluid={true} alt='profile' width={150}/></Col>
                    <Col xs={4} className='d-flex align-content-center flex-wrap justify-content-center'><Image className='' src={Mongodb} fluid={true} alt='profile' width={350}/></Col>
                    <Col xs={4} className='d-flex align-content-center flex-wrap justify-content-center'><Image className='' src={Graphql} fluid={true} alt='profile' width={350}/></Col>
                    <Col xs={4} className='d-flex align-content-center flex-wrap justify-content-center'><Image className='' src={Aws} fluid={true} alt='profile' width={150}/></Col>
                    <Col xs={4} className='d-flex align-content-center flex-wrap justify-content-center'><Image className='' src={Redux} fluid={true} alt='profile' width={150}/></Col>
                    <Col xs={4} className='d-flex align-content-center flex-wrap justify-content-center'><Image className='' src={Git} fluid={true} alt='profile' width={200}/></Col>
                    <Col xs={4} className='d-flex align-content-center flex-wrap justify-content-center'></Col>
                    <Col xs={4} className='d-flex align-content-center flex-wrap justify-content-center'><Image className='' src={NodeJs} fluid={true} alt='profile' width={350}/></Col>
                    <Col xs={4} className='d-flex align-content-center flex-wrap justify-content-center'></Col>
                </Row>
            </Col>
            <Col xs={12}>
            </Col>
        </Row>
    );
}

export default AboutUs;