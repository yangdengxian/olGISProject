import EChartOverlay from './EChartOverlay';

const __colorArray = [
    '#1f77b4', '#ff7f0e', '#C33531', '#EFE42A',
    '#3498DB', '#64BD3D', '#EE9201', '#29AAE3',
    '#B74AE5', '#0AAF9F', '#E89589', '#16A085',
    '#4A235A', '#C39BD3', '#F9E79F', '#BA4A00',
    '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#FF0000'
];

/**
 * @classdesc ol-echarts饼图
 * @author ydx
 * @date 2019-04-15
 * @module overlay/charts/echarts/PieEChartOverlay
 * @extends EChartOverlay
 */
class PieEChartOverlay extends EChartOverlay {
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
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}"
        },
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
    features.forEach(function(result, index) {
        var properties = result["properties"],
            geometry = result["geometry"],
            dataArray = properties["data"];

        options.series.push({
            name: properties["name"],
            type: 'pie',
            radius: '30',
            coordinates: geometry["coordinates"],
            data: getData(dataArray, properties["key"]),
            itemStyle: {
                normal: {　　　　　　　　　　　　　　
                    //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                    color: function(params) {
                        return properties["colors"] ?
                            properties["colors"][properties["data"].indexOf(params.data["value"])] :
                            __colorArray[0];
                    },
                },
                /* emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                } */
            }
        })
    });

    function getData(dataArray, categoryArray) {
        var data = [];
        dataArray.forEach((value, index) => {
            data.push({
                value: value,
                name: categoryArray[index]
            })
        });
        return data;
    }
}

export default PieEChartOverlay;