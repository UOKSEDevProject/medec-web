import {Container, Row} from 'react-bootstrap';
import Doctor from './Doctor';
import {DrData} from "../temp/data-store";
import {useState} from "react";
import NavBar from "./NavBar";

const DctList = () => {
    const [data, setData] = useState(DrData);

    const onToggleChange = (status, index) => {
        let dataList = [...data];
        dataList[index].status = status;

        setData(dataList);
    }

    return (
        <div>
            <NavBar/>
            <Container className="dc-list" fluid={false}>
                <Row>
                    {data.map((dr, index) => (
                        <Doctor
                            key={index}
                            firstName={dr.firstName}
                            lastName={dr.lastName}
                            mediCenter={dr.mediCenter}
                            specialties={dr.specialties}
                            status={dr.status}
                            imageSrc={dr.imageSrc}
                            no={index}
                            onToggleChange={onToggleChange}
                        />
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default DctList;