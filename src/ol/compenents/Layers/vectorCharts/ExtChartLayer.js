/**
 * ol-ext图表
 * @author ydx
 * @date 2019-04-16
 */
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import 'ol-ext/dist/ol-ext.min.css';
import Charts from 'ol-ext/style/Chart';
import { yOrdering } from 'ol-ext/render/Ordering';
//样式
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';

import GeoJSON from 'ol/format/GeoJSON';

export default class ExtChartLayer extends Vector {
	constructor(param) {
		super({
			id: 'chartsLayer',
			name: param.name,
			title: 'charts',
			baseLayer: false,
			displayInLayerSwitcher: false,
			source: param.dataUrl
				? new VectorSource({
						url: param.dataUrl,
						format: new GeoJSON(),
				  })
				: new VectorSource({
						features: new GeoJSON().readFeatures(param.features),
				  }),
			style: function(feature) {
				return getFeatureStyle(feature, param.type);
			},
		});
	}
}

function getFeatureStyle(feature, type) {
	var style = {},
		radius = 20,
		// area proportional to data size: s=PI*r^2
		data = feature.get('data');
	// Create chart style
	style = [
		new Style({
			image: new Charts({
				type: type,
				radius: radius,
				data: data,
				rotateWithView: true,
				stroke: new Stroke({ color: '#fff', width: 2 }),
			}),
		}),
	];

	return style;
}
