export class Day03Part2 {
    lines: string[];

    constructor(input: string) {
        this.lines = input.split('\n');
    }

    findGears(): number[] {
        let gears: number[] = [];
        for (let iX = 0; iX < this.lines.length; iX++) {
            let stars = this.lines[iX].matchAll(/\*/g);
            for (let star = stars.next(); !star.done; star = stars.next()) {
                if (star.value.index === undefined) {
                    continue;
                }
                let starIndex = star.value.index;
                let gear = this.findAdjacentParts(iX, starIndex);
                if (gear > 1) {
                    gears.push(gear);
                }
            }
        }

        return gears;
    }

    findAdjacentParts(lineIndex: number, columnIndex: number): number {
        let product = 0;
        let adjacentParts: number[] = [];
        // In the 3 surrounding lines are there any parts?
        for (let iX = lineIndex - 1; iX <= lineIndex + 1; iX++) {
            if (iX < 0 || iX >= this.lines.length) {
                continue;
            }
            let matches = this.getNumbersFromLine(iX);
            if (matches.length > 0) {
                // are the beginning and end of the part number within 1 column of the star?
                let line = this.lines[iX];
                for (let match of matches) {
                    if (match['index'] === undefined) {
                        continue;
                    }
                    let numberIndex = match['index'];
                    let numberEndIndex = numberIndex + match[0].length;
                    console.log(`numberIndex: ${numberIndex}, columnIndex: ${columnIndex} - ${match[0]}`);
                    console.log(`${numberEndIndex} >= ${columnIndex - 1} && ${numberIndex} <= ${columnIndex + 1}`);
                    if (numberEndIndex >= columnIndex && numberIndex <= columnIndex + 1) {
                        adjacentParts.push(match[0] as unknown as number)
                        console.log('PUSH IT REAL GOOD');
                    }
                }
                
            }
            if (adjacentParts.length > 2) {
                break;
            }
        }

        if (adjacentParts.length == 2) {
            console.log(`Found adjacent parts ${adjacentParts[0]} and ${adjacentParts[1]}`);
            product = adjacentParts[0] * adjacentParts[1];
        }
    
        return product;
    }

    getNumbersFromLine(lineIndex: number): RegExpMatchArray[] {
        let line = this.lines[lineIndex];
        let iter = line.matchAll(/(\d+)/g);
        let numbers: RegExpMatchArray[] = [];
        let match = iter.next();
        while (!match.done) {
            if (match.value['index'] === undefined) {
                break;
            }
            if (this.isAdjacentToSymbol(match.value[0], lineIndex, match.value['index'])) {
                numbers.push(match.value);
                console.log(`Found adjacent number ${match.value[0]} at ${lineIndex}, ${match.value['index']}`);
            }
            match = iter.next();
        }
        return numbers;
    }

    isAdjacentToSymbol(number: string, lineIndex: number, numberIndex: number): boolean {
        
        let adjacent: string = '';
        if (numberIndex > 0) {
            adjacent += this.lines[lineIndex][numberIndex - 1];
        }
        if ((numberIndex + number.length) < this.lines[lineIndex].length - 1) {
            adjacent += this.lines[lineIndex][numberIndex + number.length];
        }
        if (lineIndex > 0) {
            // include the portion of the line above from lineIndex - 1 to number.length + 1
            adjacent += this.lines[lineIndex - 1].substring(numberIndex - 1, numberIndex + number.length + 1);
        }
        if (lineIndex < this.lines.length - 1) {
            // include the portion of the line below from lineIndex - 1 to number.length + 1
            adjacent += this.lines[lineIndex + 1].substring(numberIndex - 1, numberIndex + number.length + 1);
        }
        //console.log(`isAdjacentToSymbol(${number}, ${lineIndex}, ${numberIndex} => ${adjacent}`);
        return String(adjacent).replace(/[\.\d]/g, '').length > 0;
    }

}

let input = require('fs').readFileSync(__dirname + '/../__data__/day03.txt', 'utf-8');

let parser = new Day03Part2(input);
let gears = parser.findGears();
console.log(gears);
console.log(gears.reduce((a, b) => a + b, 0));