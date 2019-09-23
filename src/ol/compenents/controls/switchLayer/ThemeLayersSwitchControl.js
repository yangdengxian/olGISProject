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
     * @param {Object=} options
     *  @param {function} displayInLayerSwitcher function that takes a layer and return a boolean if the layer is displayed in the switcher, default test the displayInLayerSwitcher layer attribute
     *  @param {boolean} options.show_progress show a progress bar on tile layers, default false
     *  @param {boolean} mouseover show the panel on mouseover, default false
     *  @param {boolean} reordering allow layer reordering, default true
     *  @param {boolean} trash add a trash button to delete the layer, default false
     *  @param {function} oninfo callback on click on info button, if none no info button is shown DEPRECATED: use on(info) instead
     *  @param {boolean} extent add an extent button to zoom to the extent of the layer
     *  @param {function} onextent callback when click on extent, default fits view to extent
     */
    constructor(param) {
        super(param)
        this.nodeTitle = param.title || "themeLayersSwitch"
    };

    /**
     * @override
     * @description 重写父类方法，只控制专题图
     */
    drawPanel_() {
        if (--this.dcount || this.dragging_) return;
        // Remove existing layers
        this._layers = [];
        this.panel_.parentNode.setAttribute("title", this.nodeTitle || "专题图控制");
        this.panel_.querySelectorAll('li').forEach(function(li) {
            if (!li.classList.contains('ol-header')) li.remove();
        }.bind(this));
        // Draw list
        var collection = new Collection();
        this.getMap().getLayers().getArray().forEach((layer) => {
            if (layer.get("thmemeLayer")) {
                collection.push(layer);
            }
        });
        this.drawList(this.panel_, collection);
    };


    /**
     * @override
     * @description 重写父类方法，只控制专题图
     */
    viewChange() {
        var map = this.getMap();
        var res = map.getView().getResolution();
        this.panel_.querySelectorAll('li').forEach(function(li) {
            var l = this._getLayerForLI(li);
            if (l) {
                if (l.getMaxResolution() <= res || l.getMinResolution() >= res) {
                    li.classList.add('ol-layer-hidden');
                } else {
                    var ex0 = l.getExtent();
                    if (ex0) {
                        var ex = map.getView().calculateExtent(map.getSize());
                        if (!ol_extent_intersects(ex, ex0)) {
                            li.classList.add('ol-layer-hidden');
                        } else {
                            li.classList.remove('ol-layer-hidden');
                        }
                    } else {
                        li.classList.remove('ol-layer-hidden');
                    }
                }
            }
        }.bind(this));
    };
}

export default LayersSwitchControl;