import Cesium from "cesium/Cesium";

var elementMap = {}; // Build a map of elements to features.
var selectedFeature;
/**
 * @description 创建3D Model 
 * @param {String} url model url eg: glb,gltf,
 * @param {Array<Number>} coordinates [x,y,z]
 */
export function createModel(url, coordinates) {
    const position = Cesium.Cartesian3.fromDegrees(coordinates[0], coordinates[1], coordinates[2]);
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    return {
        name: url,
        position: position,
        orientation: orientation,
        model: {
            uri: url,
            minimumPixelSize: 100,
            maximumScale: 20000
        }
    };
}


/**
 * @description 创建tileSet
 * @param {String} url model url  eg: glb,gltf,
 */
export function createTileSet(url) {
    const tileSet = new Cesium.Cesium3DTileset({
        url: url,
    });
    return tileSet;
}

/**
 * @description 要素选中
 * @param {Cesium3DTileFeature} feature 
 */
export function selectFeature(feature) {

};

/**
 * @description 取消选中要素
 * @param {Cesium3DTileFeature} feature 
 */
export function unselectFeature(feature) {
    if (!Cesium.defined(feature)) {
        return;
    }
    var element = feature.getProperty('element');
    setElementColor(element, Cesium.Color.WHITE);
    if (feature === selectedFeature) {
        selectedFeature = undefined;
    }
}

export function setElementColor(element, color) {
    var featuresToColor = elementMap[element];
    var length = featuresToColor.length;
    for (var i = 0; i < length; ++i) {
        var feature = featuresToColor[i];
        feature.color = Cesium.Color.clone(color, feature.color);
    }
}