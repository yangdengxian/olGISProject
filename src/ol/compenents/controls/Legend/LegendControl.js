/**
 * 图例
 * @author ydx
 * @date 2019-04-10
 */
import 'ol-ext/dist/ol-ext.min.css';
import './LegendControl.css';

import Util from '../../../utils/Util';
import Legend from 'ol-ext/control/Legend';
import { DEVICE_PIXEL_RATIO as ol_has_DEVICE_PIXEL_RATIO } from 'ol/has'

export default class LegendControl extends Legend {
    /**
     * 构造函数
     * @param {Object} param 初始化参数
     */
    constructor(param) {
        //width height
        param.size = [30, 15];
        //边距
        param.margin = 5;
        super(param);
    }

    /**
     * 动态更新图例
     */
    refresh() {
        var self = this;
        var table = this._tableElement
        table.innerHTML = '';
        var width = this.get('size')[0] + 2 * this.get('margin');
        var height = this.get('size')[1] + 2 * this.get('margin');

        // Add a new row
        function addRow(str, title, r, i) {
            var row = document.createElement('li');
            row.style.height = height + 'px';
            row.addEventListener('click', function() {
                self.dispatchEvent({ type: 'select', title: str, row: r, index: i });
            });

            var col = document.createElement('div');
            row.appendChild(col);
            col.style.height = height + 'px';

            col = document.createElement('div');
            if (title) {
                row.className = 'ol-title';
            } else {
                //图层组名称 样式靠右 2019-04-24 ydx
                if (r.typeGeom) {
                    col.style.paddingLeft = width + 'px';
                }
            }
            col.innerHTML = str || '';
            row.appendChild(col);
            table.appendChild(row);
        }
        if (this.get('title')) {
            addRow(this.get('title'), true, {}, -1);
        }
        var canvas = document.createElement('canvas');
        canvas.width = 5 * width;
        canvas.height = (this._rows.length + 1) * height * ol_has_DEVICE_PIXEL_RATIO;
        this._imgElement.innerHTML = '';
        this._imgElement.append(canvas);
        this._imgElement.style.height = (this._rows.length + 1) * height + 'px';
        for (var i = 0, r; r = this._rows[i]; i++) {
            addRow(r.title, false, r, i);
            canvas = this.getStyleImage(r, canvas, i + (this.get('title') ? 1 : 0));
        }

    }

    /**
     * 添加图例行
     * @param {Array<layer>} layers 图层组
     */
    addRows(layers) {
        var __this = this;
        layers = Util.sortArrayFuncs(layers, 1, "ol_uid");

        //递归查询
        promiseAddRow(layers[0], 0);

        function promiseAddRow(layer, index) {
            if (index === layers.length) return;

            addRow({
                title: layer.get("title"),
            });

            if (layer.getStyle) {
                getStyle(layer).then((json) => {
                    json["styleArray"].forEach(styleObj => {
                        addRow({
                            title: styleObj["label"],
                            typeGeom: json["type"],
                            style: styleObj["style"]
                        });
                    });
                    promiseAddRow(layers[index + 1], index + 1)
                });
            } else {
                layer.getLayersArray().forEach((obj, k) => {
                    getStyle(obj).then((json) => {
                        addRow({
                            title: obj.get("title")
                        });
                        json["styleArray"].forEach(styleObj => {
                            addRow({
                                title: styleObj["label"],
                                typeGeom: json["type"],
                                style: styleObj["style"]
                            });
                        });

                        if (k === (layer.getLayersArray().length - 1)) {
                            promiseAddRow(layers[index + 1], index + 1);
                        }
                    });
                })
            }
        }

        function getStyle(layer) {
            return layer.getStyle(layer.get("id")).then((json) => {
                return json;
            }, (error) => {
                throw new Error(error);
            });
        }

        function addRow(options) {
            __this.addRow(options);
        }


    }

}