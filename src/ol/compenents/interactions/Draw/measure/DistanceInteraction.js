import './measure.css';
import Draw from 'ol/interaction/Draw'
import VectorSource from 'ol/source/Vector';
import Vector from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';
import Overlay from 'ol/Overlay';

import { getLength } from 'ol/sphere';
import { unByKey } from 'ol/Observable';

const source = new VectorSource();

/**
 * @classdesc 长度测量
 * @author ydx
 * @date 2019-04-09
 * @module interactions/Draw/measure/DistanceInteraction
 * @extends Draw
 */
class DistanceInteraction extends Draw {
    /**
     * 
     * @param {*} param 
     * @param {string} param.id    测量工具id
     * @param {Map} param.map   地图实例 （必填）
     */
    constructor(param) {
        super({
            id: param.id,
            source: source,
            type: "LineString",
            // 勾绘出要素的样式
            style: new Style({
                fill: new Fill({
                    color: 'rgba(125, 125, 125, 0.2)'
                }),
                stroke: new Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new Circle({
                    radius: 5,
                    stroke: new Stroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });
        this.vectorLayer = new Vector({
            id: "distanceVectorLayer",
            baseLayer: false,
            displayInLayerSwitcher: false,
            source: source,
            // 矢量图层样式
            style: new Style({
                fill: new Fill({
                    color: 'rgba(125, 125, 125, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new Circle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        this.lineHelpMsg = param.lineHelpMsg || "点击继续绘制线";
        this.helpTooltipElement = null;
        this.drawingFeature = null;
        this.helpTooltip = null;
        this.helpMsg = '点击继续绘制'
        this.map = param.map;
        this.listener = null;
        this.createHelpTooltip();
        this.createMeasureTooltip();
    }

    /**
     * @description 添加测量要素图层
     */
    addMeasureLayer() {
        this.map.addLayer(this.vectorLayer);
    }

    /**
     * @description 创建帮助信息标签
     */
    createHelpTooltip() {
        if (this.helpTooltipElement) {
            this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement)
        }
        this.helpTooltipElement = document.createElement('div')
        this.helpTooltipElement.className = 'tooltip hidden'
        this.helpTooltip = new Overlay({
            element: this.helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        })
        this.map.addOverlay(this.helpTooltip)
    }

    /**
     * @description 创建测量结果信息标签
     */
    createMeasureTooltip() {
        //清除之前测量容器
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement)
        }
        this.measureTooltipElement = document.createElement('div')
        this.measureTooltipElement.className = 'tooltip tooltip-measure'
        this.measureTooltip = new Overlay({
            id: "distanceMeasureTooltip",
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        })
        this.map.addOverlay(this.measureTooltip)
    }

    /**
     * @description 鼠标移动事件监听
     * @param {*} evt 监听对象
     */
    mouseoutHandler(evt) {
        this.helpTooltipElement.classList.add('hidden');
    }

    /**
     * @description 要素点移动事件监听
     * @param {*} evt 监听对象
     */
    pointerMoveHandler(evt) {
        if (evt.dragging) {
            return
        }
        if (this.drawingFeature) {
            this.helpMsg = this.lineHelpMsg;
        }
        this.helpTooltipElement.innerHTML = this.helpMsg
        this.helpTooltip.setPosition(evt.coordinate)
        this.helpTooltipElement.classList.remove('hidden');
    }

    /**
     * @description 测量开始事件监听
     * @param {*} evt 监听对象
     */
    drawStartHandler(evt) {
        this.drawingFeature = evt.feature
        var tooltipCoord = evt.coordinate
        this.listener = this.drawingFeature.getGeometry().on('change', (evt) => {
            var geom = evt.target
            var output = this.formatLength(geom)
            tooltipCoord = geom.getLastCoordinate()
            this.measureTooltipElement.innerHTML = output
            this.measureTooltip.setPosition(tooltipCoord)
        })
    }

    /**
     * @description 测量结束事件监听
     * @param {*} evt 监听对象
     */
    drawEndHandler(evt) {
        this.measureTooltipElement.className = 'tooltip tooltip-static'
        this.measureTooltip.setOffset([0, -7])

        //测量结果清除按钮
        var popupcloser = document.createElement('a');
        popupcloser.href = 'javascript:void(0);';
        popupcloser.classList.add('ol-popup-closer');
        popupcloser.addEventListener('click', function(target) {
            this.clearOverLayers(target, evt.feature);
        }.bind(this), false);
        this.measureTooltipElement.appendChild(popupcloser);

        this.drawingFeature = null
        this.measureTooltipElement = null
        this.createMeasureTooltip()

        unByKey(this.listener);
        this.setActive(false);
        this.helpTooltipElement.classList.add('hidden');
    }

    /**
     * @description 长度计算
     * @param {LineString} line 线feature
     */
    formatLength(line) {
        var length = getLength(line, {
            projection: this.getMap().getView().getProjection()
        });
        var output
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) + ' km'
        } else {
            output = (Math.round(length * 100) / 100) + ' m'
        }
        return output
    }

    /**
     * @description 清除测量图层
     * @param {Object} evt 鼠标点击对象
     * @param {Feature} feature 选中要素
     */
    clearOverLayers(evt, feature) {
        var target = evt.target;
        target.parentElement.className = 'tooltip hidden';
        source.removeFeature(feature);
    }
}

export default DistanceInteraction;