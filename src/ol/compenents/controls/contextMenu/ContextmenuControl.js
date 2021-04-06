import olContextmenu from 'ol-contextmenu/dist/ol-contextmenu';

/**
 * @classdesc 鼠标右键组件
 * @module controls/contextMenu/ContextmenuControl
 * @extends olContextmenu
 * @author ydx
 * @date 2020-12-23
 */
class ContextmenuControl extends olContextmenu {
    /**
     * @param {*} param 
     * @param {String} eventType: contextmenu; The listening event type (You could use 'click', 'dblclick')
     * @param {Boolean} defaultItems: true; Whether the default items (which are: Zoom In/Out) are enabled
     * @param {Number} width: 150; The menu's width
     * @param {Array|String} items: []; An array of object|string
     */
    constructor(param) {
        super(param);
        this.map = param.map;
    }
}

export default ContextmenuControl;