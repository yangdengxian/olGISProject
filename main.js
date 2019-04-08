import map from './src/ol/compenents/Map';

//esri离线切片服务
import ArcGISTileLayers from './src/ol/compenents/Layers/ArcGISTileLayer';
//鹰眼图
import OverviewMapControl from './src/ol/compenents/controls/overviewMap/OverviewMapControl';
//比例尺
import ScaleBarControl from './src/ol/compenents/controls/scalebar/ScaleBar';
//导航条
import ZoomSildweControl from './src/ol/compenents/controls/zoomSlider/ZoomSlider';
//框选缩放
import DragZoomControl from './src/ol/compenents/controls/Draw/DragZoomControl';
//测量
import AreaControl from './src/ol/compenents/controls/Draw/measure/AreaControl';
import DistanceControl from './src/ol/compenents/controls/Draw/measure/DistanceControl';

//菜单
import ToolBarTask from './src/ol/compenents/task/ToolBarTask';


const arcGISTileLayers = new ArcGISTileLayers();
const {
    overviewMapControl,
    scaleBarControl,
    zoomSildweControl,
    dragZoomControl,
    areaControl,
    distanceControl
} = {
    overviewMapControl: new OverviewMapControl({
        layers: arcGISTileLayers.getTileLayers(),
        collapsed: true //初始是否关闭鹰眼
    }),
    scaleBarControl: new ScaleBarControl({
        minWidth: 140,
        units: "metric"
    }),

    zoomSildweControl: new ZoomSildweControl(),
    dragZoomControl: new DragZoomControl(),
    areaControl: new AreaControl(),
    distanceControl: new DistanceControl()
}


//设置底图图层
map.setLayerGroup(arcGISTileLayers.getLayerGroup());
//添加鹰眼
map.addControl(overviewMapControl);
//添加比例尺
map.addControl(scaleBarControl);
//添加导航条
map.addControl(zoomSildweControl);

//框选
map.addInteraction(dragZoomControl);
dragZoomControl.setActive(false);

//测量
map.addInteraction(areaControl);
areaControl.setActive(false);
map.addInteraction(distanceControl);
distanceControl.setActive(false);
map.on('pointermove', (evt) => {
    if (areaControl.getActive()) {
        areaControl.pointerMoveHandler(evt);
    } else if (distanceControl.getActive()) {
        areaControl.pointerMoveHandler(evt);
    }
})
map.getViewport().addEventListener('mouseout', () => {
    helpTooltipElement.classList.add('hidden')
})

// 菜单事件绑定
const toolBarTask = new ToolBarTask({
    toolBarId: "bs-navbar-collapse",
    toolBarControls: {
        dragZoomControl: dragZoomControl,
        areaControl: areaControl,
        distanceControl: distanceControl
    }
});
toolBarTask.bindClickEvent();