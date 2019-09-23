/**
 * @description controls
 * @author ydx
 * @date 2019-08-14
 */
//底图切换
import BaseLayerSwitcherImageControl from '../ol/compenents/controls/switchLayer/BaseLayerSwitcherImageControl';
import ThemeLayersSwitchControl from '../ol/compenents/controls/switchLayer/ThemeLayersSwitchControl';
//鹰眼图
import OverviewMapControl from '../ol/compenents/controls/overviewMap/OverviewMapControl';
//比例尺
import ScaleBarControl from '../ol/compenents/controls/scalebar/ScaleBar';
//导航条
import ZoomSilderControl from '../ol/compenents/controls/zoomSlider/ZoomSlider';
//打印工具
import PrintControl from '../ol/compenents/controls/print/PrintControl';
//图例
import LegendControl from '../ol/compenents/controls/Legend/LegendControl';
import { languageObject } from '../ol/compenents/UI/language';

const {
    scaleBarControl,
    zoomSilderControl,
    baseLayerSwitcherImageControl,
    themeLayersSwitchControl,
    printControl,
    legendControl
} = {
    scaleBarControl: new ScaleBarControl({
        minWidth: 140,
        units: "metric"
    }),

    zoomSilderControl: new ZoomSilderControl({
        displayObject: languageObject.zoomBarDisplayObject
    }),
    baseLayerSwitcherImageControl: new BaseLayerSwitcherImageControl({
        title: "baseLayerSwitch",
        trash: true,
        show_progress: true
    }),
    themeLayersSwitchControl: new ThemeLayersSwitchControl({
        title: "themeLayersSwitch"
    }),
    printControl: new PrintControl({
        id: "printControl"
    }),

    legendControl: new LegendControl({
        title: 'legend',
        collapsed: true
    }),
};


export {
    OverviewMapControl,
    scaleBarControl,
    zoomSilderControl,
    baseLayerSwitcherImageControl,
    themeLayersSwitchControl,
    printControl,
    legendControl
}