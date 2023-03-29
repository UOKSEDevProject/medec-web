import Files from "react-files";
import {notifyMessage} from '../../utils/notification';
import {fileURL, uploadFile} from "../../utils/awsFunctions";

const App = (props) => {

    const {setProfileImages,cRef,item} = props;

    const onFilesChange = props => async files => {
        if (files.length !== 0) {
            let fileObj = files[0];
            dpUpload(fileObj);
        };
    }
    async function dpUpload(file) {
        uploadFile(file)
            .on('httpUploadProgress', async (evt) => {
                console.log(Math.round((evt.loaded / evt.total) * 100));
                if (evt.loaded === evt.total) {
                    setProfileImages(await fileURL(file.name));
                }
            })
            .send((e,data) => {
                if (e) {
                    console.log(e);
                }else if(data){
                    // console.log(`https://medec-content.s3.ap-south-1.amazonaws.com/${file.name}`);
                }
            });
    }
    return (
        <div style={{display:'none'}}>
        <Files
            className='files-dropzone-file'
            onChange={onFilesChange(props)}
            accepts={props.accepts ? props.accepts : ["image/png", "image/jpg", "image/jpeg", "application/pdf", "application/msword", "application/xls", "application/xlsx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".xlsx", ".xls", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]}
            multiple={false}
            maxFileSize={12050000}
            minFileSize={0}
            onError={(e) => notifyMessage(e.message,'3')}
            clickable
        >
            {typeof(item)==='undefined'?<button type={'button'} ref={(e) => cRef(e)} />:item}
        </Files>

        </div>
    )
}

export default (App);
