import './src/project/mianCss.js';
import Config from './src/ol/config/config';
// import Util from './src/ol/utils/Util';
import TranformUtil from './src/ol/utils/TransFormUtil';
import MapSub from './src/ol/compenents/MapSub';
//三维 ydx 2019-05-14
// import OL3DCesium from './src/cesium/widgets/OL3DCesium'
// import OSRMService from './src/ol/compenents/service/OSRMService';
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
import ContextmenuControl from './src/ol/compenents/controls/contextMenu/ContextmenuControl'
//layers
import XYZLayer from './src/ol/compenents/Layers/tile/raster/XYZLayer';
import AnimatedCluster from './src/ol/compenents/Layers/cluster/AnimatedClusterLayer'
import Cluster from 'ol/source/Cluster'
import Vector from 'ol/source/Vector'
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle';
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'



//获取配置范围
const mapConfig = Config.mapConfig;
const cityRasterTilesLayer = new XYZLayer({
    id: "GLOBAL_WEBMERCATOR",
    title: "GLOBAL_WEBMERCATOR",
    url: 'http://10.88.104.240:8060/wmts/Gaode/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
});
//初始化地图
const map = new MapSub({
    targetId: 'map',
    projection: Config.mapConfig['projection'],
    layers: [cityRasterTilesLayer, /* wellImageLayer */ ],
    transFormUtil: new TranformUtil({
        source: 'EPSG:4326',
        destination: Config.mapConfig['projection'],
    }),
});
map.getView().fit(map.getTransFormUtil().transformExtent(mapConfig['extent']));

const { overviewMapControl } = {
    overviewMapControl: new OverviewMapControl({
        map: map,
        layers: [cityRasterTilesLayer],
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

var clusterSource = new Cluster({
    distance: 40,
    source: new Vector()
});
// Animated cluster layer
var clusterLayer = new AnimatedCluster({
    name: 'Cluster',
    source: clusterSource,
    animationDuration: 700,
    map: map
});
map.addLayer(clusterLayer);
// add 2000 features
addFeatures(2000);
// Addfeatures to the cluster
function addFeatures(nb) {
    var ext = map.getView().calculateExtent(map.getSize());
    var features = [];
    for (var i = 0; i < nb; ++i) {
        features[i] = new Feature(new Point([ext[0] + (ext[2] - ext[0]) * Math.random(), ext[1] + (ext[3] - ext[1]) * Math.random()]));
        features[i].set('id', i);
        features[i].setStyle(new Style({
            image: new Circle({
                stroke: new Stroke({
                    color: "rgba(0,0,192,0.5)",
                    width: 2
                }),
                fill: new Fill({
                    color: "rgba(0,0,192,0.3)"
                }),
                radius: 5
            }),
            text: new Text({
                text: "123",
                fill: new Fill({
                    color: '#000'
                })
            })
        }))
    }
    clusterSource.getSource().clear();
    clusterSource.getSource().addFeatures(features);
}

var contextmenu = new ContextmenuControl({
    width: 170,
    defaultItems: true, // defaultItems are (for now) Zoom In/Zoom Out
    items: [{
            text: 'Center map here',
            classname: 'some-style-class', // add some CSS rules
            callback: center // `center` is your callback function
        },
        {
            text: 'Add a Marker',
            classname: 'some-style-class', // you can add this icon with a CSS class
            // instead of `icon` property (see next line)
            icon: 'img/marker.png', // this can be relative or absolute
            callback: marker
        },
        '-' // this is a separator
    ]
});
map.addControl(contextmenu);