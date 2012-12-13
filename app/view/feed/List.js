Ext.define('FV.view.feed.List', {
    extend: 'Ext.container.Container',
    alias: 'widget.feedlist',

    cls: 'side-navigation',
    items: [{
        xtype: 'component',
        cls: 'main-title',
        html: 'Feed Viewer'
    },{
        xtype: 'button',
        text: '+ Add Feed',
        ui: 'plain',
        action: 'add'
    },{
        xtype: 'button',
        text: '- Remove Feed',
        ui: 'plain',
        action: 'remove'
    },{
        xtype: 'dataview',
        trackOver: true,
        cls: 'feed-list',
        itemSelector: '.feed-list-item',
        overItemCls: 'feed-list-item-hover',
        tpl: '<tpl for="."><div class="feed-list-item">{name}</div></tpl>',
        listeners: {
            selectionchange: function(selmodel, selection) {
                var selected = selection[0],
                    feedList = this.up('feedlist'),
                    button = feedList.child('button[action=remove]');
                    
                if (selected) {
                    button.enable();
                }
                else {
                    button.disable();
                }
            }
        }
    }]
});