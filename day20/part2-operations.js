const flipSide = (s) => s.split('').reverse().join('');
const rotate = (tile, rotation) => {
    const len = tile.length;
    const revRows = [...tile].map((rowStr) => rowStr.split(''));

    const outRows = [];
    switch (rotation) {
        case 'r0':
            return tile;
        case 'rcw':
            revRows.reverse()
            for (let i = 0; i<len; i++) {
                outRows.push(revRows.map((row) => row[i]).join(''));
            }
            return outRows
        case 'rccw':
            for (let i = len-1; i>=0; i--) {
                outRows.push(revRows.map((row) => row[i]).join(''));
            }
            return outRows
        default:
            throw new Error('error')
    }
}
const flip = (tile, flipTye) => {
    const len = tile.length;
    const rows = [...tile].map((rowStr) => rowStr.split(''));

    const outRows = [];
    switch (flipTye) {
        case 'f0':
            return tile;
        case 'fh':
            return rows.map((cols) => cols.reverse().join(''))
        case 'fv':
            return rows.reverse().map((cols) => cols.join(''))
        default:
            throw new Error('error')
    }
}


module.exports = { rotate, flip };

//
// const input = [
//     '#..####', '.#.....',
//     '#####..', '###.#..',
//     '#...#.#', '.#####.',
//     '.#.###.', '.#.....'
// ]
// // const input = ['ABCD', 'EFGH', '1234', '5678'];
// console.log(input.join('\n'))
// const expected = rotate(input, 'rcw');
// console.log('\n')
// console.log(expected.join('\n'))
