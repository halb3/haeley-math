
/* spellchecker: disable */

import { log, logIf, LogLevel } from 'haeley-auxiliaries';

import { clamp } from './auxiliaries';

/* spellchecker: enable */

export function matrixStringFromArray(a: Float32Array, cols: number, digits: number = 4): string {

    const colsClamped = clamp(cols, 1, a.length);
    logIf(colsClamped != cols, LogLevel.Debug, `clamped number of columns to ${colsClamped}, given ${cols}`);
    const digitsClamped = Math.max(digits, 0);
    logIf(digitsClamped != digits, LogLevel.Debug, `clamped number of digits to ${digitsClamped}, given ${digits}`);

    const paddings = new Float32Array(colsClamped);
    const strings = new Array<string>(Math.ceil(a.length / cols) * cols);
    strings.fill('');

    for (let i = 0; i < colsClamped; ++i) {
        const column = a.filter((value, index) => (index % colsClamped) === i);
        const max = column.map((v) => Math.abs(v)).reduce((c, p) => Math.max(c, p));
        paddings[i] = Math.max(1, Math.ceil(Math.log10(max)))
            + digitsClamped + clamp(digitsClamped + 1, 1, 2);
        column.forEach((value, index) => strings[index * colsClamped + i] =
            value.toFixed(digitsClamped));
    }
    for (let i = 0; i < strings.length; ++i) {
        strings[i] = strings[i].padStart(paddings[i % colsClamped]);
    }

    const blanks = paddings.reduce((a, v) => a + v) + paddings.length - 1;
    const rows = Math.ceil(a.length / colsClamped);

    let matstr = '';
    matstr += ' ╭ ' + ' '.repeat(blanks) + ' ╮\n';
    for (let i = 0; i < rows; ++i) {
        matstr += ` │ ${strings.splice(0, colsClamped).join(' ')} │\n`;
    }
    matstr += ' ╰ ' + ' '.repeat(blanks) + ' ╯';

    return matstr;
}

export function interleaveMatrixStrings(strings: Array<string>): string {

    const rowsPerString = new Array<Array<string>>(strings.length);
    strings.forEach((value, index) => rowsPerString[index] = value.split('\n'));

    const rows = rowsPerString.map((v) => v.length);
    const paddings = rowsPerString.map((v) => v[0].length);
    const maxRows = rows.reduce((p, c) => Math.max(p, c));

    let message = '';
    for (let i = 0; i < maxRows; ++i) {
        rowsPerString.forEach((v, index) =>
            message += i < rows[index] ? v[i] : ' '.repeat(paddings[index]));
        message += i < maxRows - 1 ? '\n' : '';
    }
    return message;
}

export function logArrayAsMatrix(a: Float32Array, cols: number, digits: number = 4): void {
    log(LogLevel.Log, matrixStringFromArray(a as Float32Array, cols, digits));
}
