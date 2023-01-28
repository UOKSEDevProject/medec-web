export const configuration  = {
    component: 'USER',  //  'CHAN_CENTER', 'USER' , 'LABORATORY','DOCTOR'
    platform: 'WEB', // 'WEB', 'MOB'
    connectionParams: {
        url: 'http://localhost:4000',
        ws: 'ws://localhost:4000',
        path: '/graphql',
        subsPath: '/subscriptions'
    }
};