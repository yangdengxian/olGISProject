/**
 * geosever 栅格图层
 * @author ydx
 * @date 2019-04-13
 */
import WMTSLayer from '../WMTSLayer';

export default class GeoTileLayer extends WMTSLayer {
    constructor(url, param) {
        super({
            url: url,
            title: param.title,

            params: {
                'FORMAT': 'image/png',
                'VERSION': '1.1.1',
                'tiled': true,
                "LAYERS": param.layers,
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    }
};