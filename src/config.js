export const configuration  = {
    component: 'CHAN_CENTER',  //  'CHAN_CENTER', 'USER' , 'LABORATORY','DOCTOR'
    platform: 'WEB', // 'WEB', 'MOB'
    connectionParams: {
        url: 'http://localhost:4000',
        ws: 'ws://localhost:4000',
        path: '/graphql',
        subsPath: '/subscriptions'
    }
};