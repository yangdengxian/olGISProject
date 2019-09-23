import VectorLayer from "../../../ol/compenents/Layers/VectorLayer";
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';


/**
 * @description 无人机要素图
 * @author ydx
 * @date 2019-08-15
 * @extends VectorLayer
 */
class PlaneFeatureLayer extends VectorLayer {
    constructor(param) {
        super(param);
        const __this = this;
        const image = new Image();
        image.src = "";
        image.onload = function() {
            const wellStyle = new Style({
                image: new Icon({
                    img: image,
                    imgSize: [22, 30],
                    crossOrigin: 'anonymous',
                    anchor: [0.5, 1]
                })
            });
            __this.setStyle(wellStyle);
        };
    }

}

export default PlaneFeatureLayer