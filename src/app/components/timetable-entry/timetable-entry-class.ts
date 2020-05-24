export class Entry {
    startHour;
    endHour;
    constructor(public name: string, public start: string, public end: string, public icon: string) {
        const splittedStart = this.start.split(':');
        this.startHour = (splittedStart[0] as unknown);
        const splittedEnd = this.end.split(':');
        this.endHour = (splittedEnd[0] as unknown);
     }

    public getHours() {
        const difference =  (this.endHour as number) - (this.startHour as number);
        return difference;
    }

    public getNegativeHours() {
        const difference =  Math.abs((this.startHour as number) - (this.endHour as number) - 24);
        return difference;
    }
}
