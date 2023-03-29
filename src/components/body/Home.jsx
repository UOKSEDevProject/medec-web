import {Button, Col, Image, Row} from "react-bootstrap";
import {homeContent} from "../../temp/data-store";
import {useEffect, useState} from "react";
import {configuration} from "../../config";
import {component} from "../../constants/constants";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {userActions} from "../../data-store/actions/user-actions";
import store from "../../data-store/reducer/root-reducer";
import {useQuery} from "@apollo/client";
import queries from "../../graphql/queries";

const addUserDataToStore = (response) => {
    if (configuration.component === component.user && response && response.getPatientProfile && response.getPatientProfile.payload) {
        let data = response.getPatientProfile.payload;

        store.dispatch(userActions.addPatientProfileData({
            profileImgSrc: data.prfImgUrl ? data.prfImgUrl : '',
            disName: data.disName ? data.disName : '',
            dob: data.birthDate ? data.birthDate : '',
            sex: data.sex ? data.sex : '',
            des: data.des ? data.des : '',
            bldGrp: data.bldGrp ? data.bldGrp : '',
            cntNo: data.cntNo ? data.cntNo : '',
            address: data.address ? data.address : ''
        }));
    }
}

const Home = () => {
    const [menuList, setMenuList] = useState(null);
    const userId = useSelector(state => state.userDs.usrId);
    const history = useHistory();
    const isLogged = userId !== undefined;

    useQuery(queries.getUserData, {
        onCompleted: addUserDataToStore,
        variables: {id: userId}
    });

    useEffect(() => {
        switch (configuration.component) {
            case component.user:
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