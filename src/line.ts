/**
 * Builds an inner and outer line for a tube line like path.
 * Author: David Buttar
 */
export class Line{
    public path:string = '';
    public pathWidth:number = 5;
    private scale:number = 10;
    private currentDirection:string = 'east';
    private currentAngle:number = 0;
    private degreeMapping: { [id: string] : number[]; } = {};
    private directionMapping: { [id: string] : number; } = {};

    //Numbers circle of radius 1 and the right angled triangle you can fit in it.
    private root2:number = Math.sqrt(2);
    private degreeOffset45OnCircle:number = Math.sqrt(0.5);
    private degreeOffset45OnCircleLeftOver:number = 1 - Math.sqrt(0.5);


    constructor(public start: number[] = [0,0],
                public route: any[],
                public startDirection: string = 'east',
                public turn45Default: number = 20
                ){
        this.degreeMapping = {
            '0':[1,0],
            '45':[1,-1],
            '90':[0,-1],
            '135':[-1,-1],
            '180':[-1,0],
            '225':[-1,1],
            '270':[0,1],
            '315':[1,1]
        };

        this.directionMapping = {
            'east':0,
            'north east':45,
            'north':90,
            'north west':135,
            'west':180,
            'south west':225,
            'south':270,
            'south east':315
        };

        this.currentAngle = this.directionMapping[this.startDirection];

    };

    updateRoute(route: any[]){
        this.currentDirection = 'east';
        this.currentAngle = 0;
        this.route = route;
    }

    incrementCurrentAngle(increment:number, antiClockwise?:boolean){
        this.currentAngle = this.incrementAngle(increment, this.currentAngle, antiClockwise);
    }

    incrementAngle(increment:number, startAngle:number, antiClockwise?:boolean){
        var outAngle = startAngle;
        if(antiClockwise){
            if(outAngle === 0){
                outAngle = 360;
            }
            outAngle -= increment;
        }else{
            outAngle += increment;
        }

        if(outAngle >= 360){
            outAngle = outAngle - 360;
        }else if(outAngle < 0){
            outAngle = outAngle + 360;
        }

        return outAngle;
    }

    /**
     * Given and angle and scale produce a svg frendly string
     * @param angle
     * @param scale
     * @returns {string}
     */
    angleToDirectionCoordinates(angle:number, scale:number){
        return this.degreeMapping[angle][0]*scale + ' ' + this.degreeMapping[angle][1]*scale;
    }

    addTaperedEnd(){
        var returnString:string = '';
        var turns = [{clockwise:true,length:2},{clockwise:false,length:3},{clockwise:false,length:9},
            {clockwise:false,length:3},{clockwise:false,length:2}];
        for(var i = 0, ii = turns.length; i<ii; i++){
            var length = turns[i].length;
            this.incrementCurrentAngle(90, !turns[i].clockwise);
            if(this.currentAngle % 90 !== 0){
                length = turns[i].length * this.degreeOffset45OnCircle;
            }
            returnString += 'l '+this.angleToDirectionCoordinates(this.currentAngle, length);
        }
        this.incrementCurrentAngle(90);
        return returnString;
    }

    /**
     * Close off the tube if applicable
     */
    close(){

        return this.addTaperedEnd();
        /*var returnString:string = 'l ';
        var lineDirection = this.incrementAngle(90, this.currentAngle, true);
        var length = this.pathWidth;
        if(lineDirection % 90 !== 0){
            length = this.pathWidth * this.degreeOffset45OnCircle;
        }
        returnString += this.angleToDirectionCoordinates(lineDirection, length);
        this.incrementCurrentAngle(180);
        return returnString;*/
    }

    /**
     * Handle a right turn.
     * @returns {string}
     */
    turnRight(){
        var diameter = this.pathWidth * 2;
        var returnString:string = 'a '+diameter+' '+diameter+' 0 0 1 ';
        var curveDirection = this.incrementAngle(45, this.currentAngle, true);
        var endPointOfCircle = this.pathWidth * 2;
        if(curveDirection % 90 === 0){
            endPointOfCircle *= this.root2;
        }
        returnString += this.angleToDirectionCoordinates(curveDirection, endPointOfCircle);
        this.incrementCurrentAngle(90, true);
        return returnString;
    }

