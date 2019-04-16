/**
 * 测试
 */
import 'jquery/dist/jquery.min';
import Config from './src/ol/config/config';
import Util from './src/ol/utils/Util';
//UI
import './src/ol/compenents/UI/UIView';

import MapSub from './src/ol/compenents/Map';

//esri离线切片服务
import ArcGISTileLayers from './src/ol/compenents/Layers/arcgis/ArcGISTileLayer';
import ArcGISImageLayers from './src/ol/compenents/Layers/arcgis/ArcGISImageLayers';

//菜单
import ToolBarTask from './src/ol/compenents/task/ToolBarTask';

//获取配置范围
const mapConfig = Config.getMapConfig(Util.getQueryString('App'));

//初始化地图
const map = new MapSub({
	targetId: 'map',
	projection: Config.mapConfig['projection'],
});

const { arcGISTileLayers, mapServer, d_mapServer } = {
	arcGISTileLayers: new ArcGISTileLayers(),
	mapServer: new ArcGISImageLayers(mapConfig.mapUrl, {
		title: '井图层',
		params: {
			id: 0,
		},
	}),
	d_mapServer: new ArcGISImageLayers(mapConfig.d_mapUrl[0], {
		title: '油田部署图',
		params: { id: 0 },
	}),
};

//设置底图图层
const tileLayerGroup = arcGISTileLayers.getLayerGroup();
// map.setLayerGroup(tileLayerGroup);
// tileLayerGroup.setExtent(Util.getExtentArray(mapConfig["mapFullExtent"]));
map.getView().fit(Util.getExtentArray(mapConfig['mapFullExtent']));

// 菜单事件绑定
const toolBarTask = new ToolBarTask({
	map: map,
	mapFullExtent: Util.getExtentArray(mapConfig['mapFullExtent']),
	toolBarId: 'bs-navbar-collapse',
	toolBarInteractions: {},
});
toolBarTask.bindClickEvent();
