import React, {useState} from "react";
import {labReportList} from "../../temp/data-store";
import TestCollapseView from "./list view/TestCollapseView";

let newLabReportList = labReportList.concat(labReportList,labReportList,labReportList,labReportList);

const TestLabReportPortal = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedItem, setSelectedItem] = useState(newLabReportList[0].details[0]);

    return (
        <div className="pt-container d-flex" id={isCollapsed ? "pt-container-overlay" : "empty"}>
            <TestCollapseView
                title={"Lab Report List"}
                items={newLabReportList}
                index={selectedItem}
                setIndex={setSelectedItem}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <div className="pt p-5 flex-grow-1">
                <center>
                    <img
                        src={selectedItem.imgURL}
                        style={{width:"400px",objectFit:"contain"}}
                        loading='lazy'
                        alt="prescription"
                    />
                </center>
            </div>
        </div>
    );
};

export default TestLabReportPortal;