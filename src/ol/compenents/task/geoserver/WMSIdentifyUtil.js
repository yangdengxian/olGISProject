/*jshint esversion: 6 */

/**
 * @description 针对TileWMS的identify实现工具类
 * @author wlf
 * @date 2021-04-27
 */
import {ajaxGetReqeust} from '../../../utils/Util';
import GeoJSON from 'ol/format/GeoJSON'; 
    
export function identifyOGCWMS(map, wmsSource, point, successCallBack, errorCallBack) {
  var viewResolution = map.getView().getResolution();
  var projection = map.getView().getProjection().getCode();
  var url = wmsSource.getGetFeatureInfoUrl(
    point,
    viewResolution,
    projection,
    {'INFO_FORMAT': 'application/json'}
  );

  ajaxGetReqeust(url, {}).then(result => {
    if (!Array.isArray(result.features) || result.features.length==0) 
      return;
    var features = [];
    result.features.forEach((feature, index) => {
      features.push((new GeoJSON()).readFeature(feature));
    });
    successCallBack(point, features);
  }, errorCallBack);
};