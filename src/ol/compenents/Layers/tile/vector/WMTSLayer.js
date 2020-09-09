import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {get as getProjection } from 'ol/proj';
import MVT from 'ol/format/MVT';
import GeoJSON from 'ol/format/GeoJSON';
import { getTopLeft } from 'ol/extent';
/**
 * @classdesc 矢量WMTS切片服务
 * @author ydx
 * @date 2020-09-08
 * @module Layers/WMTSLayer
 * @extends VectorTileLayer
 */
class WMTSLayer extends VectorTileLayer {
    /**
     * 
     * @param {*} options 
     * @param {url} options.url  http://localhost/geoserver/gwc/service/wmts
     * @param {string} options.layer  
     * @param {string} options.style  
     * @param {string} options.gridsetName 'EPSG:4326' 默认'EPSG:900913'
     * @param {string} options.format  默认'application/vnd.mapbox-vector-tile' pbf   可选'application/json;type=geojson'
     */
    constructor(options) {
        let gridsetName, projection, projectionExtent, resolutions, gridNames, params;
        switch (options.gridsetName) {
            case "EPSG:4326":
                gridsetName = 'EPSG:4326';
                resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];
                gridNames = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];;
                break;

            default:
                gridsetName = 'EPSG:900913';
                resolutions = [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169, 0.037322767712175846, 0.018661383856087923, 0.009330691928043961, 0.004665345964021981, 0.0023326729820109904, 0.0011663364910054952, 5.831682455027476E-4, 2.915841227513738E-4, 1.457920613756869E-4];
                gridNames = ['EPSG:900913:0', 'EPSG:900913:1', 'EPSG:900913:2', 'EPSG:900913:3', 'EPSG:900913:4', 'EPSG:900913:5', 'EPSG:900913:6', 'EPSG:900913:7', 'EPSG:900913:8', 'EPSG:900913:9', 'EPSG:900913:10', 'EPSG:900913:11', 'EPSG:900913:12', 'EPSG:900913:13', 'EPSG:900913:14', 'EPSG:900913:15', 'EPSG:900913:16', 'EPSG:900913:17', 'EPSG:900913:18', 'EPSG:900913:19', 'EPSG:900913:20', 'EPSG:900913:21', 'EPSG:900913:22', 'EPSG:900913:23', 'EPSG:900913:24', 'EPSG:900913:25', 'EPSG:900913:26', 'EPSG:900913:27', 'EPSG:900913:28', 'EPSG:900913:29', 'EPSG:900913:30'];
                break;
        }

        projection = getProjection(gridsetName);
        projectionExtent = projection.getExtent();
        params = {
            'REQUEST': 'GetTile',
            'SERVICE': 'WMTS',
            'VERSION': '1.0.0',
            'LAYER': options.layer,
            'STYLE': options.style,
            'TILEMATRIX': gridsetName + ':{z}',
            'TILEMATRIXSET': gridsetName,
            'FORMAT': options.format || 'application/vnd.mapbox-vector-tile',
            'TILECOL': '{x}',
            'TILEROW': '{y}'
        };

        let source = new VectorTileSource({
            url: (() => {
                let url = options.url + '?'
                for (let param in params) {
                    url = url + param + '=' + params[param] + '&';
                }
                url = url.slice(0, -1);
                return url;
            })(),
            format: (() => {
                let format = null;
                if (options.format == "application/json;type=geojson") {
                    format = new GeoJSON({});
                } else {
                    format = new MVT({});
                }
                return format;
            })(),
            projection: projection,
            tileGrid: new WMTSTileGrid({
                tileSize: [256, 256],
                origin: getTopLeft(projectionExtent),
                resolutions: resolutions,
                matrixIds: gridNames
            }),
            wrapX: true
        });

        super({
            id: options.id,
            title: options.title,
            baseLayer: options.isBaseLayer || false,
            thmemeLayer: options.isThmemeLayer || false,
            displayInLayerSwitcher: options.displayInLayerSwitcher || false,
            visible: options.visible || true,
            source: source
        });
    }
}

export default WMTSLayer;