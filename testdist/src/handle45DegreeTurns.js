"use strict";
var Handle45DegreeTurns = (function () {
    function Handle45DegreeTurns() {
        //45 degree offset for circle of radius 1
        this.degreeOffset45OnCircle = Math.sqrt(2) / 2;
        this.degreeOffset45OnCircleLeftOver = 1 - Math.sqrt(2) / 2;
    }
    Handle45DegreeTurns.prototype.degreeArc45 = function (radius, sweepFlag, reverse) {
        sweepFlag = sweepFlag || 0;
        var y = this.degreeOffset45OnCircle * radius;
        var x = this.degreeOffset45OnCircleLeftOver * radius;
        if (reverse) {
            y = -y;
            x = -x;
        }
        return 'a ' + radius + ' ' + radius + ' 0 0 ' + sweepFlag + ' ' + x + ' ' + y;
    };
    return Handle45DegreeTurns;
}());
exports.Handle45DegreeTurns = Handle45DegreeTurns;
