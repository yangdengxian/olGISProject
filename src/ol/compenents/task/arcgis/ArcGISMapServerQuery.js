/*jshint esversion: 6 */

import {ajaxGetReqeust} from '../../../utils/Util';

/**
 * @classdesc arcgis范围查询
 * @author wlf
 * @date 2021-04-27
 * @module task/arcgis/ArcGISMapServerQuery
 */
class ArcGISMapServerQuery {
    /**
     * 
     * @param {*} url 必填*
     * @param {*} params 
     * @param {map} params.map  必填*
     * @param {number} params.layerid  必填*
     * @param {ArcgisgGometry} params.geometry  必填*
     * @param {geometryType} params.geometryType  必填*
     * @param {number} params.inSR  必填* '3857'
     */
    constructor(url, params) {
        this.getUrl(url);
        this.url = this.layerurl + "/" + params.layerid + "/query";
        this.map = params.map;
        this.params = {};
        this.params.f = 'json';
        this.params.returnGeometry= params.returnGeometry || true;
        this.params.spatialRel = params.spatialRel || "esriSpatialRelIntersects";
        this.setGeometry(params);
        this.params.inSR = params.inSR;
        this.params.outFields = this.getoutFieldsString(params.outFields);
        this.params.outSR = params.outSR || this.params.inSR;
        if (params.distance) this.params.distance = params.distance;
        if (params.units) this.params.units = params.units || "esriSRUnit_StatuteMile";
        if (params.returnCountOnly) this.params.returnCountOnly = params.returnCountOnly;
        if (params.resultOffset) this.params.resultOffset = params.resultOffset;
        if (params.resultRecordCount) this.params.resultRecordCount = params.resultRecordCount;
        this.setToken();
    }

    getUrl(urlSource){
        var urls = urlSource.split('?');
        if(urls.length>0){
            this.layerurl = urls[0];
        }
        if(urls.length>1){
            urls.forEach(kv => {
                if(kv.indexOf('token')>=0){
                    this.token = kv.split('=')[1];
                }
            });
        }
    }

    setToken(){
        if(this.token) this.params.token = this.token;
    }

    setGeometry(params) {
        // https://localhost:6443/arcgis/sdk/rest/index.html#//02ss0000008m000000

        // geometryType:
        // esriGeometryPoint | 
        // esriGeometryMultipoint | 
        // esriGeometryPolyline | 
        // esriGeometryPolygon | 
        // esriGeometryEnvelope

        // geometryType=esriGeometryEnvelope&geometry={xmin: -104, ymin: 35.6, xmax: -94.32, ymax: 41}
        // geometryType=esriGeometryEnvelope&geometry=-104,35.6,-94.32,41
        // geometryType=esriGeometryPoint&geometry=-104,35.6

        // 2D point
        // {"x" : -118.15, "y" : 33.80, "spatialReference" : {"wkid" : 4326}}

        // 2D multipoint 
        // {
        //     "points" : [[-97.06138,32.837],[-97.06133,32.836],[-97.06124,32.834],[-97.06127,32.832]],
        //     "spatialReference" : {"wkid" : 4326}
        // }

        // 2D polyline 
        // {
        //   "paths" : [[[-97.06138,32.837],[-97.06133,32.836],[-97.06124,32.834],[-97.06127,32.832]], 
        //              [[-97.06326,32.759],[-97.06298,32.755]]],
        //   "spatialReference" : {"wkid" : 4326}
        // }
        
        // 2D polygon 
        // {
        //   "rings" : [[[-97.06138,32.837],[-97.06133,32.836],[-97.06124,32.834],[-97.06127,32.832],
        //               [-97.06138,32.837]],[[-97.06326,32.759],[-97.06298,32.755],[-97.06153,32.749],
        //               [-97.06326,32.759]]],
        //   "spatialReference" : {"wkid" : 4326}
        // }
        this.params.geometryType = params.geometryType;
        if (params.geometryType == "esriGeometryPoint") {
            this.params.geometry = this.getgeometryPointString(params.geometry);
        }  else if (params.geometryType == "esriGeometryEnvelope") {
            this.params.geometry = this.getmapExtentString(params.geometry);
        }
    }
    
    getgeometryPointString(pt){
        var oldstr = JSON.stringify(pt);
        var newstr = oldstr.substr(1, oldstr.length - 2);
        return newstr;
    }

    getmapExtentString(extent){
        var oldstr = JSON.stringify(extent);
        var newstr = oldstr.substr(1, oldstr.length - 2);
        return newstr;
    }

    getoutFieldsString(outFields){
        if (outFields)
            return outFields.toString();            
        return "*";
    }

    /**
     * @description 查询函数
     */
    execute() {
        return ajaxGetReqeust(this.url, this.params);
    }
}

export default ArcGISMapServerQuery;