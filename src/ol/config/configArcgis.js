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

   
};


Config.getMapConfig = getMapConfig;
export default Config;