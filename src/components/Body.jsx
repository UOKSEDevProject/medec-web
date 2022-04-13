import DctList from "./Body/DctList";
import {Container} from "react-bootstrap";
import Search from "./Body/Search";
import DoctorProfile from './Body/DoctorProfile';

const Body = () => {
  return (
      <div className='body-container'>
          <Container fluid={false}>
              <Search/>
              <DctList/>
              <DoctorProfile/>
          </Container>
      </div>
  );
}

export default Body;