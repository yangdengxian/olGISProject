import './src/project/mianCss.js';
import Config from './src/ol/config/config';
import Util from './src/ol/utils/Util';
import TranformUtil from './src/ol/utils/TransFormUtil';
import MapSub from './src/ol/compenents/MapSub';
import { within as Within, intersects as Intersects } from 'ol/format/filter';

//controls
import {
    OverviewMapControl,
    scaleBarControl,
    zoomSilderControl,
    baseLayerSwitcherImageControl,
    themeLayersSwitchControl,
    printControl,
    legendControl
} from './src/project/mainControls';
//layers
import { GeoTileLayers, VectorLayer, GeoImageLayer, GeoTileLayer } from './src/project/mainLayers';
//interactions
import { DragZoomInteraction, DragBoxInteraction, AreaInteraction, DistanceInteraction } from './src/project/mainInteractions';

//弹窗覆盖物
import { wellPopupFeatureOverlay, workerPopupFeatureOverlay, planePopupFeatureOverlay, bufferOverlay } from './src/project/mainOverlays';

//菜单
import ToolBarTask from './src/ol/compenents/task/ToolBarTask';
import WorkerFeatureLayer from './src/project/js/featureLayers/WorkerFeatureLayer.js';
import PlaneFeatureLayer from './src/project/js/featureLayers/PlaneFeatureLayer.js';
import GeoserverIdentifyTask from './src/ol/compenents/task/geoserver/GeoserverIdentifyTask.js';

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

//layers
const {
    //单井要素层
    wellFeatureLayer,
    //无人机实时定位图层
    planePositionFeatureLayer,
    //集输管线现场巡检人员实时定位
    workerPositionFeatureLayer,
    //集输管道要素层
    pipelineFeatureLayer,
    //OGM要素层
    ogmFeatureLayer,
    //CPF要素层
    cpfFeatureLayer,
    //单井层
    cpeWellImageLayer,
    //集输管道层
    pipelineImageLayer,
    //OGM层
    ogmImageLayer,
    //地形地貌图、影像图、行政区划图集合
    geoTileLayers,
    //国界
    boundaryPolyImageLayer,
} = {
    wellFeatureLayer: new VectorLayer({
        id: "wellFeatureLayer",
        map: map
    }),
    //airplane position
    planePositionFeatureLayer: new PlaneFeatureLayer({
        id: "planePositionFeatureLayer",
        map: map,
        intervalTime: 20
    }),
    //巡检人员定位
    workerPositionFeatureLayer: new WorkerFeatureLayer({
        id: "workerPositionFeatureLayer",
        map: map,
        intervalTime: 10
    }),
    pipelineFeatureLayer: new VectorLayer({
        id: "pipelineFeatureLayer",
        map: map
    }),
    ogmFeatureLayer: new VectorLayer({
        id: "ogmFeatureLayer",
        map: map
    }),
    cpfFeatureLayer: new VectorLayer({
        id: "cpfFeatureLayer",
        map: map
    }),

    cpeWellImageLayer: new GeoImageLayer({
        id: "wellsImage",
        title: "wellsImage",
        isThmemeLayer: true,
        displayInLayerSwitcher: true,
        url: mapConfig.mapUrl,
        layerNames: ['tab_geo_welllhead'],
        projection: map.getView().getProjection(),
    }),

    pipelineImageLayer: new GeoImageLayer({
        id: "pipelineImage",
        title: "pipelineImage",
        isThmemeLayer: true,
        displayInLayerSwitcher: true,
        url: mapConfig.mapUrl,
        layerNames: ['pipeline_line_tab'],
        projection: map.getView().getProjection(),
    }),

    ogmImageLayer: new GeoImageLayer({
        id: "ogmImage",
        title: "ogmImage",
        isThmemeLayer: true,
        displayInLayerSwitcher: true,
        url: mapConfig.mapUrl,
        layerNames: ['ogm_poly_tab'],
        projection: map.getView().getProjection(),
    }),

    geoTileLayers: new GeoTileLayers(),

    boundaryPolyImageLayer: new GeoImageLayer({
        id: "boundaryPolyImage",
        title: "boundaryPolyImage",
        isThmemeLayer: false,
        displayInLayerSwitcher: false,
        url: mapConfig.mapUrl,
        layerNames: ['Iraq_administration_a_free'],
        projection: map.getView().getProjection(),
    }),
}
//baseLayers
const tileLayerGroup = geoTileLayers.getLayerGroup();
map.setLayerGroup(tileLayerGroup);
map.getView().fit(
    map.getTransFormUtil()
    .transformExtent(
        Util.getExtentArray(mapConfig["mapFullExtent"])));
