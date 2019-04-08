/**
 * 绘制控件
 * @author ydx
 * @date 2019-04-03
 */
import Polygon from 'ol/geom/Polygon';
import Draw, { createRegularPolygon, createBox } from 'ol/interaction/Draw';
import GeometryType from 'ol/geom/GeometryType';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';


export default class DrawControl {
    constructor(param) {
        this.type = param.type;
    }

    /* deactivateControl() {
        this.setActive(false);
    }

    activateControl(type) {
        this.setActive(true);
    } */

    getInteraction(type) {
        var value,
            geometryFunction,
            drawControl;
        switch (type) {
            case 'Square':
                value = GeometryType.CIRCLE;
                geometryFunction = createRegularPolygon(4);
                break;

            case 'Box':
                value = GeometryType.CIRCLE;
                geometryFunction = createBox();
                break;

            case 'Star':
                value = GeometryType.CIRCLE;
                geometryFunction = function(coordinates, geometry) {
                    var center = coordinates[0];
                    var last = coordinates[1];
                    var dx = center[0] - last[0];
                    var dy = center[1] - last[1];
                    var radius = Math.sqrt(dx * dx + dy * dy);
                    var rotation = Math.atan2(dy, dx);
                    var newCoordinates = [];
                    var numPoints = 12;
                    for (var i = 0; i < numPoints; ++i) {
                        var angle = rotation + i * 2 * Math.PI / numPoints;
                        var fraction = i % 2 === 0 ? 1 : 0.5;
                        var offsetX = radius * fraction * Math.cos(angle);
                        var offsetY = radius * fraction * Math.sin(angle);
                        newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
                    }
                    newCoordinates.push(newCoordinates[0].slice());
                    if (!geometry) {
                        geometry = new Polygon([newCoordinates]);
                    } else {
                        geometry.setCoordinates([newCoordinates]);
                    }
                    return geometry;
                };
                break;

            default:
                break;
        }

        if (value) {
            drawControl = new Draw({
                source: new VectorLayer({
                    source: new VectorSource({ wrapX: false })
                }),
                type: value,
                snapTolerance: 12, //默认吸附距离
                geometryFunction: geometryFunction
            });
            //默认关闭
            // drawControl.setActive(false);
        }

        return drawControl;
    }
}