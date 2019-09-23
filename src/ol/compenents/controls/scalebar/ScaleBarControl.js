import './ScaleBar.css';
import ScaleLine from 'ol/control/ScaleLine';
/**
 * @classdesc 比例尺
 * @author ydx
 * @date 2019-04-01
 * @module controls/scalebar/ScaleBarControl
 * @extends ScaleLine
 */
class ScaleBarControl extends ScaleLine {
    /**
     *  @param {*} options
     *  @param {number} options.minWidth Minimum width in pixels.
     *  @param {string} options.units 'degrees', 'imperial', 'nautical', 'metric', 'us'
     */
    constructor(options) {
        options.className = 'ol-scale-line';
        super(options);
    }
}

export default ScaleBarControl;