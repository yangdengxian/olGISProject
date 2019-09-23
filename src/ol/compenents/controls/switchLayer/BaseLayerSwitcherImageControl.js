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
     *  @param {*} options
     *  @param {boolean} options.trash add a trash button to delete the layer, default false
     *  @param {boolean} options.show_progress show a progress bar on tile layers, default false
     */
    constructor(param) {
        super(param);
        this.nodeTitle = param.title || "baseLayerSwitch"
    }

    /**
     * @override
     * @description 重写父类方法，只控制底图
     */
    drawPanel_() {
        if (--this.dcount || this.dragging_) return;
        // Remove existing layers
        this._layers = [];
        this.panel_.parentNode.setAttribute("title", this.nodeTitle || "baseLayerSwitch");

        this.panel_.querySelectorAll('li').forEach(function(li) {
            if (!li.classList.contains('ol-header')) li.remove();
        }.bind(this));
        // Draw list
        var collection = new Collection();
        this.getMap().getLayers().getArray().forEach((layer) => {
            if (layer.get("baseLayer")) {
                collection.push(layer);
            }
        });
        this.drawList(this.panel_, collection);
    };

    /**
     * @override
     * @description 重写父类方法，只控制底图
     * @param {Layer} l 当前图层
     * @param {Array<layer>} layers 图层集
     */
    switchLayerVisibility(l, layers) {
        if (!l.get('baseLayer')) {
            l.setVisible(!l.getVisible());
        } else {
            if (!l.getVisible()) l.setVisible(true);
            layers.forEach(function(li) {
                if (l !== li && li.get('baseLayer') && (l.get("title") == li.get("title"))) {
                    li.setVisible(true);
                } else if (l !== li && li.get('baseLayer') && li.getVisible()) {
                    li.setVisible(false)
                }
            });
        }
    }
}

export default BaseLayerSwitcherImageControl;