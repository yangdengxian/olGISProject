/**
 * 测试
 */
import 'jquery/dist/jquery.min';
import Config from './src/ol/config/config';
import Util from './src/ol/utils/Util';
//UI
import './src/ol/compenents/UI/UIView';

import MapSub from './src/ol/compenents/Map';

//esri离线切片服务
import ArcGISTileLayers from './src/ol/compenents/Layers/arcgis/ArcGISTileLayer';

//底图切换
import BaseLayerSwitcherImageControl from './src/ol/compenents/controls/switchLayer/BaseLayerSwitcherImageControl';


//获取配置范围
const mapConfig = Config.getMapConfig(Util.getQueryString("App"));

//初始化地图
const map = new MapSub({
    targetId: 'map',
    projection: Config.mapConfig["projection"]
})

const {
    arcGISTileLayers,
} = {
    arcGISTileLayers: new ArcGISTileLayers(),

}

const {

    baseLayerSwitcherImageControl,

} = {

    baseLayerSwitcherImageControl: new BaseLayerSwitcherImageControl({
        trash: true,
        show_progress: true
    }),

}


//设置底图图层
const tileLayerGroup = arcGISTileLayers.getLayerGroup();
map.setLayerGroup(tileLayerGroup);
// tileLayerGroup.setExtent(Util.getExtentArray(mapConfig["mapFullExtent"]));
map.getView().fit(Util.getExtentArray(mapConfig["mapFullExtent"]));

//底图切换
map.addControl(baseLayerSwitcherImageControl);