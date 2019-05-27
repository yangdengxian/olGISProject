import EsriJSON from 'ol/format/EsriJSON';

/**
 * @classdesc esri格式化
 * @author ydx
 * @date 2019-04-12
 * @module  format/arcgis/EsriJSONFormat
 * @extends EsriJSON
 */
class EsriJSONFormat extends EsriJSON {
    /**
     *  @param {string} id 
     */
    constructor(param) {
        super(param);
    };

    /**
     * @override
     * @description 重写父类方法,获取 results
     * @param {object} object 
     * @param {object} opt_options 
     */
    readFeaturesFromObject(object, opt_options) {
        var options = opt_options ? opt_options : {};
        if (object['features'] || object["results"]) {
            var esriJSONFeatureSet = object;
            var features = [];
            var esriJSONFeatures = esriJSONFeatureSet.features || esriJSONFeatureSet.results;
            options.idField = object.objectIdFieldName;
            for (var i = 0, ii = esriJSONFeatures.length; i < ii; ++i) {
                features.push(this.readFeatureFromObject(esriJSONFeatures[i], options));
            }
            return features;
        } else {
            return [this.readFeatureFromObject(object, options)];
        }
    }
}

export default EsriJSONFormat;