import React, {useState, useEffect, useRef} from 'react';
import Drawer from "./Drawer";
import {Button, Image} from "react-bootstrap";
import tickImg from "../../assets/images/tick.png";
import uploadImg from "../../assets/images/upload.png";
import Spinner from "./Spinner";
import {useMutation, useQuery} from "@apollo/client";
import queries from "../../graphql/queries";
import store from "../../data-store/reducer/root-reducer";
import {laboratoryActions} from "../../data-store/actions/laboratory-actions";
import {useSelector} from "react-redux";
import FileUpLoader from "./FileUploader";
import mutations from "../../graphql/mutations";
import {notifyMessage} from "../../utils/notification";
import {getAge} from "../../utils/commonFunctions";

function addCustomerListToStore(customerList) {
    store.dispatch(laboratoryActions.addCustomerList(customerList.getLabPatientList.payload))
}

function LabPatientList() {
    const [index, setIndex] = useState(undefined);
    const [toggle, setToggle] = useState(false);
    const [reports,setReports] = useState();
    const {loading} = useQuery(queries.getLabPatientList, {
        onCompleted: addCustomerListToStore,
        variables: {lId: sessionStorage.getItem("usrId")},
        // fetchPolicy: 'network-only' 
        fetchPolicy: "no-cache"
    });
    const customerList = useSelector(state => state.laboratoryDs.customerList);
    const [customersLst, setCustomersLst] = useState(undefined);
    let fileInput = useRef();
    const [UpdateLabReports] = useMutation(mutations.UpdateLabReports);

    useEffect(() => {
        if(customerList){
            setReports(customersLst && customersLst[index]?.reportList);
        }
    }, [index,customerList]);

    useEffect(() => {
        if (customerList) {
            setCustomersLst(customerList);
            console.log(customerList)
            setIndex(0);
        }
    }, [customerList]);


const setHide = (length) => {
    return index === length-1;

}
    const upload = (index,report) =>{
        fileInput.click();
    }
    async function setProfileImages(url,report,key) {
        UpdateLabReports({
            variables: {
                updateLabReportsOnCompletionId: report.id,
                imgUrl:url
            }, 
            fetchPolicy: "no-cache"
        }).then((res) => {
            if(res.data.updateLabReportsOnCompletion.statusCode === 'S0000'){
                notifyMessage("Successfully Added", '1');
                setReports(reports=>[...reports,reports[key]= {
                    name: report.name,
                    id: report.id,
                    status: "completed"
                }]);
                    
            }
        });
    }

    const toNext = () => {
       index+1 <= setCustomersLst.length && setIndex((index) => (index = index + 1));
    };

    return (
        <div className="d-flex">
            {loading && <Spinner isOverLay={true}/>}
            <Drawer title="Customers" items={customersLst} index={index} setIndex={setIndex} toggle={toggle}
                    setToggle={setToggle}/>
            <div className=' p-5 flex-grow-1 pt-report-req-body'>
                <div  className='pt-report-req-details'>
                    <div  className='pt-report-req-details-info'>
                        <div className='pt-report-req-details-info-num'># {index+1}</div>
                        <div className='pt-report-req-details-info-name'>{customersLst && customersLst[index]?.name}</div>
                        <div className='pt-report-req-details-info-row3'>
                            <div>{customersLst && customersLst[index]?.birthDate && getAge(customersLst[index]?.birthDate)} &nbsp;years</div>
                            <div>{customersLst && customersLst[index]?.gender}</div>
                        </div>
                        <div>{customersLst && customersLst[index]?.tp}</div>
                    </div>
                    <Image className='pt-report-req-pp' src={customersLst && customersLst[index]?.profilePicture} roundedCircle={true}/>
                </div>
                <div  className='pt-report-req-list'>
                    <div className='pt-report-req-list-in'>
                        {
                            reports?.map((report, index)=>(
                                <div key={index} className='pt-report-req-list-item'>
                                    {console.log(report)}
                                    <div>{report.name}</div>
                                    <div className={'list-item-images'}>
                                        <div>
                                            <Image src={report.status==="requested"?uploadImg:report.status==="completed"&&tickImg}
                                                    height={30} onClick={()=>report.status!=="completed"&& report.status==="requested" && upload(index,report) } ref={fileInput}/>
                                        </div>
                                    </div>
                                    <FileUpLoader
                                        setProfileImages={(url) => {
                                            setProfileImages(url,report,index);
                                        }}
                                        accepts={["image/png", "image/jpg", "image/jpeg"]}
                                        cRef={(e)=>fileInput=e}
                                    />
                                   </div>
                            ))
                        }
                    </div>

                </div>
                <div className='pt-report-req-finish'>
                    <Button className='default-btn' variant='secondary' onClick={toNext} hidden={index !== setCustomersLst.length-1}>Next</Button>
                </div>
            </div>
        </div>
    );
}

export default LabPatientList;