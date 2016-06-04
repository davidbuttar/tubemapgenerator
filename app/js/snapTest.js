var s = Snap("#svg");
// Lets create big circle in the middle:
/*var bigCircle = s.circle(150, 150, 100);
// By default its black, lets change its attributes
bigCircle.attr({
    fill: "#bada55",
    stroke: "#000",
    strokeWidth: 5
});*/

//45 degree offset for circle of radius 1
var degreeOffset45OnCircle = Math.sqrt(2)/2;
var degreeOffset45OnCircleLeftOver = 1 - Math.sqrt(2)/2;

function degreeArc45(radius, sweepFlag, reverse){
    sweepFlag = sweepFlag || 0;
    var y = degreeOffset45OnCircle * radius;
    var x = degreeOffset45OnCircleLeftOver * radius;
    if(reverse){
        y = -y;
        x = -x;
    }
    return 'a '+radius+' '+radius+' 0 0 '+sweepFlag+' '+x+' '+y;
}

//a 10 10 0 0 0 2.92 7.07

var c = s.path("M 30 30 l 100 0 a 10 10 90 0 1 10 10 l 0 100 "+degreeArc45(10)+" l 30 30 "+degreeArc45(10,1)+" l 0 20 a 10 10 90 0 0 10 10 l 20 0 a 10 10 90 0 0 10 -10 l 0 -100 l 5 0 l 0 100 a 15 15 0 0 1 -15 15 l -20 0 a 15 15 0 0 1 -15 -15 l 0 -20"+degreeArc45(5,0,1)+" l -30 -30"+degreeArc45(15,1,1)+" l 0 -100 a 5 5 0 0 0 -5 -5 l -100 0" ).attr({
    fill: "none",
    stroke: "#bada55",
    strokeWidth: 1
});