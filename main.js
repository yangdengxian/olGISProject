import Config from './src/ol/config/config';
import Util from './src/ol/utils/Util';
//UI
import './src/ol/compenents/UI/UIView';

import map from './src/ol/compenents/Map';

//esri离线切片服务
import ArcGISTileLayers from './src/ol/compenents/Layers/arcgis/ArcGISTileLayer';
import ArcGISImageLayers from './src/ol/compenents/Layers/arcgis/ArcGISImageLayers';
//鹰眼图
import OverviewMapControl from './src/ol/compenents/controls/overviewMap/OverviewMapControl';
//比例尺
import ScaleBarControl from './src/ol/compenents/controls/scalebar/ScaleBar';
//导航条
import ZoomSildweControl from './src/ol/compenents/controls/zoomSlider/ZoomSlider';
//框选缩放
import DragZoomControl from './src/ol/compenents/controls/Draw/DragZoomControl';
//测量
import AreaControl from './src/ol/compenents/controls/Draw/measure/AreaControl';
import DistanceControl from './src/ol/compenents/controls/Draw/measure/DistanceControl';

//菜单
import ToolBarTask from './src/ol/compenents/task/ToolBarTask';

//底图切换
import LayerSwitcherImageControl from './src/ol/compenents/controls/switchLayer/LayerSwitcherImageControl';


const arcGISTileLayers = new ArcGISTileLayers();

const {
    mapServer,
    d_mapServer
} = {
    mapServer: new ArcGISImageLayers(Config.getMapConfig(Util.getQueryString("App")).mapUrl),
    d_mapServer: new ArcGISImageLayers(Config.getMapConfig(Util.getQueryString("App")).d_mapUrl)
}

const {
    overviewMapControl,
    scaleBarControl,
    zoomSildweControl,
    dragZoomControl,
    areaControl,
    distanceControl,
    layerSwitcherImageControl
} = {
    overviewMapControl: new OverviewMapControl({
        layers: arcGISTileLayers.getTileLayers(),
        collapsed: true //初始是否关闭鹰眼
    }),
    scaleBarControl: new ScaleBarControl({
        minWidth: 140,
        units: "metric"
    }),

    zoomSildweControl: new ZoomSildweControl(),
    dragZoomControl: new DragZoomControl(),
    areaControl: new AreaControl({
        map: map
    }),
    distanceControl: new DistanceControl({
        map: map
    }),
    layerSwitcherImageControl: new LayerSwitcherImageControl({
        trash: true,
        show_progress: true
    })
}


//设置底图图层
map.setLayerGroup(arcGISTileLayers.getLayerGroup());
// map.addLayer(mapServer);
// map.addLayer(d_mapServer);

//添加鹰眼
map.addControl(overviewMapControl);
//添加比例尺
map.addControl(scaleBarControl);
//添加导航条
map.addControl(zoomSildweControl);
//地图切换
map.addControl(layerSwitcherImageControl);

//框选
map.addInteraction(dragZoomControl);
dragZoomControl.setActive(false);

//测量
map.addInteraction(areaControl);
areaControl.addMeasureLayer();
areaControl.setActive(false);
areaControl.on('drawstart', areaControl.drawStartHandler);
areaControl.on('drawend', areaControl.drawEndHandler);

map.addInteraction(distanceControl);
distanceControl.addMeasureLayer();
distanceControl.setActive(false);
distanceControl.on('drawstart', distanceControl.drawStartHandler);
distanceControl.on('drawend', distanceControl.drawEndHandler);

map.on('pointermove', (evt) => {
    if (areaControl.getActive()) {
        areaControl.pointerMoveHandler(evt);
    } else if (distanceControl.getActive()) {
        distanceControl.pointerMoveHandler(evt);
    }
});
map.getViewport().addEventListener('mouseout', (evt) => {
    if (areaControl.getActive()) {
        areaControl.pointerMoveHandler(evt);
    } else if (distanceControl.getActive()) {
        distanceControl.pointerMoveHandler(evt);
    }
});

// 菜单事件绑定
const toolBarTask = new ToolBarTask({
    toolBarId: "bs-navbar-collapse",
    toolBarControls: {
        dragZoomControl: dragZoomControl,
        areaControl: areaControl,
        distanceControl: distanceControl
    }
});
toolBarTask.bindClickEvent();