//poly
map.addLayer(boundaryPolyImageLayer);
map.addLayer(ogmImageLayer);
ogmImageLayer.on('singleclick', evt => {
    const bufferPoly = bufferOverlay.createBuffer(bufferOverlay.createGeometry(evt.event.coordinate), 100);
    const identifyTask = new GeoserverIdentifyTask(
        mapConfig["mapUrl"], {
            filter: Intersects(mapConfig["geometryName"], bufferPoly, Config.mapConfig.projection),
            featurePrefix: mapConfig["featurePrefix"],
            queryNames: ["ogm_poly_tab"],
            srsName: Config.mapConfig.projection
        }
    );
    identifyTask.execute().then(features => {
        if (Array.isArray(features) && features.length) {
            openFeaturePopup(evt.event.coordinate, features[0], wellPopupFeatureOverlay);
        }
    });
});
//line
map.addLayer(pipelineImageLayer);
pipelineImageLayer.on('singleclick', evt => {
    const bufferPoly = bufferOverlay.createBuffer(bufferOverlay.createGeometry(evt.event.coordinate), 100);
    const identifyTask = new GeoserverIdentifyTask(
        mapConfig["mapUrl"], {
            filter: Intersects(mapConfig["geometryName"], bufferPoly, Config.mapConfig.projection),
            featurePrefix: mapConfig["featurePrefix"],
            queryNames: ["pipeline_line_tab"],
            srsName: Config.mapConfig.projection
        }
    );
    identifyTask.execute().then(features => {
        if (Array.isArray(features) && features.length) {
            openFeaturePopup(evt.event.coordinate, features[0], wellPopupFeatureOverlay);
        }
    });
});
//point
map.addLayer(cpeWellImageLayer);
cpeWellImageLayer.on('singleclick', evt => {
    const bufferPoly = bufferOverlay.createBuffer(bufferOverlay.createGeometry(evt.event.coordinate), 1000);
    const identifyTask = new GeoserverIdentifyTask(
        mapConfig["mapUrl"], {
            filter: Within(mapConfig["geometryName"], bufferPoly, Config.mapConfig.projection),
            featurePrefix: mapConfig["featurePrefix"],
            queryNames: mapConfig["queryNames"],
            srsName: Config.mapConfig.projection
        }
    );
    identifyTask.execute().then(features => {
        if (Array.isArray(features) && features.length) {
            openFeaturePopup(evt.event.coordinate, features[0], wellPopupFeatureOverlay);
        }

    });
});
map.addLayer(cpfFeatureLayer);
map.addLayer(ogmFeatureLayer);
map.addLayer(pipelineFeatureLayer);
map.addLayer(workerPositionFeatureLayer);
workerPositionFeatureLayer.loadFeatures();
map.addLayer(planePositionFeatureLayer);
planePositionFeatureLayer.loadFeatures();
planePositionFeatureLayer.on("singleclick", (evt) => {
    var sb = '<video width="600" height="400" controls=true autoplay loop>';
    sb += '<source src=' + Config.files.videoUrl + ' type="audio/mp4">';
    sb += '</video>';
    planePopupFeatureOverlay.openPopup(evt.feature.getGeometry().getFirstCoordinate(), sb);
});
planePositionFeatureLayer.on('change', e => {
    planePopupFeatureOverlay.closePopup();

});
map.addLayer(wellFeatureLayer);

const {
    overviewMapControl,
} = {
    overviewMapControl: new OverviewMapControl({
        map: map,
        layers: geoTileLayers.getTileLayers(),
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
Config.mapLayerStyles.forEach(style => {
    legendControl.addRow(style);
});

const {
    dragBoxInteraction,
    dragZoomInteraction,
    areaInteraction,
    distanceInteraction,
} = {
    dragBoxInteraction: new DragBoxInteraction(),
    dragZoomInteraction: new DragZoomInteraction(),
    areaInteraction: new AreaInteraction({
        map: map
    }),
    distanceInteraction: new DistanceInteraction({
        map: map
    }),

}

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

//弹窗覆盖物
map.addOverlay(wellPopupFeatureOverlay);
map.addOverlay(workerPopupFeatureOverlay);
map.addOverlay(planePopupFeatureOverlay);

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

//地图事件
map.on('pointermove', (evt) => {
    measurePointerMoveHandler(evt);
});

map.on('singleclick', e => {
    map.forEachFeatureAtPixel(e.pixel, feature => {
        switch (feature.get("pid")) {
            case "planePositionFeatureLayer":
                planePositionFeatureLayer.dispatchEvent({
                    type: "singleclick",
                    feature: feature
                });
                break;

            case "workerPositionFeatureLayer":
                workerPositionFeatureLayer.dispatchEvent({
                    type: "singleclick",
                    feature: feature
                });
                break;
        }

    });

    cpeWellImageLayer.dispatchEvent({
        type: "singleclick",
        event: e
    });

    pipelineImageLayer.dispatchEvent({
        type: "singleclick",
        event: e
    });

    ogmImageLayer.dispatchEvent({
        type: "singleclick",
        event: e
    });
});

/**
 * @description 测量回调函数
 * @param {*} evt 
 */
function measurePointerMoveHandler(evt) {
    if (areaInteraction.getActive()) {
        areaInteraction.pointerMoveHandler(evt);
    } else if (distanceInteraction.getActive()) {
        distanceInteraction.pointerMoveHandler(evt);
    }
}

/**
 * @description 打开弹窗
 * @param {Coordinate} coordinate 弹框位置
 * @param {*} mapFeature 
 * @param {PopupFeatureOverlay} popupFeatureOverlay
 */
function openFeaturePopup(coordinate, mapFeature, popupFeatureOverlay) {
    if (!mapFeature.getId()) return;
    var content = "",
        properties = mapFeature.getProperties();
    for (const key in properties) {
        if (properties.hasOwnProperty(key) && (typeof properties[key] != 'object')) {
            const value = properties[key];
            content += key + "：" + value + "<br>";
        }
    }
    popupFeatureOverlay.openPopup(coordinate, content);
}