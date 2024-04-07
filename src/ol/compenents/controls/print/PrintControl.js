// @ts-nocheck
import Print from 'ol-ext/control/Print'
import { saveAs } from 'file-saver';
/**
 * @classdesc 专题图打印
 * @author ydx
 * @date 2019-05-28
 * @module controls/print/PrintControl
 * @extends ol-ext/control/Print
 */
class PrintControl extends Print {
    /**
     *  @param {*} options
     */
    constructor(options) {
        super(options);
    }
}

export default PrintControl;