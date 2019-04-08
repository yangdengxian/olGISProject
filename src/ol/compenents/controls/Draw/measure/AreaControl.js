/**
 * 面积测量
 * @author ydx
 * @date 2019-04-09
 */
import MeasureControl from './MeasureControl';

export default class AreaControl extends MeasureControl {
    constructor() {
        super({
            type: "Polygon"
        });
        this.createHelpTooltip();
        this.createMeasureTooltip();
    }
}