import {Container, Image, Nav, Navbar} from 'react-bootstrap';
import logo from '../../assets/images/MEDEC logo  nav.png';
import {userProfile} from '../../temp/data-store';
import defaultProfilePicture from '../../assets/images/defaultprofilepic.png'
import {Link, NavLink, useLocation} from "react-router-dom";
import {configuration} from "../../config";
import {component} from "../../constants/constants";
import {useSelector} from "react-redux";

const renderUserOptions = (location, userId) => {
    return( configuration.component === component.user && location.pathname !=='/login' && location.pathname !=='/register' &&
       <Nav>
           <NavLink to={userId === undefined ? '/login' : '/my-app'} className='nav-link' activeClassName='active'>My Appointments</NavLink>
           <Link to={userId === undefined ? '/login' : '/pnt-prf'}>
               <Image  className='profile-picture' fluid={true} roundedCircle={true}
                       src={userProfile.profilePicture != null ? userProfile.profilePicture
                           : defaultProfilePicture} alt='Profile'/>
           </Link>
       </Nav>
      )

}
const NavBar = () => {
    const location = useLocation();
    const userId = useSelector(state => state.userDs.usrId);
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
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;