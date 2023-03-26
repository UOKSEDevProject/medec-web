import React from "react";
import "cropperjs/dist/cropper.css";
import {Container, Modal} from "react-bootstrap";
import DropZoneArea from "./DropZoneArea";

export const ShowImgUploadModal = (props) => {
    const onCropImage = () => {
        if (props && props.onCropImage) {
            props.onCropImage();
        }

        if (props && props.onHide) {
            props.onHide();
        }
    }

    const onDeleteImage = () => {
        if (props && props.onDeleteImage) {
            props.onDeleteImage();
        }
    }

    return (
        <Container>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Upload the Picture
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropZoneArea onCropImage={onCropImage} onDeleteImage={onDeleteImage}/>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ShowImgUploadModal;
