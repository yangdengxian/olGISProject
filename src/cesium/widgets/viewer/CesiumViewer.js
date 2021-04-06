require('cesium/Widgets/widgets.css');
require('./CesiumViewer.css');

var Cesium = require('cesium/Cesium');

Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYzdmNGNmMi02MDBhLTRjMzEtOTQxMi0wY2E1ZDU3OTcwZTYiLCJpZCI6MTIwNzAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjAzMTgxNTJ9.TyBGShhzkSsLWlr99bK3V18wguBBH9j10dTXAy_OlQM";

var viewer = new Cesium.Viewer("map");

var promise = Cesium.IonResource.fromAssetId(157787)
    .then(function(resource) {
        var entity = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(116.404844, 39.915156, 100),
            model: {
                uri: resource,
            },
        });
        viewer.trackedEntity = entity;
    })
    .otherwise(function(error) {
        console.log(error);
    });

export default viewer;