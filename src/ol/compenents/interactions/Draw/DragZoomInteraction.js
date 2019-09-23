import DragZoom from 'ol/interaction/DragZoom';
import { always } from 'ol/events/condition';
/**
 * @classdesc 框选放大缩小
 * @author ydx
 * @date 2019-04-08
 * @module interactions/Draw/DragZoomInteraction
 * @extends DragZoom
 */
class DragZoomInteraction extends DragZoom {
    /**
     * @param {*} param 
     */
    constructor(param) {
        param = param || {};
        param.condition = always;
        super(param);
    }
}

export default DragZoomInteraction;