export class Day04 {
    lines: string[];

    constructor(input: string) {
        this.lines = input.split('\n');
    }

    getWinners(lineIndex: number): number[] {
        let matches: number[] = [];
        let winners: number[] = [];

        let parts = this.lines[lineIndex].split(' | ');
        winners = parts[0].split(': ')[1].trim().split(/\s+/).map((x) => parseInt(x));
        console.log(lineIndex);
        console.log(winners);
        matches = parts[1].split(/\s+/).map((x) => parseInt(x)).filter((x) => winners.includes(x));
        console.log(matches);

        return matches;
    }

    getScore(lineIndex: number): number {
        let matches = this.getWinners(lineIndex);
        console.log(matches);
        if (matches.length === 0) {
            return 0;
        }
        return Math.pow(2, matches.length - 1);
    }

    getTotalScore(): number {
        let total = 0;
        for (let iX = 0; iX < this.lines.length; iX++) {
            let score = this.getScore(iX);
            console.log(score);
            total += score;
        }
        return total;
    }
}

let input = require('fs').readFileSync(__dirname + '/../__data__/day04.txt', 'utf-8');

let day04 = new Day04(input);

console.log(day04.getTotalScore());