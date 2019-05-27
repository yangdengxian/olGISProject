import QueryTask from '../QueryTask';
import GML from 'ol/format/GML3';
import GeoServerJSONFormat from '../../format/geoserver/GeoServerJSONFormat';
//业务数据展示
import WellOperation from '../../../../project/js/WellOperation';

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
     * @param {map} params.map  必填*
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
        this.params.outputformat = 'json';
        this.params.maxFeatures = params.maxFeatures || 50;
        this.params.srsName = params.srsName;
        //暂实现框选查询
        this.params.bbox = params.filter;

        // this.params.filter = this.getFilterXMLString(this.params, params.filter);
    };

    /**
     * @override
     * @description XML转换
     * @param {*} param 必填*
     * @param {string} param.typeName 必填*
     * @param {string} param.srsName 必填*
     * @param {string} param.version 必填*
     * @param {feature} feature 必填*
     */
    getFilterXMLString(param, feature) {
        var formatGML = new GML({
            featureNS: param.typeName.split(":")[1],
            featureType: param.typeName.split(":")[0],
            srsName: param.srsName,
            version: param.version
        });
        formatGML.writeFeatures(feature);
        return new XMLSerializer().serializeToString(formatGML);
    }

    /**
     * @description 查询函数
     * @param {function} successCallBack 
     * @param {function} errorCallBack 
     */
    execute(successCallBack, errorCallBack) {
        var __this = this;
        __this.params.dataType = 'json';
        __this.ajaxGetReqeust(__this.url, __this.params).then(successCallBack || __this.successCallBack.bind(this), errorCallBack || __this.errorCallBack.bind(this));
    }

    /**
     * @description 成功回调
     * @param {Features} result 
     */
    successCallBack(result) {
        var __this = this;
        var features = [];
        if (!result.features) return;
        var geojson = new GeoServerJSONFormat();
        features = geojson.readFeatures(result);
        //layerId 与初始化查询要素图层id一致
        WellOperation.displayWellDataFuncs(features, __this.map, "queryFeaturesLayer");
    }


    /**
     * @description 失败回调
     * @param {error} error 
     */
    errorCallBack(error) {
        throw new Error(error);
    }

    /*     
        getGeoJSONData(results) {

        }
     */
}

export default GeoserverIdentifyTask;