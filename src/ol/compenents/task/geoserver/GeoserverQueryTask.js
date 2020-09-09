/**
 * geoserver条件查询
 * @author ydx
 * @date 2019-10-22
 */
import QueryTask from '../QueryTask';
import Utill from '../../../utils/Util';


export default class GeoserverQueryTask extends QueryTask {
    /**
     * 
     * @param {*} url 必填*
     * @param {*} params 
     * @param {Array<string>} params.queryNames  必填* eg ['localhost:point','localhost:line']
     * @param {bbox} params.filter  必填*
     * @param {string} params.srsName  必填* 'ESPG:3857'
     */
    constructor(url, params) {
        super();
        this.url = url + "/wfs";
        this.params = {};
        this.params.service = 'wfs';
        this.params.version = '1.1.0';
        this.params.request = 'GetFeature';
        this.params.typeName = params.typeName;
        this.params.outputformat = 'json';
        this.params.maxFeatures = params.maxFeatures || 50;
        this.params.srsName = params.srsName;
        this.params.cql_filter = params.cql_filter;
    };


    /**
     * @description 查询函数
     * @param {options} 查询参数 
     * @param {options.typeName} 表名  多表名 A,B   
     * @param {options.cql_filter} 查询条件 多表条件查询 filter1;filter2
     *  
     */
    execute(options) {
        var __this = this;
        var param = Object.assign(this.params, options);
        return Utill.ajaxGetReqeust(__this.url, param).then(features => {
            return features;
        }, error => {
            return error;
        });
        /* return __this.wfst.loadFeatures({
            featurePrefix: __this.params.featurePrefix,
            featureTypes: __this.params.featureTypes, //
            srsName: __this.params.srsName,
            cql_filter: __this.params.cql_filter
        }).then(features => {
            return features;
        }, error => {
            return error;
        }); */
    }

}