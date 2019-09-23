/**
 * 配置文件
 * @author ydx
 * @date 2019-03-22
 */
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';


const Config = {
    serverType: 'geoserver',
    mapConfig: {
        center: [43.3531, 33.6797],
        // center: [12929479, 4843400],
        sourceProjection: 'EPSG:4326', //经纬度坐标code
        projection: 'EPSG:3857',
        zoom: 14,
        extent: [47.2306, 31.6437, 47.5465, 31.7188],
    },

    //fileStore or s3 blobStore
    blobStoreLayerSource: {
        projection: 'EPSG:3857',
        // url: 'http://11.53.55.10/gis/tiles-cache-dev/LayerInfoImpl--3d41865b%3A169c2fa5945%3A-7ffc/EPSG%3A4326/png/default/{z}/{x}/{-y}.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=pcep%2F20190328%2F%2Fs3%2Faws4_request&X-Amz-Date=20190328T073716Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=c601d1c7eca5a2dcd9b1a23f5bf88037914a208c9c2ea906019cc8c4909d1e24'
        url: 'http://localhost/localhost_global_polygon/{z}/{x}/{-y}.png',
    },

    //电子在线切片地图url
    mapTileUrl: {
        TianDiTu: {
            Normal: {
                Map: "http://t{s}.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}",
                Annotion: "http://t{s}.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={key}"
            },
            Satellite: {
                Map: "http://t{s}.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={key}",
                Annotion: "http://t{s}.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={key}"
            },
            Terrain: {
                Map: "http://t{s}.tianditu.com/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={key}",
                Annotion: "http://t{s}.tianditu.com/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}"
            },
            Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
            key: "174705aebfe31b79b3587279e211cb9a"
        },

        GaoDe: {
            Normal: {
                Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
            },
            Satellite: {
                Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
            },
            Subdomains: ["1", "2", "3", "4"]
        },

        Google: {
            Normal: {
                Map: {
                    "en": "http://www.google.cn/maps/vt?lyrs=m@189&gl=en&x={x}&y={y}&z={z}", //English
                    "cn": "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}", //中文
                }
            },
            Satellite: {
                Map: {
                    "en": "http://www.google.cn/maps/vt?lyrs=s@189&gl=en&x={x}&y={y}&z={z}",
                    "cn": "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
                }
            },
            Subdomains: []
        },

        ArcGIS: {
            Normal: {
                Map: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
                PurplishBlue: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                Gray: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
                Warm: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
            },
            Theme: {
                Hydro: "http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}"
            },
            Subdomains: []
        },

        OSM: {
            Normal: {
                Map: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            },
            Subdomains: ['a', 'b', 'c']
        },

        A4: {
            Normal: {
                Map: "http://a4.petrochina/A4Service/WMTS/TDTVEC/MapServer/tile/{z}/{y}/{x}",
                Annotion: "http://a4.petrochina/A4Service/WMTS/TDTCVA/MapServer/tile/{z}/{y}/{x}"
            },
            Satellite: {
                Map: "http://a4.petrochina/A4Service/WMTS/TDTIMG/MapServer/tile/{z}/{y}/{x}",
                Annotion: "http://t{s}.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={key}"
            },
            Terrain: {
                Map: "http://a4.petrochina/A4Service/WMTS/TDTTER/MapServer/tile/{z}/{y}/{x}",
                Annotion: "http://a4.petrochina/A4Service/WMTS/TDTCTA/MapServer/tile/{z}/{y}/{x}"
            }
        }
    },

    //layers Styles
    mapLayerStyles: [{
        title: "wellFeatures",
        typeGeom: 'Point',
        style: new Style({
            image: new Icon({
                src: "../../../images/tools/path/multi.png",
                imgSize: [22, 30],
                crossOrigin: 'anonymous',
                anchor: [0.5, 1],
                opacity: 1
            })
        })
    }, {
        title: "workerLocation",
        typeGeom: 'Point',
        style: new Style({
            fill: new Fill({
                color: 'rgba(125, 125, 125, 0.2)'
            }),
            stroke: new Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new Circle({
                radius: 7,
                fill: new Fill({
                    color: '#ffcc33'
                })
            })
        })
    }, {
        title: "UAVLocation",
        typeGeom: 'Point',
        style: new Style({
            fill: new Fill({
                color: 'rgba(125, 125, 125, 0.2)'
            }),
            stroke: new Stroke({
                color: '#355858',
                width: 2
            }),
            image: new Circle({
                radius: 7,
                fill: new Fill({
                    color: '#355858'
                })
            })
        })
    }, {
        title: "wellsImage",
        typeGeom: 'Point',
        style: new Style({
            fill: new Fill({
                color: 'rgba(125, 125, 125, 0.2)'
            }),
            stroke: new Stroke({
                color: '#FF0000',
                width: 2
            }),
            image: new Circle({
                radius: 7,
                fill: new Fill({
                    color: '#FF0000'
                })
            })
        })
    }, {
        title: "pipelineImage",
        typeGeom: 'LineString',
        style: new Style({
            stroke: new Stroke({
                color: '#0000FF',
                width: 1
            }),
            image: new Circle({
                radius: 7,
                fill: new Fill({
                    color: '#0000FF'
                })
            })
        })
    }, {
        title: "ogmImage",
        typeGeom: 'Polygon',
        style: new Style({
            fill: new Fill({
                color: '#AAAAAA'
            }),
            stroke: new Stroke({
                color: '#000000',
                width: 1
            }),
            image: new Circle({
                radius: 7,
                fill: new Fill({
                    color: '#000000'
                })
            })
        })
    }],

    files: {
        videoUrl: "../../../examples/video/CPF1.MP4",

    }
};

