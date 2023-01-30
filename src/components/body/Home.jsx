import {Button, Col, Image, Row} from "react-bootstrap";
import {homeContent} from "../../temp/data-store";
import {useEffect, useState} from "react";
import {configuration} from "../../config";
import {component} from "../../constants/constants";
import {useHistory} from "react-router-dom";

const Home = () => {
    const [menuList, setMenuList] = useState(null);
    const history = useHistory();

    useEffect(() => {
        switch (configuration.component) {
            case component.user:
                setMenuList(homeContent.user);
                break;
            case component.chanCenter:
                setMenuList(homeContent.chanCenter);
                break;
            case component.laboratory:
                setMenuList(homeContent.lab);
                break;
            case component.doctor:
                history.push("/dct-prf/MBBS230943B");
                break;
            default:
                break;
        }
    }, []);

    const onClickAboutUs = () => {
        history.push(`./about-us`);
    };

    const onMenuClick = (path) => {
        history.push(path);
    };

    return (
        <Row className='home-page'>
            <Col className='my-md-auto text-center text-lg-end mb-4' xs={12} md={5}>
                <div className='home-page-title mb-3'><q>Manage Your Business for the Future</q></div>
                <Button onClick={onClickAboutUs}>About us</Button>
            </Col>
            <Col xs={12} md={7}>
                <Row>
                    {menuList && menuList.map((content, index) => {
                        if (index % 2 === 0) {
                            return (
                                <Col xs={12} className='mt-3' key={index}>
                                    <Row className='align-items-center'>
                                        <Col xs={3} className='home-page-content-image text-end'>
                                            <Image src={content.imgUrl} fluid={true}
                                                   onClick={() => onMenuClick(content.path)}/>
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
                                            <Image src={content.imgUrl} fluid={true}
                                                   onClick={() => onMenuClick(content.path)}/>
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