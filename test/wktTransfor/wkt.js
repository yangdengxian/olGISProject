import WKTUtil from '../../src/ol/utils/WKTUtil';
describe("wkt", function() {
    it("geojsonToWkt", function() {
        var wktUtil = new WKTUtil();
        var wktStr = wktUtil.geojsonToWkt({
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        38.47412109375,
                        29.11377539511439
                    ],
                    [
                        48.84521484375,
                        29.11377539511439
                    ],
                    [
                        48.84521484375,
                        37.64903402157866
                    ],
                    [
                        38.47412109375,
                        37.64903402157866
                    ],
                    [
                        38.47412109375,
                        29.11377539511439
                    ]
                ]
            ]
        });
        console.log(wktStr);


    });

    it("wktToGeoJSON", function() {
        var wktUtil = new WKTUtil();
        var geojson = wktUtil.wktToGeoJSON('POLYGON((1 1,5 1,5 5,1 5,1 1),(2 2,2 3,3 3,3 2,2 2))');
        console.log(geojson);
    });

})