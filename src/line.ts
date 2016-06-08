import {Handle45DegreeTurns} from "./handle45DegreeTurns";


export class Line{


    model = new Handle45DegreeTurns();
    public path:string = '';
    private scale:number = 10;
    private currentDirection:string = 'east';

    constructor(public start: number[] = [0,0],
                public route: any[],
                public startDirection: string = 'east'
                ){};

    /*this.s.path("M "+this.start[0]+" "+this.start[1]+" l 100 0 a 10 10 90 0 1 10 10 l 0 100 "+this.model.degreeArc45(10)+" l 30 30 "+
    this.model.degreeArc45(10,1)+" l 0 20 a 10 10 90 0 0 10 10 l 20 0 a 10 10 90 0 0 10 -10 l 0 -100 l 5 0 l 0 100 a 15 15 0 0 1 -15 15 l -20 0 a 15 15 0 0 1 -15 -15 l 0 -20"+
    this.model.degreeArc45(5,0,1)+" l -30 -30"+
    this.model.degreeArc45(15,1,1)+" l 0 -100 a 5 5 0 0 0 -5 -5 l -100 0 Z" ).attr({
    fill: "none",
    stroke: "#ffa500",
    strokeWidth: 1
    });*/

    /**
     * Provide path string to turn right
     */
    rightTurn(){
        return 'a 10 10 0 0 1 10 10';
    }

    updateRoute(route: any[]){
        this.currentDirection = 'east';
        this.route = route;
    }

    /**
     * Close off the tube if applicable
     */
    close(){
        if(this.currentDirection === 'east'){
            this.currentDirection = 'west';
            return 'l 0 5';
        }else if(this.currentDirection === 'south'){
            this.currentDirection = 'north';
            return 'l -5 0';
        }else if(this.currentDirection === 'north'){
            this.currentDirection = 'south';
            return 'l 5 0';
        }else{
            this.currentDirection = 'east';
            return 'l 0 -5';
        }
    }

    /**
     * Handle a right turn.
     * @returns {string}
     */
    turnRight(){
        if(this.currentDirection === 'east'){
            this.currentDirection = 'south';
            return 'a 10 10 0 0 1 10 10';
        }else if(this.currentDirection === 'south'){
            this.currentDirection = 'west';
            return 'a 10 10 0 0 1 -10 10';
        }else if(this.currentDirection === 'north'){
            this.currentDirection = 'east';
            return 'a 10 10 0 0 1 10 -10';
        }else if(this.currentDirection === 'west'){
            this.currentDirection = 'north';
            return 'a 10 10 0 0 1 -10 -10';
        }
    }

    /**
     * Handle a left turn.
     * @returns {string}
     */
    turnLeft(){
        if(this.currentDirection === 'east'){
            this.currentDirection = 'north';
            return 'a 5 5 0 0 0 5 -5';
        }else if(this.currentDirection === 'north'){
            this.currentDirection = 'west';
            return 'a 5 5 0 0 0 -5 -5';
        }else if(this.currentDirection === 'west'){
            this.currentDirection = 'south';
            return 'a 5 5 0 0 0 -5 5';
        }else if(this.currentDirection === 'south') {
            this.currentDirection = 'east';
            return 'a 5 5 0 0 0 5 5';
        }
    }

    /**
     * Handle a left turn.
     * @returns {string}
     */
    goForward(forwardAmount:number){
        if(this.currentDirection === 'east'){
            return 'l '+forwardAmount * this.scale+' 0';
        }else if(this.currentDirection === 'north'){
            return 'l 0 -'+forwardAmount * this.scale;
        }else if(this.currentDirection === 'south'){
            return 'l 0 '+forwardAmount * this.scale;
        }else if (this.currentDirection === 'west'){
            return 'l -'+forwardAmount * this.scale+' 0';
        }
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
            }
        }

        return instructions.join(' ');

    }

    getPath(){
        this.path = "M "+this.start[0]+" "+this.start[1]+" "+this.processRoute()+" Z";
        return this.path;
    }

}