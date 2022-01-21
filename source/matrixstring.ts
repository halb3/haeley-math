
/* spellchecker: disable */

import { log, LogLevel } from 'haeley-auxiliaries';

/* spellchecker: enable */

export function matrixStringFromArray(a: Float32Array, cols: number, digits: number = 4): string {

    // const columns = new Array<Float32Array>(cols);
    const paddings = new Float32Array(cols);
    const strings = new Array<string>(Math.ceil(a.length / cols) * cols);
    strings.fill('');

    for (let i = 0; i < cols; ++i) {
        const column = a.filter((value, index) => (index % cols) === i);
        const max = column.reduce((c, p) => Math.max(Math.abs(c), Math.abs(p)));
        paddings[i] = Math.max(1, Math.ceil(Math.log10(max))) + digits + 2;
        column.forEach((value, index) => strings[index * cols + i] =
            value.toFixed(digits));
    }
    for (let i = 0; i < strings.length; ++i) {
        strings[i] = strings[i].padStart(paddings[i % cols]);
    }

    const blanks = paddings.reduce((a, v) => a + v) + paddings.length - 1;
    const rows = Math.ceil(a.length / cols);

    let matstr = '';
    matstr += ' ╭ ' + ' '.repeat(blanks) + ' ╮\n';
    for (let i = 0; i < rows; ++i) {
        matstr += ` │ ${strings.splice(0, cols).join(' ')} │\n`;
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
        message += '\n';
    }
    return message;
}

export function logArrayAsMatrix(a: Float32Array, cols: number, digits: number = 4): void {
    log(LogLevel.Log, matrixStringFromArray(a as Float32Array, cols, digits));
}
