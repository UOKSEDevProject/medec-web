import React from "react";
import {useDropzone} from "react-dropzone";
import upload from "../../../assets/images/upload-icon.png"
import {Col, Row} from "react-bootstrap";

const DropZone = (props) => {
  const {onDropOrSelectImage} = props;

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        return;
      }
      onDropOrSelectImage(acceptedFiles);
    }
  });

  return (
      <Col xs={12}>
        <Row className='justify-content-center'>
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <Col xs={12} className='text-center m-0 p-0'>
              <img src={upload} width={120}/>
              <h5>Drag & drop image here, or click to select files</h5>
            </Col>
          </div>
        </Row>
      </Col>
  );
}

export default DropZone;
