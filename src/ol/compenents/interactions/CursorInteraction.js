import Hover from 'ol-ext/interaction/Hover';
/**
 * @classdesc 鼠标光标交互
 * @author ydx
 * @date 2019-04-12
 * @module interactions/CursorInteraction
 * @extends Hover
 */
class CursorInteraction extends Hover {
    /**
     * @param {*} param { cursor: "pointer" }
     */
    constructor(param) {
        super(param);
    }

}

export default CursorInteraction;