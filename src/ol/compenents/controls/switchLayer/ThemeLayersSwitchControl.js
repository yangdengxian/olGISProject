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
    /**
     * 构造函数
     * @param {Object} param 初始化参数
     */
    constructor(param) {
        super(param)
    };

    /**
     * 重写父类方法，只控制底图
     */
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


    /**
     * 重写父类方法 动态更新
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