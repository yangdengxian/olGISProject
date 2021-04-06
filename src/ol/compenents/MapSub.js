/**
 * @module ol/compenents/MapSub
 */
import Map from 'ol/Map';
import View from 'ol/View';

import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
/**
 * @classdesc 地图加载
 *
 *      import MapSub from 'gis-ol-front/src/ol/compenents/MapSub';
 *      import TranformUtil from 'gis-ol-front/src/ol/utils/TransFormUtil';
 *      import TileLayer from 'gis-ol-front/src/ol/compenents/Layers/tile/TileLayer';
 *      import OSM from 'ol/source/OSM';
 *
 *       //初始化地图
 *       const map = new MapSub({
 *           targetId: 'map', //地图容器Id
 *           projection: 'EPSG: 3857',
 *           layers: [
 *              new TileLayer({
 *                  source: new OSM()
 *              })
 *           ]
 *           transFormUtil: new TranformUtil({
 *                source: 'EPSG:4326',
 *                destination: 'EPSG: 3857',
 *           })
 *       });
 *
 *        //地图定位
 *        map.getView().fit([114.23,32.44,115.67,34.66]);
 *
 * @author ydx
 * @date 2019-03-22
 * @extends Map
 * @api
 */
class MapSub extends Map {
    /**
     * @description 地图加载
     * @param {Object} param 
     * @param {String} param.targetId   地图容器Id （必填）
     * @param {Array<control>} param.controls   地图control集 
     * @param {Array<layer>} param.layers   地图图层集 
     * @param {Array<Number>} param.center   地图中心点
     * @param {String} param.projection   地图坐标系 'ESPG:3857'
     * @param {Number} param.maxZoom   最大级别
     * @param {Number} param.minZoom   最小级别
     */
    constructor(param) {
        super({
            target: param.targetId,
            controls: param.controls || [],
            layers: param.layers || [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: param.center || [0, 0],
                zoom: param.zoom || 7,
                projection: param.projection,
                minZoom: param.minZoom || 4,
                maxZoom: param.maxZoom || 18,
            }),
        });
        //坐标转换工具
        this.transFormUtil = param.transFormUtil;
    }

    /**
     * @method
     * @description 根据图层Id获取图层
     * @param {String} layerId 图层Id号
     * @returns {Object} Layer
     */
    getLayerById(layerId) {
        const layers = this.getLayers().getArray();
        let targetLayer = null;
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if (layer.get('id') == layerId) {
                targetLayer = layer;
                break;
            }
        }
        return targetLayer;
    }

    /**
     * @method
     * @description 根据Id获取控件
     * @param {String} controlId 
     * @returns {Control} Control
     */
    getControlById(controlId) {
        const controls = this.getControls().getArray();
        let targetControl = null;
        for (let i = 0; i < controls.length; i++) {
            const control = controls[i];
            if (control.get && control.get('id') == controlId) {
                targetControl = control;
                break;
            }
        }
        return targetControl;
    }

    /**
     * @method
     * @description 根据Id获取交互工具
     * @param {String} interactionId Id号
     * @returns {Interaction} Interaction
     */
    getInteractionById(interactionId) {
        return null;
    }

    /**
     * @method
     * @description 获取坐标转换工具
     * @returns {Object} transFormUtil
     */
    getTransFormUtil() {
        return this.transFormUtil;
    }

    /**
     * @method
     * @description 添加空间分析工具
     * @param {Array<Interaction>} interactions 地图空间分析工具，如：测量工具、框选工具、绘制工具
     */
    addInteractions(interactions) {
        var __this = this;
        if (interactions && interactions.length) {
            interactions.forEach((interaction) => {
                __this.addInteraction(interaction);
            })
        }
    }
}

export default MapSub;