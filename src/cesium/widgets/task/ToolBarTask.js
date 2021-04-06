/**工具栏类
 * @author ydx
 * @date 2019-04-08
 */
import './ToolBar.css';
import $ from 'jquery/dist/jquery.min';


export default class ToolbarTask {
    constructor(param) {
        this.toolBarId = param.toolBarId;
        this.toolBarInteractions = param.toolBarInteractions;
        this.domContainers = $('#' + param.toolBarId);
        this.mapFullExtent = param.mapFullExtent;
        this.camera = param.camera;
        this.map = this.camera.map_;
        this.echartLayer = null;
    }

    bindClickEvent() {
        var __this = this;
        if (this.domContainers) {
            this.domContainers
                .find('li a')
                .off()
                .on('click', function(evt) {
                    __this.navigation(evt.target, __this.toolBarInteractions);
                });
        }
    }

    unBindClickEvent() {
        var __this = this;
        if (this.domContainers) {
            this.domContainers.find('li').unbind('click', 'a', function(evt) {});
        }
    }

    navigation(target, toolBarInteractions) {
        var __this = this;
        var btnId = target.id.trim();

        switch (btnId) {
            case 'panBtn':
                break;

            case 'fullScreenBtn':
                __this.camera.cam_.flyTo({
                    destination: Cesium.Rectangle.fromDegrees(
                        __this.mapFullExtent[0],
                        __this.mapFullExtent[1],
                        __this.mapFullExtent[2],
                        __this.mapFullExtent[3]
                    )
                });
                break;

            case 'extentBtn':
                toolBarInteractions['drawBoxInteraction'].draw();
                break;

            case 'distanceBtn':
                toolBarInteractions['distanceInteraction'].measureLineSpace();
                break;

            case 'areaBtn':
                toolBarInteractions['areaInteraction'].measureAreaSpace();
                break;

            default:
                break;
        }
    }
}