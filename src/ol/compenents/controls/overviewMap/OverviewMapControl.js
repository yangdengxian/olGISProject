import './OverviewMapControl.css';
import { OverviewMap } from 'ol/control';
import View from 'ol/View';

/**
 * @classdesc 鹰眼图
 * @author ydx
 * @date 2019-04-01
 * @module controls/overviewMap/OverviewMapControl
 * @extends OverviewMap
 */
class OverviewMapControl extends OverviewMap {
    /**
     *  @param {*} options
     *  @param {Array<layer>} options.layers 图层集
     *  @param {boolean} options.collapsed 初始是否关闭鹰眼,默认：true
     *  @param {Map} options.map 地图实例
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

export default OverviewMapControl;