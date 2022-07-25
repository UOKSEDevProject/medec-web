import React, {useState} from "react";
import {AiOutlineMenu} from "react-icons/ai";
import {IoIosArrowBack} from "react-icons/io"

const Drawer = (props) => {
    const {title, items, index, setIndex} = props;
    const [toggle, setToggle] = useState(false);

    return toggle ?
        <div className="p-3">
            <AiOutlineMenu className="drawer-icon" onClick={() => setToggle(false)}/>
        </div>
        :
        <div className={toggle ? "drawer-toggle" : "drawer"}>
            <div className="drawer-top d-flex justify-content-between align-items-center p-3">
                <h1 className="drawer-title">{title}</h1>
                <IoIosArrowBack className="drawer-icon" onClick={() => setToggle(true)}/>
            </div>
            <div className="drawer-bottom">
                {items?.map((pt, idx) => (
                    <div className="drawer-tab px-3 py-3 d-flex align-items-center"
                         id={idx === index ? "selected" : "unselected"}
                         onClick={() => setIndex(idx)}>
                        <p className="drawer-number">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </p>
                        {
                            !toggle &&
                            <p className="flex-grow-1">{`${pt?.tittle}. ${pt?.firstName} ${pt?.lastName}`}</p>
                        }
                    </div>
                ))}
            </div>
        </div>;
}

export default Drawer;