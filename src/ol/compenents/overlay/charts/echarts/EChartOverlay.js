/**
 * 图标基类Echarts
 * @author ydx
 * @date 2019-04-15
 */
import EChartsLayer from 'ol-echarts/dist/ol-echarts';

export default class EChartOverlay extends EChartsLayer {
    constructor(param) {
        param.id = 'EChartsLayer';
        super(param);
    }

}