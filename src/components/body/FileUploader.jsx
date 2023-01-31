import Files from "react-files";
import {notifyMessage} from '../../utils/notification';

const App = (props) => {

    const {sendImageData,cRef} = props;

    const onFilesChange = props => async files => {
        if (files.length !== 0) {
            let fileObj = files[0];
            sendImageData(fileObj);
        };
    }

    return (
        <Files
            className='files-dropzone-file'
            onChange={onFilesChange(props)}
            accepts={props.accepts ? props.accepts : ["image/png", "image/jpg", "image/jpeg", "application/pdf", "application/msword", "application/xls", "application/xlsx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".xlsx", ".xls", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]}
            multiple={false}
            maxFileSize={12050000}
            minFileSize={0}
            onError={(e) => notifyMessage(e.message,'3')}
            // clickable
        >
            <button type={'button'} ref={(e) => cRef(e)} />
        </Files>
    )
}

export default (App);
