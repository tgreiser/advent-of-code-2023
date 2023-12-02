import {describe, expect, test} from '@jest/globals';
import {BeadGame} from '../day02-1';
import {GlassBeadGame} from '../day02-2';

describe('day02', () => {

    test('BeadGame should calculate the minimum number of beads', () => {
        /* 
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
*/
        let game = new BeadGame({ red: 12, green: 13, blue: 14 });
        let games = game.parseGames(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`);
        
        expect(game.getMinimumBeads(games[0])).toStrictEqual({ red: 4, green: 2, blue: 6 });

        expect(game.isPossible(games[0])).toBe(true);
        expect(game.isPossible(games[1])).toBe(true);
        expect(game.isPossible(games[2])).toBe(false);
        expect(game.isPossible(games[3])).toBe(false);
        expect(game.isPossible(games[4])).toBe(true);

        expect(game.getPossibleGames(games)).toStrictEqual([1, 2, 5]);
        expect(game.getPossibleGamesSum(games)).toBe(8);
    });
});

describe('day02 part 2', () => {

    let game = new GlassBeadGame({ red: 12, green: 13, blue: 14 });
    let games = game.parseGames(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`);

    expect(game.getMinimumBeadPower(games[0])).toBe(48);
    expect(game.getMinimumBeadPower(games[1])).toBe(12);
    expect(game.getMinimumBeadPower(games[2])).toBe(1560);
    expect(game.getMinimumBeadPower(games[3])).toBe(630);
    expect(game.getMinimumBeadPower(games[4])).toBe(36);

    expect(game.getMinimumBeadPowerSum(games)).toBe(2286);
});