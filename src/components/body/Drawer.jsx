import React, {useState} from "react";
import {configuration} from "../../config";
import {IoIosArrowForward, IoIosArrowBack} from "react-icons/io";

const Drawer = (props) => {
    const {title, items, index, setIndex,toggle,setToggle} = props;

    return toggle ?
        <div className="left-tab d-flex align-items-center">
            <IoIosArrowForward className="arrow-icon" onClick={() => setToggle(false)}/>
            <h1 className="vertical-text flex-grow-1 text-center">{title}</h1>
        </div>
        :
        <div className="drawer d-flex flex-column">
            <div className="drawer-top d-flex justify-content-between align-items-center p-3">
                <h1 className="drawer-title">{title}</h1>
                <IoIosArrowBack className="drawer-icon" onClick={() => setToggle(true)}/>
            </div>
            <div className="drawer-bottom flex-grow-1">
                {items?.map((pt, idx) => (
                    <div className="drawer-tab px-3 py-3 d-flex align-items-center"
                         id={idx === index ? "selected" : "unselected"}
                         onClick={() => setIndex(idx)}>
                        <p className="drawer-number">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </p>
                        <p className="flex-grow-1">{`${pt?.tittle}. ${pt?.firstName} ${pt?.lastName}`}</p>
                    </div>
                ))}
            </div>
        </div>;
}

export default Drawer;