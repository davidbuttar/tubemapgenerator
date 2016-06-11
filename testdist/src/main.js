"use strict";
var line_1 = require("./line");
var TubeMapGenerator = (function () {
    /*line2:Line = new Line([120,150], [
        {"forward":10}, {"turnLeft45":true}, {"forward":6}, {"turnLeft":true},{"forward":6},{"turnLeft":true},{"forward":6}
    ]);

    line3:Line = new Line([120,150], [
        {"forward":10}
    ]);*/
    function TubeMapGenerator() {
        this.snapInstance = Snap("#svg");
        this.line1 = new line_1.Line([120, 150], [
            { "forward": 10 }, { "turnLeft45": true }, { "forward": 6 }, { "turnLeft": true }, { "forward": 6 }, { "turnLeft": true }, { "forward": 6 }
        ]);
        this.snapInstance.path(this.line1.getPath()).attr({
            fill: "none",
            stroke: "#ffa500",
            strokeWidth: 1
        });
        /*this.snapInstance.path(this.line2.getPath()).attr({
            fill: "none",
            stroke: "#ffa",
            strokeWidth: 1
        });

        this.snapInstance.path(this.line3.getPath()).attr({
            fill: "none",
            stroke: "#000",
            strokeWidth: 1
        });*/
    }
    return TubeMapGenerator;
}());
new TubeMapGenerator();
