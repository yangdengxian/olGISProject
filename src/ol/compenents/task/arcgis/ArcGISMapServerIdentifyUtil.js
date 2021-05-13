/*jshint esversion: 6 */

/**
 * @description 针对ArcGISMapServerIdentify的查询工具类
 * @author wlf
 * @date 2021-04-27
 */

import ArcGISMapServerIdentify from './ArcGISMapServerIdentify';
import EsriJSONFormat from '../../format/arcgis/EsriJSONFormat';
    
export function identifyArcGISMapServer(map, arcgisurl, layersIds, point, successCallBack, errorCallBack) {
  var arcGISIdentifyTask = new ArcGISMapServerIdentify(
    arcgisurl, {
        map: map,
        geometry: point,
        mapExtent: map.frameState_.extent,
        layersIds: layersIds,
        projection: getProjection(map)
    }
  );

  arcGISIdentifyTask.execute().then(result => {
    if (!Array.isArray(result.results) || result.results.length==0) 
      return;
    var identifyJSONformat = new EsriJSONFormat({ id: "identifyJSONformat" });
    var features = identifyJSONformat.readFeatures(result);
    successCallBack(point, features);
  }, errorCallBack);
};
  
function getProjection(map) {
    return parseInt(map.getView().getProjection().getCode().split(":")[1]);
};