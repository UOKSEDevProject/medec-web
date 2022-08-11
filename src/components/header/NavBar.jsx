import {Container, Image, Nav, Navbar} from 'react-bootstrap';
import logo from '../../assets/images/MEDEC logo  nav.png';
import {userProfile} from '../../temp/data-store';
import defaultProfilePicture from '../../assets/images/defaultprofilepic.png'
import {Link, NavLink} from "react-router-dom";

const NavBar = () => {
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
                        <NavLink to='/login' className='nav-link' activeClassName='active'>My Appointments</NavLink>
                        <Link to='/login'><Image  className='profile-picture' fluid={true} roundedCircle={true}
                                                       src={userProfile.profilePicture != null ? userProfile.profilePicture : defaultProfilePicture} alt='Profile'/>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;