import ImageWMSLayer from '../ImageWMSLayer';

/**
 * @classdesc geosever 栅格图层
 * @author ydx
 * @date 2019-04-13
 * @module Layers/geoserver/GeoImageLayer
 * @extends ImageWMSLayer
 */
class GeoImageLayer extends ImageWMSLayer {
    /**
     * 
     * @param {*} param 
     * @param {string} param.id 
     * @param {string} param.title 
     * @param {boolean} param.isBaseLayer 是否基础底图
     * @param {boolean} param.displayInLayerSwitcher 是否在控件显示
     * @param {boolean} param.isThmemeLayer 是否专题图
     * @param {string} param.url    必填*
     * @param {string} param.layerName 必填*  eg "localhost:osm"
     */
    constructor(param) {
        super({
            id: param.id,
            title: param.title,
            baseLayer: param.isBaseLayer || false,
            thmemeLayer: param.isThmemeLayer || false,
            displayInLayerSwitcher: param.displayInLayerSwitcher || false,
            source: {
                url: param.url + '/wms',
                params: { LAYERS: param.layerName },
                serverType: 'geoserver',
                crossOrigin: 'anonymous',
            },
        })
    }
};

export default GeoImageLayer;