/**
 * 业务消息接收发送
 * @author ydx
 * @date 2019-04-15
 */
import '../../../ol/plugins/frmp/rfmp'
export default class GIS_Event_RFMPON {
    constructor(param) {
        this.map = param.map;
    };

    send() {
        //地图加载完成
        this.map.once('postrender', ((evt) => {
            RFMP.send('mapRendered', true, null, true);
        }));
    }

    on() {
        //接收框选菜单内容消息 通用：饼图、柱状图 ydx 2019-03-21
        RFMP.on("GIS_InChartsJson", function(options) {


        });

        //统计图数据加载
        RFMP.on("GIS_ChartDataLoad", function(data) {

        });

        RFMP.on("mapRendered", function(data) {
            console.log(data);

        });
    }
}