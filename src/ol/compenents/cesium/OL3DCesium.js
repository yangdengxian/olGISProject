import Cesium from 'cesium/Cesium';
window.Cesium = Cesium; // expose Cesium to the OL-Cesium library
import 'cesium/Widgets/widgets.css';
import OLCesium from 'ol-cesium';

export default class OL3DCesium extends OLCesium {
    constructor(param) {
        super(param);
    }

}