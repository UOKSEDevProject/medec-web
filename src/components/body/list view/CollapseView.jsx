import React from "react";
import {configuration} from "../../../config";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import { useEffect } from "react";

const TestCollapseView = (props) => {
    const {
        title,
        items,
        index,
        setIndex,
        isCollapsed,
        setIsCollapsed,
    } = props;

    let platform='WEB';

    return isCollapsed ?
    <div className="lab-report-portal">
        <div className="collapse-view d-flex" id={configuration.platform === "WEB" ? "fix-width" : "full-width"} >
            <div className="drawer-top d-flex justify-content-between align-items-center p-3">
                <h1 className="drawer-title">{title}</h1>
                <IoIosArrowBack className="drawer-icon" onClick={() => setIsCollapsed(false)}/>
            </div>
            <div className="drawer-details flex-grow-1">
                {items?.map((item, idx) => (
                    <div key={idx}>
                        <div className='report-list-collapse-body-subtitle'>{item.month}</div>
                        {item && item.reports && item.reports.length && item.reports.length > 0 ? (
                            item.reports.map((item, key) => {
                                let isSelectedItem = index?.id === item.id;
                                return (
                                    <div
                                        className={
                                            isSelectedItem
                                                ? "report-list-collapse-body-row report-list-row-selected"
                                                : "report-list-collapse-body-row"
                                        }
                                        key={key}
                                        onClick={() => {
                                            setIndex(item);
                                        }}
                                    >
                                        <div className='report-list-collapse-body-culumn1'>
                                            {item && item.day.match(/[a-zA-Z]+|[0-9]+/g)[0] }<sup>{item && item.day.match(/[a-zA-Z]+|[0-9]+/g)[1]}</sup>
                                        </div>

                                        <div className='report-list-collapse-body-culumn2'>
                                            {item.description}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className='report-list-empty-report-text'>
                                No Reports Available
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
        </div>
        :
        <div className="lab-report-portal ">
            <div className="left-tab-lab d-flex align-items-center">
                <IoIosArrowForward className="arrow-icon" onClick={() => setIsCollapsed(true)}/>
                <h2 className="vertical-text flex-grow-1 text-center">{title}</h2>
            </div>
        </div>;
};

export default TestCollapseView;