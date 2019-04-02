/**
 * wms动态服务
 * @author ydx
 * @date 2019-03-22
 */
import Config from '../../config/config';
import ImageLayer from 'ol/layer/Image.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import map from '../Map';

const ImageWMSLayer = {
    wmsLayer: new ImageLayer({
        source: new ImageWMS(Config.ImageWMSSource)
    })
}

map.addLayer(ImageWMSLayer.wmsLayer);

export default ImageWMSLayer;