import React from 'react';
import { Image} from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";



function DctCard(props) {
    const {
        doctor,
        onDoctorClick
    } = props;

    const handleOnDoctorClick = () => {
        if (typeof onDoctorClick === 'function') {
            onDoctorClick(props);
        }
    }

    return (
        <div  className='dct-card-bg'  onClick={handleOnDoctorClick}>
            <Image className='dct-img' src={doctor.imageSrc}/>
            <div className='dct-card-details'>
                <div>
                    <p className='dct-name'>Dr. {doctor.disName}</p>
                    <p className='dct-specialization'>{doctor.specialization}</p>
                </div>
                <BsChevronRight color="white" fontSize="7vw"/>
            </div>
        </div>
    );
}

export default DctCard;