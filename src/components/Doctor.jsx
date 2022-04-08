import {Badge, Col, Image, Row} from 'react-bootstrap';
import Switch from "react-switch";
import {useEffect} from "react";

const Doctor = (props) => {
    const {
        firstName,
        lastName,
        mediCenter,
        specialties,
        status,
        imageSrc,
        no,
        onToggleChange,
        onMounted,
        onCleanUp,
        onEveryRender,
        onDoctorClick
    } = props;

    useEffect(() => {
        if (typeof onMounted === 'function') {
            onMounted();
        }
    }, []);

    useEffect(() => {
        if (typeof onEveryRender === 'function') {
            onEveryRender();
        }

        return () => {
            if (typeof onCleanUp === 'function') {
                onCleanUp();
            }
        }
    });

    const handelOnDoctorClick = () => {
        if (typeof onDoctorClick === 'function') {
            onDoctorClick(props);
        }
    }

    const handelOnToggleChange = (check) => {
        if (typeof onToggleChange === 'function') {
            onToggleChange(check, no);
        }
    };

    return (
        <Col xs={12} md={6} lg={4} className='dct'>
            <Row className='dct-background' onClick={handelOnDoctorClick}>
                <Col xs={6} className='align-items-center d-flex'>
                    <Image src={imageSrc} fluid={true}/>
                </Col>
                <Col xs={6} className='p-0 mt-3 dr-details'>
                    <p className='dr dr-name'>Dr. {firstName}</p>
                    <p className='dr dr-name'>{lastName}</p>
                    <p className='dr dr-profession'>{specialties}</p>
                    <p className='dr dr-hospital'>{mediCenter}</p>
                    <Badge pill={true} className={status ? 'badge-online' : 'badge-offline'}>{status ? 'Online' : 'Offline'}</Badge>
                </Col>
            </Row>
            <div className='switch mb-1 mx-3'>
                <Switch
                    checked={status}
                    onColor='#3ff600'
                    offColor='#f70000'
                    className=''
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onChange={handelOnToggleChange}
                />
            </div>
        </Col>
    );
};

export default Doctor;