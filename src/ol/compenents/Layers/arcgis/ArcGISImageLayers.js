import Util from '../../../utils/Util';
import { Image as ImageLayer } from 'ol/layer';
import ArcGISRestLayer from './ArcGISRestLayer';

import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';
import IconStyle from '../../style/IconStyle';

/**
 * @classdesc arcgis动态图层
 * @author ydx
 * @date 2019-04-09
 * @module Layers/arcgis/ArcGISImageLayers
 * @extends ImageLayer
 */
class ArcGISImageLayers extends ImageLayer {
    /**
     * 
     * @param {string} url 必填*
     * @param {*} params 
     * @param {string} params.id
     * @param {string} params.title
     * @param {boolean} params.isBaseLayer
     * @param {boolean} params.isThmemeLayer
     */
    constructor(url, params) {
        super({
            id: params.id,
            title: params.title,
            baseLayer: params.isBaseLayer || false,
            thmemeLayer: params.isThmemeLayer || true,
            displayInLayerSwitcher: true,
            source: new ArcGISRestLayer({
                ratio: 1,
                params: params.params || {},
                url: url,
                crossOrigin: 'anonymous'
            })
        });
    }

    /**
     * @description 获取图层元数据
     * @param {string} layerId 
     * @returns {Promise} aysc function
     */
    getCapabitities(layerId) {
        var url = this.getSource().getUrl(),
            params = {
                f: 'json'
            };
        //判断是否有参数
        var requestParams = Util.getRequestParams(url);
        if (Object.keys(requestParams).length) {
            url = url.substring(0, url.lastIndexOf("?"));
            params = Object.assign(params, requestParams);
        }
        return Util.ajaxGetReqeust(url + '/' + layerId, params).then((json) => {
            json.mapUrl = url;
            return json;
        }, (error) => {
            throw new Error(error);
        })
    };
    /**
     * @description 获取配图样式
     * @param {*} renderer 
     * @param {*} mapUrl 
     * @returns {Object} styles
     */
    getStylesByType(renderer, mapUrl) {
        var type = renderer["uniqueValueInfos"] ?
            renderer["uniqueValueInfos"][0]["symbol"]["type"] :
            (renderer["symbol"] ?
                renderer["symbol"]["type"] :
                renderer["type"]),
            styles = {
                type: "",
                styleArray: []
            };
        switch (type) {
            //Simple Marker Symbol:
            case "esriSMS":
                styles = {
                    type: "Point",
                    styleArray: [{
                            "label": renderer["label"],
                            style: [
                                new Style({
                                    image: new Circle({
                                        radius: 7,
                                        fill: new Fill({
                                            color: renderer["symbol"]["color"],
                                            size: renderer["symbol"]["size"]
                                        }),
                                        stroke: new Stroke({
                                            color: renderer["symbol"]["outline"]["color"],
                                            width: renderer["symbol"]["outline"]["width"]
                                        }),
                                    })
                                })
                            ]
                        }

                    ]
                }
                break;
            case "classBreaks":
                if (renderer["classBreakInfos"]) {
                    styles.type = "Point";
                    renderer["classBreakInfos"].forEach(valueInfos => {
                        styles.styleArray.push({
                            "label": valueInfos["label"],
                            "style": [
                                new Style({
                                    fill: new Fill({
                                        color: valueInfos["symbol"]["color"],
                                        size: 4
                                    }),
                                    stroke: new Stroke({
                                        color: valueInfos["symbol"]["outline"]["color"],
                                        width: 1,
                                    }),
                                    image: new Circle({
                                        radius: 7,
                                        fill: new Fill({
                                            color: valueInfos["symbol"]["outline"]["color"],
                                        })
                                    })
                                })
                            ]
                        })
                    });
                }
                break;

            case "esriPMS":
                if (renderer["uniqueValueInfos"]) {
                    styles.type = "Point";
                    renderer["uniqueValueInfos"].forEach(valueInfos => {
                        valueInfos["symbol"]["url"] = mapUrl + valueInfos["symbol"]["url"];
                        styles.styleArray.push({
                            "label": valueInfos["label"],
                            "style": [
                                new Style({
                                    image: new IconStyle({
                                        src: valueInfos["symbol"]["url"],
                                        size: [
                                            valueInfos["symbol"]["width"],
                                            valueInfos["symbol"]["height"]
                                        ],

                                    })
                                })
                            ]
                        })
                    });
                } else {
                    renderer["symbol"]["url"] = mapUrl + renderer["symbol"]["url"];
                    styles = {
                        type: "Point",
                        styleArray: [{
                            "label": renderer["label"],
                            style: [new Style({
                                image: new IconStyle({
                                    src: renderer["symbol"]["url"],
                                    size: [
                                        renderer["symbol"]["width"],
                                        renderer["symbol"]["height"]
                                    ]
                                })
                            })]
                        }]
                    }
                }
                break;


            case "esriSLS":
                styles = {
                    type: "LineString",
                    styleArray: [{
                            "label": renderer["label"],
                            style: [new Style({
                                stroke: new Stroke({
                                    color: renderer["symbol"]["color"],
                                    width: renderer["symbol"]["width"]
                                })
                            })]
                        }

                    ]
                }
                break
            case "esriSFS":
                styles = {
                    type: "Polygon",
                    styleArray: [{
                            "label": renderer["label"],
                            style: [new Style({
                                fill: new Fill({
                                    color: renderer["symbol"]["color"]
                                }),
                                stroke: new Stroke({
                                    color: renderer["symbol"]["outline"]["color"],
                                    width: renderer["symbol"]["outline"]["width"],
                                })
                            })]
                        }

                    ]
                }

                break;
            default:
                break;
        }
        return styles;
    }

    /**
     * @description 获取样式
     * @param {*} layerId 图层id
     * @returns {Promise} aysc function
     */
    getStyle(layerId) {
        var __this = this;
        var renderer = null,
            styleArray = [];
        return this.getCapabitities(layerId).then((json) => {
            if (json["drawingInfo"]) {
                renderer = json["drawingInfo"]["renderer"];
                styleArray = __this.getStylesByType(renderer, json["mapUrl"] + "/" + layerId + "/images/");
            }
            return styleArray;
        }, (error) => {
            throw new Error(error);
        });
    }

}

export default ArcGISImageLayers;