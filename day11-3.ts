class Galaxy {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Day11 {
    lines: string[];
    galaxies: Galaxy[];
    scale: number = 10;
    xExpansions: number[] = [];
    yExpansions: number[] = [];

    constructor(input: string) {
        this.lines = input.split("\r\n");
        this.getExpansions(this.lines);

        this.display(this.lines);
        this.galaxies = this.getGalaxies();
        console.log(this.galaxies);
    }

    getGalaxies(): Galaxy[] {
        let galaxies = [];
        for (let iRow = 0; iRow < this.lines.length; iRow++) {
            for (let iCol = 0; iCol < this.lines[iRow].length; iCol++) {
                if (this.lines[iRow][iCol] == '#') {
                    galaxies.push(new Galaxy(iCol, iRow));
                }
            }
        }
        return galaxies;
    }

    getExpansions(lines: string[]) {
        for (let iRow = 0; iRow < lines.length; iRow++) {
            if (lines[iRow].split('').filter(x => x == '#').length == 0) {
                console.log(`Expanding row ${iRow}`)
                this.yExpansions.push(iRow);
            }
        }
        for (let iCol = lines[0].length - 1; iCol >= 0; iCol--) {
            let col = lines.map(x => x[iCol]).join('');
            if (col.split('').filter(x => x == '#').length == 0) {
                console.log(`Expanding column ${iCol}`)
                this.xExpansions.push(iCol);
            }
        }
    }

    display(lines: string[]) {
        console.log(lines.join('\n'));
    }
    
    // Distance using only horizontal and vertical moves
    getDistance(galaxy1: Galaxy, galaxy2: Galaxy): number {
        // count xExpansions between galaxy1.x and galaxy2.x
        let xExpansions = this.xExpansions.filter(x => (x > galaxy1.x && x < galaxy2.x) || (x > galaxy2.x && x < galaxy1.x)).length * (this.scale - 1);
        let yExpansions = this.yExpansions.filter(y => (y > galaxy1.y && y < galaxy2.y) || (y > galaxy2.y && y < galaxy1.y)).length * (this.scale - 1);
        console.log(`xExpansions: ${xExpansions}, yExpansions: ${yExpansions}`);
        // count yExpansions between galaxy1.y and galaxy2.y

        return Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y) + xExpansions + yExpansions;
    }

    process(scale: number = 10): number {
        this.scale = scale;
        let sum = 0;
        // distance of all galaxies to each other
        for (let iGalaxy = 0; iGalaxy < this.galaxies.length; iGalaxy++) {
            for (let jGalaxy = iGalaxy + 1; jGalaxy < this.galaxies.length; jGalaxy++) {
                let dist = this.getDistance(this.galaxies[iGalaxy], this.galaxies[jGalaxy]);
                sum += dist;
                console.log(`Distance between ${iGalaxy} and ${jGalaxy}: ${dist} sum: ${sum}`);
            }
        }

        //console.log(this.getDistance(this.galaxies[0], this.galaxies[2]));
        //console.log(this.getDistance(this.galaxies[0], this.galaxies[3]));
        /*
        console.log(this.getDistance(this.galaxies[2], this.galaxies[5]));
        console.log(this.getDistance(this.galaxies[7], this.galaxies[8]));
*/
        return sum;
    }
}

let input = require('fs').readFileSync(__dirname + '/../__data__/day11.txt', 'utf-8');
let day11 = new Day11(input);
console.log(`Part 1: ${day11.process(1000000)}`);