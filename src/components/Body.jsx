import DctList from "./Body/DctList";
import {Container} from "react-bootstrap";
import DoctorProfile from './Body/DoctorProfile';

const Body = () => {
  return (
      <div className='body-container'>
          <Container fluid={false}>
              {/*DctList/>*/}
              <DoctorProfile/>
          </Container>
      </div>
  );
}

export default Body;