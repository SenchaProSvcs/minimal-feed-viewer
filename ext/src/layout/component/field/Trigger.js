/**
 * Layout class for {@link Ext.form.field.Trigger} fields. Adjusts the input field size to accommodate
 * the trigger button(s).
 * @private
 */
Ext.define('Ext.layout.component.field.Trigger', {

    /* Begin Definitions */

    alias: 'layout.triggerfield',

    extend: 'Ext.layout.component.field.Field',

    /* End Definitions */

    type: 'triggerfield',

    beginLayout: function(ownerContext) {
        var me = this,
            owner = me.owner,
            flags;

        ownerContext.triggerWrap = ownerContext.getEl('triggerWrap');

        me.callParent(arguments);

        // if any of these important states have changed, sync them now:
        flags = owner.getTriggerStateFlags();
        if (flags != owner.lastTriggerStateFlags) {
            owner.lastTriggerStateFlags = flags;
            me.updateEditState();
        }
    },
    
    beginLayoutCycle: function(ownerContext){
        this.callParent(arguments);
        
        // Clear width, in case a previous layout cycle set an explicit width.
        if (ownerContext.widthModel.shrinkWrap && !this.owner.inputWidth) {
            ownerContext.inputContext.el.setStyle('width', '');
        }    
    },

    beginLayoutFixed: function (ownerContext, width, suffix) {
        var me = this,
            owner = ownerContext.target,
            ieInputWidthAdjustment = me.ieInputWidthAdjustment || 0,
            inputWidth = '100%',
            triggerWrap = owner.triggerWrap;

        me.callParent(arguments);

        owner.inputCell.setStyle('width', '100%');
        if(ieInputWidthAdjustment) {
            me.adjustIEInputPadding(ownerContext);
            if(suffix === 'px') {
                if (owner.inputWidth) {
                    inputWidth = owner.inputWidth - owner.getTriggerWidth();
                } else {
                    inputWidth = width - ieInputWidthAdjustment - owner.getTriggerWidth();
                }
                inputWidth += 'px';
            }
        }
        owner.inputEl.setStyle('width', inputWidth);
        inputWidth = owner.inputWidth;
        if (inputWidth) {
            triggerWrap.setStyle('width', inputWidth + (ieInputWidthAdjustment) + 'px');
        } else {
            triggerWrap.setStyle('width', width + suffix);
        }
        triggerWrap.setStyle('table-layout', 'fixed');
    },

    adjustIEInputPadding: function(ownerContext) {
        // adjust for IE 6/7 strict content-box model
        this.owner.inputCell.setStyle('padding-right', this.ieInputWidthAdjustment + 'px');
    },

    beginLayoutShrinkWrap: function (ownerContext) {
        var owner = ownerContext.target,
            emptyString = '',
            inputWidth = owner.inputWidth,
            triggerWrap = owner.triggerWrap;

        this.callParent(arguments);

        if (inputWidth) {
            triggerWrap.setStyle('width', inputWidth + 'px');
            inputWidth = (inputWidth - owner.getTriggerWidth()) + 'px';
            owner.inputEl.setStyle('width', inputWidth);
            owner.inputCell.setStyle('width', inputWidth);
        } else {
            owner.inputCell.setStyle('width', emptyString);
            owner.inputEl.setStyle('width', emptyString);
            triggerWrap.setStyle('width', emptyString);
            triggerWrap.setStyle('table-layout', 'auto');
        }
    },

    getTextWidth: function () {
        var me = this,
            owner = me.owner,
            inputEl = owner.inputEl,
            value;

        // Find the width that contains the whole text value
        value = (inputEl.dom.value || (owner.hasFocus ? '' : owner.emptyText) || '') + owner.growAppend;
        return inputEl.getTextWidth(value);
    },
    
    publishOwnerWidth: function(ownerContext, width) {
        var owner = this.owner;
        this.callParent(arguments);
        if (!owner.grow && !owner.inputWidth) {
            width -= owner.getTriggerWidth();
            if (owner.labelAlign != 'top') {
                width -= owner.getLabelWidth();
            }
            ownerContext.inputContext.setWidth(width);
        }    
    },

    measureContentWidth: function (ownerContext) {
        var me = this,
            owner = me.owner,
            width = me.callParent(arguments),
            inputContext = ownerContext.inputContext,
            calcWidth, max, min;

        if (owner.grow && !ownerContext.state.growHandled) {
            calcWidth = me.getTextWidth() + ownerContext.inputContext.getFrameInfo().width;

            max = owner.growMax;
            min = Math.min(max, width);
            max = Math.max(owner.growMin, max, min);

            // Constrain
            calcWidth = Ext.Number.constrain(calcWidth, owner.growMin, max);
            inputContext.setWidth(calcWidth);
            ownerContext.state.growHandled = true;
            
            // Now that we've set the inputContext, we need to recalculate the width
            inputContext.domBlock(me, 'width');
            width = NaN;
        } else if (!owner.inputWidth) {
            width -= owner.getTriggerWidth();
        }
        return width;
    },

    updateEditState: function() {
        var me = this,
            owner = me.owner,
            inputEl = owner.inputEl,
            noeditCls = Ext.baseCSSPrefix + 'trigger-noedit',
            displayed,
            readOnly;

        if (me.owner.readOnly) {
            inputEl.addCls(noeditCls);
            readOnly = true;
            displayed = false;
        } else {
            if (me.owner.editable) {
                inputEl.removeCls(noeditCls);
                readOnly = false;
            } else {
                inputEl.addCls(noeditCls);
                readOnly = true;
            }
            displayed = !me.owner.hideTrigger;
        }

        owner.triggerCell.setDisplayed(displayed);
        inputEl.dom.readOnly = readOnly;
    }
});
