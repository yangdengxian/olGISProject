/**
 * @module ol/Map
 */
import PluggableMap from 'ol/PluggableMap.js';
import { defaults as defaultControls } from 'ol/control/util.js';
import { defaults as defaultInteractions } from 'ol/interaction.js';
import { assign } from 'ol/obj.js';
import CanvasImageLayerRenderer from 'ol/renderer/canvas/ImageLayer.js';
import CanvasMapRenderer from 'ol/renderer/canvas/Map.js';
import CanvasTileLayerRenderer from 'ol/renderer/canvas/TileLayer.js';
import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer.js';
import CanvasVectorTileLayerRenderer from 'ol/renderer/canvas/VectorTileLayer.js';

/**
 * @classdesc
 * The map is the core component of OpenLayers. For a map to render, a view,
 * one or more layers, and a target container are needed:
 *
 *     import Map from 'ol/Map';
 *     import View from 'ol/View';
 *     import TileLayer from 'ol/layer/Tile';
 *     import OSM from 'ol/source/OSM';
 *
 *     var map = new Map({
 *       view: new View({
 *         center: [0, 0],
 *         zoom: 1
 *       }),
 *       layers: [
 *         new TileLayer({
 *           source: new OSM()
 *         })
 *       ],
 *       target: 'map'
 *     });
 *
 * The above snippet creates a map using a {@link module:ol/layer/Tile} to
 * display {@link module:ol/source/OSM~OSM} OSM data and render it to a DOM
 * element with the id `map`.
 *
 * The constructor places a viewport container (with CSS class name
 * `ol-viewport`) in the target element (see `getViewport()`), and then two
 * further elements within the viewport: one with CSS class name
 * `ol-overlaycontainer-stopevent` for controls and some overlays, and one with
 * CSS class name `ol-overlaycontainer` for other overlays (see the `stopEvent`
 * option of {@link module:ol/Overlay~Overlay} for the difference). The map
 * itself is placed in a further element within the viewport.
 *
 * Layers are stored as a {@link module:ol/Collection~Collection} in
 * layerGroups. A top-level group is provided by the library. This is what is
 * accessed by `getLayerGroup` and `setLayerGroup`. Layers entered in the
 * options are added to this group, and `addLayer` and `removeLayer` change the
 * layer collection in the group. `getLayers` is a convenience function for
 * `getLayerGroup().getLayers()`. Note that {@link module:ol/layer/Group~Group}
 * is a subclass of {@link module:ol/layer/Base}, so layers entered in the
 * options or added with `addLayer` can be groups, which can contain further
 * groups, and so on.
 *
 * @fires import("ol/MapBrowserEvent.js").MapBrowserEvent
 * @fires import("ol/MapEvent.js").MapEvent
 * @fires module:ol/render/Event~RenderEvent#postcompose
 * @fires module:ol/render/Event~RenderEvent#precompose
 * @api
 */
class Map extends PluggableMap {


    constructor(options) {
        options = assign({}, options);
        if (!options.controls) {
            options.controls = defaultControls();
        }
        if (!options.interactions) {
            options.interactions = defaultInteractions();
        }

        super(options);
    }

    createRenderer() {
        const renderer = new CanvasMapRenderer(this);
        renderer.registerLayerRenderers([
            CanvasImageLayerRenderer,
            CanvasTileLayerRenderer,
            CanvasVectorLayerRenderer,
            CanvasVectorTileLayerRenderer
        ]);
        return renderer;
    }
}


export default Map;