import { Image as ImageLayer } from 'ol/layer';
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
     * @param {boolean} param.visible 是否可见，默认false
     * @param {source} param.source  ImageWMS.Options: {
                url: param.url + '/wms',
                params: { LAYERS: param.layerName },
                serverType: 'geoserver',
                crossOrigin: 'anonymous',
            },
    },
     */
    constructor(param) {
        super(param);
    }
};

export default ImageWMSLayer;