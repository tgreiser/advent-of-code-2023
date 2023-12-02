import {describe, expect, test} from '@jest/globals';
import {CalibrationParser} from '../day01';

describe('day01', () => {
    let input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
    let parser = new CalibrationParser(input);

    test('Parser should get lines', () => {
        
        expect(parser.lines).toStrictEqual([
            "1abc2",
            "pqr3stu8vwx",
            "a1b2c3d4e5f",
            "treb7uchet"
        ]);
    });

    test('Parser should get calibration values', () => {
        expect(parser.getCalibrationValue(0)).toBe(12);
        expect(parser.getCalibrationValue(1)).toBe(38);
        expect(parser.getCalibrationValue(2)).toBe(15);
        expect(parser.getCalibrationValue(3)).toBe(77);
    });

    test('Parser should get sum of calibration values', () => {
        expect(parser.getSumOfCalibrationValues()).toBe(142);
    });

});

describe('day01 part 2', () => {
    let input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`
    let parser = new CalibrationParser(input);

    test('Parser should get lines', () => {
        
        expect(parser.lines).toStrictEqual([
            "two1nine",
            "eightwothree",
            "abcone2threexyz",
            "xtwone3four",
            "4nineeightseven2",
            "zoneight234",
            "7pqrstsixteen"
        ]);
    });

    test('Parser should get calibration values', () => {
        expect(parser.getCalibrationValue(0)).toBe(29);
        expect(parser.getCalibrationValue(1)).toBe(83);
        expect(parser.getCalibrationValue(2)).toBe(13);
        expect(parser.getCalibrationValue(3)).toBe(24);
        expect(parser.getCalibrationValue(4)).toBe(42);
        expect(parser.getCalibrationValue(5)).toBe(14);
        expect(parser.getCalibrationValue(6)).toBe(76);
    });

    test('Parser should get sum of calibration values', () => {
        expect(parser.getSumOfCalibrationValues()).toBe(281);
    });

});