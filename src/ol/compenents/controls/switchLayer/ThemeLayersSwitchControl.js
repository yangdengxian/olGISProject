/**
 * 图层控制
 * @author ydx
 * @date 2019-04-15
 */
import 'ol-ext/dist/ol-ext.min.css';
import './ThemeLayersSwitchControl.css';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import Collection from 'ol/Collection';
export default class LayersSwitchControl extends LayerSwitcher {
    constructor(param) {
        super(param)
    };
    //重写父类方法，只控制专题图
    drawPanel_() {
        if (--this.dcount || this.dragging_) return;
        // Remove existing layers
        this._layers = [];
        this.panel_.parentNode.setAttribute("title", "专题图控制");
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
}