/**
 * 业务消息接收发送
 * @author ydx
 * @date 2019-04-15
 */
import '../../../ol/plugins/frmp/rfmp'
//图标
import Charts from '../../js/charts/Charts';
import MultiPoint from 'ol/geom/MultiPoint';

export default class GIS_Event_RFMPON {
    constructor(param) {
        this.map = param.map;
        //图标
        this.echartLayer = null;
    };
    /**
     * 消息发送
     * @param {*} event 事件类型
     * @param {String} data 数据，json.stringfy()格式化
     */
    send(event, data) {
        var __this = this;
        RFMP.send(event, data, null, true);
    }

    on() {
        var __this = this;
        //接收框选菜单内容消息 通用：饼图、柱状图 ydx 2019-03-21
        RFMP.on("drawChartStart", function(options) {
            var data = JSON.parse(options);
            if (__this.echartLayer) {
                __this.echartLayer.remove();
            }
            __this.echartLayer = new Charts({
                data: data["data"],
                type: data["type"],
                map: __this.map
            }).getChartsLayer();

            if (!__this.echartLayer) {
                throw new Error("没有合适的图标类型");
            } else {

                __this.echartLayer.appendTo(__this.map);

                //chart图标绑定click事件
                __this.echartLayer.$chart.on('click', (evt) => {
                    //发送点击事件
                    __this.send('chartClicked', JSON.stringify(evt));
                });

                //数据加载完成
                __this.send('chartDataLoaded', JSON.stringify(data["data"]));
            }



        }, true);

        //统计图数据加载
        RFMP.on("chartDataLoaded", function(data) {
            var points = [],
                multipoint;
            data = JSON.parse(data);
            if (!data) return;
            data.forEach(function(obj) {
                points.push(__this.map.getTransFormUtil().fromLonLat(obj["geometry"]["coordinates"]));
            });
            multipoint = new MultiPoint(points);
            __this.map.getView().fit(multipoint);
        }, true);

        //切换二维地图缩放级别，客户端postMessage
        /* window.addEventListener('message', event => {
            const data = event.data;
            __this.map.getView().setZoom(data.zoom || 9);
        }); */
    }
}