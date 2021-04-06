import './src/cesium/UI/UI.min.css';
import './src/cesium/UI/UI.css';
//ol
import 'ol/ol.css';


import './src/cesium/UI/map.css';
import Config from './src/ol/config/config';
import './src/cesium/UI/UIView';
import TranformUtil from './src/ol/utils/TransFormUtil';
import MapSub from './src/ol/compenents/MapSub';

//layers
import XYZLayer from './src/ol/compenents/Layers/tile/raster/XYZLayer';
import VectorLayer from './src/ol/compenents/Layers/VectorLayer'
//controls
import {
    OverviewMapControl,
    scaleBarControl,
    zoomSilderControl,
    baseLayerSwitcherImageControl,
    themeLayersSwitchControl,
    printControl,
    legendControl,
} from './src/project/mainControls';

import WFST from './src/ol/compenents/format/WFST'
import GeoJSON from 'ol/format/GeoJSON';


import ToolBarTask from './src/cesium/widgets/task/ToolBarTask';

//三维 ydx 2019-05-14
import OL3DCesium from './src/cesium/OL3DCesium'
import MeasureWidget from './src/cesium/widgets/measure/MeasureWidget'
import DrawBoxWidget from './src/cesium/widgets/draw/DrawBoxWidget'
// import { createModel, createTileSet } from './src/cesium/dataSources/Model'
import GLTFEntity from './src/cesium/dataSources/GLTFEntity'

const geojsonFormat = new GeoJSON();


//获取配置范围
const mapConfig = Config.mapConfig;
//layers
const administratorLayer = new XYZLayer({
        id: "cityRasterTilesLayer",
        title: "行政区划",
        baseLayer: true,
        url: 'http://www.pcep.cloud/ogc/wmts/Richfit_Map/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
    }),
    satelliteLayer = new XYZLayer({
        id: "satelliteLayer",
        title: "影像",
        baseLayer: true,
        url: 'http://www.pcep.cloud/ogc/wmts/Richfit_Satellite/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
    }),
    terrainLayer = new XYZLayer({
        id: "terrainLayer",
        title: "地形",
        baseLayer: true,
        url: 'http://www.pcep.cloud/ogc/wmts/Richfit_Terrain/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
    }),
    wellTilesLayer = new XYZLayer({
        id: "wellTilesLayer",
        title: "井",
        thmemeLayer: true,
        displayInLayerSwitcher: true,
        url: 'http://www.pcep.cloud/ogc/wmts/mv_geo_wellhead_prd/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
    }),
    wellFeaturesLayer = new VectorLayer({
        id: 'wellFeaturesLayer',
        isThmemeLayer: true,
        displayInLayerSwitcher: true,
    });
//初始化地图
const map = new MapSub({
    targetId: 'map',
    projection: Config.mapConfig['projection'],
    layers: [terrainLayer, satelliteLayer, administratorLayer],
    transFormUtil: new TranformUtil({
        source: 'EPSG:4326',
        destination: Config.mapConfig['projection'],
    }),
});
map.addLayer(wellTilesLayer);
map.addLayer(wellFeaturesLayer);
map.getView().fit(map.getTransFormUtil().transformExtent(mapConfig['extent']));

const { overviewMapControl } = {
    overviewMapControl: new OverviewMapControl({
        map: map,
        layers: [terrainLayer, satelliteLayer, administratorLayer],
        collapsed: true, //初始是否关闭鹰眼
    }),
};
//controls
map.addControl(overviewMapControl);
//添加比例尺
map.addControl(scaleBarControl);
//添加导航条
map.addControl(zoomSilderControl);
//底图切换
map.addControl(baseLayerSwitcherImageControl);
//专题图层控制
map.addControl(themeLayersSwitchControl);
//打印控件
map.addControl(printControl);
//图例
map.addControl(legendControl);

const ol3DCesium = new OL3DCesium({
    map: map
});
ol3DCesium.setEnabled(true);

const measureWidget = new MeasureWidget({
        olCesium: ol3DCesium
    }),
    drawBoxWidget = new DrawBoxWidget({
        olCesium: ol3DCesium
    });

// 菜单事件绑定
const toolBarTask = new ToolBarTask({
    camera: ol3DCesium.camera_,
    mapFullExtent: mapConfig['extent'],
    toolBarId: 'bs-navbar-collapse',
    toolBarInteractions: {
        distanceInteraction: measureWidget,
        areaInteraction: measureWidget,
        drawBoxInteraction: drawBoxWidget
    },
});

const wfst = new WFST({
    url: "http://a6-geoserver.a6-dev.dev.pcep.cloud/geoserver/pcep/wfs"
})
window.onmessage = (evt) => {
    var messageObj = evt.data;
    if (messageObj["event"] == "GIS_CesiumDrawBoxEnd") {
        var drawPolygon = geojsonFormat.readGeometry(messageObj["data"]);
        wfst.loadFeatures({
            srsName: "EPSG:4326",
            featurePrefix: "pcep",
            featureTypes: ["mv_geo_wellhead_prd"],
            // filter: Intersects("wellhead_coordinates", drawPolygon),
            bbox: drawPolygon.getExtent(),
            geometryName: "wellhead_coordinates",
        }).then(features => {
            features;
            features.forEach(feature => {
                var geometry = feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
                feature.setGeometry(geometry)
            });
            wellFeaturesLayer.addFeatures(features)
        })
    }
};
toolBarTask.bindClickEvent();


var entities = ol3DCesium.getDataSourceDisplay().defaultDataSource.entities;
var gltfEntity = new GLTFEntity({
    name: 'gltfEntity',
    label: {
        "text": "tom"
    },
    model: {
        uri: './examples/data/gltf/BoomBox/glTF-Binary/BoomBox.glb',
    },
    position: [...mapConfig["center"], 0],
    properties: {
        "type": "gltf",
        "name": "tom",
        "age": 12
    },
    ol3DCesium: ol3DCesium
})


// Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxODg4ZTVkMi1kY2I0LTQ0NWYtYThhZS1kNzliZDM0M2UzMmQiLCJpZCI6MTIwNzAsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyIsInByIl0sImlhdCI6MTU5NTM4NjIwN30.fgx4fLHagcVG8HxDsOebpgoBuMwC56n1_btZLacSL3s";
entities.add(gltfEntity);

var nameOverlay = document.createElement("div");
ol3DCesium.container_.appendChild(nameOverlay);
nameOverlay.className = "backdrop";
nameOverlay.style.display = "block";
nameOverlay.style.position = "absolute";
nameOverlay.style.bottom = "0";
nameOverlay.style.left = "0";
nameOverlay.style["pointer-events"] = "none";
nameOverlay.style.padding = "4px";
nameOverlay.style.backgroundColor = "black";


var handler = new Cesium.ScreenSpaceEventHandler(ol3DCesium.scene_.canvas);

handler.setInputAction(function(movement) {

    var feature = ol3DCesium.scene_.pick(movement.position);
    feature.id.model.color = Cesium.Color.YELLOW;
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);