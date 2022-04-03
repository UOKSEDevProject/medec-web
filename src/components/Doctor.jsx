import {Badge, Col, Image, Row} from 'react-bootstrap';
import Switch from "react-switch";

const Doctor = (props) => {
    const {firstName, lastName, mediCenter, specialties, status, imageSrc, onToggleChange, no} = props;

    const onChgSwitch = (check) => {
        let status;

        if (check) {
            status = 1;
        } else {
            status = 0;
        }

        onToggleChange(status, no);
    };

    return (
        <Col xs={4} className='dct'>
            <Row className='dct-background'>
                <Col xs={6} className='align-items-center d-flex'>
                    <Image src={imageSrc} fluid={true} />
                </Col>
                <Col xs={6} className='p-0 mt-3 dr-details'>
                    <p className='dr dr-name'>Dr. {firstName}</p>
                    <p className='dr dr-name'>{lastName}</p>
                    <p className='dr dr-profession'>{specialties}</p>
                    <p className='dr dr-hospital'>{mediCenter}</p>
                    <Badge pill={true} className={status ? 'badge-online' : 'badge-offline'}>{status ? 'Online' : 'Offline'}</Badge>

                    <div className='switch mb-1 mx-2'>
                        <Switch
                            checked={status}
                            onColor='#3ff600'
                            offColor='#f70000'
                            className=''
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onChange={onChgSwitch}
                        />
                    </div>
                </Col>
            </Row>
        </Col>
    );
};

export default Doctor;