import DctList from "./body/DctList";
import { Container } from "react-bootstrap";
import Search from "./body/Search";
import DoctorProfile from "./body/DoctorProfile";

const Body = () => {
  return (
    <div className='body-container'>
      <Container fluid={false}>
        <Search />
        <DctList />
        <DoctorProfile />
      </Container>
    </div>
  );
};

export default Body;
