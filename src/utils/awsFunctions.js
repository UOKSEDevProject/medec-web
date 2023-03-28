import AWS from 'aws-sdk'
import {configuration} from '../config';

const S3_BUCKET = configuration.aws.S3_BUCKET;
const REGION = configuration.aws.REGION;


AWS.config.update({
    accessKeyId: configuration.aws.accessKeyId,
    secretAccessKey: configuration.aws.secretAccessKey,
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

export const uploadFile = (file,Request) => {
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
        ContentType:'image/jpeg',
    };

    return myBucket.putObject(params,Request);
}

export const fileURL = (fileName) => {
    let url;
    try{
        url = myBucket.getSignedUrl('getObject', {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 10000
        })
    return url;
    }catch(e){
        // console.log(e);
        return false;
    }
}