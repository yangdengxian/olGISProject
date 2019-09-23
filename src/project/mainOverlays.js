/**
 * @description overlays
 * @author ydx
 * @date 2019-08-14
 */
//弹窗覆盖物
import PopupFeatureOverlay from '../ol/compenents/overlay/popup/PopupFeatureOverlay';
import BufferOverlay from '../ol/compenents/overlay/buffer/BufferOverlay';

//layers
const {
    wellPopupFeatureOverlay,
    workerPopupFeatureOverlay,
    planePopupFeatureOverlay,
    bufferOverlay
} = {

    wellPopupFeatureOverlay: new PopupFeatureOverlay({
        id: "wellPopupFeatureOverlay"
    }),

    workerPopupFeatureOverlay: new PopupFeatureOverlay({
        id: "workerPopupFeatureOverlay"
    }),

    planePopupFeatureOverlay: new PopupFeatureOverlay({
        id: "planePopupFeatureOverlay"
    }),

    bufferOverlay: new BufferOverlay(),
}

export { wellPopupFeatureOverlay, workerPopupFeatureOverlay, planePopupFeatureOverlay, bufferOverlay };