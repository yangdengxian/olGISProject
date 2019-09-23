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
     * @param {Boolean} [param.steps=true,false] Returned route steps for each route leg
     * @param {String} [param.alternatives=false,true, Number] Search for alternative routes. Passing a number alternatives=n searches for up to n alternative routes. *
     * @param {String} [param.overview=simplified] Returned route geometry format (influences overview and per step)
     * @param {String} [param.geometries=polyline, geojson] Returned route geometry format (influences overview and per step)
     */
    constructor(param) {
        super({
            url: param.url
        })
        this.steps = param.steps || true;
        this.alternatives = param.alternatives || false;
        this.overview = param.overview || 'simplified';
        this.geometries = param.geometries || 'polyline';
    }

    /**
     * @description 导航
     * @param {*} coordinates 起始点经纬度坐标
     * @param {function} callback
     */
    routeService(coordinates, callback) {
        this.route({
            coordinates: coordinates,
            steps: this.steps,
            alternatives: this.alternatives,
            overview: this.overview,
            geometries: this.geometries
        }, callback)
    }

    /**
     * @description 旅行家算法
     * @param {*} coordinates 起始点经纬度坐标
     * @param {*} callback 
     */
    tripService(coordinates, callback) {
        this.trip({
            coordinates: coordinates,
            steps: this.steps,
            overview: this.overview,
            geometries: this.geometries
        }, callback);
    }

    /**
     * @description 地图匹配，绑路
     * @param {*} coordinates 坐标
     * @param {*} timestamps 
     * @param {*} callback 
     */
    matchService(coordinates, timestamps, callback) {
        this.match({
            coordinates: coordinates,
            timestamps: timestamps,
            steps: this.steps,
            overview: this.overview,
            geometries: this.geometries
        }, callback);
    }

    tableService(coordinates, sources, destinations, callback) {
        this.table({
            coordinates: coordinates,
            sources: sources,
            destinations: destinations
        }, callback);
    }

    tileService() {

    }
}

export default OSRMService;