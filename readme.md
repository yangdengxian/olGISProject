# OpenLayers + Webpack

This example demonstrates how the `ol` package can be used with webpack.

Clone the project.

    git clone https://github.com/yangdengxian/olGISProject.git

Install the project dependencies.

    cd olGISProject
    npm install

Create a bundle for the browser.

    npm run build

Start the project

    npm run start

Open `index.html` to see the result.

    open index.html

-----

### 在webpack, Rollup, Browserify, or other module bundlers使用olGISProject

````
npm install ol-gis-project --save
````

**v1.0.6版本 二维框架**

> * 工具类
> * 控件
> * 图层切换展示
> * 查询


**v2.0.1版本 二三维框架**

> * 工具类
> * 控件
> * 图层切换展示
> * 查询
> * 新增三维展示

**v2.1.0版本 二三维框架**

> * 工具类
> * 控件
> * 图层切换展示
> * 查询
> * 新增三维展示
> * 新增地图打印功能
> * 解决地图图片请求跨域bug

**相关参考**

[openlayers][1]

[@esri/arcgis-to-geojson-utils][2]

[ol-echarts][3]

[ol-ext][4]

[ol-cesium][5]


  [1]: https://github.com/openlayers/openlayers
  [2]: https://github.com/Esri/arcgis-to-geojson-utils
  [3]: https://github.com/sakitam-fdd/ol3Echarts
  [4]: https://github.com/Viglino/ol-ext
  [5]: https://github.com/openlayers/ol-cesium
