import { Tile } from 'ol/layer';

/**
 * @classdesc 加载切片地图
 * @author ydx
 * @date 2019-04-01
 * @module Layers/TileLayer
 */
class TileLayer extends Tile {
    /**
     * @param {*} param
     */
    constructor(param) {
        //解决跨域
        param.crossOrigin = 'anonymous';
        super(param);

    }

};

export default TileLayer;