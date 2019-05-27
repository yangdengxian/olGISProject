import LayerGroup from 'ol/layer/Group';
import Collection from 'ol/Collection';

/**
 * @classdesc 图层组
 * @author ydx
 * @date 2019-04-19
 * @module Layers/GroupLayers
 * @extends LayerGroup
 */
class GroupLayers extends LayerGroup {
    /**
     * 
     * @param {*} param 
     * @param {string} param.id 
     * @param {string} param.title 
     * @param {boolean} param.baseLayer 是否基础底图
     * @param {boolean} param.displayInLayerSwitcher 是否在控件显示
     * @param {boolean} param.openInLayerSwitcher The openInLayerSwitcher property of an ol.layer.Group is used to code the visibility of the sublayers.
     * @param {boolean} param.thmemeLayer 是否专题图
     * @param {Array<layer>} param.layers 图层集
     */
    constructor(param) {
        super({
            id: param.id,
            title: param.title,
            baseLayer: param.baseLayer || false, //是否基础底图
            displayInLayerSwitcher: param.displayInLayerSwitcher || true, //是否在控件显示
            openInLayerSwitcher: param.openInLayerSwitcher || true, //The openInLayerSwitcher property of an ol.layer.Group is used to code the visibility of the sublayers.
            thmemeLayer: param.thmemeLayer || true, //是否专题图
            layers: param.layers || [

            ]
        });
    };

    /**
     * @description 添加图层
     * @param {Array<layer>} layers 
     */
    addLayers(layers) {
        const collection = new Collection(layers);
        this.setLayers(collection);
    }
}

export default GroupLayers;