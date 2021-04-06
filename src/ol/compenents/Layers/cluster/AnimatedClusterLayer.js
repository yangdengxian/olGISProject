import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import SelectCluster from '../../interactions/SelectClusterInteraction';
import Cluster from 'ol/source/Cluster';
import Vector from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle';

let styleCache = {};

function getStyle(feature, resolution) {
    var size = feature.get('features').length;
    var style = styleCache[size];
    if (size > 1) {
        if (!style) {
            var color = size > 25 ? "192,0,0" : size > 8 ? "255,128,0" : "0,128,0";
            var radius = Math.max(8, Math.min(size * 0.75, 20));
            var dash = 2 * Math.PI * radius / 6;
            var dash = [0, dash, dash, dash, dash, dash, dash];
            style = styleCache[size] = new Style({
                image: new Circle({
                    radius: radius,
                    stroke: new Stroke({
                        color: "rgba(" + color + ",0.5)",
                        width: 2,
                        /* lineDash: dash,
                        lineCap: "butt" */
                    }),
                    fill: new Fill({
                        color: "rgba(" + color + ",1)"
                    })
                }),
                text: new Text({
                    text: size.toString(),
                    fill: new Fill({
                        color: '#fff'
                    })
                })
            });
        }
    } else {
        style = feature.get('features')[0].getStyle() || new Style({
            fill: new Fill({
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
            })
        });
    }

    return [style];
}

var defaultSelectStyle = new Style({
    image: new Circle({
        radius: 5,
        stroke: new Stroke({
            color: "rgba(0,255,255,1)",
            width: 1
        }),
        fill: new Fill({
            color: "rgba(0,255,255,0.3)"
        })
    }),
    // Draw a link beetween points (or not)
    stroke: new Stroke({
        color: "#fff",
        width: 1
    })
});

/**
 * @classdesc 聚合类
 * @author ydx
 * @date 2020-12-23
 * @module Layers/cluster/AnimatedClusterLayer
 * @extends AnimatedCluster
 */
class AnimatedClusterLayer extends AnimatedCluster {
    /**
     * 
     * @param {*} param 
     * @param {Style} param.style 
     * @param {Cluster} param.source 聚合要素集 
     * @param {boolean} param.baseLayer 是否基础底图
     * @param {boolean} param.displayInLayerSwitcher 是否在控件显示
     * @param {boolean} param.openInLayerSwitcher The openInLayerSwitcher property of an ol.layer.Group is used to code the visibility of the sublayers.
     * @param {boolean} param.thmemeLayer 是否专题图
     * @param {Map} param.map 地图对象
     */
    constructor(param) {
        param.style = param.style || getStyle;
        param.source = param.source || new Cluster({
            distance: 40,
            source: new Vector()
        });
        super(param);
        this.featureSource = param.source.getSource();
        this.selectCluster = param.selectCluster || new SelectCluster({ // Point radius: to calculate distance between the features
            pointRadius: 7,
            animate: true,
            // Feature style when it springs apart
            featureStyle: function(f, res) {
                var cluster = f.get('features');
                var s = null;
                if (cluster) {
                    s = getStyle(f, res);

                } else {
                    s = [
                        defaultSelectStyle
                    ];
                }
                return s;
            },

            // Style to draw cluster when selected
            style: function(f, res) {
                var cluster = f.get('features');
                var s = null;
                if (cluster.length > 1) {
                    s = getStyle(f, res);

                } else {
                    s = [
                        cluster[0].getStyle()
                    ];
                }
                return s;
            }
        });
        this.map = param.map;
        if (this.map) {
            //添加聚合图层交互工具
            this.map.addInteraction(this.selectCluster);
        }
    }


    /**
     * @description 新增要素
     * @param {Array<Feature>} features 
     */
    addFeatures(features) {
        this.featureSource.addFeatures(features);
    }

    /**
     * @description 清除
     */
    clear() {
        this.featureSource.clear();
    }
}

export default AnimatedClusterLayer;