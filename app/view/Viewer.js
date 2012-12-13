Ext.define('FV.view.Viewer', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.viewer',
    requires: ['FV.view.feed.Show'],
    
    activeItem: 0,
    
    cls: 'viewer',
    tabBar: {
        cls: 'viewer-tabbar'
    },
    margins: '20px 20px 20px 5px',
    border: false,
    defaults: {
        border: false
    },
    
    initComponent: function() {
        this.items = [{
            xtype: 'feedshow',
            title: 'Sencha Blog',
            tabConfig: {
                cls: 'main-tab',
                border: false
            }
        }];
        
        this.callParent(arguments);
    }
});