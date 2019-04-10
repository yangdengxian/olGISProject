/**
 * 工具类
 * @author ydx
 * @date 2019-04-09
 */
const Utill = {
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        //var a = window.location.search.substr(1);
        var r = window.location.search.substr(1).match(reg);
        //var kk = decodeURIComponent(r[2]);
        ////var b = unescape(r[2]);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }
};
export default Utill;