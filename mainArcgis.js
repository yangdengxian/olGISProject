const serverType = 'arcgis';
import Config from './src/ol/config/config';
import Util from './src/ol/utils/Util';
import TranformUtil from './src/ol/utils/TransFormUtil';

import MapSub from './src/ol/compenents/Map';

//esri离线切片服务
import ArcGISTileLayers from './src/ol/compenents/Layers/arcgis/ArcGISTileLayer';
//图层组
import ArcgisLayerGroup from './src/ol/compenents/Layers/arcgis/ArcgisLayerGroup';
import GroupLayers from './src/ol/compenents/Layers/GroupLayers';
//演示图层 ydx 2019-05-14
import GeoImageLayer from './src/ol/compenents/Layers/geoserver/GeoImageLayer';

//要素图层
import VectorLayer from './src/ol/compenents/Layers/VectorLayer';

//鹰眼图
import OverviewMapControl from './src/ol/compenents/controls/overviewMap/OverviewMapControl';
//比例尺
import ScaleBarControl from './src/ol/compenents/controls/scalebar/ScaleBarControl';
//导航条
import ZoomSildweControl from './src/ol/compenents/controls/zoomSlider/ZoomSlider';
//底图切换
import BaseLayerSwitcherImageControl from './src/ol/compenents/controls/switchLayer/BaseLayerSwitcherImageControl';
//图层控制
import ThemeLayersSwitchControl from './src/ol/compenents/controls/switchLayer/ThemeLayersSwitchControl';
//图例
import LegendControl from './src/ol/compenents/controls/Legend/LegendControl';


//框选缩放
import DragZoomInteraction from './src/ol/compenents/interactions/Draw/DragZoomInteraction';
//框选查询
import DragBoxInteraction from './src/ol/compenents/interactions/Draw/DragBoxInteraction';
//测量
import AreaInteraction from './src/ol/compenents/interactions/Draw/measure/AreaInteraction';
import DistanceInteraction from './src/ol/compenents/interactions/Draw/measure/DistanceInteraction';


//菜单
import ToolBarTask from './src/ol/compenents/task/ToolBarTask';

//消息机制
import GIS_Event_RFMPON from './src/project/js/rfmp/GIS_Event_RFMPON';


//获取配置范围
const mapConfig = Config.getMapConfig(Util.getQueryString("App"));

//初始化地图
const map = new MapSub({
    targetId: 'map',
    projection: Config.mapConfig["projection"],
    transFormUtil: new TranformUtil({
        source: 'EPSG:4326',
        destination: Config.mapConfig["projection"],
    })
});

const {
    arcGISTileLayers,
    vectorLayer,
    mapServer,
    d_mapServer,
    groupLayers, //专题图层组
} = {
    arcGISTileLayers: new ArcGISTileLayers(),
    vectorLayer: new VectorLayer({
        id: "queryFeaturesLayer",
        map: map
    }),
    mapServer: new ArcgisLayerGroup({
        id: "wellGroupLayer"
    }),
    d_mapServer: new ArcgisLayerGroup({
        id: "wellPotionsGroupLayer"
    }),
    groupLayers: new GroupLayers({
        id: "themeGroupLayer",
        title: "专题图层组"
    })
}

const {
    overviewMapControl,
    scaleBarControl,
    zoomSildweControl,
    baseLayerSwitcherImageControl,
    themeLayersSwitchControl,
    legendControl,
    dragBoxInteraction,
    dragZoomInteraction,
    areaInteraction,
    distanceInteraction,
} = {
    overviewMapControl: new OverviewMapControl({
        layers: arcGISTileLayers.getTileLayers(),
        collapsed: true, //初始是否关闭鹰眼,
        map: map
    }),
    scaleBarControl: new ScaleBarControl({
        minWidth: 140,
        units: "metric"
    }),

    zoomSildweControl: new ZoomSildweControl(),
    baseLayerSwitcherImageControl: new BaseLayerSwitcherImageControl({
        trash: true,
        show_progress: true
    }),
    themeLayersSwitchControl: new ThemeLayersSwitchControl(),
    legendControl: new LegendControl({
        title: '图例',
        // style: getFeatureStyle,
        collapsed: true
    }),

    dragBoxInteraction: new DragBoxInteraction(),
    dragZoomInteraction: new DragZoomInteraction(),
    areaInteraction: new AreaInteraction({
        map: map
    }),
    distanceInteraction: new DistanceInteraction({
        map: map
    }),
}

