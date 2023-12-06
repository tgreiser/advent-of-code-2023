interface myMapRange {
    destination: number,
    source: number,
    range: number
};

interface map {
    name: string,
    ranges: myMapRange[]
};

interface SeedRange {
    id: number,
    
}

export class Day05Part2 {
    seeds: number[] = [];
    maps: map[] = [];

    constructor(input: string) {
        let tmp = input.split("\n\n");
        this.seeds = tmp[0].split(": ")[1].split(" ").map(x => parseInt(x));

        for (let iX = 1; iX < tmp.length; iX++) {
            this.maps[iX-1] = { name: tmp[iX].split(":")[0],
                ranges: []
            }
            tmp[iX].split(':\n')[1].split('\n').forEach(x => {
                //console.log(`x: ${x}`); 
                let numbers = x.split(' ').map(y => parseInt(y) );
                this.maps[iX-1].ranges.push({ destination: numbers[0], source: numbers[1], range: numbers[2] });
            });
        }
        //console.log(this.seeds);
        //console.log(JSON.stringify(this.maps));
    }

    lookupMap(mapName: string, source: number): number {
        // is the source in one of the ranges?
        let map = this.maps.find(x => x.name == mapName);
        if (map) {
            let range = map.ranges.filter(x => { return (source >= x.source) && (source < (x.source + x.range)) })[0];
            //console.log(`source: ${source}, range: ${JSON.stringify(range)} ranges: ${JSON.stringify(map.ranges)}`);
            if (range) {
                return source + (range.destination - range.source);
            }
        }
        // if not return source
        return source;
    }

    lookupSeed(source: number): number {

        for (let iX = 0; iX < this.maps.length; iX++) {
            let map = this.maps[iX];
            source = this.lookupMap(map.name, source);
            //console.log(`map ${map.name} source: ${source}`);
        }
        return source;
    }

    process(): number {
        //console.log(this.lookupMap("seed-to-soil map", 79) + ' should be 81');
        //console.log(this.lookupMap("water-to-light map", 81) + ' should be 74');
        
        let results: number[] = [];
        let lowest = 100000000000;
        for (let iX = 0; iX < this.seeds.length; iX += 2) {
            let start = this.seeds[iX];
            let length = this.seeds[iX+1];

            for (let iY = start; iY < start + length; iY++) {
                let found = this.lookupSeed(iY);
                //results.push(this.lookupSeed(iY));
                //console.log(`seed: ${this.seeds[iX]}, found: ${results[iX]}\n\n`);
                if (found < lowest) {
                    lowest = found;
                }
            }
        }
        console.log(`lowest: ${lowest}`);

        return 0;
    }
}

let input2 = require('fs').readFileSync(__dirname + '/../__data__/day05.txt', 'utf-8');
let day05 = new Day05Part2(input2);
console.log("Day 05, Part 2", day05.process());