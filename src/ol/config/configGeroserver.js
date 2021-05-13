/**
 * 配置文件
 * @author ydx
 * @date 2019-03-22
 */
import Icon from 'ol/style/Icon';

const Config = {
    serverType: 'geoserver',
    mapConfig: {
        center: [116.403981, 39.914603],
        // center: [12929479, 4843400],
        sourceProjection: 'EPSG:4326', //经纬度坐标code
        projection: 'EPSG:3857',
        zoom: 14,
        extent: [47.89, 13.18, 166.45, 57.06],
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
                Map: "http://t0.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=您的key",
                Annotion: "http://t0.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=您的key"
            },
            Satellite: {
                Map: "http://t0.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=您的key",
                Annotion: "http://t0.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=您的key"
            },
            Terrain: {
                Map: "http://t0.tianditu.com/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk=您的key",
                Annotion: "http://t0.tianditu.com/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk=您的key"
            },
            Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
            key: "您的key"
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
                    "en": "http://mt2.google.cn/vt/lyrs=m&scale=2&hl=en&gl=cn&x={x}&y={y}&z={z}", //English
                    "cn": "http://mt2.google.cn/vt/lyrs=m&scale=2&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}", //中文
                }
            },
            Satellite: {
                Map: {
                    "en": "http://mt2.google.cn/vt/lyrs=y&scale=2&hl=en&gl=cn&x={x}&y={y}&z={z}",
                    "cn": "http://mt2.google.cn/vt/lyrs=y&scale=2&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}",
                }
            },
            Terrain: {
                Map: {
                    "en": "http://mt2.google.cn/vt/lyrs=t&scale=2&hl=en&gl=cn&x={x}&y={y}&z={z}",
                    "cn": "http://mt2.google.cn/vt/lyrs=t&scale=2&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}",
                }
            },
            Subdomains: []
        },

        ArcGIS: {
            Normal: {
                Map: "http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                PurplishBlue: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                Gray: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
                Warm: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
            },
            Satellite: {
                Map: "http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            },
            Theme: {
                Hydro: "http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}"
            },
            Subdomains: []
        },

        OSM: {
            Normal: {
                Map: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            },
            Subdomains: ['a', 'b', 'c']
        },

        MapBox: {
            Normal: {
                Map: "https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}.jpg?access_token=pk.eyJ1IjoiaXJpc2ppYXFpc2hpIiwiYSI6ImNqbTk1cm8zdDA1djMza21vMGVkbDRjcnQifQ.rl3QYFhlM3ra9Rb6lcJFDA",
            },
            Satellite: {
                Map: "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg?access_token=pk.eyJ1IjoiaXJpc2ppYXFpc2hpIiwiYSI6ImNqbTk1cm8zdDA1djMza21vMGVkbDRjcnQifQ.rl3QYFhlM3ra9Rb6lcJFDA",
            },
        },

        A4: {
            Normal: {
                Map: "http://a4.petrochina/A4Service/TileService.ashx?c={x}&r={y}&l={z}&type=TDTVEC&token=1d016abc-cf17-4801-9b5b-b43304e5bfe1",
                Annotion: "http://a4.petrochina/A4Service/TileService.ashx?c={x}&r={y}&l={z}&type=TDTCVA&token=1d016abc-cf17-4801-9b5b-b43304e5bfe1"
            },
            Satellite: {
                Map: "http://a4.petrochina/A4Service/WMTS/TDTIMG/MapServer/tile/{z}/{y}/{x}",
                Annotion: "http://a4.petrochina/A4Service/WMTS/TDTCIA/MapServer/tile/{z}/{y}/{x}"
            },
            Terrain: {
                Map: "http://a4.petrochina/A4Service/WMTS/TDTTER/MapServer/tile/{z}/{y}/{x}",
                Annotion: "http://a4.petrochina/A4Service/WMTS/TDTCTA/MapServer/tile/{z}/{y}/{x}"
            }
        },
        //瑞飞切片缓存
        RICHFIT_GIS_TILE: {
            Normal: {
                Map: "http://www.pcep.cloud/ogc/wmts/Richfit_Map/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png",
            },
            Satellite: {
                Map: "http://www.pcep.cloud/ogc/wmts/Richfit_Satellite/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png",
            },
            Terrain: {
                Map: "http://www.pcep.cloud/ogc/wmts/Richfit_Terrain/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png",
            },
        }
    },

    //油田坐标
    coordinates: {
        "features": [{
            "geometry": {
                "coordinates": [124.88, 46.71],
                "type": "Point"
            },
            "properties": {
                "name": "大庆"
            }
        }, {
            "geometry": {
                "coordinates": [122.07, 41.21],
                "type": "Point",
            },
            "properties": {
                "name": "辽河",
            }
        }, {
            "geometry": {
                "coordinates": [108.89, 34.49],
                "type": "Point"
            },
            "properties": {
                "name": "长庆",
            }
        }, {
            "geometry": {
                "coordinates": [86.21, 41.74],
                "type": "Point"
            },
            "properties": {
                "name": "塔里木",
            }
        }, {
            "geometry": {
                "coordinates": [84.98, 45.61],
                "type": "Point"
            },
            "properties": {
                "name": "新疆",
            }
        }, {
            "geometry": {
                "coordinates": [104.09, 30.63],
                "type": "Point"
            },
            "properties": {
                "name": "西南",
            }
        }, {
            "geometry": {
                "coordinates": [124.88, 45.18],
                "type": "Point"
            },
            "properties": {
                "name": "吉林",
            }
        }, {
            "geometry": {
                "coordinates": [117.46, 38.79],
                "type": "Point"
            },
            "properties": {
                "name": "大港",
            }
        }, {
            "geometry": {
                "coordinates": [94.56, 40.28],
                "type": "Point"
            },
            "properties": {
                "name": "青海",
            }
        }, {
            "geometry": {
                "coordinates": [116.05, 38.75],
                "type": "Point"
            },
            "properties": {
                "name": "华北",
            }
        }, {
            "geometry": {
                "coordinates": [93.42, 42.97],
                "type": "Point"
            },
            "properties": {
                "name": "吐哈",
            }
        }, {
            "geometry": {
                "coordinates": [118.12, 39.64],
                "type": "Point"
            },
            "properties": {
                "name": "冀东",
            }
        }, {
            "geometry": {
                "coordinates": [98.43, 39.74],
                "type": "Point"
            },
            "properties": {
                "name": "玉门",
            }
        }, {
            "geometry": {
                "coordinates": [120.05, 30.33],
                "type": "Point"
            },
            "properties": {
                "name": "浙江",
            }
        }, {
            "geometry": {
                "coordinates": [110.38, 20.18],
                "type": "Point"
            },
            "properties": {
                "name": "南方",
            }
        }, {
            "geometry": {
                "coordinates": [116.35, 39.9],
                "type": "Point"
            },
            "properties": {
                "name": "煤层气",
            }
        }]
    }
};

function getImageStyle(imagePath) {
    var img = new Image();
    img.src = imagePath;
    var icon = new Icon({
        img: img,
        imgSize: [20, 20]
    });

    return icon;
}
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
                mapFullExtent: { "xmin": 115.42, "ymin": 39.48, "xmax": 118.10, "ymax": 40.48, "spatialReference": { "wkid": 4326 } },
                wellId: 0
            };
            break;

        default:
            mapConfig = {
                mapUrl: "http://localhost:8085/geoserver2.15/cpe",
                layerName: 'localhost:osm',
                mapFullExtent: { "xmin": 115.42, "ymin": 39.48, "xmax": 118.10, "ymax": 40.48, "spatialReference": { "wkid": 4326 } },
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