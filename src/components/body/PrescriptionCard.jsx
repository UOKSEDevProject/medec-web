import React, {useEffect, useState} from "react";
import tickImage from "../../assets/images/tick.png";
import unTickImage from "../../assets/images/untick.png";

const PrescriptionCard = (props) => {
    const {title, items, onChangeSelected} = props;
    const [selected, setSelected] = useState([]);

    const handleClick = (item) => {
        if (selected.includes(item)) {
            setSelected(selected.filter(function(a) {
                    return a !== item;
                }));
            onChangeSelected(selected.filter(function(a) {
                return a !== item;
            }));
        } else {
            setSelected([...selected,item]);
            onChangeSelected([...selected,item]);
        }
    };

    return (
        <div className="my-5">
            <h1 className="add-pres-section-title p-3">{title}</h1>
            <div
                className="add-pres-section-container d-flex flex-wrap align-items-center justify-content-center px-3 py-4">
                {items?.map((item, index) => (
                    <div className="add-pres-section-item d-flex align-items-center p-3" key={index}>
                        <img className="add-pres-section-item-img"
                             src={selected?.includes(item) ? tickImage : unTickImage}
                             alt={item}
                             onClick={() => handleClick(item)}/>

                        <h1 className="add-pres-section-item-label flex-grow-1">{item}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PrescriptionCard;