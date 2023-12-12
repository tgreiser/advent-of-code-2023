export class Day12 {
    lines: string[] = [];
    checksums: number[][] = [];

    constructor(input: string) {
        input.split("\r\n").forEach(line => {
            let parts = line.split(' ');
            this.lines.push(parts[0]);
            this.checksums.push(parts[1].split(',').map(x => parseInt(x)));
        });
        console.log(this.lines);
        console.log(this.checksums);

    }

    isValid(line: string, checksum: number[]): boolean {
        return line.split('.').filter(x => x.length > 0).map(x => x.length).join(',') == checksum.join(',');
    }

    getVariants(iRow: number): string[] {
        let line = this.lines[iRow];
        // find all the ?s
        let variants = [];
        let jokers = line.split('').filter(x => x == '?').length;
        for (let i = 0; i < Math.pow(2, jokers); i++) {
            let variant = line;
            let binary = i.toString(2).padStart(jokers, '0');
            for (let j = 0; j < binary.length; j++) {
                variant = variant.replace('?', binary[j] == '0' ? '.' : '#');
            }
            //console.log(`Variant: ${variant}`);
            if (this.isValid(variant, this.checksums[iRow])) {
                variants.push(variant);
            }
        }
        return variants;
    }

    process(): number {
        let sum = 0;
        for (let iRow = 0; iRow < this.lines.length; iRow++) {
            let amt = this.getVariants(iRow);
            console.log(`Row ${iRow}: ${amt}`);
            sum += amt.length;
        }
        return sum;
    }
}

let input = require('fs').readFileSync(__dirname + '/../__data__/day12.txt', 'utf-8');
let day12 = new Day12(input);
console.log(`Part 1: ${day12.process()}`);