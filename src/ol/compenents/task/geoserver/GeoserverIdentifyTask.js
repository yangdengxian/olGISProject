/**
 * arcgis范围查询
 * @author ydx
 * @date 2019-04-11
 */
import QueryTask from '../QueryTask';
import {
    equalTo as equalToFilter,
    like as likeFilter,
    and as andFilter,
    bbox as bboxFilter
} from 'ol/format/filter.js';
import { WFS, GeoJSON } from 'ol/format.js';
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
        // this.params.filter = params.filter;
        // this.params.bobox = '';
        // this.params.filter = params.filter;

    };

    execute() {
        var __this = this;
        __this.ajaxGetReqeust(__this.url, __this.params).then(__this.successCallBack.bind(this), __this.errorCallBack.bind(this));
    }

    successCallBack(result) {
        var __this = this;

    }

    errorCallBack(error) {
        throw new Error(error);
    }

    getGeoJSONData(results) {

    }

}