var s = Snap("#svg");
// Lets create big circle in the middle:
/*var bigCircle = s.circle(150, 150, 100);
// By default its black, lets change its attributes
bigCircle.attr({
    fill: "#bada55",
    stroke: "#000",
    strokeWidth: 5
});*/

var c = s.path("M10 10 l 30 30 l 0 30 l 100 0 q 8 0 8 8 l 0 100").attr({
    fill: "none",
    stroke: "#bada55",
    strokeWidth: 1
});