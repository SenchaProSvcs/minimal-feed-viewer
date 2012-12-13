Ext.application({
    name: 'FV',

    paths: {
        'Ext.ux': 'app/ux/'
    },

    // Define all the controllers that should initialize at boot up of your application
    controllers: [
        'Articles',
        'Feeds'
    ],
    
    autoCreateViewport: true
});