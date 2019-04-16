import map from '../src/ol/compenents/Map';
import EsriJSON from 'ol/format/EsriJSON.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { tile as tileStrategy } from 'ol/loadingstrategy.js';
import VectorSource from 'ol/source/Vector.js';
import { Fill, Stroke, Style } from 'ol/style.js';
import { createXYZ } from 'ol/tilegrid.js';


var serviceUrl = 'https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/' +
    'Petroleum/KSFields/FeatureServer/';
var layer = '0';

var esrijsonFormat = new EsriJSON();

var styleCache = {
    'ABANDONED': new Style({
        fill: new Fill({
            color: 'rgba(225, 225, 225, 255)'
        }),
        stroke: new Stroke({
            color: 'rgba(0, 0, 0, 255)',
            width: 0.4
        })
    }),
    'GAS': new Style({
        fill: new Fill({
            color: 'rgba(255, 0, 0, 255)'
        }),
        stroke: new Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    }),
    'OIL': new Style({
        fill: new Fill({
            color: 'rgba(56, 168, 0, 255)'
        }),
        stroke: new Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0
        })
    }),
    'OILGAS': new Style({
        fill: new Fill({
            color: 'rgba(168, 112, 0, 255)'
        }),
        stroke: new Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4
        })
    })
};

var vectorSource = new VectorSource({
    loader: function(extent, resolution, projection) {
        var url = serviceUrl + layer + '/query/?f=json&' +
            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
            encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
                extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
                ',"spatialReference":{"wkid":102100}}') +
            '&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*' +
            '&outSR=102100';
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(response) {
                if (response.error) {
                    alert(response.error.message + '\n' +
                        response.error.details.join('\n'));
                } else {
                    // dataProjection will be read from document
                    var features = esrijsonFormat.readFeatures(response, {
                        featureProjection: projection
                    });
                    if (features.length > 0) {
                        vectorSource.addFeatures(features);
                    }
                }
            }
        });
    },
    strategy: tileStrategy(createXYZ({
        tileSize: 512
    }))
});

var vector = new VectorLayer({
    baseLayer: false,
    source: vectorSource,
    style: function(feature) {
        var classify = feature.get('activeprod');
        return styleCache[classify];
    }
});

map.addLayer(vector);

/* var map = new Map({
    layers: [raster, vector],
    target: document.getElementById('map'),
    view: new View({
        center: fromLonLat([-97.6114, 38.8403]),
        zoom: 7
    })
}); */

var displayFeatureInfo = function(pixel) {
    var features = [];
    map.forEachFeatureAtPixel(pixel, function(feature) {
        features.push(feature);
    });
    /*  if (features.length > 0) {
         var info = [];
         var i, ii;
         for (i = 0, ii = features.length; i < ii; ++i) {
             info.push(features[i].get('field_name'));
         }
         map.getTarget().style.cursor = 'pointer';
     } else {
         map.getTarget().style.cursor = '';
     } */
};

map.on('pointermove', function(evt) {
    if (evt.dragging) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(pixel);
});

map.on('click', function(evt) {
    displayFeatureInfo(evt.pixel);
});

export default {};