import {Row} from 'react-bootstrap';
import Doctor from './Doctor';
import {DrData} from "../../temp/data-store";
import {memo, useState} from "react";

const DctList = () => {
    const [data, setData] = useState(DrData);

    const onToggleChange = (status, index) => {
        let dataList = [...data];
        dataList[index].status = status;

        setData(dataList);
    }

    return (
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
    );
};

export default memo(DctList);