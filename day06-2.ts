interface Race {
    duration: number,
    recordDistance: number,
}

export class Day06Part2 {
    lines: string[];
    races: Race[] = [];

    constructor(input: string) {
        this.lines = input.split("\n");
        this.races.push({duration: +this.lines[0].split(/:\s+/)[1].replace(/ /g, ''),
            recordDistance: +this.lines[1].split(/:\s+/)[1].replace(/ /g, '')
        });

        console.log(this.races);
    }
    
    countWaysToWin(raceIndex: number): number {
        let race = this.races[raceIndex];
        let ways = 0;
        console.log(`countWaysToWin ${raceIndex}`);
        for (let holdMs = 0; holdMs <= race.duration; holdMs++) {
            // boat accelerates 1 millimeter per millisecond
            // hold 2 ms, accelerate 2 mm/ms - 5 duration
            let distance = (race.duration - holdMs) * holdMs;
            //console.log(`holdMs: ${holdMs}, distance: ${distance} good way? ${distance > race.recordDistance}`);
            if (distance > race.recordDistance) {
                ways++;
            }
        }

        return ways;
    }

    process(): number {
        let productOfWays = 1;
        let raceWays: number[] = [];
        for (let iX = 0; iX < this.races.length; iX++) {
            raceWays[iX] = this.countWaysToWin(iX);
            productOfWays *= raceWays[iX];
        }

        return productOfWays;
    }
}

let input = require('fs').readFileSync(__dirname + '/../__data__/day06.txt', 'utf-8');
let day06 = new Day06Part2(input);
console.log(day06.process());
