import QueryTask from '../QueryTask';
//业务数据展示
import WellOperation from '../../../../project/js/WellOperation';
import { arcgisToGeoJSON } from '@esri/arcgis-to-geojson-utils';
import EsriJSONFormat from '../../format/arcgis/EsriJSONFormat';
import Config from '../../../config/config';

/**
 * @classdesc arcgis范围查询
 * @author ydx
 * @date 2019-04-11
 * @module task/arcgis/ArcGISIdentifyTask
 * @extends QueryTask
 */
class ArcGISIdentifyTask extends QueryTask {
    /**
     * 
     * @param {*} url 必填*
     * @param {*} params 
     * @param {map} params.map  必填*
     * @param {ArcgisExtent} params.geometry  必填*
     * @param {ArcgisExtent} params.mapExtent  必填*
     * @param {Array<number>} params.layersIds  必填*
     * @param {number} params.projection  必填* '3857'
     */
    constructor(url, params) {
        super();
        this.url = url + "/identify";
        this.map = params.map;
        this.params = {};
        this.params.f = 'json';
        this.params.geometry = JSON.stringify(params.geometry);
        this.params.tolerance = params.tolerance || 10;
        this.params.returnGeometry = true;
        this.params.mapExtent = JSON.stringify(params.mapExtent);
        this.params.imageDisplay = '1920,937,96'; //width=1920,height=937,dpi=96
        this.params.geometryType = params.geometryType || 'esriGeometryEnvelope';
        this.params.layers = 'all:' + params.layersIds.toString();
        this.params.sr = params.projection || Config.mapConfig.projection.split(":")[1];
        //格式化数据
        this.identifyJSONformat = new EsriJSONFormat({ id: "identifyJSONformat" });
    };

    /**
     * @description 查询函数
     * @param {function} successCallBack 
     * @param {function} errorCallBack 
     */
    execute(successCallBack, errorCallBack) {
        var __this = this;
        return __this.ajaxGetReqeust(__this.url, __this.params).then(successCallBack || __this.successCallBack.bind(this), errorCallBack || __this.errorCallBack.bind(this));
    }

    /**
     * @description 成功回调
     * @param {Features} result 
     */
    successCallBack(result) {
        var __this = this;
        var features = __this.identifyJSONformat.readFeatures(result);
        //layerId 与初始化查询要素图层id一致
        WellOperation.displayWellDataFuncs(features, __this.map, "queryFeaturesLayer");
    }

    /**
     * @description 失败回调
     * @param {error} error 
     */
    errorCallBack(error) {
        throw new Error(error);
    }

    /**
     * @description 结果转换geojson
     * @param {Features} results 
     * @returns {Geojson} geojsonData
     */
    getGeoJSONData(results) {
        var geojsonData = {
            "type": "FeatureCollection",
            "features": []
        };

        results.forEach(result => {
            geojsonData["features"].push({
                "type": "Feature",
                "properties": result["attributes"],
                "geometry": arcgisToGeoJSON(result["geometry"]),
            })
        });
        return geojsonData;
    }

    /**
     * @description 获取geometry ogc类型
     * @param {string} arcgis esriGeometryType 
     * @returns {string} 
     */
    getGoeJSONGeometryType(esriGeometryType) {
        var geometryType = "";
        switch (esriGeometryType) {
            case "esriGeometryPoint":
                geometryType = "Point";
                break;

            case "esriGeometryolyline":
                geometryType = "Point";
                break;

            case "esriGeometryPolygon":
                geometryType = "Polygon";
                break;

            case "esriGeometryMultipoint":
                geometryType = "MultiPoint";
                break;

            default:
                geometryType = "Point";
                break;
        }
        return geometryType;
    }
}

export default ArcGISIdentifyTask;