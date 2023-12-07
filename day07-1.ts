export class Hand {
    cards: string = '';
    bid: number = 0;
    // high card, pair, two apir, three of a kind, full hours, four of a kind, five of a kind
    score: number = 0;

    constructor(input: string) {
        this.cards = input.split(' ')[0];
        this.bid = +input.split(' ')[1];
        this.score = this.getScore();
    }

    getScore(): number {
        // for each card, count the number of cards with the same value, then sort by the count descending
        let counts = this.cards.split('').map(x => this.cards.split('').filter(y => y === x).length).sort((a, b) => b - a);

        if (this.isFiveOfAKind()) {
            return 7;
        }
        if (this.isFourOfAKind()) {
            return 6;
        }
        if (this.isFullHouse()) {
            return 5;
        }
        if (this.isThreeOfAKind()) {
            return 4;
        }
        if (this.isTwoPair()) {
            return 3;
        }
        if (this.isPair()) {
            return 2;
        }
        return 1;
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

    isFiveOfAKind(): boolean {
        return this.cards.split('').every(x => x === this.cards[0]);
    }

    isFourOfAKind(): boolean {
        return this.cards.split('').filter(x => x === this.cards[0]).length === 4 ||
            this.cards.split('').filter(x => x === this.cards[1]).length === 4;
    }

    isFullHouse(): boolean {
        let full = true;
        for (let iX = 0; iX < this.cards.length; iX++) {
            let len = this.cards.split('').filter(x => x === this.cards[iX]).length;
            if (len !== 2 && len !== 3) {
                full = false;
                break;
            }
        }
        return full;
    }

    isThreeOfAKind(): boolean {
        for (let iX = 0; iX < this.cards.length; iX++) {
            if (this.cards.split('').filter(x => x === this.cards[iX]).length === 3) {
                return true;
            }
        }
        return false;
    }
    
    isTwoPair(): boolean {
        let pairs = this.cards.split('').filter(x => this.cards.split('').filter(y => y === x).length === 2);
        return pairs.length === 4 && pairs[0] !== pairs[2];
    }

    isPair(): boolean {
        let pairs = this.cards.split('').filter(x => this.cards.split('').filter(y => y === x).length === 2);
        return pairs.length === 2;
    }

}

export class Day07 {
    lines: string[] = [];
    hands: Hand[] = [];

    constructor(input: string) {
        this.lines = input.split('\n');
        for (let iX = 0; iX < this.lines.length; iX++) {
            this.hands.push(new Hand(this.lines[iX]));
        }
    }

    compareHands(hand1: Hand, hand2: Hand): number {
        if (hand1.score > hand2.score) {
            return 1;
        }
        if (hand1.score < hand2.score) {
            return -1;
        }
        if (hand1.score == hand2.score) {
            for (let iX = 0; iX < hand1.cards.length; iX++) {
                if (hand1.scoreCard(hand1.cards[iX]) > hand2.scoreCard(hand2.cards[iX])) {
                    return 1;
                }
                if (hand1.scoreCard(hand1.cards[iX]) < hand2.scoreCard(hand2.cards[iX])) {
                    return -1;
                }
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

    let day07 = new Day07(input);
    console.log(`Part 1: ${day07.process()}`);

    let sample = fs.readFileSync(__dirname + '/../__data__/day07-sample.txt', 'utf-8');
    let day07sample = new Day07(sample);
    console.log(`Part 1 sample: ${day07sample.process()}`);
} // else test
