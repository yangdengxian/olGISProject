/**
 * 长度测量
 * @author ydx
 * @date 2019-04-09
 */
import Draw from 'ol/interaction/Draw'
import VectorSource from 'ol/source/Vector';
import Vector from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';
import Overlay from 'ol/Overlay';

import { getLength } from 'ol/sphere';
import { LineString, Polygon } from 'ol/geom';
import { unByKey } from 'ol/Observable';

const source = new VectorSource();
export default class DistanceControl extends Draw {
    constructor(param) {
        super({
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

    addMeasureLayer() {
        this.map.addLayer(this.vectorLayer);
    }

    // 创建帮助信息标签
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

    // 创建测量结果信息标签
    createMeasureTooltip() {
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement)
        }
        this.measureTooltipElement = document.createElement('div')
        this.measureTooltipElement.className = 'tooltip tooltip-measure'
        this.measureTooltip = new Overlay({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        })
        this.map.addOverlay(this.measureTooltip)
    }

    mouseoutHandler(evt) {
        this.helpTooltipElement.classList.add('hidden');
    }

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

    drawEndHandler(evt) {
        this.measureTooltipElement.className = 'tooltip tooltip-static'
        this.measureTooltip.setOffset([0, -7])
        this.drawingFeature = null
        this.measureTooltipElement = null
        this.createMeasureTooltip()
        unByKey(this.listener);
        this.setActive(false);
        this.helpTooltipElement.classList.add('hidden');
    }

    formatLength(line) {
        console.log(line);
        var length = getLength(line, {
            projection: "EPSG:4326"
        });
        var output
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) + ' km'
        } else {
            output = (Math.round(length * 100) / 100) + ' m'
        }
        return output
    }
}