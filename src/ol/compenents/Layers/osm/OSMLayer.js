import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

class OSMLayer extends TileLayer {
    constructor(param) {
        super({
            source: new OSM(param)
        });
    }
}

export default OSMLayer;