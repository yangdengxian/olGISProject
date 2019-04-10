/**
 * arcgis动态图层
 * @author ydx
 * @date 2019-04-09
 */
import { Image as ImageLayer } from 'ol/layer.js';
import { ImageArcGISRest } from 'ol/source.js';

export default class ArcGISImageLayers extends ImageLayer {
    constructor(url, params) {
        super({
            source: new ImageArcGISRest({
                ratio: 1,
                params: params || {},
                url: url
            })
        });
    }


}