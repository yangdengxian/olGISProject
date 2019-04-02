/**
 * 切片服务
 * @author ydx
 * @date 2019-03-22
 */
import Config from '../../config/config';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS';
import map from '../Map';

const WMTSLayer = {
    wmtsLayer: new TileLayer({
        source: new TileWMS(Config.WMTSSource)
    })
}

map.addLayer(WMTSLayer.wmtsLayer);

export default WMTSLayer;