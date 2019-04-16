/**
 * arcgis条件查询
 * @author ydx
 * @date 2019-04-11
 */
import QueryTask from '../QueryTask';
import {
    equalTo as equalToFilter,
    like as likeFilter,
    and as andFilter
} from 'ol/format/filter.js';

export default class GeoserverQueryTask extends QueryTask {
    constructor(params) {
        super(params);
    };

    setParams() {

    }

    execute(params, callBack) {
        this.ajaxGetReqeust().then((value) => {
            callBack();
        });
    }

}