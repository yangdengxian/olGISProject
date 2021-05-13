
/*
  展示 QueryTaskUtil.identifyWMS 对 'ol/source/TileWMS' 数据的 Identify 功能
*/

import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import MapSub from '../src/ol/compenents/MapSub';

import TranformUtil from '../src/ol/compenents/proj/TransFormUtil.js';

import PopupFeatureOverlay from '../src/ol/compenents/overlay/popup/PopupFeatureOverlay';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import VectorLayer from '../src/ol/compenents/Layers/VectorLayer';

import {identifyWMS} from '../src/ol/compenents/task/QueryTaskUtil';

var wmsSource = new TileWMS({
    url: 'http://localhost:8090/geoserver/mydemo1/wms',
    params: {'LAYERS': 'mydemo1:counties', 'TILED': true},
    serverType: 'geoserver',
    crossOrigin: 'anonymous'
  });

  var wmsLayer = new TileLayer({
    source: wmsSource,
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

//初始化地图   美国
const map = new MapSub({
    center: [28304937.322113905, 5136568.300763844],
    zoom: 5,
    targetId: 'map',
    projection: projection,
    transFormUtil: new TranformUtil({
        source: projection,
        destination: projection
    })
  });

  map.addLayer(highLightFeatureLayer);
  map.addOverlay(popupFeatureOverlay);

  map.addLayer(wmsLayer);  

  map.on('singleclick', function (evt) {
    identify_wms(evt.coordinate);
  });

  function identify_wms(point){
    var successCallBack = identify_tileWMSFeaturePopup;
    var errorCallBack = errorCallBack_;
    identifyWMS(map, wmsSource, point, successCallBack, errorCallBack);
  }

function identify_tileWMSFeaturePopup(point, features) {
    if (Array.isArray(features) && features.length) {
        highLightFeatureLayer.getSource().clear();
        highLightFeatureLayer.getSource().addFeatures(features);
        openFeaturePopup(point, features[0], "");
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

