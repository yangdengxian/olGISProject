import Icon from 'ol/style/Icon';

/**
 * 自定义图标
 * @author ydx
 * @date 2019-05-05
 */
export default class IconStyle extends Icon {
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