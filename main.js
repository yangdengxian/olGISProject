import map from './src/ol/compenents/Map';

//esri离线切片服务
import ArcGISTileLayers from './src/ol/compenents/Layers/ArcGISTileLayer';
//鹰眼图
import OverviewMapControl from './src/ol/compenents/controls/overviewMap/OverviewMapControl';
//比例尺
import ScaleBarControl from './src/ol/compenents/controls/scalebar/ScaleBar';
//导航条
import ZoomSildweControl from './src/ol/compenents/controls/zoomSlider/ZoomSlider';

const arcGISTileLayers = new ArcGISTileLayers();
const { overviewMapControl, scaleBarControl, zoomSildweControl } = {
    overviewMapControl: new OverviewMapControl({
        layers: arcGISTileLayers.getTileLayers(),
        collapsed: true //初始是否关闭鹰眼
    }),
    scaleBarControl: new ScaleBarControl({
        minWidth: 140,
        units: "metric"
    }),

    zoomSildweControl: new ZoomSildweControl(),
}

//设置底图图层
// map.setLayerGroup(arcGISTileLayers.getLayerGroup());
//添加鹰眼
map.addControl(overviewMapControl.getControl());
//添加比例尺
map.addControl(scaleBarControl.getControl());
//添加导航条
map.addControl(zoomSildweControl.getControl());