"use strict";
var line_1 = require("../src/line");
describe('1st tests', function () {
    it('should produce a straight tube line', function () {
        var lineInst = new line_1.Line([100, 100], [{ "forward": 10 }]);
        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 l 0 5 l -100 0 Z');
        lineInst.updateRoute([{ "forward": 9 }]);
        expect(lineInst.getPath()).toEqual('M 100 100 l 90 0 l 0 5 l -90 0 Z');
        lineInst.updateRoute([{ "forward": 9 }, { "forward": 5 }]);
        expect(lineInst.getPath()).toEqual('M 100 100 l 90 0 l 50 0 l 0 5 l -50 0 l -90 0 Z');
    });
    it('should be able to turn right', function () {
        var lineInst = new line_1.Line([100, 100], [{ "forward": 10 }, { "turnRight": true }]);
        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 a 10 10 0 0 1 10 10 l -5 0 a 5 5 0 0 0 -5 -5 l -100 0 Z');
    });
    it('should be able to turn left', function () {
        var lineInst = new line_1.Line([100, 100], [{ "forward": 10 }, { "turnLeft": true }]);
        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 a 5 5 0 0 0 5 -5 l 5 0 a 10 10 0 0 1 -10 10 l -100 0 Z');
        lineInst.updateRoute([{ "forward": 10 }, { "turnLeft": true }, { "forward": 10 }]);
        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 a 5 5 0 0 0 5 -5 l 0 -100 l 5 0 l 0 100 a 10 10 0 0 1 -10 10 l -100 0 Z');
    });
    it('should be able to mix and match turns and straights', function () {
        var lineInst = new line_1.Line([100, 100], [{ "forward": 10 }, { "turnRight": true }, { "forward": 10 }, { "turnLeft": true }, { "forward": 15 },
            { "turnLeft": true }, { "forward": 5 }, { "turnLeft": true }, { "turnRight": true }, { "turnRight": true }]);
        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 a 10 10 0 0 1 10 10 l 0 100 a 5 5 0 0 0 5 5 l 150 0 a 5 5 0 0 0 5 -5 l 0 -50 a 5 5 0 0 0 -5 -5 a 10 10 0 0 1 -10 -10 a 10 10 0 0 1 10 -10 l 0 5 a 5 5 0 0 0 -5 5 a 5 5 0 0 0 5 5 a 10 10 0 0 1 10 10 l 0 50 a 10 10 0 0 1 -10 10 l -150 0 a 10 10 0 0 1 -10 -10 l 0 -100 a 5 5 0 0 0 -5 -5 l -100 0 Z');
    });
    it('should be able to turn left at 45 degrees', function () {
        var lineInst = new line_1.Line([100, 100], [{ "forward": 10 }, { "turnLeft45": true }], 'east', 10);
        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 a 5 5 0 0 0 3.5355339059327378 -1.4644660940672622 l 3.5355339059327378 3.5355339059327378 a 10 10 0 0 1 -7.0710678118654755 2.9289321881345245 l -100 0 Z');
    });
    it('should be able to turn right at 45 degrees', function () {
        var lineInst = new line_1.Line([100, 100], [{ "forward": 10 }, { "turnRight45": true }], 'east', 10);
        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 a 10 10 0 0 1 7.0710678118654755 2.9289321881345245 l -3.5355339059327378 3.5355339059327378 a 5 5 0 0 0 -3.5355339059327378 -1.4644660940672622 l -100 0 Z');
    });
    it('should be able to mix and match all turn types', function () {
        var lineInst = new line_1.Line([100, 100], [{ "forward": 6 }, { "turnLeft45": true }, { "forward": 6 }, { "turnRight45": true },
            { "forward": 6 }, { "turnRight": true }, { "forward": 6 }, { "turnRight45": true }, { "forward": 6 }, { "turnLeft45": true },
            { "forward": 6 }, { "turnLeft45": true }], 'east', 10);
        expect(lineInst.getPath()).toEqual('M 100 100 l 60 0 a 5 5 0 0 0 3.5355339059327378 -1.4644660940672622 l 42.42640687119285 -42.42640687119285 a 10 10 0 0 1 7.0710678118654755 -2.9289321881345245 l 60 0 a 10 10 0 0 1 10 10 l 0 60 a 10 10 0 0 1 -2.9289321881345245 7.0710678118654755 l -42.42640687119285 42.42640687119285 a 5 5 0 0 0 -1.4644660940672622 3.5355339059327378 l 0 60 a 5 5 0 0 0 1.4644660940672622 3.5355339059327378 l -3.5355339059327378 3.5355339059327378 a 10 10 0 0 1 -2.9289321881345245 -7.0710678118654755 l 0 -60 a 10 10 0 0 1 2.9289321881345245 -7.0710678118654755 l 42.42640687119285 -42.42640687119285 a 5 5 0 0 0 1.4644660940672622 -3.5355339059327378 l 0 -60 a 5 5 0 0 0 -5 -5 l -60 0 a 5 5 0 0 0 -3.5355339059327378 1.4644660940672622 l -42.42640687119285 42.42640687119285 a 10 10 0 0 1 -7.0710678118654755 2.9289321881345245 l -60 0 Z');
    });
    it('should be able to have a tapered end', function () {
        var lineInst = new line_1.Line([100, 100], [{ "forward": 6 }]);
        expect(lineInst.getPath()).toEqual('M 100 100 l 100 0 l 0 5 l -100 0 Z');
    });
});
