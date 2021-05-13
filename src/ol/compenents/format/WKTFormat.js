import wellknown from 'wellknown';
/**
 * @classdesc wkt工具
 * @author ydx
 * @date 2019-11-15
 */
class WKTFormat {
    constructor(options) {
        this.regExes = {
            'typeStr': /^\s*(\w+)\s*\s∗(.∗)\s∗\s*$/,
            'spaces': /\s+/,
            'parenComma': /\)\s*,\s*\(/,
            'doubleParenComma': /\)\s*\)\s*,\s*\(\s*\(/, // can't use {2} here  
            'trimParens': /^\s*?(.∗?)?\s*$/
        };
        for (var i in options) {
            this[i] = options[i];
        }
    }


    /** 
     * APIMethod: read 
     * Deserialize a WKT string and return a vector feature or an 
     * array of vector features.  Supports WKT for POINT, MULTIPOINT, 
     * LINESTRING, MULTILINESTRING, POLYGON, MULTIPOLYGON, and 
     * GEOMETRYCOLLECTION. 
     * 
     * Parameters: 
     * wkt - {String} A WKT string 
     * 
     * Returns: 
     * {<OpenLayers.Feature.Vector>|Array} A feature or array of features for 
     * GEOMETRYCOLLECTION WKT. 
     */
    read(wkt) {
        var features, type, str;
        wkt = wkt.replace(/[\n\r]/g, " ");
        var matches = this.regExes.typeStr.exec(wkt);
        if (matches) {
            type = matches[1].toLowerCase();
            str = matches[2];
            if (this.parse[type]) {
                features = this.parse[type].apply(this, [str]);
                //console.log(features);  
            }


        }
        return features;
    }

    /** 
     * Method: extractGeometry 
     * Entry point to construct the WKT for a single Geometry object. 
     * 
     * Parameters: 
     * geometry - {<OpenLayers.Geometry.Geometry>} 
     * 
     * Returns: 
     * {String} A WKT string of representing the geometry 
     */
    extractGeometry(geometry) {
        var type = geometry.CLASS_NAME.split('.')[2].toLowerCase();
        if (!this.extract[type]) {
            return null;
        }
        if (this.internalProjection && this.externalProjection) {
            geometry = geometry.clone();
            geometry.transform(this.internalProjection, this.externalProjection);
        }
        var wktType = type == 'collection' ? 'GEOMETRYCOLLECTION' : type.toUpperCase();
        var data = wktType + '(' + this.extract[type].apply(this, [geometry]) + ')';
        return data;
    }

    trim(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    /**
     * @description extent 转 wkt
     * @param {Array<Number>} extent 
     */
    extentToWKT(extent) {
        var wkt = [];
        wkt.push(extent[0] + " " + extent[1]);
        wkt.push(extent[2] + " " + extent[1]);
        wkt.push(extent[2] + " " + extent[3]);
        wkt.push(extent[0] + " " + extent[3]);
        wkt.push(extent[0] + " " + extent[1]);
        return "POLYGON ((" + wkt.join(",") + "))";
    }

    /**
     * @description geojosn转wkt
     * @param {GeoJSON} geojson 
     */
    geojsonToWkt(geojson) {
        try {
            return wellknown.stringify(geojson);
        } catch (error) {
            new Error('geojson is invalid');
        }

    }

    /**
     * @description wkt转geojson
     * @param {String} wkt eg POINT(1 0) LINESTRING((1 0,0 0)) POLYGON((0 0,1 0, 1 1, 0 1, 0 0))
     */
    wktToGeoJSON(wkt) {
        try {
            return wellknown.parse(wkt);
        } catch (error) {
            new Error('wkt is invalid');
        }
    }

}

export default WKTFormat;