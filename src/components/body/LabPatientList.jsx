import React, {useState, useEffect} from 'react';
import Drawer from "./Drawer";
import {labPtList, ptList, qrCodeDetails} from "../../temp/data-store";
import {Button, Image} from "react-bootstrap";
import tickImg from "../../assets/images/tick.png";
import uploadImg from "../../assets/images/upload.png";
import unTickImg from "../../assets/images/untick.png"

function LabPatientList(props) {
    const [index, setIndex] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [reports,setReports] = useState();

    useEffect(() => {
       setReports(labPtList[index].reportList);
    }, [index]);
    

    const upload = (index,report) =>{
        setReports(reports=>[...reports]);
        reports[index]= {
            name: report.name,
            isRequired: report.isRequired,
            isUpload:true,
        };
        // have to add functions for upload
    }

    const toNext = () => {
        index + 1 < 20 && setIndex((index) => (index = index + 1));
    };

    return (
        <div className="d-flex">
            <Drawer title="Customers" items={labPtList} index={index} setIndex={setIndex} toggle={toggle}
                    setToggle={setToggle}/>
            <div className=' p-5 flex-grow-1 pt-report-req-body'>
                <div  className='pt-report-req-details'>
                    <div  className='pt-report-req-details-info'>
                        <div className='pt-report-req-details-info-num'># {index+1}</div>
                        <div className='pt-report-req-details-info-name'>{labPtList[index].firstName}&nbsp;{labPtList[index].lastName} </div>
                        <div className='pt-report-req-details-info-row3'>
                            <div>{labPtList[index].age} &nbsp;years</div>
                            <div>{labPtList[index].gender}</div>
                        </div>
                        <div>{labPtList[index].tp}</div>
                    </div>
                    <Image className='pt-report-req-pp' src={labPtList[index].profilePicture} roundedCircle={true}/>
                </div>
                <div  className='pt-report-req-list'>
                    <div className='pt-report-req-list-in'>
                        {
                            reports?.map((report, index)=>(
                                <div key={index} className='pt-report-req-list-item'>
                                    <div>{report.name}</div>
                                    <div className={'list-item-images'}>
                                        <div><Image src={report.isUpload?tickImg:uploadImg}
                                                    height={30} onClick={()=>!report.isUpload && upload(index,report) }/></div>
                                    </div>
                                   </div>
                            ))
                        }
                    </div>

                </div>
                <div className='pt-report-req-finish'>
                    <Button className='default-btn' variant='secondary' onClick={toNext}>Next</Button>
                </div>
            </div>
        </div>
    );
}

export default LabPatientList;