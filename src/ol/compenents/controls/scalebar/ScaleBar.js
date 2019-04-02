/**
 * 比例尺
 * @author ydx
 * @date 2019-04-01
 */
import ScaleLine from 'ol/control/ScaleLine';

export default class ScaleBarControl extends ScaleLine {
    constructor(options) {
        super();
        this.minWidth = options.minWidth;
        this.units = options.units | "metric";
    }

    getControl() {
        return new ScaleLine({
            className: 'ol-scale-line',
            minWidth: this.minWidth,
            units: this.units,
        })
    }
}