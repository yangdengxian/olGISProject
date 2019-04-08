/**
 * 绘制工具
 * @author ydx
 * @date 2019-04-04
 */
import DrawControl from '../controls/Draw/DrawControl';

export default class DrawTask extends DrawControl {
    constructor(param) {
        super(param);
        this.type = param.type;
    }

    getDrawToolBar() {
        return this.getInteraction(this.type);
    }

    navigation(target) {
        var type = target;

        switch (type) {
            case "漫游":

                break;
            case "放大":

                break;
            case "缩小":

                break;
            case "全图":

                break;
            case "禁用":
                break;
            default:
                break;
        }
    }
}