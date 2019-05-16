/**
 * 通用配置文件
 * @author ydx
 * @date 2019-04-15
 */
//浏览器兼容性设置
import '../../../src/ol/plugins/polyfill/polyfill.js?features=requestAnimationFrame,Element.prototype, CharacterData.prototype, DocumentType.prototype,URL,Object.assign';
//UI
import '../compenents/UI/UIView';

import Config from './configArcgis';
// import Config from './configGeroserver';
export default Config;