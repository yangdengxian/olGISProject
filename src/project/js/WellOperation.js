/**
 * 井业务功能展示
 * @author ydx
 * @date 2019-04-11
 */
//井业务图层展示

const WellOperation = {
    selectWellsInteraction: null,
    /**
     * 井数据展示
     * @param {Array} features 
     * @param {Map} map 
     * @param {String} vectorLayerId    展示要素图层id 
     */
    displayWellDataFuncs(features, map, vectorLayerId) {
        var vectorLayer = map.getLayerById(vectorLayerId);
        vectorLayer.getSource().clear();
        if (features && features.length) {
            vectorLayer.getSource().addFeatures(features);
        }
    },

    featuresChanged(selectedFeatures) {
        selectedFeatures.on(['add', 'remove'], function(feature) {
            var names = selectedFeatures.getArray().map(function(feature) {
                return feature.get('name');
            });

        });
    }
};

export default WellOperation;