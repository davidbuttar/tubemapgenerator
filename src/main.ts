import {Line} from "./line";
declare var Snap:any;


class TubeMapGenerator{
    snapInstance = Snap("#svg");
    line1:Line = new Line([120,150], [
        {"forward":6}, {"turnLeft45":true}, {"forward":6}, {"turnRight45":true}, {"forward":6}, {"turnRight":true},
        {"forward":6}, {"turnRight45":true}, {"forward":6}, {"turnLeft45":true}, {"forward":6},{"turnLeft45":true}
    ]);

    /*line2:Line = new Line([120,150], [
        {"forward":10}, {"turnLeft45":true}, {"forward":6}, {"turnLeft":true},{"forward":6},{"turnLeft":true},{"forward":6}
    ]);

    line3:Line = new Line([120,150], [
        {"forward":10}
    ]);*/

    constructor () {
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

}

new TubeMapGenerator();


