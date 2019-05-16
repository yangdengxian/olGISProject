/**
 * arcgis范围查询
 * @author ydx
 * @date 2019-04-11
 */

import QueryTask from '../QueryTask';
import GML from 'ol/format/GML3';
import GeoServerJSONFormat from '../../format/geoserver/GeoServerJSONFormat';
//业务数据展示
import WellOperation from '../../../../project/js/WellOperation';


export default class GeoserverIdentifyTask extends QueryTask {
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


    execute() {
        var __this = this;
        __this.params.dataType = 'json';
        __this.ajaxGetReqeust(__this.url, __this.params).then(__this.successCallBack.bind(this), __this.errorCallBack.bind(this));
    }

    successCallBack(result) {
        var __this = this;
        var features = [];
        if (!result.features) return;
        var geojson = new GeoServerJSONFormat();
        features = geojson.readFeatures(result);
        //layerId 与初始化查询要素图层id一致
        WellOperation.displayWellDataFuncs(features, __this.map, "queryFeaturesLayer");
    }

    errorCallBack(error) {
        throw new Error(error);
    }

    getGeoJSONData(results) {

    }

}