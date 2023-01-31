import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {GoSearch} from "react-icons/go";
import queries from "../../graphql/queries";
import Spinner from "./Spinner";
import client from "../../connection/connection";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/client";
import mutations from "../../graphql/mutations";
import {notifyMessage} from "../../utils/notification";

const MedicalCNumberSearch = () => {
    const [value, setValue] = useState("");
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [sendDoctorUpdateReq] = useMutation(mutations.updateDoctor);
    const history = useHistory();

    const searchDoctor = () => {
        setIsFirstTime(false);

        return new Promise((resolve, reject) => {
            let req = {
                query: queries.searchForDoctorByMedicalCouncilNumber,
                variables: {
                    getDoctorByIdId: value
                },
                fetchPolicy: 'network-only'
            };

            setLoading(true);

            client.query(req).then((res) => {
                setDoctor(res.data.getDoctorById.payload)
            }).catch(error => {
                reject(error);
            }).finally(() => setLoading(false));
        });
    }

    const addDoctor = () => {
        history.push("/dct-reg")
    }

    const updateDoctor = () => {
        sendDoctorUpdateReq({
            variables: {
                chId: sessionStorage.getItem("usrId"),
                dctId: value
            }, fetchPolicy: "no-cache"
        }).then(r => {
            if(r.data.addDoctorToChannelCenter.statusCode === 'S0000'){
                notifyMessage("Successfully Added", '1');
                history.push(`/dct-time-sch/${doctor._id}`)

            } else if (r.data.addDoctorToChannelCenter.statusCode === 'E0009'){
                notifyMessage("Already Registered", '3');
            }
            }).catch(()=>notifyMessage("Something Went Wrong", '3'));
    }

    return (
        <div className='search-MC-num'>
            {loading && <Spinner isOverLay={true}/>}
            <div className='search-MC-num-body'>
                <div className='search-MC-num-header'>
                    <div>Enter Medical Council Number</div>
                </div>
                <div>
                    <input
                        className='search-MC-num-search-box'
                        type="text"
                        name="CouncilNumber"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={"MBBS225522"}/>
                    <Button className='default-btn' onClick={searchDoctor}
                            disabled={value === ""}><GoSearch/> &nbsp; Search</Button>
                </div>
                <div hidden={isFirstTime}>
                    <div className='search-MC-num-search-result' hidden={doctor !== null}>
                        <div className='search-MC-num-search-result-txt'>No doctor Found</div>
                        <Button className='default-btn' variant="secondary" onClick={addDoctor}>Add
                            Doctor</Button>
                    </div>
                    <div className='search-MC-num-search-result' hidden={doctor === null}>
                        <div className='search-MC-num-search-result-txt'>Dr. {doctor?.disName}</div>
                        <Button
                            className='default-btn'
                            variant="secondary"
                            onClick={updateDoctor}
                        >
                            Update Doctor
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MedicalCNumberSearch;