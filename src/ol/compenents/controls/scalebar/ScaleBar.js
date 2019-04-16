/**
 * 比例尺
 * @author ydx
 * @date 2019-04-01
 */
import './ScaleBar.css';
import ScaleLine from 'ol/control/ScaleLine';

export default class ScaleBarControl extends ScaleLine {
    constructor(options) {
        super({
            className: 'ol-scale-line',
            minWidth: options.minWidth,
            units: options.units | "metric",
        })
    }
}