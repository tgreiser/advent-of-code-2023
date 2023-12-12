interface Point {
    x: number,
    y: number,
    animal: number
};

interface DebugPoint {
    x: number,
    y: number,
    animal: number,
    debug: string
}

export class Day10Part2 {
    lines: string[] = [];
    loop: Point[] = [];
    width: number = 0;
    height: number = 0;

    constructor(input: string) {
        this.lines = input.split('\n');
        this.width = input.indexOf('\n');
        this.height = this.lines.length;
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

    getAbove(current: Point): Point {
        return {x: current.x, y: current.y - 1, animal: 0};
    }
    getAbovePoint(current: Point): Point | null {
        let above = this.getAbove(current);
        if (['|', 'F', '7'].includes(this.getPoint(above)) && !this.inLoop(above)) {
            return above;
        }
        return null;
    }

    getBelow(current: Point): Point {
        return {x: current.x, y: current.y + 1, animal: 0};
    }
    getBelowPoint(current: Point): Point | null {
        let below = this.getBelow(current);
        if (['|', 'J', 'L'].includes(this.getPoint(below)) && !this.inLoop(below)) {
            return below;
        }
        return null;
    }

    getLeft(current: Point): Point {
        return {x: current.x - 1, y: current.y, animal: 0};
    }
    getLeftPoint(current: Point): Point | null {
        let left = this.getLeft(current);
        if (['-', 'F', 'L'].includes(this.getPoint(left)) && !this.inLoop(left)) {
            return left;
        }
        return null;
    }

    getRight(current: Point): Point {
        return {x: current.x + 1, y: current.y, animal: 0};
    }
    getRightPoint(current: Point): Point | null {
        let right = this.getRight(current)
        if (['-', 'J', '7'].includes(this.getPoint(right)) && !this.inLoop(right)) {
            return right;
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

    rayCast(p: Point): number {
        let intersections = 0;
        let x = p.x;
        let y = p.y;
        for (let iK = 0; iK < this.loop.length - 1; iK++) {
            let x1 = this.loop[iK].x;
            let y1 = this.loop[iK].y;
            let x2 = this.loop[iK + 1].x;
            let y2 = this.loop[iK + 1].y;
            if (y1 == 0 && y2 == 0) {
                let isOnSideX = x >= Math.min(x1, x2) && x <= Math.max(x1, x2);
            }
            let isOnSide = y == y1 && y == y2;

            if (!isOnSide && (y1 > y) != (y2 > y) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) {
                if (x == 0 && y == 0) {
                    let ok = false;
                }
                intersections++;
            }
        }

        return intersections;
    }

    // How many points are completely enclosed by the loop?
    enclosedPoints(): DebugPoint[] {
        let result: DebugPoint[] = [];
        for (let iRow = 0; iRow < this.lines.length; iRow++) {
            for (let iCol = 0; iCol < this.lines[iRow].length; iCol++) {
                let pt = {x: iCol, y: iRow, animal: 0, debug: '' };
                pt.debug = this.getPoint(pt);
                if (this.inLoop(pt)) {
                    continue;
                }
                let isEnclosed = this.rayCast(pt) % 2 == 1;
                if (isEnclosed) {
                    result.push(pt);
                }
            }
        }
        return result;
    }

    displayLoop(): void {
        // output the grid with the loop and every other point as a .
        for (let iRow = 0; iRow < this.lines.length; iRow++) {
            let line = '';
            for (let iCol = 0; iCol < this.lines[iRow].length; iCol++) {
                let pt = {x: iCol, y: iRow, animal: 0, debug: '' };
                if (this.inLoop(pt)) {
                    line += this.getPoint(pt);
                } else {
                    line += '.';
                }
            }
            console.log(line);
        }
    }

    displayEnclosed(): void {
        for (let iRow = 0; iRow < this.lines.length; iRow++) {
            let line = '';
            for (let iCol = 0; iCol < this.lines[iRow].length; iCol++) {
                let pt = {x: iCol, y: iRow, animal: 0, debug: '' };
                if (this.inLoop(pt)) {
                    line += 'x'; //this.getPoint(pt);
                } else {
                    let ch = this.rayCast(pt);
                    line += ch % 2 == 1 ? 'I' : '.';
                }
            }
            console.log(line);
        }
    }

    process(): number {

        let start: Point = {x: 0, y: 0, animal: 0};
        for (let iRow = 0; iRow < this.height; iRow++) {
            let search = this.lines[iRow].indexOf('S');
            if (search > -1) {
                start.x = search;
                start.y = iRow;
            }
        }
        console.log(`${this.width}x${this.height} - ${JSON.stringify(start)}`);
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
        //console.log(JSON.stringify(this.loop));
        this.displayLoop();
        this.displayEnclosed();
        let enc = this.enclosedPoints()
        console.log(JSON.stringify(enc));
        return enc.length;
    }
}

let input = require('fs').readFileSync(__dirname + '/../__data__/day10.txt', 'utf-8');
let day10 = new Day10Part2(input);
console.log(`Part 1: ${day10.process()}`);