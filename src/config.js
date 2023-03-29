export const configuration  = {
    component: 'ADMIN',  //  'CHAN_CENTER', 'USER' , 'LABORATORY','DOCTOR', 'ADMIN'
    platform: 'WEB', // 'WEB', 'MOB'
    connectionParams: {
        url: 'http://localhost:4000',
        ws: 'ws://localhost:4000',
        // url: 'http://3.111.168.225:4000',
        // ws: 'ws://3.111.168.225:4000',
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