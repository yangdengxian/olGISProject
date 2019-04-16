/**
 * 柱状图
 * @author ydx
 * @date 2019-04-15
 * 
 */

import ChartOverlay from './ChartOverlay';

export default class BarChartOverlay extends ChartOverlay {
    constructor(param) {
        super(param);
        this._colorArray = [
            '#1f77b4', '#ff7f0e', '#C33531', '#EFE42A',
            '#3498DB', '#64BD3D', '#EE9201', '#29AAE3',
            '#B74AE5', '#0AAF9F', '#E89589', '#16A085',
            '#4A235A', '#C39BD3', '#F9E79F', '#BA4A00',
            '#ECF0F1', '#616A6B', '#EAF2F8', '#4A235A', '#FF0000'
        ];
    }

    _getOption(result) {
        var self = this;
        var option = {
            tooltip: {
                show: true,
                formatter: function(parmas) {
                    return parmas.seriesName + ":" + parmas.value;
                }
            },
            //网格
            grid: {
                /* top: '3%',
                left: '1%', //距离左边的距离
                right: '3%',
                bottom: '2%',
                containLabel: true */
                top: 20, //距离容器上边界20像素
                bottom: 20 //距离容器下边界20像素
            },
            //x坐标 data表示横轴显示名称
            xAxis: [{
                type: 'category',
                data: [result["name"] || ""],
                axisLabel: {

                    textStyle: {
                        color: self._colorArray[self._colorArray.length - 1],
                        // fontSize: 15,
                        fontWeight: 'bold'
                    }
                }
            }],
            yAxis: [{
                //不显示y轴
                show: false,
                type: 'value'
            }],
            series: self._getSeries(result)
        };

        return option;
    }

    _getSeries(result) {
        var self = this;
        var series = [],
            dataArray = result["data"],
            keysArray = result["key"],
            colorsArray = result["colors"] || self._colorArray;

        dataArray.forEach(function(value, index) {
            series.push({
                "name": keysArray[index],
                "type": "bar",
                "data": [
                    value
                ],
                // barWidth : 30,//柱图宽度
                itemStyle: {
                    normal: {　　　　　　　　　　　　　　
                        //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function(params) {
                            return colorsArray[index]
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

        return series;
    }

}