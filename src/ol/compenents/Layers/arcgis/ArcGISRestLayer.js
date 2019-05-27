import Util from '../../../utils/Util';
import { ImageArcGISRest } from 'ol/source';
import { assert } from 'ol/asserts';
import { appendParams } from 'ol/uri';

/**
 * @classdesc arcgis restful 服务扩展
 * @author ydx
 * @date 2019-04-11
 * @module Layers/arcgis/ArcGISRestLayer
 * @extends ImageArcGISRest
 */
class ArcGISRestLayer extends ImageArcGISRest {
    /**
     * 
     * @param {*} param ImageArcGISRest.options
     * @param {Object} param.params
     * @param {Array<number>} param.params.layerIds   图层id
     */
    constructor(param) {
        super(param);
        //可见图层
        if (param.params.layerIds) {
            this.layers = 'show:' + param.params.layerIds.join(',');
        }
    };

    /**
     * @override
     * @description 重写父类方法
     * @param {Array<number>} extent 范围 [xmax,ymax,xmin,ymin]
     * @param {Array<number>} size [w,h]
     * @param {*} pixelRatio 
     * @param {string} projection 'ESPG:4326'
     * @param {Object} params 
     */
    getRequestUrl_(extent, size, pixelRatio, projection, params) {
        // ArcGIS Server only wants the numeric portion of the projection ID.
        var srid = projection.getCode().split(':').pop();

        params['SIZE'] = size[0] + ',' + size[1];
        params['BBOX'] = extent.join(',');
        params['BBOXSR'] = srid;
        params['IMAGESR'] = srid;
        params['DPI'] = Math.round(90 * pixelRatio);
        if (this.layers) {
            params['layers'] = this.layers;
        }

        var url = this.url_;
        //判断是否有参数
        var requestParams = Util.getRequestParams(url);
        if (Object.keys(requestParams).length) {
            url = url.substring(0, url.lastIndexOf("?"));
            params = Object.assign(params, requestParams);
        }

        var modifiedUrl = url
            .replace(/MapServer\/?$/, 'MapServer/export')
            .replace(/ImageServer\/?$/, 'ImageServer/exportImage');
        if (modifiedUrl == url) {
            assert(false, 50); // `options.featureTypes` should be an Array
        }
        return appendParams(modifiedUrl, params);
    };
}
export default ArcGISRestLayer;