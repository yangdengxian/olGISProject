/**
 * 底图切换
 * @author ydx
 * @date 2019-04-09
 */
import '../../../plugins/ol-ext/ol-ext.css';
import LayerSwitcherImage from 'ol-ext/control/LayerSwitcherImage';
export default class LayerSwitcherImageControl extends LayerSwitcherImage {
    constructor(param) {
        super(param);
    }

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