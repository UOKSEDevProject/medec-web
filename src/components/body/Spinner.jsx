import {memo} from "react";

const Spinner = (props) => {
    const {isOverLay} = props;

    return(
        <div className={`spinner-container ${isOverLay ? 'overlay' : ''}`}>
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default memo(Spinner);