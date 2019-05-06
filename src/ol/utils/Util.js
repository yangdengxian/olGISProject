/**
 * 工具类
 * @author ydx
 * @date 2019-04-09
 */
import $ from 'jquery/dist/jquery';

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
    },

    ajaxGetReqeust(url, param) {
        var $defferd = $.Deferred();
        $.ajax({
            url: url,
            data: param,
            // timeout: param.timeout || 2000, //超过2秒，放弃请求
            dataType: param.dataType || 'jsonp',
            type: 'GET',
            cache: param.cache || true, //默认值: true，dataType 为 script 和 jsonp 时默认为 false。设置为 false 将不缓存此页面
            success: function(result) {
                $defferd.resolve(result);
            },
            error: function(error) {
                $defferd.reject(error);
            },
            complete(XMLHttpRequest, status) {
                if (status == 'error') { //超时,status还有success,error等值的情况
                    console.log(url, param, status);
                    XMLHttpRequest.abort();
                }
            }
        })
        return $defferd;
    },
    /**
     * 数组排序
     * @param {Array} array 数组（必选）
     * @param {Number} decsOrAsc 升降序（升序1，降序0）默认升序
     * @param {String} prop 数组对象（根据对象属性排序）可选
     */
    sortArrayFuncs(array, decsOrAsc, prop) {
        if (!array || !array.length) return array;
        if (!prop) {
            array.sort((a, b) => {
                return decsOrAsc === 0 ? (b - a) : (a - b);
            });
        } else {
            array.sort((a, b) => {
                return decsOrAsc === 0 ? (b[prop] - a[prop]) : (a[prop] - b[prop]);
            });
        }
        return array;
    },

    assign() {
        if (typeof Object.assign != 'function') {
            Object.assign = function(target) {
                'use strict';
                if (target == null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                target = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source != null) {
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                }
                return target;
            };
        }
    }

};
//重写,解决IE不兼容问题
Utill.assign();


export default Utill;