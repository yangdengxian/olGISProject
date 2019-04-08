/**
 * 鱼骨导航盘
 * @author ydx
 * @date 2019-04-02
 */
// import ZoomSlider from 'ol/control/ZoomSlider';
import '../../../plugins/zoomSlider/BZoomSlider.css';
import ZoomSlider from '../../../plugins/zoomSlider/BZoomSlider';

export default class ZoomSliderControl extends ZoomSlider {
    constructor(options) {
        super(options);
    }
}