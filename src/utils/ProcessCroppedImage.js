import {v4 as uuidv4} from 'uuid';

export const dataURItoBlob = (dataURI) => {
    let byteString;

    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    let ia = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
}

export const blogToFile = (dataURI) => {
    const blobImg = dataURItoBlob(dataURI);
    const arr = blobImg.type.split('/');
    const fileName = uuidv4() + '.' + arr[1];
    const file = new File([blobImg], fileName, {lastModified: Date.now(), type: blobImg.type});
    return file;
}