////配置专题图层应用关系


////************地图应用配置信息  冀东***************************************************************
//
// mapUrl：服务地址，wellId:井图层Id，GeometryServiceUrl：几何服务地址
function getMapConfig(App) {
    var mapConfig;
    switch (App) {
        case 'demo':
            mapConfig = {
                mapUrl: "http://localhost:8085/geoserver2.15/cpe",
                layerName: 'localhost:osm',
                mapFullExtent: { "xmin": 117.42, "ymin": 38.68, "xmax": 121.10, "ymax": 39.98, "spatialReference": { "wkid": 4326 } },
                wellId: 0
            };
            break;

        default:
            mapConfig = {
                mapUrl: "http://localhost:8085/geoserver2.15/cpe",
                // mapUrl: "http://11.11.78.134:8083/geoserver/cpe",
                geometryName: "coordinates",
                featurePrefix: "cpe",
                layerNames: ['tab_geo_welllhead' /**, 'pipeline_line_tab', 'ogm_poly_tab' */ ], //图层组名称
                queryNames: ['tab_geo_welllhead' /**, 'pipeline_line_tab', 'ogm_poly_tab' */ ], //查询图层名称
                mapFullExtent: { "xmin": 47.2306, "ymin": 31.6437, "xmax": 47.5465, "ymax": 31.7188, "spatialReference": { "wkid": 4326 } },
                wellId: 0
            };
            break;
    }
    return mapConfig;
}

function getLanguageConfig(language) {
    var languageConfigObj = {};
    switch (language) {
        case "en":
            document.write(UIView_en);
            break;

        case "zh_CN":
            document.write(UIView_zh);
            break;

        default:
            document.write(UIView_en);
            break;
    }

}

// 根据地图服务配置图层别名
function getLayerAlias(App, layerId) {
    var layerAlias;
    switch (App) {
        case 'DZ':
            switch (layerId) {
                default: layerAlias = "unknown";
                break;
            }
            break;
        case 'KF': //开发图
            switch (layerId) {
                case 0: // 根据地图服务设置井ID
                    layerAlias = "well";
                    break;
                default:
                    layerAlias = "unknown";
                    break;
            }
            break;
        case 'GZ': //构造图
            switch (layerId) {
                case 0: // 根据地图服务设置井ID
                    layerAlias = "well";
                    break;
                default:
                    layerAlias = "unknown";
                    break;
            }
            break;
        default:
            layerAlias = "unknown";
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
                        aliasFields: { ID: attributes.ID, NAME: attributes.NAME }
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
                        aliasFields: { ID: attributes.ID, NAME: attributes.NAME }
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
                        aliasFields: { ID: attributes.ID, NAME: attributes.NAME }
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
                        aliasFields: { ID: attributes.ID, NAME: attributes.NAME }
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