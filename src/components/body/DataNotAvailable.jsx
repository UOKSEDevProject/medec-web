import {memo} from "react";

const DataNotAvailable = (props) => {
    const {customMessage} = props;

    return(
        <div className='data-not-available'>
            <div>{customMessage}</div>
        </div>
    );
};

export default memo(DataNotAvailable);