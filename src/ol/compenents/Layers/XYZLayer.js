/**
 * s3加载离线切片服务
 * @author ydx
 * @date 2019-03-28
 */
import Config from '../../config/config';
import Tile from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import map from '../Map';

const XYZLayer = {
    xyzLayer: new Tile({
        source: new XYZ(Config.blobStoreLayerSource)
    })
}

map.addLayer(XYZLayer.xyzLayer);

export default XYZLayer;