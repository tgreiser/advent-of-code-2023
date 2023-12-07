import {describe, expect, test} from '@jest/globals';
import { Day07, Hand} from '../day07-1';
import { Day07Part2, HandPart2 } from '../day07-2';

describe('day07', () => {

    test('Hands should be calculated correctly', () => {
        let hand = new Hand('33323 919');
        expect(hand.score).toBe(6);
        expect(hand.bid).toBe(919);

        hand = new Hand('6TTTT 999');
        expect(hand.score).toBe(6);
        expect(hand.bid).toBe(999);

        hand = new Hand('278Q7 100');
        expect(hand.score).toBe(2);

        hand = new Hand('8Q55Q 100');
        expect(hand.score).toBe(3);

        hand = new Hand('K3393 28');
        expect(hand.score).toBe(4);
        expect(hand.bid).toBe(28);

        hand = new Hand('44848 100');
        expect(hand.score).toBe(5);

        hand = new Hand('2TTTT 100');
        expect(hand.score).toBe(6);

        hand = new Hand('TTTTT 100');
        expect(hand.score).toBe(7);
    });

    test('Hands should be sorted correctly', () => {
        let day07 = new Day07('');
        let lose = new Hand('278Q7 100');
        let win = new Hand('2TTTT 100');

        expect(day07.compareHands(win, lose)).toBe(1);

        win = new Hand('33332 100');
        lose = new Hand('2AAAA 100');
        expect(day07.compareHands(win, lose)).toBe(1);

        win = new Hand('77888 100');
        lose = new Hand('77788 100');
        expect(day07.compareHands(win, lose)).toBe(1);

        win = new Hand('KK677 100');
        lose = new Hand('KTJJT 100');
        expect(day07.compareHands(win, lose)).toBe(1);

        win = new Hand('QQQJA 100');
        lose = new Hand('T55J5 100');
        expect(day07.compareHands(win, lose)).toBe(1);
    });

    test('Sample input should be correct', () => {
        let sample = require('fs').readFileSync(__dirname + '/../__data__/day07-sample.txt', 'utf-8');
        let day07sample = new Day07(sample);
        expect(day07sample.process()).toBe(6440);
    });

    test('Part 2 sample input should be correct', () => {
        let sample = require('fs').readFileSync(__dirname + '/../__data__/day07-sample.txt', 'utf-8');
        let day07sample = new Day07Part2(sample);
        expect(day07sample.process()).toBe(5905);
    });

    test('Compare hands with jokers', () => {
        let day07 = new Day07Part2('');

        let win = new HandPart2('2TTTT 100');
        let lose = new HandPart2('2TTTJ 100');
        expect(day07.compareHands(win, lose)).toBe(1);

        win = new HandPart2('2TTTT 100');
        lose = new HandPart2('JTTT2 100');
        expect(day07.compareHands(win, lose)).toBe(1);
        
        win = new HandPart2('JTTTT 100');
        lose = new HandPart2('JTTT2 100');
        expect(day07.compareHands(win, lose)).toBe(1);

        win = new HandPart2('22332 100');
        lose = new HandPart2('2233J 100');
        expect(day07.compareHands(win, lose)).toBe(1);

        win = new HandPart2('799AJ 100');
        expect(win.score).toBe(4);
    });
});