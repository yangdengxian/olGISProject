import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
//要素图层
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
        this.getWellStyle().then(wellStyle => {
            vectorLayer.setStyle(wellStyle);
            vectorLayer.getSource().clear();
            if (features && features.length) {
                vectorLayer.getSource().addFeatures(features);
            }
        })
    },

    featuresChanged(selectedFeatures) {
        selectedFeatures.on(['add', 'remove'], function(feature) {
            var names = selectedFeatures.getArray().map(function(feature) {
                return feature.get('name');
            });

        });
    },

    getWellStyle(imagePath) {
        var promise = new Promise((resolve, reject) => {
            var image = new Image();
            image.src = imagePath || "../../../images/tools/path/multi.png";
            image.onload = function() {
                var wellStyle = new Style({
                    image: new Icon({
                            img: image,
                            imgSize: [22, 30],
                            crossOrigin: 'anonymous',
                            anchor: [0.5, 1]
                        })
                        /* fill: new Fill({
                            color: 'rgba(125, 125, 125, 0.2)'
                        }),
                        stroke: new Stroke({
                            color: '#ffcc33',
                            width: 2
                        }),
                        image: new Circle({
                            radius: 7,
                            fill: new Fill({
                                color: '#ffcc33'
                            })
                        }) */
                });
                resolve(wellStyle);
            };

        });
        return promise;
    }
};

export default WellOperation;