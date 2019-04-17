/**
 * 业务图表
 * @author ydx
 * @date 2019-04-17
 */
import BarChartsLayer from '../../../ol/compenents/overlay/charts/echarts/BarEChartOverlay';
import PieChartsLayer from '../../../ol/compenents/overlay/charts/echarts/PieEChartOverlay';


export default class Charts {
    constructor(param) {
        this.chartsLayer = {};
        switch (param.type) {
            case 'bar':
                this.chartsLayer = new BarChartsLayer({
                    features: param.data
                });
                break;

            case 'pie':
                this.chartsLayer = new PieChartsLayer({
                    features: param.data
                });
                break;

            case 'line':
                break;

            default:
                break;
        }
    }

    getChartsLayer() {
        return this.chartsLayer;
    }
}