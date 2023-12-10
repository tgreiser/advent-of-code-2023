interface Point {
    x: number,
    y: number,
    animal: number
};

export class Day10 {
    lines: string[] = [];
    loop: Point[] = [];

    constructor(input: string) {
        this.lines = input.split('\n');

    }

    getPoint(p : Point): string {
        if (p.y < 0 || p.y >= this.lines.length) {
            return '.';
        }
        if (p.x < 0 || p.x >= this.lines[p.y].length) {
            return '.';
        }
        return this.lines[p.y].charAt(p.x);
    }

    inLoop(p: Point): boolean {
        return this.loop.filter(x => x.x == p.x && x.y == p.y).length > 0;
    }

    getFirstPoint(current: Point): Point {
        // search 4 adjacent points for a pipe pointing to the current point
        
        let below = this.getBelowPoint(current);
        if (below !== null) {
            return below;
        }
        let left = this.getLeftPoint(current);
        if (left !== null) {
            return left;
        }
        let right = this.getRightPoint(current);
        if (right !== null) {
            return right;
        }
        let above = this.getAbovePoint(current);
        if (above !== null) {
            return above;
        }
        console.log('no match');
        return this.loop[0];
    }

    getAbovePoint(current: Point): Point | null {
        let above = this.getPoint({x: current.x, y: current.y - 1, animal: 0});
        if (['|', 'F', '7'].includes(above) && !this.inLoop({x: current.x, y: current.y - 1, animal: -1})) {
            return {x: current.x, y: current.y - 1, animal: -1};
        }
        return null;
    }

    getBelowPoint(current: Point): Point | null {
        let below = this.getPoint({x: current.x, y: current.y + 1, animal: 0});
        if (['|', 'J', 'L'].includes(below) && !this.inLoop({x: current.x, y: current.y + 1, animal: -1})) {
            return {x: current.x, y: current.y + 1, animal: -1};
        }
        return null;
    }

    getLeftPoint(current: Point): Point | null {
        let left = this.getPoint({x: current.x - 1, y: current.y, animal: 0});
        console.log(`getLeftPoint ${left} ${current.x - 1}x${current.y} ${JSON.stringify(current)}`);
        if (['-', 'F', 'L'].includes(left) && !this.inLoop({x: current.x - 1, y: current.y, animal: -1})) {
            return {x: current.x - 1, y: current.y, animal: -1};
        }
        return null;
    }

    getRightPoint(current: Point): Point | null {
        let right = this.getPoint({x: current.x + 1, y: current.y, animal: 0});
        if (['-', 'J', '7'].includes(right) && !this.inLoop({x: current.x + 1, y: current.y, animal: -1})) {
            return {x: current.x + 1, y: current.y, animal: -1};
        }
        return null;
    }


    getNextPoint(current: Point): Point {
        let ch = this.getPoint(current);
        console.log(`${ch} ${current.x}x${current.y}`)
        if (ch == '|') {
            let above = this.getAbovePoint(current);
            if (above !== null) {
                return above;
            }
            let below = this.getBelowPoint(current);
            if (below !== null) {
                return below;
            }
        }
        if (ch == '-') {
            let left = this.getLeftPoint(current);
            if (left !== null) {
                return left;
            }
            let right = this.getRightPoint(current);
            if (right !== null) {
                return right;
            }
        }
        if (ch == 'F') {
            let above = this.getBelowPoint(current);
            if (above !== null) {
                return above;
            }
            let right = this.getRightPoint(current);
            if (right !== null) {
                return right;
            }
        }
        if (ch == 'J') {
            let below = this.getAbovePoint(current);
            if (below !== null) {
                return below;
            }
            let right = this.getLeftPoint(current);
            if (right !== null) {
                return right;
            }
        }
        if (ch == 'L') {
            let below = this.getAbovePoint(current);
            if (below !== null) {
                return below;
            }
            let left = this.getRightPoint(current);
            if (left !== null) {
                return left;
            }
        }
        if (ch == '7') {
            let above = this.getBelowPoint(current);
            if (above !== null) {
                return above;
            }
            let left = this.getLeftPoint(current);
            if (left !== null) {
                return left;
            }
        }
        console.log('no match');
        return this.loop[0];
    }

    process(): number {
        let width = input.indexOf('\n');
        let height = this.lines.length;
        let start: Point = {x: 0, y: 0, animal: 0};
        for (let iRow = 0; iRow < height; iRow++) {
            let search = this.lines[iRow].indexOf('S');
            if (search > -1) {
                start.x = search;
                start.y = iRow;
            }
        }
        console.log(`${width}x${height} - ${JSON.stringify(start)}`);
        // search adjacent points for a pipe pointing to the current point
        this.loop.push(start);
        let current = start;
        let next: Point = this.getFirstPoint(current);
        while (next !== null) {
            //console.log(JSON.stringify(next));
            if (next.x == start.x && next.y == start.y) {
                console.log('break');
                break;
            }
            
            this.loop.push(next);
            current = next;
            next = this.getNextPoint(current);

        }
        console.log(JSON.stringify(this.loop));
        return this.loop.length / 2;
    }
}

let input = require('fs').readFileSync(__dirname + '/../__data__/day10.txt', 'utf-8');
let day10 = new Day10(input);
console.log(`Part 1: ${day10.process()}`);