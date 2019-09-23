import VectorLayer from "../../../ol/compenents/Layers/VectorLayer";
import { setInterval, clearInterval } from "timers";
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';


/**
 * @description 巡检人员要素图
 * @author ydx
 * @date 2019-08-15
 * @extends VectorLayer
 */
let interval = null;

class WorkerFeatureLayer extends VectorLayer {
    constructor(param) {
        const wellStyle = new Style({
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
        });
        super(param);
        this.setStyle(wellStyle);
        this.intervalTime = param.intervalTime || 10; //数据请求间隔时间 秒
    }

    loadFeatures() {
        const __this = this;
        const millisec = __this.intervalTime * 1000;
        if (!interval) {
            interval = setInterval((e) => {
                __this.clear();
                __this.addFeatures(__this.createFeatures())
            }, millisec);
        }
    }

    createFeatures() {
        const __this = this;
        var feature = new Feature({
            geometry: new Point(
                this.map.getTransFormUtil().fromLonLat([Math.random() * (45 - 42) + 42, Math.random() * (36 - 30) + 30])
            ),
            pid: __this.get("id")
        });
        return [feature];
    }

    removeFeatures() {
        if (!interval) {
            clearInterval(interval);
        }
    }

}

export default WorkerFeatureLayer