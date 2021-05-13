/*jshint esversion: 6 */

/**
 * @description 针对ArcGISMapServerQuery的分页查询工具类
 * @author wlf
 * @date 2021-04-27
 */

 import ArcGISMapServerQuery from './ArcGISMapServerQuery';
 import $ from 'jquery/dist/jquery';
 import EsriJSONFormat from '../../format/arcgis/EsriJSONFormat';
 
const ArcGISMapServerQueryUtil = {
    cancel: false,

    query: function(arcgisurl, params, maxCount, perRsCount, successCallBack, errorCallBack) {
         var arcGISMapServerQuerys = [];
         for(var currentOffset =0; currentOffset<maxCount; currentOffset += perRsCount) {
             var paramsCopy = ArcGISMapServerQueryUtil.copyParams(params);
             params.returnCountOnly = false;
             paramsCopy.resultRecordCount = perRsCount;
             paramsCopy.resultOffset = currentOffset;
         
             arcGISMapServerQuerys.push(new ArcGISMapServerQuery(arcgisurl, paramsCopy));
         }
     
         if (arcGISMapServerQuerys.length == 0)
             return;
         
         ArcGISMapServerQueryUtil.recursive(0, arcGISMapServerQuerys, successCallBack, errorCallBack);
    },
     
    copyParams: function(params) {
         return $.extend({}, params);
    },

    setCancel: function(cancel){
        ArcGISMapServerQueryUtil.cancel = cancel;
    },

    getCancel: function() {
        return ArcGISMapServerQueryUtil.cancel;
    },
     
    recursive: function(currentIndex, arcGISMapServerQuerys, successCallBack, errorCallBack) {
         var currentMapServerQuery = arcGISMapServerQuerys[currentIndex++];
         if (!currentMapServerQuery) 
             return;
         currentMapServerQuery.execute().then(result => {
             ArcGISMapServerQueryUtil.addFeatures(result, successCallBack);
             if(ArcGISMapServerQueryUtil.getCancel())
                return;
             ArcGISMapServerQueryUtil.recursive(currentIndex, arcGISMapServerQuerys, successCallBack);
         } , errorCallBack);        
    },
     
    addFeatures: function(result, successCallBack) {
         if (!Array.isArray(result.features) || result.features.length == 0) 
             return;
         console.log(result.features.length);
         var identifyJSONformat = new EsriJSONFormat({ id: "identifyJSONformat" });
         var features = identifyJSONformat.readFeatures(result);
         successCallBack(features);
    }
 };
     
 export default ArcGISMapServerQueryUtil;