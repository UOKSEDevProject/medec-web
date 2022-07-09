import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {availableDoctor} from "../../temp/data-store";

const MedicalCNumberSearch = () => {

    const [doctor, setDoctor] = useState("");
    const [isDoctorAvailable, setAvailability] = useState();
    const [isFirstTime,setFirstTime] = useState(true);

    const searchDoctor = () =>{
        setFirstTime(false);
        //search by mc number
        if(availableDoctor.name){
            setAvailability(true);
            setDoctor(availableDoctor.name);
        } else{
            setAvailability(false);
        }
    }

    const addDoctor = () => {
        //add doctor
    }

    const updateDoctor = () => {
        //update available doctor
    }

    return (
        <div className='search-MC-num'>
            <div className='search-MC-num-body'>
                <div className='search-MC-num-header'>
                    <div>Enter Medical Council Number</div>
                </div>
                <div >
                    <input className='search-MC-num-search-box' type="text" name="CouncilNumber"
                           placeholder={"MBBS225522"}/>
                    <Button className='default-btn' onClick={searchDoctor}>Search</Button>
                </div>
                <div  hidden={isFirstTime}>
                    <div className='search-MC-num-search-result'hidden={isDoctorAvailable}>
                        <div className='search-MC-num-search-result-txt'>No doctor Found</div>
                        <Button className='default-btn' variant="secondary" onClick={addDoctor}>Add
                            Doctor</Button>
                    </div>
                    <div className='search-MC-num-search-result' hidden={!isDoctorAvailable}>
                        <div className='search-MC-num-search-result-txt'>{doctor}</div>
                        <Button className='default-btn' variant="secondary" onClick={updateDoctor}>Update
                            Doctor</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MedicalCNumberSearch;