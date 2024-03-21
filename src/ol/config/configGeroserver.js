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
        projection: 'EPSG:4326',
        zoom: 14,
        extent: [47.89, 13.18, 166.45, 57.06],
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


export default Config;