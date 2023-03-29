import {Button, Container, Image, Nav, Navbar, Overlay, Popover} from 'react-bootstrap';
import logo from '../../assets/images/MEDEC logo  nav.png';
import defaultProfilePicture from '../../assets/images/defaultprofilepic.png'
import {Link, NavLink, useHistory, useLocation} from "react-router-dom";
import {configuration} from "../../config";
import {component} from "../../constants/constants";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {rootActions} from "../../data-store/actions/root-actions";
import store from "../../data-store/reducer/root-reducer";
import {notifyMessage} from "../../utils/notification";

const NavBar = () => {
    const location = useLocation();
    const userId = useSelector(state => state.userDs.usrId);
    const authStatus = useSelector(state => state.userDs.authSts);
    const userProfile = useSelector(state => state.userDs.PatientProfileData);
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const history = useHistory();

    const handleClick = (event) => {
        if (userId) {
            setShow(!show);
            setTarget(event.target);
        } else {
            history.push('/login');
        }
    };

    const handleOnHide = () => {
        setShow(!show);
    }

    const onProfileClick = () => {
        if (userId) {
            history.push('/pnt-prf');
            setShow(false);
        }
    }

    const onLogOut = () => {
        setShow(false);
        store.dispatch(rootActions.clearStore());
    }

    const renderUserOptions = (location, userId) => {
        return( configuration.component === component.user && location.pathname !=='/login' && location.pathname !=='/register' &&
            <Nav ref={ref}>
                <NavLink to={userId === undefined ? '/login' : '/my-app'} className='nav-link' activeClassName='active'>My Appointments</NavLink>
                <Image
                    className='profile-picture'
                    fluid={true}
                    roundedCircle={true}
                    src={userProfile?.profileImgSrc != null ? userProfile?.profileImgSrc : defaultProfilePicture}
                    alt='Profile'
                    onClick={handleClick}
                />
                {userId &&
                    <Overlay
                        show={show}
                        target={target}
                        placement="bottom"
                        container={ref}
                        containerPadding={20}
                        rootClose={true}
                        onHide={handleOnHide}
                    >
                        <Popover id="popover-contained" className='profile-overlay'>
                            <Popover.Body>
                                {userId &&
                                    <>
                                        <Button onClick={onProfileClick} className='m-2'>Profile</Button>
                                        <Button onClick={onLogOut} variant='danger'>Logout</Button>
                                    </>
                                }
                            </Popover.Body>
                        </Popover>
                    </Overlay>
                }
            </Nav>
        )
    }

    const renderOtherUserOptions = () => {
        return( configuration.component !== component.user && location.pathname !=='/login' && location.pathname !=='/register' &&
            <a className='nav-link' style={{cursor: 'pointer'}} onClick={onLogOut}>Log Out</a>
        )
    }

    return (
        <Navbar id='top-nav' className='navbar' collapseOnSelect expand='lg' variant='dark' fixed='top'>
            <Container>
                <Navbar.Brand href='#home'>
                    <Link to='/home'>
                        <Image className='nav-logo' src={logo} alt='MEDEC LOGO'/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        <NavLink to='/home' className='nav-link' activeClassName='active'>Home</NavLink>
                        {renderUserOptions(location, userId)}
                        {renderOtherUserOptions()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;