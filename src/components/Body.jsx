import DctList from "./body/DctList";
import { Container } from "react-bootstrap";
import Search from "./body/Search";
import DoctorProfile from "./body/DoctorProfile";
import PatientProfile from './Body/PatientProfile';

const Body = () => {
  return (
    <div className='body-container'>
      <Container fluid={true}>
        <Search />
        <DctList />
        <DoctorProfile />
          <PatientProfile/>
      </Container>
    </div>
  );
};

export default Body;