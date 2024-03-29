import VectorSource from 'ol/source/VectorTile';
import VectorTile from 'ol/layer/VectorTile';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';

/**
 * @classdesc 要素展示图层
 * @author ydx
 * @date 2019-04-12
 * @module Layers/VectorTileLayer
 * @extends Vector
 */
class VectorTileLayer extends VectorTile {
    /**
     * 
     * @param {*} param 
     * @param {string} param.id  图层id 
     * @param {Map} param.map  地图实例 （必填）
     */
    constructor(param) {
        const options = Object.assign({
            id: param.id,
            title: param.title,
            visible: param.visible || false,
            baseLayer: param.baseLayer || false,
            thmemeLayer: param.thmemeLayer || false,
            displayInLayerSwitcher: param.displayInLayerSwitcher || false,
            source: param.source || new VectorSource(),
            // 矢量图层样式
            style: param.style || new Style({
                fill: new Fill({
                    color: 'rgba(255, 250, 205, 0.5)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new Circle({
                    radius: 3,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            }),
            // updateWhileAnimating: true
        },param)
        super(options);
        this.map = param.map;
    }

    

}

export default VectorTileLayer;