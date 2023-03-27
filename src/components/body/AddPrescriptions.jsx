import React, {useRef, useState} from "react";
import {addPrescriptionsSections} from "../../constants/constants";
import PrescriptionCard from "./PrescriptionCard";
import {Spinner} from "react-bootstrap";
import {notifyMessage} from "../../utils/notification";
import {useMutation} from "@apollo/client";
import mutations from "../../graphql/mutations";
import {useHistory, useParams} from "react-router-dom";

const AddPrescriptions = () => {
    const {userId, sessionId, index} = useParams();
    const history = useHistory();
    const [image, setImage] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [list1, setList1] = useState([]);
    const [list2, setList2] = useState([]);
    const [UpdateLabReportsOnCompletion] = useMutation(mutations.UpdateLabReportsOnCompletion);
    const fileInput = useRef();

    const onFileSelect = () => {
        setIsUploading(true);
        setImage(null);
        setTimeout(() => {
            setIsUploading(false);
            setImage("https://docs.google.com/uc?id=1XAYQhbkPYLvuWlf2Lad0TuSjIbbKVkub");
        }, [2000]);
    }

    const onSubmitClick = () => {
        UpdateLabReportsOnCompletion({
            variables: {
                doctorRecommendation: {
                    dctId: sessionStorage.getItem("usrId"),
                    pId: userId,
                    presImgUrl:image,
                    reqList: list1.concat(list2)
                }
            }, fetchPolicy: "no-cache"
        }).then((res) => {
            if(res.data.addDoctorRecommendation.statusCode === 'S0000'){
                notifyMessage("Successfully Added", '1');
                history.push(`/pnt-lst/${sessionId}/${index}`)
            }});

    }

    return (
        <div className="add-pres py-5">
            <div className="d-flex align-items-center">
                <h1>Medical Prescription</h1>
                {!isUploading &&  <button className="button px-3 py-2 mx-4" onClick={() => fileInput.current?.click()}>{image === undefined ? "Select" : "Edit" } </button>}
                <input type="file" className="visually-hidden" accept="image/*" ref={fileInput}
                       onChange={onFileSelect}/>
                {isUploading && <div className="d-flex align-items-center mx-4">
                    <Spinner animation="border" role="status"/>
                    <span className="mx-2">Uploading</span>
                </div>}
            </div>
            <div className="d-flex justify-content-center">
                {image && <img className="pres-img" src={image} alt="prescription"/>}
            </div>
            {addPrescriptionsSections.map((item, index) => (
                <PrescriptionCard title={item.title} items={item.options} key={index} onChangeSelected={(list)=>item.id===1?setList1(list):setList2(list)}/>
            ))}
            <div className="d-flex justify-content-center">
                <button className="button px-3 py-2 mx-4" onClick={onSubmitClick}>Submit</button>
            </div>
        </div>
    );
}

export default AddPrescriptions;