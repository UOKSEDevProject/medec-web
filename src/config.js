export const configuration  = {
    component: 'DOCTOR',  //  'CHAN_CENTER', 'USER' , 'LABORATORY','DOCTOR', 'ADMIN'
    platform: 'WEB', // 'WEB', 'MOB'
    connectionParams: {
        url: 'http://13.127.56.96:4000',
        ws: 'ws://13.127.56.96:4000',
        path: '/graphql',
        subsPath: '/subscriptions'
    },
    aws: {
        S3_BUCKET: 'medec-content',
        REGION: 'Asia Pacific (Mumbai) ap-south-1',
        accessKeyId: 'AKIAWZ5URD3XCPU2BNH2',
        secretAccessKey: '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'
    }
};