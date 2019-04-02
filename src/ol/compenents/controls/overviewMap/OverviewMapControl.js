/**
 * 鹰眼图
 * @author ydx
 * @date 2019-04-01
 */
import './OverviewMapControl.css';
import { OverviewMap } from 'ol/control';

export default class OverviewMapControl extends OverviewMap {
    constructor(options) {
        super();
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
            collapsed: this.collapsed
        });
    }
}