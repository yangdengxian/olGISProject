import './src/project/mianCss.js';
import MapSub from './src/ol/compenents/MapSub.js';
//layers
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ';

//获取配置范围
const map = new MapSub({
    layers: [
        //影像图
        new TileLayer({
            source: new XYZ({
                url: `https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png`
            }),
            title: "影像图",
        }),
        new TileLayer({
            source: new XYZ({
                url: `http://t${Math.round(Math.random() * 7)}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=7015b8105eb0039b18bce8a3e88e47b1`
            }),
            title: "注记",
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
