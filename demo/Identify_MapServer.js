
/*
  展示 QueryTaskUtil.mapServerIdentify 对 ArcGIS 的 MapServer 数据的 Identify 功能
*/

import MapSub from '../src/ol/compenents/MapSub';

import TranformUtil from '../src/ol/compenents/proj/TransFormUtil.js';

import PopupFeatureOverlay from '../src/ol/compenents/overlay/popup/PopupFeatureOverlay';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import VectorLayer from '../src/ol/compenents/Layers/VectorLayer';
import ArcGISImageLayers from '../src/ol/compenents/Layers/arcgis/ArcGISImageLayers';

import {identifyMapServer} from '../src/ol/compenents/task/QueryTaskUtil';

var arcgisurl = "http://a4.petrochina/arcgis/rest/services/DQHSEWG/MapServer?token=c1fcb988-f985-4395-913d-d387dda30d75";

var arclay = new ArcGISImageLayers(arcgisurl, {
  id: "chart_imageLayer",
  isBaseLayer: false,
  title: "构造图",
  thmemeLayer: false,
  // params:{
  //   layerDefs:"6:NAME_1 IN ('Guelma', 'Khenchela', 'Oum el Bouaghi')"
  // }
});

//高亮图
var highLightFeatureLayer = new VectorLayer({
    id: "highLightFeatureLayer"
  });
  highLightFeatureLayer.setStyle(getHighLightStyle());
  highLightFeatureLayer.setZIndex(101);
  
function getHighLightStyle() {
    var style = new Style({
        fill: new Fill({
            color: 'rgba(125, 125, 125, 0.2)'
        }),
        stroke: new Stroke({
            color: '#ffcc33',
            width: 8
        }),
        image: new Circle({
            radius: 7,
            fill: new Fill({
                color: '#ffcc33'
            })
        })
    });
    return style;
}

var popupFeatureOverlay = new PopupFeatureOverlay({
    id: "popupFeatureOverlay"
});

var projection = 'EPSG:3857';

//初始化地图   项目区域
const map = new MapSub({
  center: [13918380.261933599, 5872045.3869238105],
  zoom: 12,
  targetId: 'map',
  projection: projection,
  transFormUtil: new TranformUtil({
      source: projection,
      destination: projection
  })
});

  map.addLayer(highLightFeatureLayer);
  map.addOverlay(popupFeatureOverlay);

  map.addLayer(arclay);

  map.on('singleclick', function (evt) {
    identifyMapServerByPoint(evt.coordinate);
  });

  function identifyMapServerByPoint(point){ 
    var successCallBack = identifyMapServerFeaturePopup;
    var errorCallBack = errorCallBack_;
  
    identifyMapServer(map, arcgisurl, [43062, 43079], point, successCallBack, errorCallBack);
  }  

  function identifyMapServerFeaturePopup(point, features) {
    if (Array.isArray(features) && features.length) {
      highLightFeatureLayer.getSource().clear();
      highLightFeatureLayer.getSource().addFeatures(features);
      openFeaturePopup(point, features[0], "A4");
    } 
  }

/**
 * @description 失败回调
 * @param {error} error 
 */
function errorCallBack_(error) {
    throw new Error(error);
}

function openFeaturePopup(coordinate, mapFeature, sourceType) {
    if (!mapFeature.getGeometry()) return;
    var content = "测试";
    var properties = mapFeature.getProperties();
    if(sourceType == ""){
      content += "<br>STATE_NAME:" + properties["STATE_NAME"];
    } else if(sourceType == "A4"){
      if(sourceType == "wms"){
        content += "<br>组织机构名称:" + properties["组织机构名称"];
      } else {
        content += "<br>井业务代码:" + properties["井业务代码"];
      }
    }
    if (map.getOverlayById("popupFeatureOverlay")) {
        map.getOverlayById("popupFeatureOverlay").openPopup(coordinate, content);
    }  
}

