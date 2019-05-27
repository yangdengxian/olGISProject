import Config from '../../../config/config';
import Util from '../../../utils/Util';
import { always } from 'ol/events/condition';
import { DragBox, Select } from 'ol/interaction';

import ArcGISIdentifyTask from '../../task/arcgis/ArcGISIdentifyTask';
import GeoserverIdentifyTask from '../../task/geoserver/GeoserverIdentifyTask';

/**
 * @classdesc 框选查询
 * @author ydx
 * @date 2019-04-08
 * @module interactions/Draw/DragBoxInteraction
 * @extends DragBox
 */
class DragBoxInteraction extends DragBox {
    /**
     * @param {*} param 
     */
    constructor(param) {
        param = param || {};
        param.condition = always;
        super(param);
    }

    /**
     * @description 绘制开始监听
     * @param {*} evt 监听对象
     */
    drawStartHandler(evt) {
        var __this = this;

    }

    /**
     * @description 绘制结束监听
     * @param {*} evt 监听对象
     */
    drawEndHandler(evt) {
        var __this = this;

        if (__this.getActive()) {
            __this.initQueryTask(Config.serverType, evt.target.getGeometry().getExtent());
            __this.setActive(false);
        }
    }

    /**
     * @description 初始化查询task
     * @param {String} serverType 服务类型 'geoserver'、'arcgis'
     * @param {Array<number>} extent 范围对象
     */
    initQueryTask(serverType, extent) {
        var __this = this;
        switch (serverType) {
            case "arcgis":
                __this.initArcGISQueryTask(extent);
                break;

            case "geoserver":
                __this.initGeoServerQueryTask(extent);
                break;

            default:
                __this.initGeoServerQueryTask(extent);
                break;
        }
    }

    /**
     * @description 初始Arcgis化查询task
     * @param {Array<number>} extent 范围对象
     */
    initArcGISQueryTask(extent) {
        var mapConfig = Config.getMapConfig(Util.getQueryString("App"));
        extent = this.getMap().getTransFormUtil()
            .transformByProjParm(extent, this.getMap().getView().getProjection(), Config.mapConfig.sourceProjection);
        var geometry = {
            xmin: extent[0],
            ymin: extent[1],
            xmax: extent[2],
            ymax: extent[3],
            spatialReference: {
                wkid: Config.mapConfig.sourceProjection.split(':')[1]
            }
        };
        var arcGISIdentifyTask = new ArcGISIdentifyTask(
            mapConfig["mapUrl"], {
                map: this.getMap(),
                geometry: geometry,
                mapExtent: mapConfig["mapFullExtent"],
                layersIds: mapConfig["arcgisQueryLayerIds"]
            }
        );
        arcGISIdentifyTask.execute();
    }

    /**
     * @description 初始geoserver化查询task
     * @param {Array<number>} extent 范围对象
     */
    initGeoServerQueryTask(extent) {
        extent = this.getMap().getTransFormUtil()
            .transformByProjParm(extent, this.getMap().getView().getProjection(), Config.mapConfig.sourceProjection);
        var mapConfig = Config.getMapConfig(Util.getQueryString("App"));
        var geoserverIdentifyTask = new GeoserverIdentifyTask(
            mapConfig["mapUrl"], {
                map: this.getMap(),
                // filter: bboxFilter('Polygon', extent),
                filter: extent.join(',') + "," + Config.mapConfig.sourceProjection,
                queryNames: mapConfig["queryNames"],
                srsName: Config.mapConfig.sourceProjection
            }
        );
        geoserverIdentifyTask.execute();
    }


}

export default DragBoxInteraction;