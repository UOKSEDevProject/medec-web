import React, {useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import DropZone from "./DropZone";
import Cropper from "react-cropper";
import {useDispatch} from "react-redux";
import {userActions} from "../../../data-store/actions/user-actions";

const DropZoneArea = (props) => {
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cropData) {
      dispatch(userActions.addImgSrc(cropData));
      props.onCropImage();
    }
  }, [cropData]);

  const dropOrSelectImage = (files) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  }

  const getCropData = async () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL('image/webp', 0.92));
    }
  };

  const handleOnDelete = () => {
    setImage(null);
    setCropData(null);
    setCropData(null);

    props.onDeleteImage();
  }

  return (
      <Row>
        <Col md={12} xs={12} className='px-4'>
          <Row>
            {!image && <DropZone onDropOrSelectImage={dropOrSelectImage}/>}
            {image && <Cropper
                className='cropper'
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image ? image : ''}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
                style={{ height: 200, width: "100%" }}
            />}
            <Button onClick={getCropData} className='mx-2 mt-3' variant="primary">Crop Image</Button>
            <Button onClick={handleOnDelete} className='mx-2 mt-3' variant="danger">Delete Image</Button>
          </Row>
        </Col>
      </Row>
  );
}

export default DropZoneArea;
