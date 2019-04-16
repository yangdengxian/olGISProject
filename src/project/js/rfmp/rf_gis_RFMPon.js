/**
 * 业务消息接收发送
 * @author ydx
 * @date 2019-04-15
 */
import $ from '';
import Map from '';
$(function() {
    //接收框选菜单内容消息 通用：饼图、柱状图 ydx 2019-03-21
    RFMP.on("GIS_InChartsJson", function(options) {
        var layerid = "",
            layerJsUrl = "",
            StatiisticsLayer = {};
        switch (options["chartType"]) {
            case "pie":
                layerid = "PieLayer";
                layerJsUrl = "extend.PieLayer";
                options.id = layerid;
                dojo.require(layerJsUrl);
                StatiisticsLayer = extend.PieLayer;
                break;

            case "bar":
                layerid = "BarLayer";
                layerJsUrl = "extend.BarLayer";
                options.id = layerid;
                dojo.require(layerJsUrl);
                StatiisticsLayer = extend.BarLayer;
                break;

            case "line":
                layerid = "LineLayer";
                layerJsUrl = "extend.LineLayer";
                options.id = layerid;
                dojo.require(layerJsUrl);
                StatiisticsLayer = extend.LineLayer;
                break;

            default:
                break;
        }

        var lyr = Map.getLayer(layerid);
        if (lyr != null) {
            Map.removeLayer(lyr);
        }

        var pielayer = new StatiisticsLayer(options);
        Map.addLayer(pielayer);

    });

    //统计图数据加载
    RFMP.on("GIS_ChartDataLoad", function(data) {
        var points = [],
            mpJson = { "spatialReference": { " wkid": 4326 } },
            multipoint;
        if (!data) return;
        data.forEach(function(obj) {
            points.push(obj["geometry"]["coordinates"]);
        });
        mpJson["points"] = points;
        multipoint = new esri.geometry.Multipoint(mpJson);
        if (window.ExtendWedgit) {
            ExtendWedgit.zoomByExtent(Map, multipoint.getExtent());
        }
    });
});