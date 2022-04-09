import DctList from "./Body/DctList";
import {Container} from "react-bootstrap";

const Body = () => {
  return (
      <div className='body-container'>
          <Container fluid={false}>
              <DctList/>
          </Container>
      </div>
  );
}

export default Body;