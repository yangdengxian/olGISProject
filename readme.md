# OpenLayers + Webpack/Vite

This example demonstrates how the `ol` package can be used with webpack.

Clone the project.

    git clone https://github.com/yangdengxian/olGISProject.git

Install the project dependencies.

    cd olGISProject
    pnpm install

Create a bundle for the browser.

    pnpm run build

Start the project

    pnpm run start

Open `index.html` to see the result.

    open index.html

-----

### 在webpack, Rollup, Browserify, or other module bundlers使用olGISProject

````
npm install ol-gis-project --save
````

**v1.0.0版本 二维框架**

> * 工具类
> * 控件
> * 图层切换展示
> * 查询
> * 新增三维展示
> * 新增地图打印功能
> * 解决地图图片请求跨域bug

**v1.0.4版本 二维框架**

> * 优化wms服务

**v1.0.5版本 二维框架**

> * 优化WFS查询服务

**v1.0.6版本 二维框架**

> * 去除默认UI

**v1.0.7 v1.0.8 v1.0.9版本 二维框架**

> * 解决图例图片无法显示bug


**v1.10.0版本 二维框架**

> * 空间条件查询

**v1.10.1版本 二维框架**

> * 属性查询
> * 文件配置

**v1.10.2版本 二维框架**

> * 优化矢量图层样式

**v1.10.3,4,5版本 二维框架**

> * 日期格式化正则表达式配置

**v1.10.6,7,8,9,10版本 二维框架**

> * 查询优化


**v1.11.0,1,2,3,4,5版本 二维框架**

> * 坐标转换更新
> * WKT转换

**v1.11.6版本 二维框架**

> * 图例优化

**v1.12.0版本 二维框架**

> * 自定义坐标系

**v2.0.0，1，2,10版本 二维框架**

> * 新增路径动画播放服务
> * 更新路径规划服务

**v2.0.12版本 二维框架**

> * 动画路径清除

**v2.1.0版本 样式优化**

> * 样式优化

**v2.1.2版本**

> * 轨迹播放动画

**v2.1.3版本**

> * 切片缓存

**v2.1.4版本**

> * 样式优化

**v2.1.6版本**

> * wms 切片服务优化

**v3.0.0版本**

> * 新增矢量切片服务 

**v3.1.0版本**

> * 新增cesium组件

**v3.1.2版本**

> * 图层bug修改

**v3.1.3版本**

> * 矢量图层bug修改

**v3.2.0版本**

> * 聚合工具
> * 鼠标右键工具
> 

**v3.2.1版本**

> * arcgis服务接口优化

**v3.2.2版本**

> * js apidoc文档优化

**v4.0.0版本**

> * 平台优化

**v4.1.0版本**

> * 平台目录结构调整
>

**v5.0.0版本**
> * ol版本升级，v9

**v5.0.2版本**
> * 支持ts版本

**v5.0.5版本**
> * bug解决
>
**v5.1.1版本**
> * 版本升级

### 地图实例化
```javascript

import MapSub from 'ol-gis-project/src/ol/compenents/MapSub';

//初始化地图
const map = new MapSub({
    layers: [
        //影像图
        new TileLayer({
            source: new XYZ({
                url: `https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png`
            }),
            title: "影像图",
        }),
    ],
    target: 'map',
    view: new View({
        center: [
            113.50, 22.84
        ],
        zoom: 16,
        projection: 'EPSG:4326'
    }),
});

```

### 相关参考

[openlayers][1]

[@esri/arcgis-to-geojson-utils][2]

[ol-echarts][3]

[ol-ext][4]


  [1]: https://github.com/openlayers/openlayers
  [2]: https://github.com/Esri/arcgis-to-geojson-utils
  [3]: https://github.com/sakitam-fdd/ol3Echarts
  [4]: https://github.com/Viglino/ol-ext