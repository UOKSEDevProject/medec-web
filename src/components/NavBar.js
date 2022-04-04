import {Container, Image, Nav, Navbar} from "react-bootstrap";
import logo from '../assets/images/MEDEC logo  nav.png';
import {userProfile} from "../temp/data-store";
import pp from '../assets/images/defaultprofilepic.png'

const NavBar = () => {
  return(
      <Navbar id="top-nav" className="navbar" collapseOnSelect expand="lg" variant="dark" fixed="top">
          <Container>
              <Navbar.Brand href="#home">
                  <Image className="nav-logo" src={logo} alt="MEDEC LOGO"/>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse className="justify-content-end">
                  <Nav>
                      <Nav.Link href="#home">Home</Nav.Link>
                      <Nav.Link href="#home">My Appointments</Nav.Link>
                      <Image className="profile-picture" fluid={true} roundedCircle={true}
                             src={userProfile.profilePicture!=null?userProfile.profilePicture:pp}
                             alt="Profile"/>
                  </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
  );
}
export default NavBar;