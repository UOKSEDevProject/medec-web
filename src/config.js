export const configuration  = {
    component: 'USER',  //  'CHAN_CENTER', 'USER' , 'LABORATORY','DOCTOR', 'ADMIN'
    platform: 'WEB', // 'WEB', 'MOB'
    connectionParams: {
        url: 'http://13.127.56.96:4000',
        ws: 'ws://13.127.56.96:4000',
        path: '/graphql',
        subsPath: '/subscriptions'
    },
    aws: {
        S3_BUCKET: 'medec-content',
        REGION: 'ap-south-1',
        accessKeyId: 'AKIAWZ5URD3XFM7RNTB2',
        secretAccessKey: '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'
    }
};