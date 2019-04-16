/**
 * 底图切换
 * @author ydx
 * @date 2019-04-09
 */
import '../../../plugins/ol-ext/ol-ext.css';
import './BaseLayerSwitcherImageControl.css';
import LayerSwitcherImage from 'ol-ext/control/LayerSwitcherImage';
import Collection from 'ol/Collection';
export default class BaseLayerSwitcherImageControl extends LayerSwitcherImage {
    constructor(param) {
        super(param);
    }

    //重写父类方法，只控制底图
    drawPanel_() {
        if (--this.dcount || this.dragging_) return;
        // Remove existing layers
        this._layers = [];
        this.panel_.parentNode.setAttribute("title", "底图切换");
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

    //重写父类的方法
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