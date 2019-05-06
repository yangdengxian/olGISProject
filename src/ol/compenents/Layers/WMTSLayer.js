/**
 * 切片服务
 * @author ydx
 * @date 2019-03-22
 */
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS';

export default class WMTSLayer extends TileLayer {
    constructor(param) {
        super({
            visible: param.visible || true,
            source: new TileWMS(param.source)
        })
    }
};