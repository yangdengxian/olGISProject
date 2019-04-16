/**
 * arcgis条件查询
 * @author ydx
 * @date 2019-04-11
 */
import QueryTask from '../QueryTask';

export default class ArcGISQueryTask extends QueryTask {
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