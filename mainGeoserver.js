import './src/project/mianCss.js';
import Config from './src/ol/config/config';
import Util from './src/ol/utils/Util';
import TranformUtil from './src/ol/utils/TransFormUtil';
import MapSub from './src/ol/compenents/MapSub';
import OSRMService from './src/ol/compenents/service/OSRMService';
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
//layers
import { GeoTileLayers, GeoTileLayer, GeoImageLayer } from './src/project/mainLayers';
import XYZLayer from './src/ol/compenents/Layers/tile/raster/XYZLayer';
import WMTSLayer from './src/ol/compenents/Layers/tile/vector/WMTSLayer'

const mapServerUrl = "http://localhost:8080/geoserver/localhost/";
//获取配置范围
const mapConfig = Config.getMapConfig(Util.getQueryString('App'));

const osrmService = new OSRMService({
    url: 'https://router.project-osrm.org',
});
//栅格wms服务
/* const geoserverWMSLayer = new GeoImageLayer({
    id: "geoserverWMSLayer",
    title: "geoserverWMSLayer",
    url: mapServerUrl,
    params: {
        layers: "localhost:planet_osm_roads",
    },
}); 
//栅格切片
const cityRasterTilesLayer = new GeoTileLayer({
    url: '/geoserver/localhost',
    params: {
        layers: 'localhost:planet_osm_roads',
        STYLES: 'line',
    },
})*/
const cityRasterTilesLayer = new XYZLayer({
        id: "GLOBAL_WEBMERCATOR",
        title: "GLOBAL_WEBMERCATOR",
        url: 'http://10.88.104.240:8060/wmts/Gaode/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
    }),
    cityVectorTilesLayer = new WMTSLayer({
        id: "cityVectorTilesLayer",
        title: "cityVectorTilesLayer",
        url: '/geoserver/gwc/service/wmts',
        format: 'application/vnd.mapbox-vector-tile',
        // format: 'application/json;type=geojson',
        layer: 'localhost:planet_osm_roads',
        gridsetName: 'EPSG:90013',
        style: 'line'
    })

//初始化地图
const map = new MapSub({
    targetId: 'map',
    projection: Config.mapConfig['projection'],
    layers: [cityRasterTilesLayer, cityVectorTilesLayer],
    transFormUtil: new TranformUtil({
        source: 'EPSG:4326',
        destination: Config.mapConfig['projection'],
    }),
});

//layers
const {
    //地形地貌图、影像图、行政区划图集合
    geoTileLayers,
} = {
    geoTileLayers: new GeoTileLayers(),
};

//baseLayers
// const tileLayerGroup = geoTileLayers.getLayerGroup();
// map.setLayerGroup(tileLayerGroup);
map.getView().fit(map.getTransFormUtil().transformExtent(Util.getExtentArray(mapConfig['mapFullExtent'])));

const { overviewMapControl } = {
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
// osrm
osrmService.routeService({
        coordinates: [
            [13.38886, 52.517037],
            [13.428555, 52.523219],
        ],
        geometries: 'geojson',
    },
    (errors, results) => {
        if (!errors) {
            results;
        }
    }
);