import {Badge, Col, Image, Row} from 'react-bootstrap';
import Switch from "react-switch";
import {component} from "../../constants/constants";
import {configuration} from "../../config";
import {useHistory} from "react-router-dom";

const Doctor = (props) => {
    const {
        id,
        disName,
        mediCenter,
        specialization,
        status,
        imageSrc,
        no,
        onToggleChange,
        onMounted,
        onCleanUp,
        onEveryRender
    } = props;

    const history = useHistory();

    const handelOnDoctorClick = () => {
        configuration.component == "CHAN_CENTER" ? history.push(`/dct-time-sch/${id}`) : history.push(`/dct-prf/${id}`);
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
                    <p className='dr dr-name'>Dr. {disName}</p>
                    <p className='dr dr-profession'>{specialization}</p>
                    <p className='dr dr-hospital'>{mediCenter}</p>
                    <Badge pill={true}
                           className={status ? 'badge-online' : 'badge-offline'}>{status ? 'Available @' : 'Unavailable'}</Badge>
                    <Badge pill={true} className='badge-something'>{mediCenter}</Badge>
                </Col>
            </Row>
            <div className='switch mb-1 mx-3'>
                {configuration.component === component.chanCenter &&
                    <Switch
                        checked={status}
                        onColor='#3ff600'
                        offColor='#f70000'
                        className=''
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onChange={handelOnToggleChange}
                    />
                }
            </div>
        </Col>
    );
};

export default Doctor;