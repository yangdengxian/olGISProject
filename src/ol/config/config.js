/**
 * 配置文件
 * @author ydx
 * @date 2019-03-22
 */

const Config = {
    mapConfig: {
        center: [116.404269, 39.913828],
        // center: [12929479, 4843400],
        projection: 'EPSG:4326',
        // projection: 'EPSG:3857',
        zoom: 12,
    },
    //esriTileLayer

    //baseMap
    LayersURL: {
        TiledMapServiceLayerURL: 'http://a4.petrochina/A4Service/WMTS/TDTVEC/MapServer/tile/{z}/{y}/{x}',
        TDTCVALayerURL: 'http://a4.petrochina/A4Service/WMTS/TDTCVA/MapServer/tile/{z}/{y}/{x}',
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
};

export default Config;