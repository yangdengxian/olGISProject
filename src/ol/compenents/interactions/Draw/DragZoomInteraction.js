/**
 * 框选放大缩小
 * @author ydx
 * @date 2019-04-08
 */
import DragZoom from 'ol/interaction/DragZoom';
import { always } from 'ol/events/condition';

export default class DragZoomInteraction extends DragZoom {
    constructor(param) {
        super({
            condition: always,
            // out: false, // 此处为设置拉框完成时放大还是缩小
        })
    }

    zoomIn() {

    }

    zoomOut() {

    }
}