export class Day03 {
    lines: string[];

    constructor(input: string) {
        this.lines = input.split('\n');
    }

    getPartNumbers(): number[] {
        let partNumbers: number[] = [];
        for (let iX = 0; iX < this.lines.length; iX++) {
            let numbers = this.getNumbersFromLine(iX);
            for (let iY = 0; iY < numbers.length; iY++) {
                if (numbers[iY] > 0) {
                    partNumbers.push(numbers[iY]);
                }
            }
        }
        return partNumbers;
    }

    getNumbersFromLine(lineIndex: number): number[] {
        let line = this.lines[lineIndex];
        let iter = line.matchAll(/(\d+)/g);
        let numbers: number[] = [];
        let match = iter.next();
        while (!match.done) {
            if (match.value['index'] === undefined) {
                break;
            }
            if (this.isAdjacentToSymbol(match.value[0], lineIndex, match.value['index'])) {
                numbers.push(parseInt(match.value[0]));
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
        console.log(`isAdjacentToSymbol(${number}, ${lineIndex}, ${numberIndex} => ${adjacent}`);
        return String(adjacent).replace(/[\.\d]/g, '').length > 0;
    }

}

let input = require('fs').readFileSync(__dirname + '/../__data__/day03.txt', 'utf-8');

let day03 = new Day03(input);
console.log(day03.getPartNumbers());
console.log(day03.getPartNumbers().reduce((a, b) => a + b, 0));