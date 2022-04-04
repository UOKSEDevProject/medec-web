import {Container, Row} from 'react-bootstrap';
import Doctor from './Doctor';
import {DrData} from "../temp/data-store";
import $ from "jquery";
import {useState} from "react";

const DctList = () => {
    const [data, setData] = useState(DrData);

    const onToggleChange = (status, index) => {
        let dataList = [...data];
        dataList[index].status = status;

        setData(dataList);
    }

    $.each(data, (_, dr) => {
        dr['onToggleChange'] = onToggleChange.bind(dr);
    });

    return (
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
                        onToggleChange={onToggleChange}/>
                ))}
            </Row>
        </Container>
    );
};

export default DctList;