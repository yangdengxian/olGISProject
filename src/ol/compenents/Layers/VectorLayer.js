/**
 * 要素展示图层
 * @author ydx
 * @date 2019-04-12
 */
import VectorSource from 'ol/source/Vector';
import Vector from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';

export default class VectorLayer extends Vector {
    constructor(param) {
        super({
            id: param.id,
            baseLayer: false,
            displayInLayerSwitcher: false,
            source: new VectorSource(),
            // 矢量图层样式
            style: new Style({
                fill: new Fill({
                    color: 'rgba(125, 125, 125, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new Circle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        this.map = param.map;
    }
}