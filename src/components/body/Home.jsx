import {Button, Col, Image, Row} from "react-bootstrap";
import {homeContent} from "../../temp/data-store";
import {useEffect, useState} from "react";
import {configuration} from "../../config";
import {component} from "../../constants/constants";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {userActions} from "../../data-store/actions/user-actions";
import store from "../../data-store/reducer/root-reducer";
const imgTest = 'https://medec-content.s3.ap-south-1.amazonaws.com/1654020760868.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWZ5URD3XFM7RNTB2%2F20230328%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230328T094440Z&X-Amz-Expires=10000&X-Amz-Signature=8a031fda12a90e9170236803e8770af560c3408d3618a31f31c08bf5b7af43cd&X-Amz-SignedHeaders=host'



const Home = () => {
    const [menuList, setMenuList] = useState(null);
    const userId = useSelector(state => state.userDs.usrId);
    const history = useHistory();
    const isLogged = userId !== undefined;

    useEffect(() => {
        switch (configuration.component) {
            case component.user:
                store.dispatch(userActions.addPatientProfileData({profileImgSrc: imgTest,disName: 'Ovundu',dob: '1998-02-03',sex:'Male',des:'hkjhkhj',bldGrp:'O+',cntNo:'+94779740107',address: 'Gabada weediya'}));
                setMenuList(homeContent.user);
                break;
            case component.chanCenter:
                isLogged? setMenuList(homeContent.chanCenter):  history.push("/login");
                break;
            case component.laboratory:
                isLogged? setMenuList(homeContent.lab) : history.push("/login");
                break;
            case component.doctor:
                isLogged? history.push(`/dct-prf/${userId}`):  history.push("/login");
                break;
            case component.admin:
                isLogged? history.push("/ad"):  history.push("/login");
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