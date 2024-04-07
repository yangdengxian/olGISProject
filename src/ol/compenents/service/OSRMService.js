import OSRM from '../../plugins/routing/osrm';

/**
 * @classdesc 路径规划
 * @author ydx
 * @date 20190909
 * @extends OSRM
 * @module service/OSRMService
 */
class OSRMService extends OSRM {
    /**
     * @param {Object} param 
     * @param {String} param.url request url
     * @param {Boolean}param.profile travel type
     * @param {Number} param.timeout
     */
    constructor(param) {
        super(param)
    }

    /**
     * @description 导航
     * @param {*} params 参数
     * @param {*} params.coordinates 起始点经纬度坐标
     * @param {*} params.alternatives ...
     * @param {function} callback
     */
    routeService(params, callback) {
        const options = Object.assign({}, params);
        this.route(options, callback);
    }

    /**
     * @description 旅行家算法
     * @param {*} params 参数
     * @param {*} params.coordinates 起始点经纬度坐标
     * @param {*} callback 
     */
    tripService(params, callback) {
        const options = Object.assign({}, params);
        this.trip(options, callback);
    }

    /**
     * @description 地图匹配，绑路
     * @param {*} params 参数
     * @param {*} params.coordinates 起始点经纬度坐标
     * @param {*} params.timestamps 
     * @param {*} callback 
     */
    matchService(params, callback) {
        const options = Object.assign({}, params);
        this.match(options, callback);
    }

    /**
     * @description Computes the duration of the fastest route between all pairs of supplied coordinates. Returns the durations or distances or both between the coordinate pairs. Note that the distances are not the shortest distance between two coordinates, but rather the distances of the fastest routes. Duration is in seconds and distances is in meters.
     * @param {*} params 参数
     * @param {*} params.coordinates 起始点经纬度坐标
     * @param {*} params.sources 
     * @param {*} params.destinations 
     * @param {*} callback 
     */
    tableService(params, callback) {
        const options = Object.assign({}, params);
        this.table(options, callback);
    }

    tileService() {

    }
}

export default OSRMService;