Ext.define('FV.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.layout.container.Border',
        'FV.view.feed.List',
        'FV.view.Viewer'
    ],
    
    layout: 'border',
    items: [{
        xtype: 'feedlist',
        region: 'west',
        width: 300,
        minWidth: 230,
        margins: '20px 5px 20px 20px',
        split: true
    },{
        xtype: 'viewer',
        region: 'center'
    }]
});