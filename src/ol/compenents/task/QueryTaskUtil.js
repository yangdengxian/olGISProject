/*jshint esversion: 6 */

/**
 * @description 针对查询任务的工具类
 * @author wlf
 * @date 2021-04-27
 */

import ArcGISMapServerQuery from './arcgis/ArcGISMapServerQuery';
import ArcGISMapServerQueryUtil from './arcgis/ArcGISMapServerQueryUtil';

import {identifyArcGISMapServer} from './arcgis/ArcGISMapServerIdentifyUtil';
import {identifyOGCWMS} from './geoserver/WMSIdentifyUtil';
import WFSQuery from './geoserver/WFSQuery';

/**
 * @description 对 MapServer 数据的 分页查询 功能
 * @param {String} arcgisurl MapServer 的 url 字符串 
 * @param {params} params ArcGISMapServerQuery 需要的参数列表  
 * @param {Number} perRsCount 每页最大返回记录数  
 * @param {function} successCallBack 成功后回调函数 function(point, features)，{point}查询的坐标点，{esriJSONFeatures} features 查询的要素集合
 * @param {function} errorCallBack 失败后回调函数
 */
export function pagingQueryMapServer(arcgisurl, params, perRsCount, successCallBack, errorCallBack) {
    ArcGISMapServerQueryUtil.setCancel(false);
    var paramsCopy = ArcGISMapServerQueryUtil.copyParams(params);
    paramsCopy.returnCountOnly = true;    
    var arcGISMapServerQuery = new ArcGISMapServerQuery(arcgisurl, paramsCopy);        
    arcGISMapServerQuery.execute().then(result => {
        if(result.count == 0)
            return;
        console.log(result.count);
        ArcGISMapServerQueryUtil.query(arcgisurl, params, result.count, perRsCount, successCallBack, errorCallBack);
    }, errorCallBack);
};

/**
 * @description 取消分页查询
 */
export function cancelPagingQueryMapServer(){
    ArcGISMapServerQueryUtil.setCancel(true);
};

/**
 * @description 对 'ol/source/TileWMS' 数据的 Identify 功能
 * @param {ol/Map} map 
 * @param {ol/source/TileWMS} wmsSource 对象  
 * @param {ol/coordinate/Coordinate} point 查询的坐标点  
 * @param {function} successCallBack 成功后回调函数 function(point, features)，{point}查询的坐标点，{GeoJSON[]} features 查询的要素集合
 * @param {function} errorCallBack 失败后回调函数
 */
export function identifyWMS(map, wmsSource, point, successCallBack, errorCallBack) {
    identifyOGCWMS(map, wmsSource, point, successCallBack, errorCallBack);
};

/**
 * @description 对 MapServer 数据的 Identify 功能
 * @param {ol/Map} map 
 * @param {String} arcgisurl MapServer 的 url 字符串 
 * @param {Array} layersIds Number 数组，layer 在 MapServer 中的 id 编号  
 * @param {ol/coordinate/Coordinate} point 查询的坐标点  
 * @param {function} successCallBack 成功后回调函数 function(point, features)，{point}查询的坐标点，{esriJSONFeatures} features 查询的要素集合
 * @param {function} errorCallBack 失败后回调函数
 */
export function identifyMapServer(map, arcgisurl, layersIds, point, successCallBack, errorCallBack) {
    identifyArcGISMapServer(map, arcgisurl, layersIds, point, successCallBack, errorCallBack);
};

export function wfsQuery(map, url, params, perRsCount, successCallBack, errorCallBack) {
    var wfsQuery = new WFSQuery(map, url, params, perRsCount);
    wfsQuery.execute().then((result => {
        var sdf = result;
    } , errorCallBack)); 
};    