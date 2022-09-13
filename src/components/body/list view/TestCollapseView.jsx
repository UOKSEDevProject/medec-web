import React from "react";
import {configuration} from "../../../config";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

const TestCollapseView = (props) => {
    const {
        title,
        items,
        index,
        setIndex,
        isCollapsed,
        setIsCollapsed,
    } = props;

    return isCollapsed ?
        <div className="collapse-view d-flex" id={configuration.platform === "WEB" ? "fix-width" : "full-width"}>
            <div className="drawer-top d-flex justify-content-between align-items-center p-3">
                <h1 className="drawer-title">{title}</h1>
                <IoIosArrowBack className="drawer-icon" onClick={() => setIsCollapsed(false)}/>
            </div>
            <div className="drawer-bottom flex-grow-1">
                {items?.map((item, idx) => (
                    <div key={idx}>
                        <div className='report-list-collapse-body-subtitle'>{item.title}</div>
                        {item.details.length !== 0 ? (
                            item.details.map((item, key) => {
                                let isSelectedItem = index.id === item.id;
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
                                            {item && item.day && item.day.split(" ")[0]}{" "}
                                            <sup>{item && item.day && item.day.split(" ")[1]}</sup>
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
        :
        <div className="left-tab d-flex align-items-center">
            <IoIosArrowForward className="arrow-icon" onClick={() => setIsCollapsed(true)}/>
            <h2 className="vertical-text flex-grow-1 text-center">{title}</h2>
        </div>;
};

export default TestCollapseView;