import isolines from '@turf/isolines';
import VectorLayer from '../VectorLayer';
import GeoJSON from 'ol/format/GeoJSON';
/**
 * @classdesc 等值线
 * @author ydx
 * @date 2021-03-02
 */
class IsoLineLayer extends VectorLayer {
    constructor(param) {
        super(param);
        this.geojsonUtil = new GeoJSON();
        this.isolines = [];
    }

    /**
     * @description http://turfjs.org/docs/#isolines
     * @param {FeatureCollection<Point>} featureCollection  input points
     * @param {Array} breaks values of zProperty where to draw isolines
     * @param {Object} options 
     * @param {string} options.zProperty the property name in
     * @param {Object} options.commonProperties GeoJSON properties passed to ALL isolines
     * @param {Array} options.breaksProperties GeoJSON properties passed, in order, to the correspondent isoline; the breaks array will define the order in which the isolines are created
     * @returns features
     */
    createIsoLines(featureCollection, breaks, options) {
        const lines = isolines(featureCollection, breaks, options);
        this.isolines = this.geojsonUtil.readFeatures(lines);
        return this.isolines;
    };

    /**
     * @description 坐标转换
     * @param {String} source EPSG:4326
     * @param {String} destination EPSG:3857
     * @returns features
     */
    transform(source, destination) {
        if (!this.isolines.length) throw Error('等值线为空');
        this.isolines.forEach(isoline => {
            isoline.setGeometry(isoline.getGeometry().transform(source, destination));
        });
        return this.isolines
    }

}

export default IsoLineLayer;