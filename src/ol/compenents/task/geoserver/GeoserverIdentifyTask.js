import QueryTask from '../QueryTask';
import WFST from '../../format/WFST';

/**
 * @classdesc geoserver范围查询
 * @author ydx
 * @date 2019-04-11
 * @module task/arcgis/GeoserverIdentifyTask
 * @extends QueryTask
 */
class GeoserverIdentifyTask extends QueryTask {
    /**
     * 
     * @param {*} url 必填*
     * @param {*} params 
     * @param {map} params.map  
     * @param {Array<string>} params.queryNames  必填* eg ['localhost:point','localhost:line']
     * @param {bbox} params.filter  必填*
     * @param {string} params.srsName  必填* 'ESPG:3857'
     */
    constructor(url, params) {
        super();
        this.url = url + "/wfs";
        this.map = params.map;
        this.params = {};
        this.params.service = 'wfs';
        this.params.version = '1.1.0';
        this.params.request = 'GetFeature';
        this.params.typeName = params.queryNames.join(',');
        this.params.featureTypes = params.queryNames;
        this.params.featurePrefix = params.featurePrefix;
        this.params.outputformat = 'json';
        this.params.maxFeatures = params.maxFeatures || 50;
        this.params.srsName = params.srsName;
        //暂实现框选查询
        this.params.filter = params.filter;
        this.wfst = new WFST({
            url: this.url
        });
    };


    /**
     * @description 查询函数
     * @param {function} successCallBack 
     * @param {function} errorCallBack 
     */
    execute(successCallBack, errorCallBack) {
        var __this = this;
        return __this.wfst.loadFeatures({
            featurePrefix: __this.params.featurePrefix,
            featureTypes: __this.params.featureTypes, //
            srsName: __this.params.srsName,
            filter: __this.params.filter
        }).then(features => {
            return features;
        }, error => {
            return error;
        });
    }


}

export default GeoserverIdentifyTask;