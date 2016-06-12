"use strict";
var line_1 = require("./line");
var TubeMapGenerator = (function () {
    /*line3:Line = new Line([120,150], [
        {"forward":10}
    ]);*/
    function TubeMapGenerator() {
        this.snapInstance = Snap("#svg");
        this.line1 = new line_1.Line([120, 150], [
            { "forward": 6 }, { "turnLeft45": true }, { "forward": 6 }, { "turnRight45": true }, { "forward": 30 },
            { "turnRight45": true }, { "forward": 6 }, { "turnLeft45": true }, { "forward": 6 }, { "turnRight45": true }, { "forward": 8 },
            { "turnLeft45": true }, { "forward": 40 }
        ]);
        this.line2 = new line_1.Line([1000, 30], [
            { "forward": 5 }, { "turnLeft45": true }, { "forward": 18 }, { "turnRight45": true }, { "forward": 13 }, { "turnRight45": true }, { "forward": 9 },
            { "turnLeft45": true }, { "forward": 13 }, { "turnRight45": true }, { "forward": 13 }, { "turnRight45": true }, { "forward": 5 }, { "turnLeft45": true },
            { "forward": 40 }, { "turnLeft": true }, { "forward": 20 }
        ], 'south west');
        this.snapInstance.path(this.line1.getPath()).attr({
            fill: "none",
            stroke: "#ffa500",
            strokeWidth: 1
        });
        this.snapInstance.path(this.line2.getPath()).attr({
            fill: "#f00",
            stroke: "none"
        });
        /*this.snapInstance.path(this.line3.getPath()).attr({
            fill: "none",
            stroke: "#000",
            strokeWidth: 1
        });*/
    }
    return TubeMapGenerator;
}());
new TubeMapGenerator();
