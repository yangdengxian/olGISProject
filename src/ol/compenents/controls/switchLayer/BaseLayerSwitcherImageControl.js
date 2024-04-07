import 'ol-ext/dist/ol-ext.min.css';
import './BaseLayerSwitcherImageControl.css';
import LayerSwitcherImage from 'ol-ext/control/LayerSwitcherImage';
import Collection from 'ol/Collection';

/**
 * @classdesc 底图切换
 * @author ydx
 * @date 2019-04-09
 * @module controls/switchLayer/BaseLayerSwitcherImageControl
 * @extends LayerSwitcherImage
 */
class BaseLayerSwitcherImageControl extends LayerSwitcherImage {
    /**
     *  @param {*} param
     */
    constructor(param) {
        super(param);
        this.nodeTitle = param.title || "baseLayerSwitch"
    }
}

export default BaseLayerSwitcherImageControl;