export class CalibrationParser {
    lines: string[];

    constructor(input: string) {
        this.lines = input.split("\n");
    }

    getCalibrationValue(lineNumber: number): number {
        let c1 : string = "",
            c2 : string = "";
        for (let iX = 0; iX < this.lines[lineNumber].length; iX++) {
            let tmp = this.extractValue(lineNumber, iX).toString();
            if (tmp != "-1") {
                c1 = tmp;
                break;
            }
        }
        for (let iX = this.lines[lineNumber].length - 1; iX >= 0; iX--) {
            let tmp = this.extractValue(lineNumber, iX).toString();
            if (tmp != "-1") {
                c2 = tmp;
                break;
            }
        }
        return Number(c1) * 10 + Number(c2);
    }

    extractValue(lineNumber: number, index : number): number {
        let value = Number(this.lines[lineNumber][index]);
        if (isNaN(value) == false) {
            return value;
        }
        const alts = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        for (let iX = 0; iX < alts.length; iX++) {
            if (this.lines[lineNumber].slice(index, index + alts[iX].length) == alts[iX]) {
                return iX + 1; // array index is 0-based but similar to alt value
            }
        }
        
        return -1;
    }

    getSumOfCalibrationValues(): number {
        let sum: number = 0;
        for (let iX = 0; iX < this.lines.length; iX++) {
            sum += this.getCalibrationValue(iX);
        }
        return sum;
    }
}

/**
 * Use two processes to get the first and last number in the line, similar to CalibrationParser above.
 */
export class AsyncCalibrationParser {
    lines: string[];

    constructor(input: string) {
        this.lines = input.split("\n");
    }

    extractValue(lineNumber: number, index : number): number {
        let value = Number(this.lines[lineNumber][index]);
        if (isNaN(value) == false) {
            return value;
        }
        const alts = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        for (let iX = 0; iX < alts.length; iX++) {
            if (this.lines[lineNumber].slice(index, index + alts[iX].length) == alts[iX]) {
                return iX + 1; // array index is 0-based but similar to alt value
            }
        }
        
        return -1;
    }

    async getCalibrationValue(lineNumber: number): Promise<number> {
        const promise1 = this.getFirstNumber(lineNumber);
        const promise2 = this.getLastNumber(lineNumber);
        const [c1, c2] = await Promise.all([promise1, promise2]);
        return c1 * 10 + c2;
    }

    async getFirstNumber(lineNumber: number): Promise<number> {
        return new Promise<number>((resolve) => {
            for (let iX = 0; iX < this.lines[lineNumber].length; iX++) {
                let tmp = this.extractValue(lineNumber, iX).toString();
                if (tmp != "-1") {
                    resolve(Number(tmp));
                    break;
                }
            }
            resolve(-1);
        });
    }

    async getLastNumber(lineNumber: number): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            for (let iX = this.lines[lineNumber].length - 1; iX >= 0; iX--) {
                let tmp = this.extractValue(lineNumber, iX).toString();
                if (tmp != "-1") {
                    resolve(Number(tmp));
                    break;
                }
            }
            resolve(-1);
        });
    }

    async getSumOfCalibrationValues(): Promise<number> {
        const promises = [];
    
        for (let iX = 0; iX < this.lines.length; iX++) {
            promises.push(this.getCalibrationValue(iX));
        }
    
        const results = await Promise.all(promises);
        return results.reduce((acc, val) => acc + val, 0);
    }

}


export class ReplacementCalibrationParser {
    lines: string[];

    constructor(input: string) {
        this.lines = input.split("\n");
    }

    getSumOfCalibrationValues(): number {
        return this.lines.map((str, iX) => {
            const numbers = str
                .replace(/one/gi, 'o1one')
                .replace(/two/gi, 't2two')
                .replace(/three/gi, 't3three')
                .replace(/four/gi, 'f4four')
                .replace(/five/gi, 'f5five')
                .replace(/six/gi, 's6six')
                .replace(/seven/gi, 's7seven')
                .replace(/eight/gi, 'e8eight')
                .replace(/nine/gi, 'n9nine');
            const firstNum = numbers.split('').find(num => num.match(/\d/)) || '0';
            const lastNum = numbers.split('').reverse().find(num => num.match(/\d/));
            return firstNum + lastNum;
        })
        .map(Number)
        .reduce((a, b) => a + b);
    }
}

// read from __data__/day01.txt
let input = require('fs').readFileSync(__dirname + '/../__data__/day01.txt', 'utf-8');

let p = new CalibrationParser(input);
console.log(p.getSumOfCalibrationValues());