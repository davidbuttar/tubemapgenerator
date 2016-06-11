import {Handle45DegreeTurns} from "./handle45DegreeTurns";


export class Line{


    model = new Handle45DegreeTurns();
    public path:string = '';
    public pathWidth:number = 5;
    private scale:number = 10;
    private currentDirection:string = 'east';
    private currentAngle:number = 0;

    //45 degree offset for circle of radius 1
    root2:number = Math.sqrt(2);
    degreeOffset45OnCircle:number = Math.sqrt(2)/2;
    degreeOffset45OnCircleLeftOver:number = 1 - Math.sqrt(2)/2;

    private degreeMapping: { [id: string] : number[]; } = {};

    constructor(public start: number[] = [0,0],
                public route: any[],
                public startDirection: string = 'east'
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

    /**
     * Close off the tube if applicable
     */
    close(){
        var returnString:string = 'l ';
        var lineDirection = this.incrementAngle(90, this.currentAngle, true);
        var length = this.pathWidth;
        var diagonal = lineDirection == 45 || lineDirection == 135 || lineDirection == 225 || lineDirection == 315;
        if(diagonal){
            length = this.pathWidth * this.degreeOffset45OnCircle;
        }
        returnString += this.angleToDirectionCoordinates(lineDirection, length);
        this.incrementCurrentAngle(180);
        return returnString;
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
        if(curveDirection === 90 || curveDirection === 180 || curveDirection === 270 || curveDirection === 0){
            endPointOfCircle *= this.root2;
        }
        returnString += this.angleToDirectionCoordinates(curveDirection, endPointOfCircle);
        this.incrementCurrentAngle(90, true);
        return returnString;
    }

    /**
     * Handle a left 45 turn.
     *
     * @returns {string}
     */
    turnRight45(){
        console.log('yo');
        var diameter = this.pathWidth * 2;
        var returnString:string = 'a '+diameter+' '+diameter+' 0 0 1 ';
        var y = this.degreeOffset45OnCircle * diameter;
        var x = this.degreeOffset45OnCircleLeftOver * diameter;
        returnString += this.degreeMapping[this.currentAngle][0] * y + ' '+ this.degreeMapping[this.currentAngle][1] * x;
        this.incrementCurrentAngle(45, true);
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
        if(curveDirection === 90 || curveDirection === 180 || curveDirection === 270 || curveDirection === 0){
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
    turnLeft45(){
        var diameter = this.pathWidth;
        var returnString:string = 'a '+diameter+' '+diameter+' 0 0 0 ';
        var y = this.degreeOffset45OnCircle * this.pathWidth;
        var x = this.degreeOffset45OnCircleLeftOver * this.pathWidth;
        var curveDirection = this.incrementAngle(45, this.currentAngle);
        returnString += this.degreeMapping[curveDirection][0] * y + ' '+ this.degreeMapping[curveDirection][1] * x;
        this.incrementCurrentAngle(45);
        return returnString;
    }

    /**
     * Handle a left turn.
     * @returns {string}
     */
    goForward(forwardAmount:number){
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
                console.log('here');
                instructions.push(this.turnRight45());
            }
        }

        return instructions.join(' ');

    }

    getPath(){
        this.path = "M "+this.start[0]+" "+this.start[1]+" "+this.processRoute()+" Z";
        return this.path;
    }

    /*this.s.path("M "+this.start[0]+" "+this.start[1]+" l 100 0 a 10 10 90 0 1 10 10 l 0 100 "+this.model.degreeArc45(10)+" l 30 30 "+
     this.model.degreeArc45(10,1)+" l 0 20 a 10 10 90 0 0 10 10 l 20 0 a 10 10 90 0 0 10 -10 l 0 -100 l 5 0 l 0 100 a 15 15 0 0 1 -15 15 l -20 0 a 15 15 0 0 1 -15 -15 l 0 -20"+
     this.model.degreeArc45(5,0,1)+" l -30 -30"+
     this.model.degreeArc45(15,1,1)+" l 0 -100 a 5 5 0 0 0 -5 -5 l -100 0 Z" ).attr({
     fill: "none",
     stroke: "#ffa500",
     strokeWidth: 1
     });*/

}