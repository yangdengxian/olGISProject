/*jshint esversion: 6 */

import {ajaxGetReqeust} from '../../../utils/Util';

/**
 * @classdesc arcgis范围查询
 * @author wlf
 * @date 2021-03-01
 * @module task/geoserver/WFSQuery
 */
class WFSQuery {
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
    constructor(map, url, params, perRsCount) {

        // http://localhost:8080/geoserver/mydemo1/wfs?
        // service=WFS&version=1.0.0&request=GetFeature&typeName=mydemo1%3Acounties&maxFeatures=50&outputFormat=application%2Fjson

        // var params1 = {
        //     maxFeatures: 50,
        //     outputFormat: "",
        //     startindex: 1,
        //     count: 1,
        //     resulttype: "results", //hits
        //     typeNames: "mydemo1:counties",
        //     bbox: map.frameState_.extent
        //   };

        this.getUrl(url);
        // this.url = this.layerurl + "/" + params.layerid + "/query";
        // this.map = params.map;
        this.params = {};
        this.params.service = 'WFS';
        this.params.version = '2.0.0';
        this.params.request = 'GetFeature';
        this.params.startindex = params.startindex || 1;
        this.params.count = perRsCount; //params.count || 1;
        this.params.outputformat = params.outputformat || "application/json";
        this.params.resulttype = params.resulttype || "results";
        this.params.typeNames = params.typeNames;
        this.params.srsName = this.getProjection(map);
        this.params.bbox = this.getmapExtentString(params.bbox) + "," + this.params.srsName;
        // propertyName=attribute1,attribute2
        // srsName="urn:ogc:def:crs:EPSG::4326"
    }

    getProjection(map) {
        var projection = map.getView().getProjection().getCode();
        return projection;
    }

    getUrl(urlSource){
        this.layerurl = urlSource;
        var urlCopy = urlSource;
        var urlCopys = urlCopy.split('?');
        if(urlCopys.length>0){
            urlCopy = urlCopys[0];
        }
        
        var wmsindex = -1;
        wmsindex = urlCopy.lastIndexOf("/wms");
        if (wmsindex == -1)
            wmsindex = urlCopy.lastIndexOf("/ows");
        if (wmsindex == -1)
            wmsindex = urlCopy.lastIndexOf("/wfs");
        if ((wmsindex > -1))
            this.layerurl = urlCopy.slice(0, wmsindex);
        this.layerurl = this.layerurl + "/wfs";
    }

    getmapExtentString(extent){
        var oldstr = JSON.stringify(extent);
        var newstr = oldstr.substr(1, oldstr.length - 2);
        return newstr;
    }
  
    /**
     * @description 查询函数
     */
    execute() {
        return ajaxGetReqeust(this.layerurl, this.params);
    }
}

export default WFSQuery;