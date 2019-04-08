/**
 * 鹰眼图
 * @author ydx
 * @date 2019-04-01
 */
import './OverviewMapControl.css';
import Config from '../../../config/config';
import { OverviewMap } from 'ol/control';
import View from 'ol/View';

export default class OverviewMapControl extends OverviewMap {
    constructor(options) {
        super({
            // see in overviewmap-custom.html to see the custom CSS used
            className: 'ol-overviewmap ol-custom-overviewmap',
            layers: options.layers,
            collapseLabel: '\u00BB',
            label: '\u00AB',
            collapsed: options.collapsed || true,
            view: new View({
                projection: Config.mapConfig.projection
            })
        })
    }
}