import Cesium from 'cesium/Cesium';
window.Cesium = Cesium; // expose Cesium to the OL-Cesium library
require('cesium/Widgets/widgets.css');
import OLCesium from 'ol-cesium';

class OL3DCesium extends OLCesium {
    constructor(param) {
        super(param);
        this.map = param.map;
        this.interactions = Array.concat([], param.map.getInteractions().getArray());
        this.control = Array.concat([], param.map.getControls().getArray());
        this.layers = Array.concat([], param.map.getLayers().getArray());
    }

    /**
     * 获取三维空间分析工具
     * @returns Array<interaction> 
     */
    getInteractions() {
        return this.interactions;
    }
}

export default OL3DCesium;