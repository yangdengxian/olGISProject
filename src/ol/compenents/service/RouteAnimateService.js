import TurfService from 'gis-ol-front/src/ol/compenents/service/TurfService';
import VectorLayer from 'gis-ol-front/src/ol/compenents/Layers/VectorLayer';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

const getRoute = Symbol('getRoute');
const lineMore = Symbol('lineMore');
const animate = Symbol('animate');
const LineAnimate = Symbol('LineAnimate');

/**
 * @classdesc 轨迹动画播放
 * @author ydx
 * @date 20200619
 * @module service/RouteAnimateService
 */
class RouteAnimateService {
    /**
     *
     * @param {Object} param
     * @param {String} param.total_step 帧数 默认 10000
     * @param {Map} param.map required地图 
     * @param {Point} param.targetPoint required目标点
     */
    constructor(param) {
        this.map = param.map;
        this.total_step = param.total_step || 10000;
        //初始点
        this.targetPoint = param.targetPoint;
        this.origin = this.targetPoint.clone();
        //节点信息
        this.nodesList = param.nodesList;
        if (this.nodesList && Array.isArray(this.nodesList) && this.nodesList.length) {
            this.lineCoords = [];
            this.nodesList.forEach(node => {
                this.lineCoords.push([
                    node["longitude"],
                    node["latitude"]
                ])
            });
        }

        //路劲
        this.routePath = [];
        //执行动画次数
        this.counter = 0;
        //A long integer value, the request id, that uniquely identifies the entry in the callback list. This is a non-zero value, but you may not make any other assumptions about its value. You can pass this value to window.cancelAnimationFrame() to cancel the refresh callback request.
        this.requestID = null;
        //动画图层
        this.lineAnimateLayer = new VectorLayer({
            id: 'lineAnimateLayer',
            style: new Style({
                stroke: new Stroke({
                    color: '#ec0404',
                    width: 1,
                }),
            }),
        });
        this.lineAnimateLayer.setZIndex(999);
        this.lineAnimateLayer.setVisible(false);

        //轨迹线绘制
        this.fastLine = new Feature();
        this.vectorLayer = new VectorLayer({
            id: 'vectorLayer',
            style: new Style({
                stroke: new Stroke({
                    color: '#339900',
                    width: 1,
                }),
            }),
        });
        this.vectorLayer.getSource().addFeature(this.fastLine);
        this.vectorLayer.getSource().addFeature(this.targetPoint);

        if (this.map.getLayerById('vectorLayer')) {
            this.map.removeLayer(this.map.getLayerById('vectorLayer'));
        }

        if (this.map.getLayerById('lineAnimateLayer')) {
            this.map.removeLayer(this.map.getLayerById('lineAnimateLayer'));
        }

        this.map.addLayer(this.vectorLayer);
        this.map.addLayer(this.lineAnimateLayer);

        this.timer = null;
    }

    /**
     * @description 重播
     */
    restart() {
        this.routePath = [];
        this.counter = 0;
        this.lineAnimateLayer.getSource().clear();

        cancelAnimationFrame(this.requestID);

        if (!this.fastLine.getGeometry()) {
            this.fastLine.setGeometry(
                new LineString(
                    this[getRoute](this.lineCoords, this.total_step, {
                        units: 'kilometers',
                    })
                ).transform('EPSG:4326', 'EPSG:3857')
            );
        }

        this[animate]();

        // setInterval(timer, );
    }

    /**
     * @description 暂停
     */
    pause() {
        cancelAnimationFrame(this.requestID);
    }

    /**
     * @description 播放
     */
    play() {
        cancelAnimationFrame(this.requestID);
        //开始
        this[animate]();
    }

    /**
     * @description 停止
     */
    stop() {
        var angle = Math.atan(
            (this.lineCoords[0][1] - this.lineCoords[0][1]) / (this.lineCoords[0][0] - this.lineCoords[1][0])
        );
        this.routePath = [];
        this.counter = 0;
        this.lineAnimateLayer.getSource().clear();
        cancelAnimationFrame(this.requestID);
        this.targetPoint.getGeometry().setCoordinates(this.fastLine.getGeometry().getCoordinates()[0]);
        this.targetPoint
            .getStyle()
            .getImage()
            .setRotation(angle);
    }

