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

    addLayers(layers) {
        const oldLayers = this.getLayers().getArray();
        const newLayers = oldLayers.concat(layers);
        const collection = new Collection(newLayers,{
            unique: true
        });

        this.setLayers(collection);
    }


    /**
     * 是否存在相同图层
     * @param l 
     * @returns 
     */
    hasLayer(l) {
        const oldLayers = this.getLayers().getArray(); 
        return oldLayers.find((v) => (v.id || v.get("id")) == l.id)
    }
}

export default GroupLayers;