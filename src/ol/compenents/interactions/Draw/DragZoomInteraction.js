/**
 * 框选放大缩小
 * @author ydx
 * @date 2019-04-08
 */
import DragZoom from 'ol/interaction/DragZoom';
import { always } from 'ol/events/condition';

export default class DragZoomInteraction extends DragZoom {
    constructor(param) {
        param = param || {};
        param.condition = always;
        super(param);
    }

    zoomIn() {

    }

    zoomOut() {

    }
}