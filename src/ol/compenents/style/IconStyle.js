import Icon from 'ol/style/Icon';

/**
 * @classdesc 自定义图标
 * @author ydx
 * @date 2019-05-05
 * @module style/IconStyle
 * @extends Icon
 */
class IconStyle extends Icon {
    /**
     * 
     * @param {*} param 
     * @param {Array<number>} param.size imgSize px [w,h]
     * @param {string} param.src img url
     */
    constructor(param) {
        param.img = new Image();
        param.imgSize = param.size;
        param.img.src = param.src;
        super({
            img: param.img,
            imgSize: param.imgSize
        });
    }
}

export default IconStyle;