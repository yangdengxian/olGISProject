/**
 * 配置文件
 * @author ydx
 * @date 2019-03-22
 */

const Config = {
    serverType: 'arcgis',
    mapConfig: {
        center: [116.404269, 39.913828],
        // center: [12929479, 4843400],
        sourceProjection: 'EPSG:4326', //经纬度坐标code
        projection: 'EPSG:3857',
        zoom: 12,
        extent: [47.89, 13.18, 166.45, 57.06],
    },
    //esriTileLayer

    //baseMap
    LayersURL: {
        TiledMapServiceLayerURL: 'http://a4.petrochina/A4Service/WMTS/TDTVEC/MapServer/tile/{z}/{y}/{x}',
        TDTCVALayerURL: 'http://a4.petrochina/A4Service/WMTS/TDTCVA/MapServer/tile/{z}/{y}/{x}',
        //影像
        TDTIMG: 'http://a4.petrochina/A4Service/WMTS/TDTIMG/MapServer/tile/{z}/{y}/{x}',
        TDTCIA: 'http://a4.petrochina/A4Service/WMTS/TDTCIA/MapServer/tile/{z}/{y}/{x}',

        //地形图
        TDTTER: 'http://a4.petrochina/A4Service/WMTS/TDTTER/MapServer/tile/{z}/{y}/{x}',
        TDTCTA: 'http://a4.petrochina/A4Service/WMTS/TDTCTA/MapServer/tile/{z}/{y}/{x}',
    },
    //imageWMS
    ImageWMSSource: {
        url: 'http://localhost:8081/geoserver/wms?service=WMS',
        params: { LAYERS: 'localhost' },
        serverType: 'geoserver',
        crossOrigin: 'anonymous',
    },
    //wmtsLayer
    WMTSSource: {
        // url: 'http://localhost:8081/geoserver/gwc/service/wms?',
        url: 'http://localhost:8083/geoserver2.15/gwc/service/wms?',
        params: {
            FORMAT: 'image/png',
            VERSION: '1.1.0',
            tiled: true,
            STYLES: '',
            LAYERS: 'localhost:global_polygon',
            //tilesOrigin: -124.73142200000001 + "," + 24.955967
        },
    },
    //fileStore or s3 blobStore
    blobStoreLayerSource: {
        projection: 'EPSG:3857',
        // url: 'http://11.53.55.10/gis/tiles-cache-dev/LayerInfoImpl--3d41865b%3A169c2fa5945%3A-7ffc/EPSG%3A4326/png/default/{z}/{x}/{-y}.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=pcep%2F20190328%2F%2Fs3%2Faws4_request&X-Amz-Date=20190328T073716Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=c601d1c7eca5a2dcd9b1a23f5bf88037914a208c9c2ea906019cc8c4909d1e24'
        url: 'http://localhost/localhost_global_polygon/{z}/{x}/{-y}.png',
    },
    chartData: {
        type: 'FeatureCollection',
        features: [{
                type: 'Feature',
                geometry: {
                    coordinates: [124.88, 46.71],
                    type: 'Point',
                },
                properties: {
                    data: [2415, 75799],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                    name: '大庆',
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [122.07, 41.21],
                    type: 'Point',
                    colors: ['#1f77b4', '#ff7f0e'],
                },
                properties: {
                    name: '辽河',
                    data: [1493, 23509],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [108.89, 34.49],
                    type: 'Point',
                },
                properties: {
                    name: '长庆',
                    data: [6892, 100553],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [86.21, 41.74],
                    type: 'Point',
                },
                properties: {
                    name: '塔里木',
                    data: [345, 2909],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [84.98, 45.61],
                    type: 'Point',
                },
                properties: {
                    name: '新疆',
                    data: [4342, 39803],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [104.09, 30.63],
                    type: 'Point',
                },
                properties: {
                    name: '西南',
                    data: [1365, 826],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [124.88, 45.18],
                    type: 'Point',
                },
                properties: {
                    name: '吉林',
                    data: [92, 35631],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [117.46, 38.79],
                    type: 'Point',
                },
                properties: {
                    name: '大港',
                    data: [302, 7097],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [94.56, 40.28],
                    type: 'Point',
                },
                properties: {
                    name: '青海',
                    data: [2872, 8600],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [116.05, 38.75],
                    type: 'Point',
                },
                properties: {
                    name: '华北',
                    data: [4316, 8358],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [93.42, 42.97],
                    type: 'Point',
                },
                properties: {
                    name: '吐哈',
                    data: [1212, 5297],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [118.12, 39.64],
                    type: 'Point',
                },
                properties: {
                    name: '冀东',
                    data: [77, 2789],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [98.43, 39.74],
                    type: 'Point',
                },
                properties: {
                    name: '玉门',
                    data: [349, 355],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [120.05, 30.33],
                    type: 'Point',
                },
                properties: {
                    name: '浙江',
                    data: [227, 373],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [110.38, 20.18],
                    type: 'Point',
                },
                properties: {
                    name: '南方',
                    data: [253, 257],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
            {
                type: 'Feature',
                geometry: {
                    coordinates: [116.35, 39.9],
                    type: 'Point',
                },
                properties: {
                    name: '煤层气',
                    data: [409, 2897],
                    key: ['探井', '开发井'],
                    colors: ['#1f77b4', '#ff7f0e'],
                },
            },
        ],
    },
};

////配置专题图层应用关系

////************地图应用配置信息  冀东***************************************************************
//
// mapUrl：服务地址，wellId:井图层Id，GeometryServiceUrl：几何服务地址
function getMapConfig(App) {
    var mapConfig;
    switch (App) {
        case 'DZ': // 地震
            mapConfig = {
                mapUrl: 'http://10.86.13.221:6080/arcgis/rest/services/A1/JiDong/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPJDYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [1, 2],
                mapFullExtent: {
                    xmin: 117.42,
                    ymin: 38.68,
                    xmax: 121.1,
                    ymax: 39.98,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'KF': //开发图
            mapConfig = {
                mapUrl: 'http://10.86.13.221:6080/arcgis/rest/services/A1/JiDong/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPJDYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [1, 2],
                mapFullExtent: {
                    xmin: 117.42,
                    ymin: 38.68,
                    xmax: 121.1,
                    ymax: 39.98,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'GZ': //构造图
            mapConfig = {
                mapUrl: 'http://10.86.13.221:6080/arcgis/rest/services/A1/JiDong/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPJDYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [1, 2],
                mapFullExtent: {
                    xmin: 117.42,
                    ymin: 38.68,
                    xmax: 121.1,
                    ymax: 39.98,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'Chart': //井统计
            mapConfig = {
                mapUrl: 'http://a4.petrochina/arcgis/rest/a4services/A1EPQGPDBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                d_mapUrl: [],
                arcgisQueryLayerIds: [],
                mapFullExtent: { xmin: 72.86, ymin: 17.73, xmax: 136.23, ymax: 53.9, spatialReference: { wkid: 4326 } },
                wellId: 0,
            };
            break;
        case 'TL': //塔里木
            mapConfig = {
                mapUrl: 'http://10.79.0.88:6080/arcgis/rest/services/A1/TaLiMu/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPTLMYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [1, 2],
                mapFullExtent: { xmin: 67.47, ymin: 34.26, xmax: 97.02, ymax: 45.02, spatialReference: { wkid: 4326 } },
                wellId: 0,
            };
            break;
        case 'MC': //煤层气
            mapConfig = {
                mapUrl: 'http://11.11.208.132/arcgis/rest/services/A1/MCQ/MapServer',
                d_mapUrl: [],
                arcgisQueryLayerIds: [0],
                mapFullExtent: {
                    xmin: 103.2,
                    ymin: 34.76,
                    xmax: 117.77,
                    ymax: 40.14,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'ZJ': //浙江
            mapConfig = {
                mapUrl: 'http://10.179.8.10:6080/arcgis/rest/services/A1/ZheJiang/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPZJYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [1, 2],
                mapFullExtent: {
                    xmin: 95.16331054687723,
                    ymin: 25.944870684403064,
                    xmax: 125.17795898436925,
                    ymax: 38.14031501118012,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'XJ': //新疆
            mapConfig = {
                mapUrl: 'http://11.53.52.4:6080/arcgis/rest/services/A1/XinJiang/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPXJYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [1, 2],
                mapFullExtent: { xmin: 79.53, ymin: 43.01, xmax: 94.3, ymax: 47.92, spatialReference: { wkid: 4326 } },
                wellId: 0,
            };
            break;
        case 'NF': //南方勘探
            mapConfig = {
                mapUrl: 'http://10.240.120.224:6080/arcgis/rest/services/NFKT/ZHCX/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/A4GIS/rest/services/A1EPNFKTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [1, 2],
                mapFullExtent: {
                    xmin: 109.5,
                    ymin: 19.72,
                    xmax: 110.42,
                    ymax: 20.14,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'XN': //西南
            mapConfig = {
                mapUrl: 'http://11.11.208.132/arcgis/rest/services/A1/XiNan/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPXNYQTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [0],
                mapFullExtent: {
                    xmin: 100.29,
                    ymin: 27.77,
                    xmax: 112.03,
                    ymax: 32.61,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'DQ': //大庆
            mapConfig = {
                mapUrl: 'http://10.65.64.129/arcgis/rest/services/a1dqgis/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPXJYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [0],
                mapFullExtent: {
                    xmin: 109.54,
                    ymin: 41.42,
                    xmax: 139.16,
                    ymax: 51.19,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'HB': //华北
            mapConfig = {
                mapUrl: 'http://10.188.57.46:6080/arcgis/rest/services/A1/HB/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPHBJZBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPHBELBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [0],
                mapFullExtent: {
                    xmin: 93.81,
                    ymin: 31.31,
                    xmax: 137.45,
                    ymax: 48.45,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'YM': //玉门
            mapConfig = {
                mapUrl: 'http://10.87.1.232:6080/arcgis/rest/services/A1/YuMen/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPYMYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [0],
                mapFullExtent: {
                    xmin: 95.71,
                    ymin: 38.83,
                    xmax: 101.27,
                    ymax: 40.95,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'CQ': //长庆
            mapConfig = {
                mapUrl: 'http://10.78.78.75:6080/arcgis/rest/services/A1/ChangQing/MapServer',
                d_mapUrl: ['http://11.10.171.98/arcgis/rest/services/EP/EP_CQYTBST/MapServer'],
                arcgisQueryLayerIds: [0],
                mapFullExtent: { xmin: 96.17, ymin: 33.86, xmax: 119.4, ymax: 42.29, spatialReference: { wkid: 4326 } },
                wellId: 0,
            };
            break;
        case 'JL': //吉林
            mapConfig = {
                mapUrl: 'http://10.217.109.208:6080/arcgis/rest/services/A1/JiLin/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPJLYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [0],
                mapFullExtent: {
                    xmin: 118.64,
                    ymin: 42.94,
                    xmax: 129.74,
                    ymax: 46.8,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'JL_JBST': //吉林_基本实体管理工具
            mapConfig = {
                mapUrl: 'http://10.217.124.12:6080/arcgis/rest/services/rf/ruifei/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPJLYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [0],
                mapFullExtent: {
                    xmin: 118.64,
                    ymin: 42.94,
                    xmax: 129.74,
                    ymax: 46.8,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 1,
            };
            break;
        case 'LH': //辽河
            mapConfig = {
                mapUrl: 'http://10.70.2.104:6080/arcgis/rest/services/A1/LiaoHe/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPLHPDBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                mapFullExtent: {
                    xmin: 119.62,
                    ymin: 40.37,
                    xmax: 125.2,
                    ymax: 42.43,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'TH': //吐哈
            mapConfig = {
                mapUrl: 'http://10.218.50.185:6080/arcgis/rest/services/A1/TuHa/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPTHYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [0],
                mapFullExtent: { xmin: 86.15, ymin: 41.9, xmax: 97.27, ymax: 45.81, spatialReference: { wkid: 4326 } },
                wellId: 0,
            };
            break;
        case 'JD': //冀东
            mapConfig = {
                mapUrl: 'http://10.86.13.221:6080/arcgis/rest/services/A1/JiDong/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPJDYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [1, 2],
                mapFullExtent: {
                    xmin: 117.42,
                    ymin: 38.68,
                    xmax: 121.1,
                    ymax: 39.98,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'QH': //青海
            mapConfig = {
                mapUrl: 'http://10.82.28.28:6080/arcgis/rest/services/A1/青海/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPQHYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [1, 2],
                mapFullExtent: { xmin: 88.09, ymin: 35.67, xmax: 99.22, ymax: 39.99, spatialReference: { wkid: 4326 } },
                wellId: 0,
            };
            break;
        case 'DG': //大港
            mapConfig = {
                mapUrl: 'http://10.76.32.25:6080/arcgis/rest/services/A1/DaGang/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPDGYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [1, 2],
                mapFullExtent: {
                    xmin: 114.73,
                    ymin: 37.34,
                    xmax: 119.86,
                    ymax: 39.59,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;
        case 'demo':
            mapConfig = {
                mapUrl: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/PublicSafety/PublicSafetyBasemap/MapServer',
                d_mapUrl: [
                    'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer',
                ],
                arcgisQueryLayerIds: [0],
                mapFullExtent: {
                    xmin: -185.337909357176,
                    ymin: 15.2049923322169,
                    xmax: -59.5254874993028,
                    ymax: 74.08248503559,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };
            break;

        default:
            mapConfig = {
                mapUrl: 'http://10.86.13.221:6080/arcgis/rest/services/A1/JiDong/MapServer',
                d_mapUrl: [
                    'http://a4.petrochina/arcgis/rest/a4services/A1EPJDYTBST/MapServer?token=2fa67d8f-212e-11e4-8f44-005056c00008',
                ],
                arcgisQueryLayerIds: [1, 2],
                mapFullExtent: {
                    xmin: 117.42,
                    ymin: 38.68,
                    xmax: 121.1,
                    ymax: 39.98,
                    spatialReference: { wkid: 4326 },
                },
                wellId: 0,
            };

            break;
    }
    return mapConfig;
}

// 根据地图服务配置图层别名
function getLayerAlias(App, layerId) {
    var layerAlias;
    switch (App) {
        case 'DZ':
            switch (layerId) {
                default: layerAlias = 'unknown';
                break;
            }
            break;
        case 'KF': //开发图
            switch (layerId) {
                case 0: // 根据地图服务设置井ID
                    layerAlias = 'well';
                    break;
                default:
                    layerAlias = 'unknown';
                    break;
            }
            break;
        case 'GZ': //构造图
            switch (layerId) {
                case 0: // 根据地图服务设置井ID
                    layerAlias = 'well';
                    break;
                default:
                    layerAlias = 'unknown';
                    break;
            }
            break;
        default:
            layerAlias = 'unknown';
            break;
    }
    return layerAlias;
}

// 根据地图服务配置图层应用关键字
// App:应用模块，layerId：图层ID，attributes：属性列，fields：列名，aliasFields：别名
function getLayerAppKey(App, layerId, attributes) {
    var layerAppKey;
    switch (App) {
        case 'DZ':
            switch (layerId) {
                case 0: // 根据地图服务设置井ID
                    layerAppKey = {
                        fields: { ID: attributes.ID, NAME: attributes.NAME },
                        aliasFields: { ID: attributes.ID, NAME: attributes.NAME },
                    };
                    break;
                default:
                    layerAppKey = { fields: { ID: null, NAME: null }, aliasFields: { ID: null, NAME: null } };
                    break;
            }
            break;
        case 'KF': //开发图
            switch (layerId) {
                case 0: // 根据地图服务设置井ID
                    layerAppKey = {
                        fields: { ID: attributes.ID, NAME: attributes.NAME },
                        aliasFields: { ID: attributes.ID, NAME: attributes.NAME },
                    };
                    break;
                default:
                    layerAppKey = { fields: { ID: null, NAME: null }, aliasFields: { ID: null, NAME: null } };
                    break;
            }
            break;
        case 'GZ': //构造图
            switch (layerId) {
                case 0: // 根据地图服务设置井ID
                    layerAppKey = {
                        fields: { ID: attributes.ID, NAME: attributes.NAME },
                        aliasFields: { ID: attributes.ID, NAME: attributes.NAME },
                    };
                    break;
                default:
                    layerAppKey = { fields: { ID: null, NAME: null }, aliasFields: { ID: null, NAME: null } };
                    break;
            }
            break;
        default:
            switch (layerId) {
                case 0: // 根据地图服务设置井ID
                    layerAppKey = {
                        fields: { ID: attributes.ID, NAME: attributes.NAME },
                        aliasFields: { ID: attributes.ID, NAME: attributes.NAME },
                    };
                    break;
                default:
                    layerAppKey = { fields: { ID: null, NAME: null }, aliasFields: { ID: null, NAME: null } };
                    break;
            }
            break;
    }
    return layerAppKey;
}

Config.getMapConfig = getMapConfig;
Config.getLayerAlias = getLayerAlias;
Config.getLayerAppKey = getLayerAppKey;

export default Config;