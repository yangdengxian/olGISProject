/**
 * wms动态服务
 * @author ydx
 * @date 2019-03-22
 */
import ImageLayer from 'ol/layer/Image.js';
import ImageWMS from 'ol/source/ImageWMS.js';

export default class ImageWMSLayer extends ImageLayer {
    constructor(param) {
        super({
            id: param.id,
            source: new ImageWMS(param.source)
        })
    }
};