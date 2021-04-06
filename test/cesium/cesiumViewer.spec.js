import CesiumViewer from "../../src/ol/compenents/format/CesiumViewer"

describe("wfst", function() {
    it("insert", function() {
        var wfst = new WFST({
            url: "http://localhost:8085/geoserver2.15/localhost/wfs"
        });
        var feature = new Feature({
            geom: new LineString([

                [113.21, 24.32],
                [113.21, 24.33],
                [113.21, 24.34],
                [113.21, 24.35],
                [113.21, 24.36]

            ]),
            line_name: '113'
        });
        feature.setGeometryName('geom');
        wfst.insert(feature, {
            featureNS: 'www.localhost.com',
            featurePrefix: 'localhost',
            featureType: 'global_line'
        }).then((res) => {
            console.log(res);
        }, (err) => {
            console.error(err);

        });
    });
});