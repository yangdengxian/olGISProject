import LinearRing from 'ol/geom/LinearRing';
import { Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon } from 'ol/geom';
const JSTS = require('jsts');
/**
 * @description 缓冲区
 * @author ydx
 * @date 2019-08-19
 */
class BufferOverlay {
    /**
     * 
     * @param {*} param 
     */
    constructor() {
        this.distance = 50; //默认缓冲50米
        this.jsts = new JSTS.io.OL3Parser();
        this.jsts.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);
    }

    /**
     * @description 创建缓冲区
     * @param {Geometry} geom geometry
     * @param {Number} distance 缓冲半径
     */
    createBuffer(geom, distance) {
        let jstsGeom = this.jsts.read(geom);
        return this.jsts.write(jstsGeom.buffer(distance || this.distance));
    }

    /**
     * @description 创建geom
     * @param {Array} coordinates 
     */
    createGeometry(coordinates) {
        let geom;
        if (!Array.isArray(coordinates)) return;
        if (coordinates.length === 2) {
            geom = new Point(coordinates)
        }
        return geom;
    }

}

export default BufferOverlay;