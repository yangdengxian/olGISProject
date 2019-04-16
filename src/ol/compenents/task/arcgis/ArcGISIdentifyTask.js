/**
 * arcgis范围查询
 * @author ydx
 * @date 2019-04-11
 */
import QueryTask from '../QueryTask';
//业务数据展示
import WellOperation from '../../../../project/js/WellOperation';
import { arcgisToGeoJSON } from '@esri/arcgis-to-geojson-utils';
import EsriJSONFormat from '../../format/arcgis/EsriJSONFormat';

export default class ArcGISIdentifyTask extends QueryTask {
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
        this.params.imageDisplay = '1920,937,96'; //width=1920,height=937
        this.params.geometryType = params.geometryType || 'esriGeometryEnvelope';
        this.params.layers = 'all:' + params.layersIds.toString();
        //格式化数据
        this.identifyJSONformat = new EsriJSONFormat({ id: "identifyJSONformat" });
    };

    execute() {
        var __this = this;
        __this.ajaxGetReqeust(__this.url, __this.params).then(__this.successCallBack.bind(this), __this.errorCallBack.bind(this));
    }

    successCallBack(result) {
        var __this = this;
        var features = __this.identifyJSONformat.readFeatures(result);
        //layerId 与初始化查询要素图层id一致
        WellOperation.displayWellDataFuncs(features, __this.map, "queryFeaturesLayer");
    }

    errorCallBack(error) {
        throw new Error(error);
    }

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