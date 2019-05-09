/**
 * 加载离线切片服务
 * @author ydx
 * @date 2019-03-28
 */
import Tile from 'ol/layer/Tile';

export default class XYZLayer extends Tile {
    constructor(param) {
        super({
            visible: param.visible || true,
            source: param.source
        })
    }
}