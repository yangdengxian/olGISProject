import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

class MeasureWidget {
    constructor(param) {
        //olCesium实例
        this.olCesium = param.olCesium;
        this.scene = this.olCesium.scene_;
        this.camera = this.olCesium.getCamera().cam_;
    }

    //测量空间直线距离 
    /******************************************* */
    measureLineSpace() {
        var that = this;
        var handler = new Cesium.ScreenSpaceEventHandler(this.scene._imageryLayerCollection);
        var positions = [];
        var poly = null;
        var distance = 0;
        var cartesian = null;
        var floatingPoint;
        var entities = that.olCesium.getDataSourceDisplay().defaultDataSource.entities;

        // 取消双击事件-追踪该位置
        // handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

        handler.setInputAction(function(movement) {
            let ray = that.camera.getPickRay(movement.endPosition);
            cartesian = that.scene.globe.pick(ray, that.scene);
            if (positions.length >= 2) {
                if (!Cesium.defined(poly)) {
                    poly = new PolyLinePrimitive(positions);
                } else {
                    positions.pop();
                    positions.push(cartesian);
                }
                distance = getSpaceDistance(positions);
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        handler.setInputAction(function(movement) {
            let ray = that.camera.getPickRay(movement.position);
            cartesian = that.scene.globe.pick(ray, that.scene);
            if (positions.length == 0) {
                positions.push(cartesian.clone());
            }
            positions.push(cartesian);
            //在三维场景中添加Label
            var textDisance = distance + "千米";
            floatingPoint = entities.add({
                name: '空间直线距离',
                position: positions[positions.length - 1],
                point: {
                    pixelSize: 5,
                    color: Cesium.Color.RED,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                },
                label: {
                    text: textDisance,
                    font: '18px sans-serif',
                    fillColor: Cesium.Color.GOLD,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(20, -20),
                }
            });
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        handler.setInputAction(function(movement) {
            handler.destroy(); //关闭事件句柄
            positions.pop(); //最后一个点无效

        }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

        var PolyLinePrimitive = (function() {
            function _(positions) {
                this.options = {
                    name: '直线',
                    polyline: {
                        show: true,
                        positions: [],
                        material: Cesium.Color.CHARTREUSE,
                        width: 10,
                        clampToGround: true
                    }
                };
                this.positions = positions;
                this._init();
            }

            _.prototype._init = function() {
                var _self = this;
                var _update = function() {
                    return _self.positions;
                };
                //实时更新polyline.positions
                this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
                entities.add(this.options);
            };

            return _;
        })();

        //空间两点距离计算函数
        function getSpaceDistance(positions) {
            var distance = 0;
            for (var i = 0; i < positions.length - 1; i++) {

                var point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
                var point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);
                /**根据经纬度计算出距离**/
                var geodesic = new Cesium.EllipsoidGeodesic();
                geodesic.setEndPoints(point1cartographic, point2cartographic);
                var s = geodesic.surfaceDistance;
                //返回两点之间的距离
                s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
                distance = distance + s;
            }
            return (distance / 1000).toFixed(2);
        }
    }

    //****************************测量空间面积************************************************//
    measureAreaSpace() {
        var that = this;
        var handler = new Cesium.ScreenSpaceEventHandler(this.scene._imageryLayerCollection);
        var positions = [];
        var tempPoints = [];
        var polygon = null;
        var cartesian = null;
        var floatingPoint; //浮动点
        var entities = that.olCesium.getDataSourceDisplay().defaultDataSource.entities;

        // 取消双击事件-追踪该位置
        // handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
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

            var textArea = getArea(tempPoints) + "平方公里";
            entities.add({
                name: '多边形面积',
                position: positions[positions.length - 1],
                label: {
                    text: textArea,
                    font: '18px sans-serif',
                    fillColor: Cesium.Color.GOLD,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(20, -40),
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                }
            });
        }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

        var radiansPerDegree = Math.PI / 180.0; //角度转化为弧度(rad) 
        var degreesPerRadian = 180.0 / Math.PI; //弧度转化为角度

        //计算多边形面积
        function getArea(points) {

            var res = 0;
            //拆分三角曲面

            for (var i = 0; i < points.length - 2; i++) {
                var j = (i + 1) % points.length;
                var k = (i + 2) % points.length;
                var totalAngle = Angle(points[i], points[j], points[k]);


                var dis_temp1 = distance(positions[i], positions[j]);
                var dis_temp2 = distance(positions[j], positions[k]);
                res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle));
                console.log(res);
            }


            return (res / 1000000.0).toFixed(4);
        }

        /*角度*/
        function Angle(p1, p2, p3) {
            var bearing21 = Bearing(p2, p1);
            var bearing23 = Bearing(p2, p3);
            var angle = bearing21 - bearing23;
            if (angle < 0) {
                angle += 360;
            }
            return angle;
        }
        /*方向*/
        function Bearing(from, to) {
            var lat1 = from.lat * radiansPerDegree;
            var lon1 = from.lon * radiansPerDegree;
            var lat2 = to.lat * radiansPerDegree;
            var lon2 = to.lon * radiansPerDegree;
            var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
            if (angle < 0) {
                angle += Math.PI * 2.0;
            }
            angle = angle * degreesPerRadian; //角度
            return angle;
        }

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

        function distance(point1, point2) {
            var point1cartographic = Cesium.Cartographic.fromCartesian(point1);
            var point2cartographic = Cesium.Cartographic.fromCartesian(point2);
            /**根据经纬度计算出距离**/
            var geodesic = new Cesium.EllipsoidGeodesic();
            geodesic.setEndPoints(point1cartographic, point2cartographic);
            var s = geodesic.surfaceDistance;
            //返回两点之间的距离
            s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
            return s;
        }
    }
}

export default MeasureWidget;