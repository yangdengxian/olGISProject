import Cesium from "cesium/Cesium";

/**
 * @classdesc gltf、glb实例
 * @author ydx
 * @returns
 */
class GLTFEntity extends Cesium.Entity {
    /**
     * @description 初始化
     * @param {Object} param 
     * @param {String} param.name 
     * @param {Array} param.position  [x,y,z]
     * @param {Object} param.model  {minimumPixelSize: 100,maximumScale: 20000}
     * @param {String} param.model.uri gltf链接
     * @param {Object} param.ol3DCesium cesium实例
     */
    constructor(param) {
        const heading = Cesium.Math.toRadians(135);
        const pitch = 0;
        const roll = 0;
        const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        const name = param.name;
        const position = Cesium.Cartesian3.fromDegrees(param.position[0], param.position[1], param.position[2]);
        const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
        const model = Object.assign({
            minimumPixelSize: 100,
            maximumScale: 20000
        }, param.model);

        const options = Object.assign(param, {
            name: name,
            position: Cesium.Cartesian3.fromDegrees(param.position[0], param.position[1], param.position[2]),
            orientation: orientation,
            model: model
        });
        super(options)
        this.ol3DCesium = param.ol3DCesium;
    }

    selectedEntity(movement) {
        var feature = this.ol3DCesium.scene_.pick(movement.position);
        feature.id.model.color = Cesium.Color.YELLOW;
        return feature;
    }
}

export default GLTFEntity;