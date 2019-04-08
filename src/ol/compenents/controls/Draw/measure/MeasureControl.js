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
        this.helpTooltipElement = null;
        this.drawingFeature = null;
        this.helpTooltip = null;
        this.helpMsg = '点击继续绘制'
    }

    mouseoutHandler(evt) {
        helpTooltipElement.classList.add('hidden');
    }

    pointerMoveHandler(evt) {
        if (evt.dragging) {
            return
        }
        if (drawingFeature) {
            var geom = drawingFeature.getGeometry()
            if (geom instanceof ol.geom.Polygon) {
                helpMsg = polygonHelpMsg
                console.log('polygon')
            } else if (geom instanceof ol.geom.LineString) {
                helpMsg = lineHelpMsg
                console.log('linestring')
            }
        }
        helpTooltipElement.innerHTML = helpMsg
        helpTooltip.setPosition(evt.coordinate)
        helpTooltipElement.classList.remove('hidden');
    }

    drawStartHandler(evt) {

    }

    drawEndHandler(evt) {

    }

    // 创建帮助信息标签
    createHelpTooltip() {
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
        map.addOverlay(helpTooltip)
    }

    // 创建测量结果信息标签
    createMeasureTooltip() {
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
        map.addOverlay(measureTooltip)
    }

    formatLength() {
        var length = ol.sphere.getLength(line)
        var output
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) + ' km'
        } else {
            output = (Math.round(length * 100) / 100) + ' m'
        }
        return output
    }

    formatArea(polygon) {
        var area = ol.sphere.getArea(polygon)
        var output
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) + ' km<sup>2</sup>'
        } else {
            output = (Math.round(area * 100) / 100) + ' m<sup>2</sup>'
        }
        return output
    }
}