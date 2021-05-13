/*jshint esversion: 6 */
import {ajaxGetReqeust} from '../../../utils/Util';
import EsriJSONFormat from '../../format/arcgis/EsriJSONFormat';

/**
 * @classdesc arcgis范围查询
 * @author wlf
 * @date 2021-03-01
 * @module task/arcgis/ArcGISMapServerIdentify
 * @extends QueryTask
 */
class ArcGISMapServerIdentify{
    /**
     * 
     * @param {*} url 必填*
     * @param {*} params 
     * @param {map} params.map  必填*
     * @param {ArcgisExtent} params.geometry  必填*
     * @param {ArcgisExtent} params.mapExtent  必填*
     * @param {Array<number>} params.layersIds  必填*
     * @param {number} params.projection  必填* '3857'
     */
    constructor(url, params) {
        this.getUrl(url);
        this.url = this.layerurl + "/identify";
        this.map = params.map;
        this.params = {};
        this.params.f = 'json';
        this.params.tolerance = params.tolerance || 5;
        this.params.returnGeometry = params.returnGeometry || true;
        this.params.returnFieldName = params.returnFieldName || false;
        this.params.returnUnformattedValues = params.returnUnformattedValues || false;
        this.params.imageDisplay = params.imageDisplay || '1920,937,96';
        this.params.geometry = this.getgeometryPointString(params.geometry);
        this.params.geometryType = params.geometryType || 'esriGeometryPoint';
        this.params.sr = params.projection;
        this.params.mapExtent = this.getmapExtentString(params.mapExtent);
        this.params.layers = 'all:' + this.getmapExtentString(params.layersIds);
        this.setToken();
        //格式化数据
        this.identifyJSONformat = new EsriJSONFormat({ id: "identifyJSONformat" });
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
    
    getgeometryPointString(pt){
        var ptOjb = {"x":pt[0], "y":pt[1]};
        var ptStr = JSON.stringify(ptOjb);
        return ptStr;
    }

    getmapExtentString(mapExtent){
        var oldstr = JSON.stringify(mapExtent);
        var newstr = oldstr.substr(1, oldstr.length - 2);
        return newstr;
    }

    /**
     * @description 查询函数
     * @param {function} successCallBack 
     * @param {function} errorCallBack 
     */
    execute() {
        return ajaxGetReqeust(this.url, this.params);
    }
}

export default ArcGISMapServerIdentify;