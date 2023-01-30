export const configuration  = {
    component: 'CHAN_CENTER',  //  'CHAN_CENTER', 'USER' , 'LABORATORY','DOCTOR'
    platform: 'WEB', // 'WEB', 'MOB'
    connectionParams: {
        url: 'http://localhost:4000',
        ws: 'ws://localhost:4000',
        path: '/graphql',
        subsPath: '/subscriptions'
    },
    aws: {
        S3_BUCKET: 'wedding-planner-lk-app',
        REGION: 'ap-northeast-1',
        accessKeyId: 'AKIAU5KTNW5AMA6Q5HWQ',
        secretAccessKey: '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'
    }
};