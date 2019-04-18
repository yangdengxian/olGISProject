/**
 * 框选查询
 * @author ydx
 * @date 2019-04-08
 */
import Config from '../../../config/config';
import Util from '../../../utils/Util';
import { always } from 'ol/events/condition';
import { DragBox, Select } from 'ol/interaction';

import ArcGISIdentifyTask from '../../task/arcgis/ArcGISIdentifyTask';
import GeoserverIdentifyTask from '../../task/geoserver/GeoserverIdentifyTask';
import {
    bbox as bboxFilter
} from 'ol/format/filter.js';

export default class DragBoxInteraction extends DragBox {
    constructor(param) {
        super({
            condition: always
        });
    }

    drawStartHandler(evt) {
        var __this = this;

    }

    drawEndHandler(evt) {
        var __this = this;

        if (__this.getActive()) {
            __this.initQueryTask(Config.serverType, evt.target.getGeometry().getExtent());
            __this.setActive(false);
        }
    }

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

    initGeoServerQueryTask(extent) {
        var mapConfig = Config.getMapConfig(Util.getQueryString("App"));

        var geoserverIdentifyTask = new GeoserverIdentifyTask(
            mapConfig["mapUrl"], {
                map: this.getMap(),
                filter: bboxFilter('Polygon', extent),
                queryNames: mapConfig["queryNames"]
            }
        );
        geoserverIdentifyTask.execute();
    }


}