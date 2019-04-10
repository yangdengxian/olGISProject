/**
 * 测量
 * @author ydx
 * @date 2019-04-08
 */

import Draw from 'ol/interaction/Draw'
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';
import Overlay from 'ol/Overlay';
import sphere from 'ol/sphere';
import { LineString, Polygon } from 'ol/geom';
import Observable from 'ol/Observable';

export default class MeasureControl extends Draw {
    constructor(param) {
        super({
            source: new VectorSource(),
            type: param.type,
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
        this.lineHelpMsg = param.lineHelpMsg || "点击继续绘制线";
        this.polygonHelpMsg = param.polygonHelpMsg || "点击继续绘制面";
        this.helpTooltipElement = null;
        this.drawingFeature = null;
        this.helpTooltip = null;
        this.helpMsg = '点击继续绘制'
        this.map = param.map;
    }

    mouseoutHandler(evt) {
        this.helpTooltipElement.classList.add('hidden');
    }

    pointerMoveHandler(evt) {
        var drawingFeature = this.drawingFeature,
            helpMsg = this.helpMsg,
            lineHelpMsg = this.lineHelpMsg,
            polygonHelpMsg = this.polygonHelpMsg,
            helpTooltipElement = this.helpTooltipElement,
            helpTooltip = this.helpTooltip;
        if (evt.dragging) {
            return
        }
        if (drawingFeature) {
            var geom = drawingFeature.getGeometry()
            if (geom instanceof Polygon) {
                helpMsg = polygonHelpMsg
                console.log('polygon')
            } else if (geom instanceof LineString) {
                helpMsg = lineHelpMsg
                console.log('linestring')
            }
        }
        helpTooltipElement.innerHTML = helpMsg
        helpTooltip.setPosition(evt.coordinate)
        helpTooltipElement.classList.remove('hidden');
    }

    drawStartHandler(evt) {
        drawingFeature = evt.feature
        var tooltipCoord = evt.coordinate
        listener = drawingFeature.getGeometry().on('change', (evt) => {
            var geom = evt.target
            var output
            if (geom instanceof Polygon) {
                output = this.formatArea(geom)
                tooltipCoord = geom.getInteriorPoint().getCoordinates()
            } else if (geom instanceof LineString) {
                output = this.formatLength(geom)
                tooltipCoord = geom.getLastCoordinate()
            }
            measureTooltipElement.innerHTML = output
            measureTooltip.setPosition(tooltipCoord)
        })
    }

    drawEndHandler(evt) {
        measureTooltipElement.className = 'tooltip tooltip-static'
        measureTooltip.setOffset([0, -7])
        drawingFeature = null
        measureTooltipElement = null
        this.createMeasureTooltip()
        ol.Observable.unByKey(listener)
    }

    // 创建帮助信息标签
    createHelpTooltip() {
        var helpTooltipElement = this.helpTooltipElement,
            helpTooltip = this.helpTooltip;
        if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement)
        }
        helpTooltipElement = document.createElement('div')
        helpTooltipElement.className = 'tooltip hidden'
        helpTooltip = new Overlay({
            element: helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        })
        this.map.addOverlay(helpTooltip)
    }

    // 创建测量结果信息标签
    createMeasureTooltip() {
        var measureTooltipElement = this.measureTooltipElement,
            measureTooltip = this.measureTooltip;
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement)
        }
        measureTooltipElement = document.createElement('div')
        measureTooltipElement.className = 'tooltip tooltip-measure'
        measureTooltip = new Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        })
        this.map.addOverlay(measureTooltip)
    }

    formatLength(line) {
        var length = sphere.getLength(line)
        var output
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) + ' km'
        } else {
            output = (Math.round(length * 100) / 100) + ' m'
        }
        return output
    }

    formatArea(polygon) {
        console.log(polygon);

        var area = sphere.getArea(polygon)
        var output
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) + ' km<sup>2</sup>'
        } else {
            output = (Math.round(area * 100) / 100) + ' m<sup>2</sup>'
        }
        return output
    }
}