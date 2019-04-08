/**工具栏类
 * @author ydx
 * @date 2019-04-08 
 */
import $ from 'jquery';

export default class ToolbarTask {
    constructor(param) {
        this.toolBarId = param.toolBarId;
        this.toolBarControls = param.toolBarControls;
        this.domContainers = $("#" + param.toolBarId);
    };

    bindClickEvent() {
        var __this = this;
        if (this.domContainers) {
            this.domContainers.find("li a").off().on('click', function(evt) {
                __this.navigation(evt.target, __this.toolBarControls);
            });

        }
    }

    unBindClickEvent() {
        var __this = this;
        if (this.domContainers) {
            this.domContainers.find("li").unbind('click', 'a', function(evt) {

            });
        }
    }

    navigation(target, toolBarControls) {
        var __this = this;
        var type = target.text || target.textContent;

        for (const key in toolBarControls) {
            if (toolBarControls.hasOwnProperty(key)) {
                const toolBarControl = toolBarControls[key];
                toolBarControl.setActive(false);
            }
        }

        switch (type) {
            case "漫游":
                break;

            case "放大":
                toolBarControls["dragZoomControl"].out_ = false;
                toolBarControls["dragZoomControl"].setActive(true);
                break;

            case "缩小":
                toolBarControls["dragZoomControl"].out_ = true;
                toolBarControls["dragZoomControl"].setActive(true);
                break;

            case "全图":
                toolBarControls["dragZoomControl"].getMap().setExtent();
                break;

            case "拉框选择":

                break;

            case "距离测量":
                toolBarControls["distanceControl"].setActive(true);
                break;

            case "面积测量":
                toolBarControls["areaControl"].setActive(true);
                break;

            default:
                break;
        }


    }

}