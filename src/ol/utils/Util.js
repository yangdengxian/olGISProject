/**
 * 工具类
 * @author ydx
 * @date 2019-04-09
 */
const Utill = {
    getQueryString(name, url) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        //var a = window.location.search.substr(1);
        var r = url ? url.match(reg) : window.location.search.substr(1).match(reg);
        //var kk = decodeURIComponent(r[2]);
        ////var b = unescape(r[2]);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    },

    getRequestParams(oldUrl) {
        var url = oldUrl || location.search; //获取url中"?"符后的字串
        var theRequest = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(url.indexOf("?") + 1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },

    getExtentArray(extentObj) {
        var extentArray = [];
        extentArray.push(extentObj["xmin"]);
        extentArray.push(extentObj["ymin"]);
        extentArray.push(extentObj["xmax"]);
        extentArray.push(extentObj["ymax"]);
        return extentArray;
    }
};
export default Utill;