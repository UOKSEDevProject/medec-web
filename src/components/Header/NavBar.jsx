import {Container, Image, Nav, Navbar} from 'react-bootstrap';
import logo from '../../assets/images/MEDEC logo  nav.png';
import {userProfile} from '../../temp/data-store';
import defaultProfilePicture from '../../assets/images/defaultprofilepic.png'

const NavBar = () => {
    return (
        <Navbar id='top-nav' className='navbar' collapseOnSelect expand='lg' variant='dark' fixed='top'>
            <Container>
                <Navbar.Brand href='#home'>
                    <Image className='nav-logo' src={logo} alt='MEDEC LOGO'/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        <Nav.Link href='#home'>Home</Nav.Link>
                        <Nav.Link href='#myAppointments'>My Appointments</Nav.Link>
                        <a href='#userProfile'><Image  className='profile-picture' fluid={true} roundedCircle={true}
                                                       src={userProfile.profilePicture != null ? userProfile.profilePicture : defaultProfilePicture} alt='Profile'/>
                        </a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavBar;