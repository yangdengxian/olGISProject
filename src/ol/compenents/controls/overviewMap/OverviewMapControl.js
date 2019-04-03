/**
 * 鹰眼图
 * @author ydx
 * @date 2019-04-01
 */
import './OverviewMapControl.css';
import Config from '../../../config/config';
import { OverviewMap } from 'ol/control';
import View from 'ol/View';

export default class OverviewMapControl {
    constructor(options) {
        this.layers = options.layers;
        this.collapsed = options.collapsed || true;
    }

    getControl() {
        return new OverviewMap({
            // see in overviewmap-custom.html to see the custom CSS used
            className: 'ol-overviewmap ol-custom-overviewmap',
            layers: this.layers,
            collapseLabel: '\u00BB',
            label: '\u00AB',
            collapsed: this.collapsed,
            view: new View({
                projection: Config.mapConfig.projection
            })
        });
    }
}