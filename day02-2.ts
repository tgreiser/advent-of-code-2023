interface turn {
    red: number,
    blue: number,
    green: number
};

export class GlassBeadGame {
    private redBeads: number = 0;
    private blueBeads: number = 0;
    private greenBeads: number = 0;

    constructor(turn: turn) {
        this.redBeads = turn.red;
        this.blueBeads = turn.blue;
        this.greenBeads = turn.green;
    }

    public parseGames(games: string): Array<Array<turn>> {
        return games.split('\n').map(game => this.parseGame(game));
    }

    public parseGame(game: string): Array<turn> {
        let turns = new Array<turn>();
        let rounds = game.split(':')[1].split(';');
        for (let iX = 0; iX < rounds.length; iX++) {
            let turn = this.parseTurn(rounds[iX]);
            turns.push(turn);
        }
        return turns;
    }

    // 3 blue, 4 red
    public parseTurn(turn: string): turn {
        let result = {red: 0, blue: 0, green: 0};
        let beads = turn.split(',');
        for (let iX = 0; iX < beads.length; iX++) {
            let bead = beads[iX].trim();
            let color = bead.split(' ')[1];
            let amount = bead.split(' ')[0];
            if (color === 'red') {
                result.red = parseInt(amount);
            } else if (color === 'blue') {
                result.blue = parseInt(amount);
            } else if (color === 'green') {
                result.green = parseInt(amount);
            }
        }
        return result;
    }

    public getMinimumBeads(round: Array<turn>): turn {
        let result = {red: 0, blue: 0, green: 0};
        for (let i = 0; i < round.length; i++) {
            if (round[i].red > result.red) {
                result.red = round[i].red;
            }
            if (round[i].blue > result.blue) {
                result.blue = round[i].blue;
            }
            if (round[i].green > result.green) {
                result.green = round[i].green;
            }
        }
        return result;
    }

    public getMinimumBeadPower(round: Array<turn>): number {
        let min = this.getMinimumBeads(round);
        return min.red * min.blue * min.green;
    }

    public getMinimumBeadPowerSum(games: Array<Array<turn>>): number {
        return games.map(game => this.getMinimumBeadPower(game)).reduce((a, b) => a + b, 0);
    }

    public isPossible(round: Array<turn>): boolean {
        let beads = this.getMinimumBeads(round);
        return beads.red <= this.redBeads && beads.blue <= this.blueBeads && beads.green <= this.greenBeads;
    }

    public getPossibleGames(games: Array<Array<turn>>): Array<number> {
        let result = new Array<number>();
        for (let iX = 0; iX < games.length; iX++) {
            if (this.isPossible(games[iX])) {
                result.push(iX + 1); // 1-based
            }
        }
        return result;
    }

    public getPossibleGamesSum(games: Array<Array<turn>>): number {
        return this.getPossibleGames(games).reduce((a, b) => a + b, 0);
    }
}

let game = new GlassBeadGame({ red: 12, green: 13, blue: 14 });
let input = game.parseGames(require('fs').readFileSync(__dirname + '/../__data__/day02.txt', 'utf-8'));

console.log(game.getMinimumBeadPowerSum(input));