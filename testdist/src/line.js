"use strict";
var handle45DegreeTurns_1 = require("./handle45DegreeTurns");
var Line = (function () {
    function Line(start, route, startDirection) {
        if (start === void 0) { start = [0, 0]; }
        if (startDirection === void 0) { startDirection = 'east'; }
        this.start = start;
        this.route = route;
        this.startDirection = startDirection;
        this.model = new handle45DegreeTurns_1.Handle45DegreeTurns();
        this.path = '';
        this.pathWidth = 5;
        this.scale = 10;
        this.currentDirection = 'east';
        this.currentAngle = 0;
        //45 degree offset for circle of radius 1
        this.root2 = Math.sqrt(2);
        this.degreeOffset45OnCircle = Math.sqrt(2) / 2;
        this.degreeOffset45OnCircleLeftOver = 1 - Math.sqrt(2) / 2;
        this.degreeMapping = {};
        this.degreeMapping = {
            '0': [1, 0],
            '45': [1, -1],
            '90': [0, -1],
            '135': [-1, -1],
            '180': [-1, 0],
            '225': [-1, 1],
            '270': [0, 1],
            '315': [1, 1]
        };
    }
    ;
    Line.prototype.updateRoute = function (route) {
        this.currentDirection = 'east';
        this.currentAngle = 0;
        this.route = route;
    };
    Line.prototype.incrementCurrentAngle = function (increment, antiClockwise) {
        this.currentAngle = this.incrementAngle(increment, this.currentAngle, antiClockwise);
    };
    Line.prototype.incrementAngle = function (increment, startAngle, antiClockwise) {
        var outAngle = startAngle;
        if (antiClockwise) {
            if (outAngle === 0) {
                outAngle = 360;
            }
            outAngle -= increment;
        }
        else {
            outAngle += increment;
        }
        if (outAngle >= 360) {
            outAngle = outAngle - 360;
        }
        else if (outAngle < 0) {
            outAngle = outAngle + 360;
        }
        return outAngle;
    };
    /**
     * Given and angle and scale produce a svg frendly string
     * @param angle
     * @param scale
     * @returns {string}
     */
    Line.prototype.angleToDirectionCoordinates = function (angle, scale) {
        return this.degreeMapping[angle][0] * scale + ' ' + this.degreeMapping[angle][1] * scale;
    };
    /**
     * Close off the tube if applicable
     */
    Line.prototype.close = function () {
        var returnString = 'l ';
        var lineDirection = this.incrementAngle(90, this.currentAngle, true);
        var length = this.pathWidth;
        var diagonal = lineDirection == 45 || lineDirection == 135 || lineDirection == 225 || lineDirection == 315;
        if (diagonal) {
            length = this.pathWidth * this.degreeOffset45OnCircle;
        }
        returnString += this.angleToDirectionCoordinates(lineDirection, length);
        this.incrementCurrentAngle(180);
        return returnString;
    };
    /**
     * Handle a right turn.
     * @returns {string}
     */
    Line.prototype.turnRight = function () {
        var diameter = this.pathWidth * 2;
        var returnString = 'a ' + diameter + ' ' + diameter + ' 0 0 1 ';
        var curveDirection = this.incrementAngle(45, this.currentAngle, true);
        var endPointOfCircle = this.pathWidth * 2;
        if (curveDirection === 90 || curveDirection === 180 || curveDirection === 270 || curveDirection === 0) {
            endPointOfCircle *= this.root2;
        }
        returnString += this.angleToDirectionCoordinates(curveDirection, endPointOfCircle);
        this.incrementCurrentAngle(90, true);
        return returnString;
    };
    /**
     * Handle a left 45 turn.
     *
     * @returns {string}
     */
    Line.prototype.turnRight45 = function () {
        console.log('yo');
        var diameter = this.pathWidth * 2;
        var returnString = 'a ' + diameter + ' ' + diameter + ' 0 0 1 ';
        var y = this.degreeOffset45OnCircle * diameter;
        var x = this.degreeOffset45OnCircleLeftOver * diameter;
        returnString += this.degreeMapping[this.currentAngle][0] * y + ' ' + this.degreeMapping[this.currentAngle][1] * x;
        this.incrementCurrentAngle(45, true);
        return returnString;
    };
    /**
     * Handle a left turn.
     * @returns {string}
     */
    Line.prototype.turnLeft = function () {
        var diameter = this.pathWidth;
        var returnString = 'a ' + diameter + ' ' + diameter + ' 0 0 0 ';
        var curveDirection = this.incrementAngle(45, this.currentAngle);
        var endPointOfCircle = this.pathWidth;
        if (curveDirection === 90 || curveDirection === 180 || curveDirection === 270 || curveDirection === 0) {
            endPointOfCircle *= this.root2;
        }
        returnString += this.angleToDirectionCoordinates(curveDirection, endPointOfCircle);
        this.incrementCurrentAngle(90);
        return returnString;
    };
    /**
     * Handle a left 45 turn.
     *
     * @returns {string}
     */
    Line.prototype.turnLeft45 = function () {
        var diameter = this.pathWidth;
        var returnString = 'a ' + diameter + ' ' + diameter + ' 0 0 0 ';
        var y = this.degreeOffset45OnCircle * this.pathWidth;
        var x = this.degreeOffset45OnCircleLeftOver * this.pathWidth;
        var curveDirection = this.incrementAngle(45, this.currentAngle);
        returnString += this.degreeMapping[curveDirection][0] * y + ' ' + this.degreeMapping[curveDirection][1] * x;
        this.incrementCurrentAngle(45);
        return returnString;
    };
    /**
     * Handle a left turn.
     * @returns {string}
     */
    Line.prototype.goForward = function (forwardAmount) {
        return 'l ' + this.angleToDirectionCoordinates(this.currentAngle, forwardAmount * this.scale);
    };
    /**
     * Take our array of instruction and produce a matching path
     * @returns {string}
     */
    Line.prototype.processRoute = function () {
        var instructions = [];
        // Outward bound
        for (var _i = 0, _a = this.route; _i < _a.length; _i++) {
            var route = _a[_i];
            if (route.forward) {
                instructions.push(this.goForward(route.forward));
            }
            else if (route.turnRight) {
                instructions.push(this.turnRight());
            }
            else if (route.turnLeft) {
                instructions.push(this.turnLeft());
            }
            else if (route.turnLeft45) {
                instructions.push(this.turnLeft45());
            }
        }
        // close end
        instructions.push(this.close());
        var numberOfRoutes = this.route.length;
        // Inward bound
        for (var i = numberOfRoutes - 1; i >= 0; i--) {
            if (this.route[i].forward) {
                instructions.push(this.goForward(this.route[i].forward));
            }
            else if (this.route[i].turnRight) {
                instructions.push(this.turnLeft());
            }
            else if (this.route[i].turnLeft) {
                instructions.push(this.turnRight());
            }
            else if (this.route[i].turnLeft45) {
                console.log('here');
                instructions.push(this.turnRight45());
            }
        }
        return instructions.join(' ');
    };
    Line.prototype.getPath = function () {
        this.path = "M " + this.start[0] + " " + this.start[1] + " " + this.processRoute() + " Z";
        return this.path;
    };
    return Line;
}());
exports.Line = Line;
