import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

/**
 * @classdesc wms动态服务
 * @author ydx
 * @date 2019-03-22
 * @module Layers/ImageWMSLayer
 * @extends ImageLayer
 */
class ImageWMSLayer extends ImageLayer {
    /**
     * 
     * @param {*} param 
     * @param {boolean} param.visible 是否可见，默认true
     * @param {source} param.source  ImageWMS.Options: {
                url: param.url + '/wms',
                params: { LAYERS: param.layerName },
                serverType: 'geoserver',
                crossOrigin: 'anonymous',
            },
    },
     */
    constructor(param) {
        super({
            id: param.id,
            source: new ImageWMS(param.source)
        })
    }
};

export default ImageWMSLayer;