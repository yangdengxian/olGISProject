import TMSLayer from '../tile/TMSLayer';

/**
 * @classdesc geosever 栅格切片图层
 * @author ydx
 * @date 2019-04-13
 * @module Layers/geoserver/GeoTileLayer
 * @extends TMSLayer
 */
class GeoTileLayer extends TMSLayer {
    /**
     * 
     * @param {object} param 
     * @param {string} param.url 必填*
     * @param {string} param.title 
     * @param {string} param.layers 必填*   'localhost:global_polygon'
     */
    constructor(param) {
        super({
            id: param.id,
            visible: true,
            title: param.title,
            baseLayer: param.isBaseLayer || false,
            thmemeLayer: param.isThmemeLayer || false,
            displayInLayerSwitcher: param.displayInLayerSwitcher || false,
            source: {
                url: param.url + "/wms",
                params: Object.assign({
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    'tiled': true,
                    "exceptions": 'application/vnd.ogc.se_inimage',
                }, param.params),
                serverType: 'geoserver',
                crossOrigin: 'anonymous'
            }
        })
    }
};

export default GeoTileLayer;