import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Circle from 'ol/geom/Circle.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import Projection from 'ol/proj/Projection';

var projection_21240 = new Projection({
    code: 'EPSG:21240',
    extent: [
        16918242.81, 4915747.10,
        18089858.23, 5077965.93
    ],
    units: 'm',
    axisOrientation: 'neu'
});


var image = new CircleStyle({
    radius: 5,
    fill: null,
    stroke: new Stroke({ color: 'red', width: 1 })
});

var styles = {
    'Point': new Style({
        image: image
    }),
    'LineString': new Style({
        stroke: new Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiLineString': new Style({
        stroke: new Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiPoint': new Style({
        image: image
    }),
    'MultiPolygon': new Style({
        stroke: new Stroke({
            color: 'yellow',
            width: 1
        }),
        fill: new Fill({
            color: 'rgba(255, 255, 0, 0.1)'
        })
    }),
    'Polygon': new Style({
        stroke: new Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    }),
    'GeometryCollection': new Style({
        stroke: new Stroke({
            color: 'magenta',
            width: 2
        }),
        fill: new Fill({
            color: 'magenta'
        }),
        image: new CircleStyle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
                color: 'magenta'
            })
        })
    }),
    'Circle': new Style({
        stroke: new Stroke({
            color: 'red',
            width: 2
        }),
        fill: new Fill({
            color: 'rgba(255,0,0,0.2)'
        })
    })
};

var styleFunction = function(feature) {
    return styles[feature.getGeometry().getType()];
};

var geojsonObject = {
    'type': 'FeatureCollection',
    'features': [{
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [20631722.83, 4316128.68]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [20620698.68, 4317755.13]
        }
    }, {
        'type': 'Feature',
        'geometry': {
            "type": "Polygon",
            "coordinates": [
                [
                    [20621698.6805008, 4317755.13025315],
                    [20621679.4657812, 4317560.03993114],
                    [20621622.5600333, 4317372.44682079],
                    [20621530.1501131, 4317199.56002013],
                    [20621405.7872819, 4317048.02347197],
                    [20621254.2507338, 4316923.66064085],
                    [20621081.3639331, 4316831.25072064],
                    [20620893.7708228, 4316774.34497275],
                    [20620698.6805008, 4316755.13025315],
                    [20620503.5901787, 4316774.34497275],
                    [20620315.9970684, 4316831.25072064],
                    [20620143.1102677, 4316923.66064085],
                    [20619991.5737196, 4317048.02347197],
                    [20619867.2108885, 4317199.56002013],
                    [20619774.8009682, 4317372.44682079],
                    [20619717.8952204, 4317560.03993114],
                    [20619698.6805008, 4317755.13025315],
                    [20619717.8952204, 4317950.22057517],
                    [20619774.8009682, 4318137.81368552],
                    [20619867.2108885, 4318310.70048617],
                    [20619991.5737196, 4318462.23703434],
                    [20620143.1102677, 4318586.59986546],
                    [20620315.9970684, 4318679.00978567],
                    [20620503.5901787, 4318735.91553356],
                    [20620698.6805008, 4318755.13025315],
                    [20620893.7708228, 4318735.91553356],
                    [20621081.3639331, 4318679.00978567],
                    [20621254.2507338, 4318586.59986546],
                    [20621405.7872819, 4318462.23703434],
                    [20621530.1501131, 4318310.70048617],
                    [20621622.5600333, 4318137.81368552],
                    [20621679.4657812, 4317950.22057517],
                    [20621698.6805008, 4317755.13025315]
                ]
            ]
        }
    }]
};


var vectorSource = new VectorSource({
    features: (new GeoJSON()).readFeatures(geojsonObject)
});

vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

var vectorLayer = new VectorLayer({
    source: vectorSource,
    style: styleFunction
});

var map = new Map({
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        vectorLayer
    ],
    target: 'map',
    view: new View({
        center: [20651002.294, 4322489.231],
        zoom: 10,
        projection: projection_21240
    })
});

map.on('click', (evt) => {
    console.log(evt);

})