export class Handle45DegreeTurns{

    //45 degree offset for circle of radius 1
    degreeOffset45OnCircle = Math.sqrt(2)/2;
    degreeOffset45OnCircleLeftOver = 1 - Math.sqrt(2)/2;

    degreeArc45(radius:any, sweepFlag?:any, reverse?:any){
        sweepFlag = sweepFlag || 0;
        var y = this.degreeOffset45OnCircle * radius;
        var x = this.degreeOffset45OnCircleLeftOver * radius;
        if(reverse){
            y = -y;
            x = -x;
        }
        return 'a '+radius+' '+radius+' 0 0 '+sweepFlag+' '+x+' '+y;
    }

}