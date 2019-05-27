import 'ol-ext/dist/ol-ext.css';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Charts from 'ol-ext/style/Chart';
//样式
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

import GeoJSON from 'ol/format/GeoJSON';

/**
 * @classdesc ol-ext图表
 * @author ydx
 * @date 2019-04-16
 * @module Layers/vectorCharts/ExtChartLayer
 * @extends Vector
 */
class ExtChartLayer extends Vector {
    /**
     * 
     * @param {*} param 
     * @param {string} param.name 
     * @param {string} param.dataUrl 根据地址查询数据
     * @param {features} param.features 要素集  与 dataUrl互斥，二选一
     * @param {string} param.type 图表类型  'bar'、'pie'
     */
    constructor(param) {
        super({
            id: 'chartsLayer',
            name: param.name,
            title: 'charts',
            baseLayer: false,
            displayInLayerSwitcher: false,
            source: param.dataUrl ?
                new VectorSource({
                    url: param.dataUrl,
                    format: new GeoJSON(),
                }) : new VectorSource({
                    features: new GeoJSON().readFeatures(param.features),
                }),
            style: function(feature) {
                return getFeatureStyle(feature, param.type);
            },
        });
    }
}

function getFeatureStyle(feature, type) {
    var style = {},
        radius = 20,
        // area proportional to data size: s=PI*r^2
        data = feature.get('data');
    // Create chart style
    style = [
        new Style({
            image: new Charts({
                type: type,
                radius: radius,
                data: data,
                rotateWithView: true,
                stroke: new Stroke({ color: '#fff', width: 2 }),
            }),
        }),
    ];

    return style;
}

export default ExtChartLayer;