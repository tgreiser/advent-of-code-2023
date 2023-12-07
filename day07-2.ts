export class HandPart2 {
    cards: string = '';
    bid: number = 0;
    // high card, pair, two apir, three of a kind, full hours, four of a kind, five of a kind
    score: number = 0;

    constructor(input: string) {
        this.cards = input.split(' ')[0];
        this.bid = +input.split(' ')[1];
        this.score = this.getScore();
    }

    cardScore(): string {
        return this.cards            
            .replace(/A/g, 'E')
            .replace(/T/g, 'A')
            .replace(/J/g, '1')
            .replace(/Q/g, 'C')
            .replace(/K/g, 'D')
            ;
    }

    getScore(): number {

        let score = 0;
        let cards = this.cards;
        let counts: number[] = [];
        
        let jokers = cards.split('').filter(x => x === 'J').length;
        cards = cards.replace(/J/g, '');
        let remaining = cards.length;

        while (remaining > 0) {
            counts.push( cards.split('').filter(x => x === cards[0]).length );
            cards = cards.replace(new RegExp(cards[0], 'g'), '');
            remaining -= counts[counts.length - 1];
        }
        counts = counts.sort((a, b) => b - a);
        counts[0] += jokers;

        if (this.cards == "799AJ") {
            console.log(`Score: ${score} -- ${counts} - ${this.cards}`);
        }

        if ((counts.length === 1 && counts[0] === 5) || this.cards === 'JJJJJ') {
            score = 7; // five of a kind
        } else if (counts.length === 2 && counts[0] === 4) {
            score = 6; // four of a kind
        } else if (counts.length === 2 && counts[0] === 3) {
            score = 5; // full house
        } else if (counts.length === 3 && counts[0] === 3) {
            score = 4; // three of a kind
        } else if (counts.length === 3 && counts[0] === 2) {
            score = 3; // two pair
        } else if (counts.length === 4 && counts[0] === 2) {
            score = 2; // pair
        } else {
            score = 1;
        }
        return score;
    }

    // 2 3 4 5 6 7 8 9 10 J Q K A
    scoreCard(card: string): number {
        switch (card) {
            case 'A': return 14;
            case 'K': return 13;
            case 'Q': return 12;
            case 'J': return 11;
            case 'T': return 10;
            default: return +card;
        }
    }

}

export class Day07Part2 {
    lines: string[] = [];
    hands: HandPart2[] = [];

    constructor(input: string) {
        this.lines = input.split('\n');
        for (let iX = 0; iX < this.lines.length; iX++) {
            this.hands.push(new HandPart2(this.lines[iX]));
        }
    }

    compareHands(hand1: HandPart2, hand2: HandPart2): number {
        if (hand1.score > hand2.score) {
            return 1;
        }
        if (hand1.score < hand2.score) {
            return -1;
        }
        if (hand1.score == hand2.score) {
            
            let card1 = hand1.cardScore();
            let card2 = hand2.cardScore();
            console.log(`Same score: ${hand1.cards} > ${hand2.cards} -- ${card1} > ${card2} ${card1 > card2}`);
            if (card1 > card2) {
                return 1;
            }
            if (card1 < card2) {
                return -1;
            }
        }
        return 0;
    }

    process(): number {
        this.hands = this.hands.sort(this.compareHands);
        console.log(JSON.stringify(this.hands));
        console.log(`Processed ${this.hands.length} hands`)
        let product = 0;
        // multiply the bid with the rank (iX+1)
        for (let iX = 0; iX < this.hands.length; iX++) {
            product += this.hands[iX].bid * (iX + 1);
        }
        return product;
    }
}

let fs = require('fs');
if (fs.existsSync(__dirname + '/../__data__/day07.txt')) {
    let input = fs.readFileSync(__dirname + '/../__data__/day07.txt', 'utf-8');

    let day07 = new Day07Part2(input);
    console.log(`Part 1: ${day07.process()}`);

    let sample = fs.readFileSync(__dirname + '/../__data__/day07-sample.txt', 'utf-8');
    let day07sample = new Day07Part2(sample);
    console.log(`Part 1 sample: ${day07sample.process()}`);
} // else test
