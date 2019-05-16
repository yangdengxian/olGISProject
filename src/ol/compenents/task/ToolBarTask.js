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
        this.map = param.map;
        this.mapFullExtent = param.mapFullExtent;

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

        for (const key in toolBarInteractions) {
            if (toolBarInteractions.hasOwnProperty(key)) {
                const toolBarInteraction = toolBarInteractions[key];
                toolBarInteraction.setActive(false);
            }
        }

        switch (btnId) {
            case 'panBtn':
                break;

            case 'zoomInBtn':
                toolBarInteractions['dragZoomInteraction'].out_ = false;
                toolBarInteractions['dragZoomInteraction'].setActive(true);
                break;

            case 'zoomOutBtn':
                toolBarInteractions['dragZoomInteraction'].out_ = true;
                toolBarInteractions['dragZoomInteraction'].setActive(true);
                break;

            case 'fullScreenBtn':
                __this.map.getView().fit(__this.map.getTransFormUtil().transformExtent(__this.mapFullExtent));
                break;

            case 'extentBtn':
                toolBarInteractions['dragBoxInteraction'].setActive(true);
                break;

            case 'distanceBtn':
                toolBarInteractions['distanceInteraction'].setActive(true);
                break;

            case 'areaBtn':
                toolBarInteractions['areaInteraction'].setActive(true);
                break;


            default:
                break;
        }
    }
}