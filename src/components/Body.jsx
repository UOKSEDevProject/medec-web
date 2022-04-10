import DctList from "./Body/DctList";
import {Container} from "react-bootstrap";
import DoctorProfile from './Body/DoctorProfile';
import PatientProfile from './Body/PatientProfile';

const Body = () => {
  return (
      <div className='body-container'>
          <Container fluid={false}>
              {/*<DctList/>*/}
              {/*<DoctorProfile/>*/}
              <PatientProfile/>
          </Container>
      </div>
  );
}

export default Body;