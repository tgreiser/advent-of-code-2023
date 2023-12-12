class Galaxy {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Day11Part2 {
    lines: string[];
    galaxies: Galaxy[];
    scale: number = 10;

    constructor(input: string, scale: number = 10) {
        this.scale = scale;
        this.lines = this.expandUniverse(input.split("\r\n"));
        //this.display(this.lines);
        this.galaxies = this.getGalaxies();
        console.log(this.galaxies);
        
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
                for (let iTimes = 0; iTimes < this.scale; iTimes++) {
                    expandedLines.push(lines[iRow]);
                }
                console.log(`Expanding row ${iRow}`)
            }
            expandedLines.push(lines[iRow]);
        }
        for (let iCol = lines[0].length - 1; iCol >= 0; iCol--) {
            let col = expandedLines.map(x => x[iCol]).join('');
            if (col.split('').filter(x => x == '#').length == 0) {
                console.log(`Expanding column ${iCol}`)
                for (let iRow = 0; iRow < expandedLines.length; iRow++) {
                    if (typeof expandedLines[iRow][iCol] == undefined) {
                        console.log(`iRow: ${iRow}, iCol: ${iCol} ${expandedLines[iRow]}`)
                    }
                    expandedLines[iRow] = expandedLines[iRow].substring(0, iCol) + expandedLines[iRow][iCol].repeat(this.scale) + expandedLines[iRow].substring(iCol);
                }
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
        let iCount = 0;
        for (let iGalaxy = 0; iGalaxy < this.galaxies.length; iGalaxy++) {
            for (let jGalaxy = iGalaxy + 1; jGalaxy < this.galaxies.length; jGalaxy++) {
                let dist = this.getDistance(this.galaxies[iGalaxy], this.galaxies[jGalaxy]);
                sum += dist;
                console.log(`${iCount++} Distance between ${iGalaxy} and ${jGalaxy} is ${dist} - sum: ${sum}`);
            }
        }

        return sum;
    }
}

let input = require('fs').readFileSync(__dirname + '/../__data__/day11-sample.txt', 'utf-8');
let day11 = new Day11Part2(input, 10);
console.log(`Part 2: ${day11.process()}`);

//day11 = new Day11Part2(input, 100);
//console.log(`Part 2(100): ${day11.process()}`);