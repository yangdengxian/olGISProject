/**
 * geoservver图层组
 * @author ydx
 * @date 2019-04-21
 */
import Util from '../../../utils/Util';
import GroupLayers from '../GroupLayers';

export default class GeoLayerGroup extends GroupLayers {
    constructor(param) {
        super(param);
    }

    /**
     * 获取图层元数据
     * @param {String} url 
     */
    getCapabitities(url) {
        return Util.ajaxGetReqeust(url, {
            f: 'json'
        }).then((json) => {
            return json;
        }, (error) => {
            throw new Error(error);
        })
    }

    /**
     * 添加图层，根据url查询图层数量 
     * @param {String} url eg: https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer
     */
    addImageLayers(url) {

        var __this = this;
        //总图层
        var __layers = [],
            layerIds = [];
        //image图层
        var imageLayers = [];
        return this.getCapabitities(url).then((json) => {
            __this.set("title", json["mapName"]);
            __layers = json["layers"];
            layerIds = getLayerIds();
            __layers.forEach(layer => {
                //单节点 root节点
                if (!layer["subLayerIds"] && layer["parentLayerId"] === -1) {
                    var arcgisImageLayers = new ArcgisImageLayers(url, {
                        id: layer["id"],
                        title: layer["name"],
                        params: {
                            layerIds: [layer["id"]]
                        }
                    });
                    imageLayers.push(arcgisImageLayers);
                } else {
                    if (layer["subLayerIds"] && layer["parentLayerId"] === -1) {
                        var supGroup = new ArcgisLayerGroup({
                            id: layer["id"],
                            title: layer["name"]
                        });
                        var superImageLayers = [];
                        layer["subLayerIds"].forEach(subLayerId => {
                            superImageLayers.push(new ArcgisImageLayers(url, {
                                id: subLayerId,
                                title: __layers[layerIds.indexOf(subLayerId)]["name"],
                                params: {
                                    layerIds: [subLayerId]
                                }
                            }))
                        });
                        supGroup.addLayers(superImageLayers);
                        imageLayers.push(supGroup);
                    }

                }
            });
            imageLayers = Util.sortArrayFuncs(imageLayers, 0, "ol_uid");
            __this.addLayers(imageLayers);
            return imageLayers;
        }, (error) => {
            throw new Error(error);
        })


        function getLayerIds() {
            var layerIds = [];
            __layers.forEach(layer => {
                layerIds.push(layer["id"]);
            });
            return layerIds;
        }

    }


}