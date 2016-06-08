import {Line} from "../src/line";

describe('1st tests', () => {

    it('should produce a straight tube line', () => {

        var lineInst = new Line([100,100], [{"forward":10}]);

        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 l 0 5 l -100 0 Z');

        lineInst.updateRoute([{"forward":9}]);

        expect(lineInst.getPath()).toEqual('M 100 100 l 90 0 l 0 5 l -90 0 Z');

        lineInst.updateRoute([{"forward":9}, {"forward":5}]);

        expect(lineInst.getPath()).toEqual('M 100 100 l 90 0 l 50 0 l 0 5 l -50 0 l -90 0 Z');

    });

    it('should be able to turn right', () => {

        var lineInst = new Line([100,100], [{"forward":10}, {"turnRight":true}]);

        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 a 10 10 0 0 1 10 10 l -5 0 a 5 5 0 0 0 -5 -5 l -100 0 Z');

    });

    it('should be able to turn left', () => {

        var lineInst = new Line([100,100], [{"forward":10}, {"turnLeft":true}]);

        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 a 5 5 0 0 0 5 -5 l 5 0 a 10 10 0 0 1 -10 10 l -100 0 Z');

        lineInst.updateRoute([{"forward":10}, {"turnLeft":true}, {"forward":10}]);

        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 a 5 5 0 0 0 5 -5 l 0 -100 l 5 0 l 0 100 a 10 10 0 0 1 -10 10 l -100 0 Z');


    });


    it('should be able to mix and match turns and straights', () => {

        var lineInst = new Line([100,100], [{"forward":10}, {"turnRight":true}, {"forward":10}, {"turnLeft":true}, {"forward":15},
            {"turnLeft":true}, {"forward":5}, {"turnLeft":true}, {"turnRight":true}, {"turnRight":true}]);

        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 a 10 10 0 0 1 10 10 l 0 100 a 5 5 0 0 0 5 5 l 150 0 a 5 5 0 0 0 5 -5 l 0 -50 a 5 5 0 0 0 -5 -5 a 10 10 0 0 1 -10 -10 a 10 10 0 0 1 10 -10 l 0 5 a 5 5 0 0 0 -5 5 a 5 5 0 0 0 5 5 a 10 10 0 0 1 10 10 l 0 50 a 10 10 0 0 1 -10 10 l -150 0 a 10 10 0 0 1 -10 -10 l 0 -100 a 5 5 0 0 0 -5 -5 l -100 0 Z');

    });

});
