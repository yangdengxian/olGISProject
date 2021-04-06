/**
 * UI界面
 * @author ydx
 * @date 2019-04-10
 */
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import UIView_zh from './UIView_zh';
import UIView_en from './UIView_es';
import Util from '../Utils/Util';


//语言国际化适配
switch (Util.getQueryString("language")) {
    case "en":
        document.write(UIView_en);
        break;

    case "zh":
        document.write(UIView_zh);
        break;

    default:
        document.write(UIView_zh);
        break;
}