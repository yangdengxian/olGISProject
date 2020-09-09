import TileLayer from '../TileLayer';
import XYZ from 'ol/source/XYZ';

/**
 * @classdesc 加载离线栅格切片服务
 * @author ydx
 * @date 2019-03-28
 * @module Layers/tile/raster/XYZLayer
 * @extends TileLayer
 */
class XYZLayer extends TileLayer {
    /**
     * 
     * @param {*} param 
     * @param {boolean} param.visible 是否可见，默认true
     * @param {source} param.source xyz切片source new XYZ({...}) ,new OSM()
     */
    constructor(param) {
        super({
            id: param.id,
            title: param.title,
            baseLayer: param.isBaseLayer || false,
            thmemeLayer: param.isThmemeLayer || false,
            displayInLayerSwitcher: param.displayInLayerSwitcher || false,
            visible: param.visible || true,
            source: new XYZ(param)
        })
    }
}

export default XYZLayer;