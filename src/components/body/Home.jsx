import {Button, Col, Image, Row} from "react-bootstrap";
import {homeContent} from "../../temp/data-store";

const Home = () => {
    const onClickAboutUs = () => {
        // implement the function
    }

    return (
        <Row className='home-page'>
            <Col className='my-auto text-center text-lg-end' xs={12} md={5}>
                <div className='home-page-title mb-3'><q>Manage Your Business for the Future</q></div>
                <Button onClick={onClickAboutUs}>About us</Button>
            </Col>
            <Col xs={12} md={7}>
                <Row className=''>
                    {homeContent.map((content, index) => {
                        if (index % 2 === 0) {
                            return (
                                <Col xs={12} className='mt-3' key={index}>
                                    <Row className='align-items-center'>
                                        <Col xs={3} className='home-page-content-image text-end'>
                                            <Image src={content.imgUrl} fluid={true}/>
                                        </Col>
                                        <Col xs={9}>
                                            <div className='home-page-content-title'>{content.title}</div>
                                            <div className='home-page-content-content'>{content.content}</div>
                                        </Col>
                                    </Row>
                                </Col>
                            );
                        } else {
                            return (
                                <Col xs={12} className='mt-3' key={index}>
                                    <Row className='align-items-center'>
                                        <Col xs={9} className='text-end'>
                                            <div className='home-page-content-title'>{content.title}</div>
                                            <div className='home-page-content-content'>{content.content}</div>
                                        </Col>
                                        <Col xs={3} className='home-page-content-image'>
                                            <Image src={content.imgUrl} fluid={true}/>
                                        </Col>
                                    </Row>
                                </Col>
                            );
                        }
                    })}
                </Row>
            </Col>
        </Row>
    );
};

export default Home;