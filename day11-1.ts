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

    constructor(input: string) {
        this.lines = this.expandUniverse(input.split("\n"));
        this.display(this.lines);
        this.galaxies = this.getGalaxies();
        console.log(this.galaxies);
        console.log(this.getDistance(this.galaxies[0], this.galaxies[6]));
        console.log(this.getDistance(this.galaxies[2], this.galaxies[5]));
        console.log(this.getDistance(this.galaxies[7], this.galaxies[8]));
    }

    getDistance(galaxy1: Galaxy, galaxy2: Galaxy): number {
        // Distance using only horizontal and vertical moves
        return Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
    }

    getGalaxies(): Galaxy[] {
        let galaxies = [];
        for (let iRow = 0; iRow < this.lines.length; iRow++) {
            for (let iCol = 0; iCol < this.lines[iRow].length; iCol++) {
                if (this.lines[iRow][iCol] == '#') {
                    galaxies.push(new Galaxy(iRow, iCol));
                }
            }
        }
        return galaxies;
    }

    expandUniverse(lines: string[]): string[] {
        let expandedLines = [];
        for (let iRow = 0; iRow < lines.length; iRow++) {
            if (lines[iRow].split('').filter(x => x == '#').length == 0) {
                //console.log(`Expanding row ${iRow}`)
                expandedLines.push(lines[iRow]);
            }
            expandedLines.push(lines[iRow]);
        }
        for (let iCol = 0; iCol < lines[0].length; iCol++) {
            let col = expandedLines.map(x => x[iCol]).join('');
            if (col.split('').filter(x => x == '#').length == 0) {
                //console.log(`Expanding column ${iCol}`)
                for (let iRow = 0; iRow < expandedLines.length; iRow++) {
                    expandedLines[iRow] = expandedLines[iRow].substring(0, iCol + 1) + expandedLines[iRow].substring(iCol);
                }
                iCol++;
            }  
        }
        return expandedLines;
    }

    display(lines: string[]) {
        console.log(lines.join('\n'));
    }

    process(): number {
        let sum = 0;
        // distance of all galaxies to each other
        for (let iGalaxy = 0; iGalaxy < this.galaxies.length; iGalaxy++) {
            for (let jGalaxy = iGalaxy + 1; jGalaxy < this.galaxies.length; jGalaxy++) {
                let dist = this.getDistance(this.galaxies[iGalaxy], this.galaxies[jGalaxy]);
                sum += dist;
                console.log(`Distance between ${iGalaxy} and ${jGalaxy}: ${dist} sum: ${sum}`);
            }
        }

        return sum;
    }
}

let input = require('fs').readFileSync(__dirname + '/../__data__/day11-sample.txt', 'utf-8');
let day11 = new Day11(input);
console.log(`Part 1: ${day11.process()}`);