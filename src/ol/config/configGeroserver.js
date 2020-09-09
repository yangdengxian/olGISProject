/**
 * 配置文件
 * @author ydx
 * @date 2019-03-22
 */
import Icon from 'ol/style/Icon';

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

    },

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



Config.getMapConfig = getMapConfig;

export default Config;