//图例

map.addControl(legendControl);

//设置底图图层
const tileLayerGroup = arcGISTileLayers.getLayerGroup();
map.setLayerGroup(tileLayerGroup);
// tileLayerGroup.setExtent(Util.getExtentArray(mapConfig["mapFullExtent"]));
map.getView().fit(
    map.getTransFormUtil()
    .transformExtent(
        Util.getExtentArray(mapConfig["mapFullExtent"])));

mapServer.addImageLayers(mapConfig.mapUrl, {}).then((layers) => {
    legendControl.addRows(layers);
});

if (mapConfig.d_mapUrl[0]) {
    d_mapServer.addImageLayers(mapConfig.d_mapUrl[0], {}).then((layers) => {});
    groupLayers.addLayers([d_mapServer, mapServer]);
} else {
    groupLayers.addLayers([mapServer]);
}


map.addLayer(groupLayers);

//演示图层 ydx 2019-05-14
map.addLayer(new GeoImageLayer(Config.WMSImageLayers["tkq"]));
map.addLayer(new GeoImageLayer(Config.WMSImageLayers["ckq"]));
//查询结果
map.addLayer(vectorLayer);
//添加鹰眼
map.addControl(overviewMapControl);
//添加比例尺
map.addControl(scaleBarControl);
//添加导航条
map.addControl(zoomSildweControl);
//底图切换
map.addControl(baseLayerSwitcherImageControl);
//专题图层控制
map.addControl(themeLayersSwitchControl);


//框选
map.addInteraction(dragZoomInteraction);
dragZoomInteraction.setActive(false);
map.addInteraction(dragBoxInteraction);
dragBoxInteraction.setActive(false);
dragBoxInteraction.on('boxstart', dragBoxInteraction.drawStartHandler);
dragBoxInteraction.on('boxend', dragBoxInteraction.drawEndHandler);

//测量
map.addInteraction(areaInteraction);
areaInteraction.addMeasureLayer();
areaInteraction.setActive(false);
areaInteraction.on('drawstart', areaInteraction.drawStartHandler);
areaInteraction.on('drawend', areaInteraction.drawEndHandler);

//测量
map.addInteraction(distanceInteraction);
distanceInteraction.addMeasureLayer();
distanceInteraction.setActive(false);
distanceInteraction.on('drawstart', distanceInteraction.drawStartHandler);
distanceInteraction.on('drawend', distanceInteraction.drawEndHandler);

map.on('pointermove', (evt) => {
    if (areaInteraction.getActive()) {
        areaInteraction.pointerMoveHandler(evt);
    } else if (distanceInteraction.getActive()) {
        distanceInteraction.pointerMoveHandler(evt);
    }
});
map.getViewport().addEventListener('mouseout', (evt) => {
    if (areaInteraction.getActive()) {
        areaInteraction.pointerMoveHandler(evt);
    } else if (distanceInteraction.getActive()) {
        distanceInteraction.pointerMoveHandler(evt);
    }
});

// 菜单事件绑定
const toolBarTask = new ToolBarTask({
    map: map,
    mapFullExtent: Util.getExtentArray(mapConfig["mapFullExtent"]),
    toolBarId: "bs-navbar-collapse",
    toolBarInteractions: {
        dragZoomInteraction: dragZoomInteraction,
        areaInteraction: areaInteraction,
        distanceInteraction: distanceInteraction,
        dragBoxInteraction: dragBoxInteraction
    }
});
toolBarTask.bindClickEvent();

//消息机制
const gIS_Event_RFMPON = new GIS_Event_RFMPON({
    map: map
});

gIS_Event_RFMPON.send('mapRendered', true);
gIS_Event_RFMPON.on();