/**
 * 坐标转换
 * @author ydx
 * @date 2019-04-18
 */
import { fromLonLat, toLonLat, transform, transformExtent } from 'ol/proj';

export default class TransFormUtil {
    constructor(params) {
        this.source = params.source;
        this.destination = params.destination;
    };
    /**
     * 经纬度转平面   4326
     * @param {Array} coordinate [lon,lat]
     */
    fromLonLat(coordinate) {
        return fromLonLat(coordinate, this.destination);
    };
    /**
     * 平面坐标转经纬度   3857
     * @param {Array} coordinate [x,y]
     */
    toLonLat(coordinate) {
        return toLonLat(coordinate, this.destination);
    }

    transform(coordinate) {
        return transform(coordinate, this.source, this.destination);
    }

    transformExtent(extent) {
        return transformExtent(extent, this.source, this.destination);
    }

    /**
     * 
     * @param {Array} coordinate [lon,lat] or [x,y]
     * @param {String} source eg: 'EPSG:4326'
     * @param {String} destination eg: 'EPSG:3857'
     */
    transformByProjParm(coordinate, source, destination) {
        if (Array.isArray(coordinate)) {
            return coordinate.length > 2 ?
                transformExtent(coordinate, source, destination) :
                transform(coordinate, source, destination)
        }
        return coordinate;
    }

}