import {Line} from "./line";
declare var Snap:any;


class TubeMapGenerator{
    snapInstance = Snap("#svg");

    line1:Line = new Line([100,100], [
        {"forward":6}
    ]);

    line2:Line = new Line([1000, 30], [
        {"forward":5}, {"turnLeft45":true}, {"forward":18}, {"turnRight45":true},{"forward":13},{"turnRight45":true},{"forward":9},
        {"turnLeft45":true},{"forward":13},{"turnRight45":true},{"forward":13},{"turnRight45":true},{"forward":5},{"turnLeft45":true},
        {"forward":40},{"turnLeft":true},{"forward":20}
    ], 'south west');

    /*line3:Line = new Line([120,150], [
        {"forward":10}
    ]);*/

    constructor () {
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

}

new TubeMapGenerator();


