import 'ol-ext/dist/ol-ext.min.css';
import Popup from 'ol-ext/overlay/Popup'

/**
 * @classdesc Popup要素弹窗
 * @author ydx
 * @date 2019-08-07
 * @module overlay/popup/PopupFeatureOverlay
 * @extends Popup
 */
class PopupFeatureOverlay extends Popup {
    constructor(param) {
        let options = {
            closeBox: true,
            positioning: 'auto',
            autoPan: true,
            autoPanAnimation: { duration: 250 }
        };
        param = Object.assign(param, options);
        super(param);
    }

    /**
     * @description 打开窗口
     * @param {Array} coordinate 坐标
     * @param {String} content 窗体
     */
    openPopup(coordinate, content) {
        /*  if (!feature) return;
         var content = "",
             properties = feature.getProperties();
         for (const key in properties) {
             if (properties.hasOwnProperty(key) && key != "geometry") {
                 const value = properties[key];
                 content += key + ": " + value + "\n";
             }
         } */
        this.show(coordinate, content);
    }

    /**
     * @description 关闭窗口
     * @param {Feature} feature 要素
     */
    closePopup() {
        this.hide();
    }
}

export default PopupFeatureOverlay;