/**
 * 长度测量
 * @author ydx
 * @date 2019-04-09
 */
import MeasureControl from './MeasureControl';

export default class DistanceControl extends MeasureControl {
    constructor() {
        super({
            type: "LineString"
        });
        this.createHelpTooltip();
        this.createMeasureTooltip();
    }
}