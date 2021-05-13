import { getQueryString } from '../Utils/Util';

let languageObject = {
    zoomBarDisplayObject: {
        moveUp: "moveUp",
        moveDown: "moveDown",
        moveLeft: "moveLeft",
        moveRight: "moveRight",
        zoomIn: "zoomIn",
        zoomOut: "zoomOut",
        zoomTo: "zoomTo",
        zoomWheel: "zoomWheel"
    },
    toolBarObject: {
        pan: "pan",
        zoomIn: "dropZoomIn",
        zoomOut: "dropZoomOut",
        fullScreen: "fullScreen",
        boxSelected: "boxSelected",
        distanceMeasure: "distanceMeasure",
        areMeasure: "areMeasure",
        print: "print"
    },
    legend: "legend",
    overviewMap: "overviewMap",
    layerSwitch: {
        baseLayerSwitch: {
            baseLayerSwitchDiv: "baseLayerSwitch",
            administrativeMap: "administrativeMap",
            imageMap: "imageMap",
            terrainMap: "terrainMap"
        },
        themeLayerSwitch: "themeLayerSwitch"
    }
};

//语言国际化适配
switch (getQueryString("language")) {
    case "en":

        break;

    case "zh_CN":
        languageObject = {
            zoomBarDisplayObject: {
                moveUp: "上移",
                moveDown: "下移",
                moveLeft: "左移",
                moveRight: "右移",
                zoomIn: "放大",
                zoomOut: "缩小",
                zoomTo: "缩放至",
                zoomWheel: "滚轮缩放"
            },
            toolBarObject: {
                pan: "漫游",
                dropZoomIn: "拉框放大",
                dropZoomOut: "拉框缩小",
                fullScreen: "全屏",
                boxSelected: "框选查询",
                distanceMeasure: "距离测量",
                areMeasure: "面积测量",
                print: "打印"
            },
            legend: "图例",
            overviewMap: "鹰眼图",
            layerSwitch: {
                baseLayerSwitch: {
                    baseLayerSwitchDiv: "基础图控制",
                    administrativeMap: "行政区划图",
                    imageMap: "影像图",
                    terrainMap: "地形图"
                },
                themeLayerSwitch: "专题图控制"
            }
        };
        break;

    default:
        languageObject = {
            zoomBarDisplayObject: {
                moveUp: "上移",
                moveDown: "下移",
                moveLeft: "左移",
                moveRight: "右移",
                zoomIn: "放大",
                zoomOut: "缩小",
                zoomTo: "缩放至",
                zoomWheel: "滚轮缩放"
            },
            toolBarObject: {
                pan: "漫游",
                dropZoomIn: "拉框放大",
                dropZoomOut: "拉框缩小",
                fullScreen: "全屏",
                boxSelected: "框选查询",
                distanceMeasure: "距离测量",
                areMeasure: "面积测量",
                print: "打印"
            },
            legend: "图例",
            overviewMap: "鹰眼图",
            layerSwitch: {
                baseLayerSwitch: {
                    baseLayerSwitchDiv: "基础图控制",
                    administrativeMap: "行政区划图",
                    imageMap: "影像图",
                    terrainMap: "地形图"
                },
                themeLayerSwitch: "专题图控制"
            }
        };
        break;
}

export { languageObject }