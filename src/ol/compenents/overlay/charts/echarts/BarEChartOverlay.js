import EChartOverlay from './EChartOverlay';

const __colorArray = [
    '#1f77b4', '#ff7f0e', '#C33531', '#EFE42A',
    '#3498DB', '#64BD3D', '#EE9201', '#29AAE3',
    '#B74AE5', '#0AAF9F', '#E89589', '#16A085',
    '#4A235A', '#C39BD3', '#F9E79F', '#BA4A00',
    '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#FF0000'
];

/**
 * @classdesc ol-echarts柱状图
 * @author ydx
 * @date 2019-04-15
 * @module overlay/charts/echarts/BarEChartOverlay
 * @extends EChartOverlay
 */
class BarEChartOverlay extends EChartOverlay {
    /**
     * 
     * @param {*} param EChartOverlay.param
     * @param {features} param.features 数据集 必填*
     * @param {map} param.map 地图实例 必填*
     */
    constructor(param) {
        super(getOptions(param.features, param.map));
    }
}

/**
 * 获取chart属性对象
 * @param {Array} features 数据
 * @param {String} type chart 类型 'bar'、'pie'
 * @param {Map} map
 */
function getOptions(features, map) {
    var options = {};
    options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },

        //网格
        grid: [],
        xAxis: [],
        yAxis: [],
        series: []
    }
    setSeries(features, options, map);
    return options;
}

/**
 * 封装数据对象
 * @param {Array} features 数据
 * @param {Object} options chart 属性对象
 * @param {Map} map
 */
function setSeries(features, options, map) {
    var singleWidh = 10; //单个柱子宽度
    features.forEach(function(result, index) {
        var properties = result["properties"],
            geometry = result["geometry"],
            dataArray = properties["data"];

        options.grid.push({
            show: true,
            containLabel: false,
            borderWidth: 0,
            borderColor: '#fff',
            width: singleWidh * (dataArray.length + 1),
            height: 60
        });

        options.xAxis.push({
            type: 'category',
            //x轴名称
            name: properties["name"],
            nameLocation: 'middle',
            nameTextStyle: {
                color: '#3c3c3c',
                fontSize: 12,
                fontWeight: 'bold'
            },
            show: true,
            gridIndex: index,
            axisLine: {
                show: false,
                onZero: false
            },
            //坐标轴文本标签选项
            axisLabel: {
                show: false,
                interval: 0,
                rotate: -45,
                textStyle: {
                    color: '#3c3c3c',
                    fontSize: 10,
                    fontWeight: 'bold'
                },
                formatter: function(param) {
                    return param;
                }
            },
            axisTick: {
                show: false
            },
            data: properties["key"]
        });

        options.yAxis.push({
            type: 'value',
            show: true,
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false,
                onZero: false
            },
            // nameGap: '1',
            axisTick: {
                show: false
            },
            nameTextStyle: {
                color: '#3c3c3c',
                fontSize: 14
            },
            gridIndex: index
        });

        options.series.push({
            name: properties["name"],
            type: 'bar',
            // barWidth: '15',
            coordinates: geometry["coordinates"],
            data: dataArray,
            xAxisIndex: index,
            yAxisIndex: index,
            itemStyle: {
                normal: {　　　　　　　　　　　　　　
                    //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                    color: function(params) {
                        return properties["colors"] ? properties["colors"][properties["data"].indexOf(params["data"])] : __colorArray[0];
                    },
                    //以下为是否显示，显示位置和显示格式的设置了
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}'
                            // formatter: '{b}\n{c}'
                    }
                }
            }
        })
    });
}

export default BarEChartOverlay;