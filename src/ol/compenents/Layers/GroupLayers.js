/**
 * 图层组
 * @author ydx
 * @date 2019-04-19
 */
import LayerGroup from 'ol/layer/Group';
import Collection from 'ol/Collection';

export default class GroupLayers extends LayerGroup {
    constructor(param) {
        super({
            id: param.id,
            title: param.title,
            baseLayer: false, //是否基础底图
            displayInLayerSwitcher: true, //是否在控件显示
            openInLayerSwitcher: true, //The openInLayerSwitcher property of an ol.layer.Group is used to code the visibility of the sublayers.
            thmemeLayer: true, //是否专题图
            layers: [

            ]
        });
    };
    /**
     * 添加图层
     * @param {Array} layers 
     */
    addLayers(layers) {
        const collection = new Collection(layers);
        this.setLayers(collection);
    }
}