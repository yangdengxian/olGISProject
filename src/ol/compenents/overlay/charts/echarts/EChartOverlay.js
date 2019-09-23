import EChartsLayer from 'ol-echarts/dist/ol-echarts';

/**
 * @classdesc 图标基类Echarts
 * @author ydx
 * @date 2019-04-15
 * @module overlay/charts/echarts/EChartOverlay
 * @extends EChartsLayer
 */
class EChartOverlay extends EChartsLayer {
    /**
     * 
     * @param {*} param EChartsLayer.param
     * @param {string} param.id 
     */
    constructor(param) {
        param.id = 'EChartsLayer';
        super(param);
    }

}

export default EChartOverlay;