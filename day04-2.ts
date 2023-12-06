interface ICard {
    cardNumber: number;
    copies: number;
}

export class Day04Part2 {
    lines: string[];

    constructor(input: string) {
        this.lines = input.split('\n');
    }

    getWinners(lineIndex: number): number[] {
        let matches: number[] = [];
        let winners: number[] = [];

        let parts = this.lines[lineIndex].split(' | ');
        winners = parts[0].split(': ')[1].trim().split(/\s+/).map((x) => parseInt(x));
        matches = parts[1].split(/\s+/).map((x) => parseInt(x)).filter((x) => winners.includes(x));
        console.log(`${lineIndex} ${matches}`);

        return matches;
    }

    getScratchcards(lineIndex: number): number[] {
        let matches = this.getWinners(lineIndex);
        if (matches.length === 0) {
            return [];
        }
        let cardNumber = lineIndex + 2;
        // return matches.length cards starting with cardNumber + 1
        matches = matches.map((x) => cardNumber++);
        return matches;
    }

    getTotalScratchcards(): number {
        let total = 0;
        let allCards: ICard[] = [];
        for (let iX = 0; iX < this.lines.length; iX++) {
            allCards[iX] = { cardNumber: iX + 1, copies: 1 };
        }

        console.log(allCards);

        for (let iX = 0; iX < allCards.length - 1; iX++) {
            console.log(iX);
            let cardNumber = iX + 1;
            let copies = this.getScratchcards(iX)
            
            if (copies.length > 0) {
                let multiplier = allCards[iX].copies;
                console.log(`Copies from ${cardNumber} are ${copies} and multiplier is ${multiplier}`);
                

                for (let iY = 0; iY < copies.length; iY++) {
                    let cardIndex = copies[iY] - 1;
                    if (cardIndex in allCards) {
                        allCards[cardIndex].copies += multiplier;
                    } else {
                        allCards[cardIndex] = { cardNumber: cardIndex + 1, copies: multiplier };
                    }
                }
                console.log(allCards);
            }
        }
        return allCards.reduce((acc, x) => acc + x.copies, 0);
    }
}

let input = require('fs').readFileSync(__dirname + '/../__data__/day04.txt', 'utf-8')

let day04 = new Day04Part2(input);

console.log(day04.getTotalScratchcards());