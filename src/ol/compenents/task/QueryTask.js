/**
 * 查询工具
 */
import Util from '../../utils/Util';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';

export default class QueryTask {
    constructor(param) {
        // super(param);
    }

    getQueryUrlByParams(url, param) {
        var queryUrl = url + "?";
        for (const key in param) {
            if (param.hasOwnProperty(key)) {
                const value = param[key];
                queryUrl += key + '=' + value + '&';
            }
        }
        return queryUrl.substring(0, queryUrl.lastIndexOf("&"));
    }

    ajaxGetReqeust(url, param) {
        return Util.ajaxGetReqeust(url, param);
    };

    //获取查询样式
    getStyle() {
        var styleCache = {
            'esri': new Style({
                fill: new Fill({
                    color: 'rgba(125, 125, 125, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new Circle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            }),
            'geoserver': new Style({
                fill: new Fill({
                    color: 'rgba(255, 0, 0, 255)'
                }),
                stroke: new Stroke({
                    color: 'rgba(110, 110, 110, 255)',
                    width: 0.4
                })
            })
        };

        return styleCache;
    }
}