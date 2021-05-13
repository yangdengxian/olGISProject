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
     * @param {string} param.visible 
     * @param {boolean} param.baseLayer 是否基础底图
     * @param {boolean} param.displayInLayerSwitcher 是否在控件显示
     * @param {boolean} param.openInLayerSwitcher The openInLayerSwitcher property of an ol.layer.Group is used to code the visibility of the sublayers.
     * @param {boolean} param.thmemeLayer 是否专题图
     * @param {Array<layer>} param.layers 图层集
     */
    constructor(param) {
        super(param);
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