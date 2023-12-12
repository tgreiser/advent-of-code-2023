export class Day12Part2 {
    lines: string[] = [];
    checksums: number[][] = [];

    constructor(input: string) {
        input.split("\r\n").forEach(line => {
            let parts = line.split(' ');
            // records are repeated 5 times
            this.lines.push((parts[0]+'?').repeat(5));
            this.checksums.push((parts[1]+',').repeat(5).slice(0, -1)
                .split(',').map(x => parseInt(x)));
        });
        console.log(this.lines);
        console.log(this.checksums);

    }

    isValid(line: string, checksum: number[]): boolean {
        let sums = line.split('.').filter(x => x.length > 0).map(x => x.length);
        if (sums.length != checksum.length) {
            return false;
        }
        for (let iX = 0; iX < sums.length; iX++) {
            if (sums[iX] != checksum[iX]) {
                return false;
            }
        }
        return true;
    }

    getVariants(iRow: number): number {
        let line = this.lines[iRow];
        let found = 0;
        // find all the ?s
        let jokers = line.split('').filter(x => x == '?').length;
        let runTo = Math.pow(2, jokers);
        console.log(`jokers: ${jokers}, runTo: ${runTo}`);
        for (let iX = 0; iX < runTo; iX++) {
            let variant = line;
            let binary = iX.toString(2).padStart(jokers, '0');
            for (let j = 0; j < binary.length; j++) {
                variant = variant.replace('?', binary[j] == '0' ? '.' : '#');
            }
            if (this.isValid(variant, this.checksums[iRow])) {
                found++;
            }
        }
        return found;
    }

    process(): number {
        let sum = 0;
        for (let iRow = 0; iRow < this.lines.length; iRow++) {
            let amt = this.getVariants(iRow);
            console.log(`Row ${iRow}: ${amt}`);
            sum += amt;
        }
        return sum;
    }
}

let input = require('fs').readFileSync(__dirname + '/../__data__/day12-sample.txt', 'utf-8');
let day12 = new Day12Part2(input);
console.log(`Part 1: ${day12.process()}`);