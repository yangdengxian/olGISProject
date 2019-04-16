/**
 * arcgis restful 服务扩展
 * @author ydx
 * @date 2019-04-11
 */
import Util from '../../../utils/Util';
import { ImageArcGISRest } from 'ol/source.js';
import { assert } from 'ol/asserts';
import { appendParams } from 'ol/uri';

export default class ArcGISRestLayer extends ImageArcGISRest {
    constructor(param) {
        super(param);
    };
    //重写父类方法
    getRequestUrl_(extent, size, pixelRatio, projection, params) {
        // ArcGIS Server only wants the numeric portion of the projection ID.
        var srid = projection.getCode().split(':').pop();

        params['SIZE'] = size[0] + ',' + size[1];
        params['BBOX'] = extent.join(',');
        params['BBOXSR'] = srid;
        params['IMAGESR'] = srid;
        params['DPI'] = Math.round(90 * pixelRatio);


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