import 'ol/ol.css';
import '../../../css/common.css';
import Map from 'ol/Map';
import View from 'ol/View';

/**
 * 地图加载
 * @author ydx
 * @date 2019-03-22
 * @extends Map
 */
export default class MapSub extends Map {
    /**
     * 构造函数
     * @param {Object} param 初始化参数
     */
    constructor(param) {
        super({
            target: param.targetId,
            controls: param.controls || [],
            layers: param.layers || [],
            view: new View({
                center: param.center || [0, 0],
                zoom: param.zoom || 7,
                projection: param.projection,
            }),
        });
        //坐标转换工具
        this.transFormUtil = param.transFormUtil;
    }

    /**
     * 根据layerid获取图层
     * @param {String} layerId 图层id
     * @return {Object} layer
     */
    getLayerById(layerId) {
        const layers = this.getLayers().getArray();
        let targetLayer = null;
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if (layer.get('id') == layerId) {
                targetLayer = layer;
                break;
            }
        }
        return targetLayer;
    }

    /**
     * 获取坐标转换工具
     * @return {Object} 坐标转换工具
     */
    getTransFormUtil() {
        return this.transFormUtil;
    }
}