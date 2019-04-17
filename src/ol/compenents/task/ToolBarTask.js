/**工具栏类
 * @author ydx
 * @date 2019-04-08
 */
import './ToolBar.css';
import Config from '../../config/config';
import $ from 'jquery';
// import ExcChartLayer from '../../compenents/Layers/vectorCharts/ExtChartLayer';
import Charts from '../../../project/js/charts/Charts';


export default class ToolbarTask {
    constructor(param) {
        this.toolBarId = param.toolBarId;
        this.toolBarInteractions = param.toolBarInteractions;
        this.domContainers = $('#' + param.toolBarId);
        this.map = param.map;
        this.mapFullExtent = param.mapFullExtent;

        this.echartLayer = null;
    }

    bindClickEvent() {
        var __this = this;
        if (this.domContainers) {
            this.domContainers
                .find('li a')
                .off()
                .on('click', function(evt) {
                    __this.navigation(evt.target, __this.toolBarInteractions);
                });
        }
    }

    unBindClickEvent() {
        var __this = this;
        if (this.domContainers) {
            this.domContainers.find('li').unbind('click', 'a', function(evt) {});
        }
    }

    navigation(target, toolBarInteractions) {
        var __this = this;
        var type = target.text || target.textContent;

        for (const key in toolBarInteractions) {
            if (toolBarInteractions.hasOwnProperty(key)) {
                const toolBarInteraction = toolBarInteractions[key];
                toolBarInteraction.setActive(false);
            }
        }

        switch (type) {
            case '漫游':
                break;

            case '放大':
                toolBarInteractions['dragZoomInteraction'].out_ = false;
                toolBarInteractions['dragZoomInteraction'].setActive(true);
                break;

            case '缩小':
                toolBarInteractions['dragZoomInteraction'].out_ = true;
                toolBarInteractions['dragZoomInteraction'].setActive(true);
                break;

            case '全图':
                __this.map.getView().fit(__this.mapFullExtent);
                break;

            case '拉框选择':
                toolBarInteractions['dragBoxInteraction'].setActive(true);
                break;

            case '距离测量':
                toolBarInteractions['distanceInteraction'].setActive(true);
                break;

            case '面积测量':
                toolBarInteractions['areaInteraction'].setActive(true);
                break;

            case '绘制饼图':
            case '绘制柱状图':
                /*  var chartLayer = __this.map.getLayerById('chartsLayer');
                 if (chartLayer) {
                     __this.map.removeLayer(chartLayer);
                 }
                 chartLayer = new ExcChartLayer({
                     name: 'chartsLayer',
                     dataUrl: '/data/tk_kfk.json',
                     // features: Config.chartData,
                     type: type == '绘制饼图' ? 'pie' : 'bar',
                 });
                 __this.map.addLayer(chartLayer); */
                break;

            case '绘制Echart饼图':
            case '绘制Echart柱状图':
                if (this.echartLayer) {
                    this.echartLayer.remove();
                }
                this.echartLayer = new Charts({
                    data: Config.chartData.features,
                    type: type == '绘制Echart饼图' ? 'pie' : 'bar',
                }).getChartsLayer();
                this.echartLayer.appendTo(__this.map);
                break;
            default:
                break;
        }
    }
}