    /**
     * @description 清除
     */
    clear() {
        if (this.map.getLayerById('vectorLayer')) {
            this.map.removeLayer(this.map.getLayerById('vectorLayer'));
        }

        if (this.map.getLayerById('lineAnimateLayer')) {
            this.map.removeLayer(this.map.getLayerById('lineAnimateLayer'));
        }
        cancelAnimationFrame(this.requestID);
    }

    /**
     * @description 动画
     */
    [animate]() {
        this.counter++;
        window.console.log('counter: ' + this.counter);
        if (this.counter < this.total_step) {
            var second = this.fastLine.getGeometry().getCoordinates()[this.counter];
            var first;
            if (this.counter === 1) {
                first = this.origin.getGeometry().getCoordinates();
            } else {
                first = this.targetPoint.getGeometry().getCoordinates();
            }
            var angle = -Math.atan((second[1] - first[1]) / (second[0] - first[0]));
            this[LineAnimate](second);

            this.targetPoint.getGeometry().setCoordinates(this.fastLine.getGeometry().getCoordinates()[this.counter]);
            this.targetPoint
                .getStyle()
                .getImage()
                .setRotation(angle);
            this.requestID = requestAnimationFrame(this[animate].bind(this));

            //发送数据 先计算多少帧到达下一个节点
            const nodeIndex = Math.floor(
                this.counter / Math.floor(this.fastLine.getGeometry().getCoordinates().length / this.nodesList.length)
            );
            if (nodeIndex < this.nodesList.length) {
                window.postMessage(
                    JSON.stringify({
                        event: 'GIS_IntelligentPatrolPointData',
                        data: this.nodesList[nodeIndex]
                    })
                );
            }
        }
    }

    /**
     * @description 获取动画路径
     * @param {*} second
     */
    [LineAnimate](second) {
        if (!this.lineAnimateLayer.getVisible()) {
            this.lineAnimateLayer.setVisible(true);
        }
        if (this.counter === 1) {
            this.routePath.push(this.origin.getGeometry().getCoordinates(), second);
            var line = new Feature({
                geometry: new LineString(this.routePath),
            });
            this.lineAnimateLayer.getSource().addFeature(line);
        } else {
            this.routePath.push(second);
        }
        this.lineAnimateLayer
            .getSource()
            .getFeatures()[0]
            .getGeometry()
            .setCoordinates(this.routePath);
    }

    /**
     * @description 获取路径
     * @param {*} coords
     * @param {*} total_step
     * @param {*} units
     */
    [getRoute](coords, total_step, units) {
        var route = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: coords,
            },
        };
        var newcoords = [];
        var total_lineLength = TurfService.lineDistance(route);
        var per_stepLength = total_lineLength / total_step;
        for (let i = 0; i < coords.length - 1; i++) {
            var from = TurfService.point(coords[i]);
            var to = TurfService.point(coords[i + 1]);
            let lDistance = TurfService.distance(from, to, units);
            if (i == 0) {
                newcoords.push(coords[0]);
            }
            if (lDistance > per_stepLength) {
                let rings = this[lineMore](from, to, lDistance, per_stepLength, units);
                newcoords = newcoords.concat(rings);
            } else {
                newcoords.push(coords[i + 1]);
            }
        }
        return newcoords;
    }

    /**
     * @description 获取坐标
     * @param {*} from
     * @param {*} to
     * @param {*} distance
     * @param {*} splitLength
     * @param {*} units
     */
    [lineMore](from, to, distance, splitLength, units) {
        var step = parseInt(distance / splitLength);
        var leftLength = distance - step * splitLength;
        var rings = [];
        var route = TurfService.lineString([from.geometry.coordinates, to.geometry.coordinates]);
        for (let i = 1; i <= step; i++) {
            let nlength = i * splitLength;
            let pnt = TurfService.along(route, nlength, units);
            rings.push(pnt.geometry.coordinates);
        }
        if (leftLength > 0) {
            rings.push(to.geometry.coordinates);
        }
        return rings;
    }
}

export default RouteAnimateService;