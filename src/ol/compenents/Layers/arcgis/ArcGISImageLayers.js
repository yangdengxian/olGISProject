/**
 * arcgis动态图层
 * @author ydx
 * @date 2019-04-09
 */
import { Image as ImageLayer } from 'ol/layer.js';
import ArcGISRestLayer from './ArcGISRestLayer';

export default class ArcGISImageLayers extends ImageLayer {
    constructor(url, params) {
        super({
            title: params.title,
            baseLayer: false,
            thmemeLayer: true,
            displayInLayerSwitcher: true,
            source: new ArcGISRestLayer({
                ratio: 1,
                params: params.params || {},
                url: url
            })
        });
    }

}