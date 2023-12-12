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

    whatQuadrant(current: Point): Point {
        return {x: (current.x < this.width / 2 ? -1 : 1),
            y: (current.y < this.height / 2 ? -1 : 1),
            animal: 0};
    }

    cornerCrossing(current: Point, quadrant: Point): boolean {
        let ch = this.getPoint(current);
        if ((quadrant.x == 1 && quadrant.y == 1) || (quadrant.x == -1 && quadrant.y == -1)) {
            return ['L', '7'].includes(ch);
        } else if ((quadrant.x == 1 && quadrant.y == -1) || (quadrant.x == -1 && quadrant.y == 1)) {
            return ['F', 'J'].includes(ch);
        } 
        return false;
    }

    countCrossings(current: Point): number {
        // move in a diagonal direction and count how many times we cross the loop
        let count = 0;
        let quadrant = this.whatQuadrant(current);

        while (current.x >= 0 && current.x < this.width && current.y >= 0 && current.y < this.height) {
            if (this.inLoop(current) && !this.cornerCrossing(current, quadrant)) {
                count++;
            }
            current.x += quadrant.x;
            current.y += quadrant.y;
        }
        return count;
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
                let isEnclosed = this.countCrossings(pt) % 2 == 1;
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
                    line += this.countCrossings(pt)
                    if (line == '0') { line = '.'; }
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