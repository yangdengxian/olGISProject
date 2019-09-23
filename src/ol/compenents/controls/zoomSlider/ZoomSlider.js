import '../../../plugins/zoomSlider/BZoomSlider.css';
import './zoomSlider.css';
import ZoomSlider from '../../../plugins/zoomSlider/BZoomSlider';

/**
 * @classdesc 鱼骨导航盘
 * @author ydx
 * @date 2019-04-02
 * @module controls/zoomSlider/ZoomSliderControl
 * @extends ZoomSlider
 */
class ZoomSliderControl extends ZoomSlider {
    /**
     *  @param {*} options
     *  @param {Object} options.displayObject 导航条显示内容
     */
    constructor(options) {
        options.displayObject = options.displayObject || {
            moveUp: "向上平移",
            moveDown: "向下平移",
            moveLeft: "向左平移",
            moveRight: "向右平移",
            zoomIn: "放大",
            zoomOut: "缩小",
            zoomTo: "缩放到此级别",
            zoomWheel: "滑动缩放地图"
        };
        super(options);
    }
}

export default ZoomSliderControl;