    /**
     * Handle a left turn.
     * @returns {string}
     */
    turnLeft(){
        var diameter = this.pathWidth;
        var returnString:string = 'a '+diameter+' '+diameter+' 0 0 0 ';
        var curveDirection = this.incrementAngle(45, this.currentAngle);
        var endPointOfCircle = this.pathWidth;
        // Going straight?
        if(curveDirection % 90 === 0){
            endPointOfCircle *= this.root2;
        }
        returnString += this.angleToDirectionCoordinates(curveDirection, endPointOfCircle);
        this.incrementCurrentAngle(90);
        return returnString;
    }

    /**
     * Handle a left 45 turn.
     *
     * @returns {string}
     */
    turnRight45(){
        var diameter = this.turn45Default;
        var returnString:string = 'a '+diameter+' '+diameter+' 0 0 1 ';
        var degreeOffset = this.degreeOffset45OnCircle * diameter;
        var degreeOffsetLeftOver = this.degreeOffset45OnCircleLeftOver * diameter;
        var curveDirection = this.currentAngle;
        if(this.currentAngle % 90 === 0) {
            curveDirection = this.incrementAngle(45, this.currentAngle, true);
        }
        if(this.currentAngle === 0 || this.currentAngle === 45 || this.currentAngle === 180 || this.currentAngle === 225){
            returnString += this.degreeMapping[curveDirection][0] * degreeOffset + ' '+ this.degreeMapping[curveDirection][1] * degreeOffsetLeftOver;
        }else{
            returnString += this.degreeMapping[curveDirection][0] * degreeOffsetLeftOver + ' '+ this.degreeMapping[curveDirection][1] * degreeOffset;
        }
        this.incrementCurrentAngle(45, true);
        return returnString;
    }

    /**
     * Handle a left 45 turn.
     *
     * @returns {string}
     */
    turnLeft45(){
        var diameter = this.turn45Default - this.pathWidth;
        var returnString:string = 'a '+diameter+' '+diameter+' 0 0 0 ';
        var degreeOffset = this.degreeOffset45OnCircle * diameter;
        var degreeOffsetLeftOver = this.degreeOffset45OnCircleLeftOver * diameter;
        var curveDirection = this.currentAngle;
        if(this.currentAngle % 90 === 0) {
            curveDirection = this.incrementAngle(45, this.currentAngle);
        }
        if(this.currentAngle === 0 || this.currentAngle === 135 || this.currentAngle === 180 || this.currentAngle === 315){
            returnString += this.degreeMapping[curveDirection][0] * degreeOffset + ' '+ this.degreeMapping[curveDirection][1] * degreeOffsetLeftOver;
        }else{
            returnString += this.degreeMapping[curveDirection][0] * degreeOffsetLeftOver + ' '+ this.degreeMapping[curveDirection][1] * degreeOffset;
        }
        this.incrementCurrentAngle(45);
        return returnString;
    }

    /**
     * Handle a left turn.
     * @returns {string}
     */
    goForward(forwardAmount:number){
        if(this.currentAngle % 90 !== 0){
            forwardAmount *= this.degreeOffset45OnCircle;
        }
        return 'l '+this.angleToDirectionCoordinates(this.currentAngle, forwardAmount * this.scale);
    }

    /**
     * Take our array of instruction and produce a matching path
     * @returns {string}
     */
    processRoute(){
        var instructions : string[] = [];

        // Outward bound
        for (var route of this.route) {
            if(route.forward){
                instructions.push(this.goForward(route.forward));
            }else if(route.turnRight){
                instructions.push(this.turnRight());
            } else if(route.turnLeft){
                instructions.push(this.turnLeft());
            }else if(route.turnLeft45){
                instructions.push(this.turnLeft45());
            }else if(route.turnRight45){
                instructions.push(this.turnRight45());
            }
        }

        // close end
        instructions.push(this.close());

        var numberOfRoutes = this.route.length;

        // Inward bound
        for (var i = numberOfRoutes - 1; i>=0; i--) {
            if(this.route[i].forward){
                instructions.push(this.goForward(this.route[i].forward));
            }else if(this.route[i].turnRight){
                instructions.push(this.turnLeft());
            }else if(this.route[i].turnLeft){
                instructions.push(this.turnRight());
            }else if(this.route[i].turnLeft45){
                instructions.push(this.turnRight45());
            }else if(this.route[i].turnRight45){
                instructions.push(this.turnLeft45());
            }
        }

        instructions.push(this.addTaperedEnd());

        return instructions.join(' ');

    }

    getPath(){
        this.path = "M "+this.start[0]+" "+this.start[1]+" "+this.processRoute()+" Z";
        return this.path;
    }

}