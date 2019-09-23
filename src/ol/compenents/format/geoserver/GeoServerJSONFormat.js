import GeoJSON from 'ol/format/GeoJSON';

/**
 * @classdesc geojson格式化
 * @author ydx
 * @date 2019-04-12
 * @module format/geoserver/GeoServerJSONFormat
 * @extends GeoJSON
 */
class GeoServerJSONFormat extends GeoJSON {
    /**
     *  @param {*} param 
     */
    constructor(param) {
        super(param);
    };
}

export default GeoServerJSONFormat;