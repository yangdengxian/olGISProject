/**
 * 鱼骨导航盘
 * @author ydx
 * @date 2019-04-02
 */
import '../../../plugins/zoomSlider/BZoomSlider.css';
import './zoomSlider.css';
import ZoomSlider from '../../../plugins/zoomSlider/BZoomSlider';

export default class ZoomSliderControl extends ZoomSlider {
    /**
     * 构造函数
     * @param {Object} options 初始化参数
     */
    constructor(options) {
        super(options);
    }
}