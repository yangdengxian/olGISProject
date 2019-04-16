/**
 * geosever 栅格图层
 * @author ydx
 * @date 2019-04-13
 */
import ImageWMSLayer from '../ImageWMSLayer';

export default class GeoImageLayer extends ImageWMSLayer {
    constructor(param) {
        super({
            id: param.id,
            source: {
                url: param.url + '/wms',
                params: { LAYERS: param.layerName },
                serverType: 'geoserver',
                crossOrigin: 'anonymous',
            },
        })
    }
};