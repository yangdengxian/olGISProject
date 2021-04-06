import SelectCluster from 'ol-ext/interaction/SelectCluster';
import ol_Feature from 'ol/Feature'
import { Point as ol_geom_Point, LineString as ol_geom_LineString } from 'ol/geom'

/**
 * @classdesc 聚合工具 
 * @author ydx
 * @date 2020-12-23
 * @extends SelectCluster
 * @module interactions/SelectClusterInteraction
 */
class SelectClusterInteraction extends SelectCluster {
    constructor(param) {
        super(param);
        //是否点击聚合要素放大地图
        this.isClickAndZoomIn = param.isClickAndZoomIn || true;
        //配合isClickAndZoomIn属性，默认放大两级
        this.zoomInLevel = param.zoomInLevel || 2;
    };
    /**
     * @description 重写父类
     * @param {*} e 
     */
    selectCluster(e) {
        const map = this.getMap(),
            view = map.getView();
        // It's a feature => convert to SelectEvent
        if (e instanceof ol_Feature) {
            e = { selected: [e] };
        }
        // Nothing selected
        if (!e.selected.length) {
            this.clear();
            return;
        }
        // Get selection
        var feature = e.selected[0];
        // It's one of ours
        if (feature.get('selectclusterfeature')) return;

        // Clic out of the cluster => close it
        var source = this.overlayLayer_.getSource();
        source.clear();

        var cluster = feature.get('features');
        // Not a cluster (or just one feature)
        if (!cluster || cluster.length == 1) return;

        // Remove cluster from selection
        if (!this.selectCluster_) this.getFeatures().clear();

        var center = feature.getGeometry().getCoordinates();
        // Pixel size in map unit
        var pix = this.getMap().getView().getResolution();
        var r = pix * this.pointRadius * (0.5 + cluster.length / 4);
        var a, i, max;
        var p, cf, lk;

        // The features
        var features = [];
        //if map zoom is greater or equal than max zoom, and the length of select cluster features is greater or equal than 1
        //the default value of maxZoom is 18  
        if (view.getZoom() >= (view.getMaxZoom() || 18) && cluster.length > 1) {
            // Draw on a circle
            if (!this.spiral || cluster.length <= this.circleMaxObjects) {
                max = Math.min(cluster.length, this.circleMaxObjects);
                for (i = 0; i < max; i++) {
                    a = 2 * Math.PI * i / max;
                    if (max == 2 || max == 4) a += Math.PI / 4;
                    p = [center[0] + r * Math.sin(a), center[1] + r * Math.cos(a)];
                    cf = new ol_Feature({ 'selectclusterfeature': true, 'features': [cluster[i]], geometry: new ol_geom_Point(p) });
                    cf.setStyle(cluster[i].getStyle());
                    features.push(cf);
                    lk = new ol_Feature({ 'selectclusterlink': true, geometry: new ol_geom_LineString([center, p]) });
                    features.push(lk);
                }
            }
            // Draw on a spiral
            else {
                // Start angle
                a = 0;
                r;
                var d = 2 * this.pointRadius;
                max = Math.min(this.maxObjects, cluster.length);
                // Feature on a spiral
                for (i = 0; i < max; i++) {
                    // New radius => increase d in one turn
                    r = d / 2 + d * a / (2 * Math.PI);
                    // Angle
                    a = a + (d + 0.1) / r;
                    var dx = pix * r * Math.sin(a)
                    var dy = pix * r * Math.cos(a)
                    p = [center[0] + dx, center[1] + dy];
                    cf = new ol_Feature({ 'selectclusterfeature': true, 'features': [cluster[i]], geometry: new ol_geom_Point(p) });
                    cf.setStyle(cluster[i].getStyle());
                    features.push(cf);
                    lk = new ol_Feature({ 'selectclusterlink': true, geometry: new ol_geom_LineString([center, p]) });
                    features.push(lk);
                }
            }
        }


        source.clear();
        if (this.animate) {
            this.animateCluster_(center, features);
        } else {
            source.addFeatures(features);
        }

        //点击聚合要素放大地图
        if (this.isClickAndZoomIn) {
            if (cluster.length > 1 && view.getZoom() <= (view.getMaxZoom() || 18)) {
                view.setCenter(center)
                view.setZoom(view.getZoom() + this.zoomInLevel);
            }
        }

    }

}

export default SelectClusterInteraction;