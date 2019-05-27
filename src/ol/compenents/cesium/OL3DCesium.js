import Cesium from 'cesium/Cesium';
window.Cesium = Cesium; // expose Cesium to the OL-Cesium library
import 'cesium/Widgets/widgets.css';
// import OLCesium from 'ol-cesium';
import OLCesium from 'olcs/OLCesium';

export default class OL3DCesium {
    constructor(param) {
        this.olcs = new OLCesium({
            map: param.map
        });
        this.map = param.map;
        this.interactions = Array.concat([], param.map.getInteractions().getArray());
        this.control = Array.concat([], param.map.getControls().getArray());
        this.layers = Array.concat([], param.map.getLayers().getArray());
    }

    /**
     * 显示3D、2D
     * @param {Boolean} isShow3D 是否显示3D true: 3D, false: 2D
     */
    __setEnabled(isShow3D) {
        var that = this.olcs;
        if (that.enabled_ === isShow3D) {
            return;
        }
        that.enabled_ = isShow3D;

        // some Cesium operations are operating with canvas.clientWidth,
        // so we can't remove it from DOM or even make display:none;
        that.container_.style.visibility = that.enabled_ ? 'visible' : 'hidden';
        if (that.enabled_) {
            that.throwOnUnitializedMap_();
            if (that.isOverMap_) {
                const rootGroup = that.map_.getLayerGroup();
                if (rootGroup.getVisible()) {
                    that.hiddenRootGroup_ = rootGroup;
                    that.hiddenRootGroup_.setVisible(false);
                }

                that.map_.getOverlayContainer().classList.add('olcs-hideoverlay');
                that.map_.getOverlayContainerStopEvent().classList.add('olcs-hideoverlay');
            }

            that.camera_.readFromView();
            that.render_();
        } else {
            if (that.isOverMap_) {
                that.map_.getOverlayContainer().classList.remove('olcs-hideoverlay');
                that.map_.getOverlayContainerStopEvent().classList.remove('olcs-hideoverlay');
                if (that.hiddenRootGroup_) {
                    that.hiddenRootGroup_.setVisible(true);
                    that.hiddenRootGroup_ = null;
                }
            }

            that.camera_.updateView();
        }
    }

    /**
     * 获取三维空间分析工具
     * @returns Array<interaction> 
     */
    __getInteractions() {
        return this.olcs.pausedInteractions_;
    }
}