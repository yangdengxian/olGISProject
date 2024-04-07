import 'ol-ext/dist/ol-ext.min.css';
import './ThemeLayersSwitchControl.css';

import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Collection from 'ol/Collection';
/**
 * @classdesc 图层控制
 * @author ydx
 * @date 2019-04-15
 * @module controls/switchLayer/LayersSwitchControl
 * @extends LayerSwitcher
 */
class LayersSwitchControl extends LayerSwitcher {
    /**
     * @param {Object} options
     *  @param {function} options.displayInLayerSwitcher function that takes a layer and return a boolean if the layer is displayed in the switcher, default test the displayInLayerSwitcher layer attribute
     *  @param {boolean} options.show_progress show a progress bar on tile layers, default false
     *  @param {boolean} options.mouseover show the panel on mouseover, default false
     *  @param {boolean} options.reordering allow layer reordering, default true
     *  @param {boolean} options.trash add a trash button to delete the layer, default false
     *  @param {function} options.oninfo callback on click on info button, if none no info button is shown DEPRECATED: use on(info) instead
     *  @param {boolean} options.extent add an extent button to zoom to the extent of the layer
     *  @param {function} options.onextent callback when click on extent, default fits view to extent
     */
    constructor(options) {
        super(options)
        // @ts-ignore
        this.nodeTitle = options.title || "themeLayersSwitch"
    };

}

export default LayersSwitchControl;