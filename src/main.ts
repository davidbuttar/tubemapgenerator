import { Handle45DegreeTurns } from "./handle45DegreeTurns";

declare var Snap:any;

function drawMap() {
    var handle45DegreeTurns = new Handle45DegreeTurns();
    var s = Snap("#svg");
    s.path("M 20 20 l 100 0 a 10 10 90 0 1 10 10 l 0 100 "+handle45DegreeTurns.degreeArc45(10)+" l 30 30 "+
        handle45DegreeTurns.degreeArc45(10,1)+" l 0 20 a 10 10 90 0 0 10 10 l 20 0 a 10 10 90 0 0 10 -10 l 0 -100 l 5 0 l 0 100 a 15 15 0 0 1 -15 15 l -20 0 a 15 15 0 0 1 -15 -15 l 0 -20"+
        handle45DegreeTurns.degreeArc45(5,0,1)+" l -30 -30"+
        handle45DegreeTurns.degreeArc45(15,1,1)+" l 0 -100 a 5 5 0 0 0 -5 -5 l -100 0 Z" ).attr({
        fill: "none",
        stroke: "#ffa500",
        strokeWidth: 1
    });
}

drawMap();


