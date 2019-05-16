/**
 * esri格式化
 * @author ydx
 * @date 2019-04-12
 */
import EsriJSON from 'ol/format/EsriJSON';

export default class EsriJSONFormat extends EsriJSON {
    /**
     * 构造函数
     * @param {Object} param 初始化参数
     */
    constructor(param) {
        super(param);
    };

    /**
     * 重写父类方法 读取要素
     * @param {Object} object 要素对象
     * @param {Object} opt_options 参数
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