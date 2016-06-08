import {Line} from "./line";
declare var Snap:any;


class TubeMapGenerator{
    snapInstance = Snap("#svg");
    line1:Line = new Line([120,150], [
        {"forward":10}, {"turnRight":true}, {"forward":10}, {"turnLeft":true}, {"forward":15},
        {"turnLeft":true}, {"forward":5}, {"turnLeft":true}, {"turnRight":true}, {"turnRight":true}
    ]);

    constructor () {
        this.snapInstance.path(this.line1.getPath()).attr({
            fill: "none",
            stroke: "#ffa500",
            strokeWidth: 1
        });
    }

}

new TubeMapGenerator();


