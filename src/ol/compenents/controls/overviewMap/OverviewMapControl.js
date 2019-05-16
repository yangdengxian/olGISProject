/**
 * 鹰眼图
 * @author ydx
 * @date 2019-04-01
 */
import './OverviewMapControl.css';
import { OverviewMap } from 'ol/control';
import View from 'ol/View';

export default class OverviewMapControl extends OverviewMap {
    /**
     * 构造函数
     * @param {Object} options 初始化参数
     */
    constructor(options) {
        options.className = 'ol-overviewmap ol-custom-overviewmap';
        options.collapseLabel = '\u00BB';
        options.label = '\u00AB';
        options.collapsed = options.collapsed || true;
        options.view = new View({
            projection: options.map.getView().getProjection()
        });
        super(options);
    }
}