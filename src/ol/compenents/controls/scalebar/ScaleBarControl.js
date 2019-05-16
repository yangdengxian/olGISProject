/**
 * 比例尺
 * @author ydx
 * @date 2019-04-01
 */
import './ScaleBar.css';
import ScaleLine from 'ol/control/ScaleLine';

export default class ScaleBarControl extends ScaleLine {
    /**
     * 构造函数
     * @param {Object} options 初始化参数
     */
    constructor(options) {
        options.className = 'ol-scale-line';
        super(options);
    }
}