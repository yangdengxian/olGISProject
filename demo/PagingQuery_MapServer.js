
/*
  展示 QueryTaskUtil.pagingQueryMapServer 对 ArcGIS 的 MapServer 数据的 分页查询 功能
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

import {pagingQueryMapServer, cancelPagingQueryMapServer} from '../src/ol/compenents/task/QueryTaskUtil';

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
  var singleclicktimes = 0;
  map.on('singleclick', function (evt) {
    singleclicktimes++;
    query_MapServer();
  });

  function query_MapServer(){
    if(singleclicktimes %2 == 1) {
    var params = {
      map: map,
      layerid: 43062,
      geometry: map.frameState_.extent,
      geometryType:"esriGeometryEnvelope",
      spatialRel: "esriSpatialRelIntersects",
      inSR: 102100
    };
    var perRsCount = 500;
    var successCallBack = query_mapServerAddFeatures;
    var errorCallBack = errorCallBack_;

    pagingQueryMapServer(arcgisurl, params, perRsCount, successCallBack, errorCallBack);
  }
  else{
    cancelPagingQueryMapServer();
  }
} 

function query_mapServerAddFeatures(features) {
  if (Array.isArray(features) && features.length) {
    highLightFeatureLayer.getSource().clear();
    highLightFeatureLayer.getSource().addFeatures(features);
  } 
}

/**
 * @description 失败回调
 * @param {error} error 
 */
function errorCallBack_(error) {
    throw new Error(error);
}

