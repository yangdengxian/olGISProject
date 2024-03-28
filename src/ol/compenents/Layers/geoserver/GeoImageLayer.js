import axios from 'axios';
import ImageWMSLayer from '../ImageWMSLayer';
import ImageWMS from 'ol/source/ImageWMS';
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
     * @param {string} param.visible 
     * @param {boolean} param.baseLayer 是否基础底图
     * @param {boolean} param.displayInLayerSwitcher 是否在控件显示
     * @param {boolean} param.thmemeLayer 是否专题图
     * @param {string} param.url    必填*
     * @param {string} param.layerName 必填*  eg "localhost:osm"
     */
    constructor(param) {
        super({
            id: param.id,
            title: param.title,
            visible: param.visible || false,
            baseLayer: param.baseLayer || false,
            thmemeLayer: param.thmemeLayer || false,
            displayInLayerSwitcher: param.displayInLayerSwitcher || false,
            source: new ImageWMS({
                url: param.url,
                params: param.params,
                serverType: 'geoserver',
                crossOrigin: 'anonymous',
            }),
        })
    }

    getFeatureInfoUrl(coordinate, viewResolution, projection, param) {
        var url = this.getSource().getFeatureInfoUrl(coordinate, viewResolution, projection, param);
        if (url) {
            return fetch(url)
                .then(function (r) {
                    return r.json();
                })
                .then(function (json) {
                    return json;
                });
        }
        return null;
    }

    getFeatures(params) {
        const layers = this.getSource().getParams().layers;
        const wmsUrl = this.getSource().getUrl();
        const wfsUrl = wmsUrl.replace('wms', 'wfs');
        return axios.get(wfsUrl, {
            params: Object.assign({
                service: 'WFS',
                version: '1.1.0',
                request: 'GetFeature',
                typeName: layers,
                outputFormat: 'application/json',
                srsName: 'EPSG:4326',
                maxFeatures: 100
            },params)
        }).then(res => {
            return res?.data;
        })
    }
}

export default GeoImageLayer;