import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";
import Polygon from 'ol/geom/Polygon'


class DrawBoxWidget {
    constructor(param) {
        //olCesium实例
        this.olCesium = param.olCesium;
        this.scene = this.olCesium.scene_;
        this.camera = this.olCesium.getCamera().cam_;

    }

    draw() {
        var that = this;
        var handler = new Cesium.ScreenSpaceEventHandler(this.scene._imageryLayerCollection);
        var positions = [];
        var tempPoints = [];
        var coordinates = [];
        var polygon = null;
        var cartesian = null;
        var floatingPoint; //浮动点
        var entities = that.olCesium.getDataSourceDisplay().defaultDataSource.entities;
        var promise = null;

        handler.setInputAction(function(movement) {
            let ray = that.camera.getPickRay(movement.endPosition);
            cartesian = that.scene.globe.pick(ray, that.scene);
            if (positions.length >= 2) {
                if (!Cesium.defined(polygon)) {
                    polygon = new PolygonPrimitive(positions);
                } else {
                    positions.pop();
                    positions.push(cartesian);
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        handler.setInputAction(function(movement) {
            let ray = that.camera.getPickRay(movement.position);
            cartesian = that.scene.globe.pick(ray, that.scene);
            if (positions.length == 0) {
                positions.push(cartesian.clone());
            }
            positions.push(cartesian);
            //在三维场景中添加点
            var cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1]);
            var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            var heightString = cartographic.height;
            tempPoints.push({ lon: longitudeString, lat: latitudeString, hei: heightString });
            coordinates.push([+longitudeString, +latitudeString])
            floatingPoint = entities.add({
                name: '多边形面积',
                position: positions[positions.length - 1],
                point: {
                    pixelSize: 5,
                    color: Cesium.Color.RED,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                }
            });
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        handler.setInputAction(function(movement) {
            handler.destroy();
            positions.pop();
            window.postMessage({
                event: 'GIS_CesiumDrawBoxEnd',
                data: {
                    "type": "Polygon",
                    "coordinates": [
                        coordinates
                    ]
                }
            })
        }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);


        var PolygonPrimitive = (function() {
            function _(positions) {
                this.options = {
                    name: '多边形',
                    polygon: {
                        hierarchy: [],
                        material: Cesium.Color.GREEN.withAlpha(0.5),
                    }
                };

                this.hierarchy = { positions };
                this._init();
            }

            _.prototype._init = function() {
                var _self = this;
                var _update = function() {
                    return _self.hierarchy;
                };
                //实时更新polygon.hierarchy
                this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update, false);
                entities.add(this.options);
            };

            return _;
        })();

    }
}

export default DrawBoxWidget;