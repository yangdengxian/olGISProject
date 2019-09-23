import { Select } from 'ol/interaction';
import { singleClick, click, pointerMove, altKeyOnly } from 'ol/events/condition';
/**
 * @classdesc 要素展示交互
 * @author ydx
 * @date 2019-04-12
 * @module interactions/SelectInteraction
 * @extends Select
 */
class SelectInteraction extends Select {
    /**
     * @param {*} param 
     */
    constructor(param) {
        switch (param.condition) {
            case 'singleclick':
                param.condition = singleClick;
                break;
            case 'click':
                param.condition = click;
                break;
            case 'pointermove':
                param.condition = pointerMove;
                break;
            case 'altclick':
                param.condition = altKeyOnly;
                break;

            default:
                param.condition = singleClick;
                break;
        }
        super(param);
    }

}

export default SelectInteraction;