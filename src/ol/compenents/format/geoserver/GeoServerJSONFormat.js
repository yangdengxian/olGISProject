/**
 * esri格式化
 * @author ydx
 * @date 2019-04-12
 */
import GeoJSON from 'ol/format/GeoJSON';

export default class GeoServerJSONFormat extends GeoJSON {
    /**
     * 构造函数
     * @param {Object} param 初始化参数
     */
    constructor(param) {
        super(param);
    };

}