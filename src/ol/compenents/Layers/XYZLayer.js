import Tile from 'ol/layer/Tile';

/**
 * @classdesc 加载离线切片服务
 * @author ydx
 * @date 2019-03-28
 * @module Layers/XYZLayer
 * @extends Tile
 */
class XYZLayer extends Tile {
    /**
     * 
     * @param {*} param 
     * @param {boolean} param.visible 是否可见，默认true
     * @param {source} param.source xyz切片source new XYZ({...}) ,new OSM()
     */
    constructor(param) {
        super({
            visible: param.visible || true,
            source: param.source
        })
    }
}

export default XYZLayer;