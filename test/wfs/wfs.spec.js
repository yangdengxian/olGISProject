/* import WFST from '../../../src/ol/compenents/format/WFST';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import {
    bbox as Bbox,
    equalTo as EqualTo,
    like as Like,
    and as AndFilter
} from 'ol/format/filter'
describe("wfst", function() {
    describe('featureType', function() {

        it('#getFeatureType #setFeatureType', function() {
            const format = new WFST({
                featureNS: 'http://www.openplans.org/topp',
                featureType: ['foo', 'bar']
            });
            expect(format.getFeatureType()).to.eql(['foo', 'bar']);
            format.setFeatureType('baz');
            expect(format.getFeatureType()).to.eql('baz');
        });

    });
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

    it("update", function() {
        var wfst = new WFST({
            url: "http://localhost:8085/geoserver2.15/localhost/wfs"
        });
        var feature = new Feature({
            line_name: 'ydx123'
        });
        feature.setGeometryName('geom');
        feature.setId(8);
        wfst.update(feature, {
            featureNS: 'www.localhost.com',
            featurePrefix: 'localhost',
            featureType: 'global_line'
        }).then((res) => {
            console.log(res);
        }, (err) => {
            console.error(err);

        });
    });

    it("loadFeatures", function() {
        var wfst = new WFST({
            url: "http://localhost:8085/geoserver2.15/localhost/wfs"
        });
        wfst.loadFeatures({
            featurePrefix: "localhost",
            featureTypes: ["global_line"], //
            // featureId: 8
            filter: Like("line_name", "%城%")
        }).then((res) => {
            console.log(res);
        }, (err) => {
            console.error(err);
        });
    });

    it("remove", function() {
        var wfst = new WFST({
            url: "http://localhost:8085/geoserver2.15/localhost/wfs"
        });
        wfst.remove(8, {
            featureNS: 'www.localhost.com',
            featurePrefix: 'localhost',
            featureType: 'global_line'
        }).then((res) => {
            console.log(res);
        }, (err) => {
            console.error(err);

        });
    });

}) */