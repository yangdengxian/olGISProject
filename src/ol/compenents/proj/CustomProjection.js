import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';

/**
 * @classdesc 自定义坐标系
 * @author ydx
 * @date 2019-12-12
 * @module proj/CustomProjection
 * @extends 
 */
class CustomProjection {
    /**
     *  @param {String} epsgCode 'EPSG:4490'
     *  @param {String} proj4Text 坐标参考串
     */
    constructor(epsgCode, proj4Text) {
        proj4.defs(epsgCode, proj4Text);
        register(proj4);
    }
}

export default CustomProjection;