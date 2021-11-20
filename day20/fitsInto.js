const toCoordMap = (idToCoords) => Object.fromEntries(Object.entries(idToCoords).map(([id, [x, y]]) => [`${x},${y}`, id]));

function fitsInto (idToCoords, id, [x, y], neighbours, sideLength) {
    if (Math.min(x, y) < 0 || Math.max(x, y) >= sideLength) {
        console.log('      does not fix bc out of bounds')
        return false;
    }
    const coordMap = toCoordMap(idToCoords);

    const coordsTop = [x, y - 1];
    const coordsRight = [x + 1, y];
    const coordsLeft = [x - 1, y];
    const coordsBottom = [x, y + 1];

    const idTop = coordMap[coordsTop.join(',')];
    const idRight = coordMap[coordsRight.join(',')];
    const idLeft = coordMap[coordsLeft.join(',')];
    const idBottom = coordMap[coordsBottom.join(',')];

    if (idTop && !neighbours[idTop].bottom.includes(id)) {
        console.log(`      does not fit bc ${idTop} at ${coordsTop} allows in bottom:`, neighbours[idTop].bottom)
        return false;
    }

    if (idRight && !neighbours[id].right.includes(idRight)) {
        console.log(`      does not fit bc ${id}  allows in right:`, neighbours[id].right)
        return false;
    }

    if (idBottom && !neighbours[id].bottom.includes(idBottom)) {
        console.log(`      does not fit bc ${id}  allows in bottom:`, neighbours[id].bottom)
        return false;
    }

    if (idLeft && !neighbours[idLeft].right.includes(id)) {
        console.log(`      does not fit bc ${idLeft} at ${coordsLeft} allows in right:`, neighbours[idLeft].right)
        return false;
    }
    return true;
}

module.exports = fitsInto;
//
// const idToCoords = {1: [0, 0], 2: [1, 0]}
// const neighbours = {
//     '1': {
//         right: [],
//         bottom: [],
//     },
//     '3': {
//         right: [],
//         bottom: []
//     },
//     '2': {
//         right: [],
//         bottom: [3]
//     }}
// //    3
// // 1, 2
// console.log(fitsInto(idToCoords, 3, [1, 1], neighbours, 3)) // true
//
// // 3
// // 1, 2
// console.log(fitsInto(idToCoords, 3, [0, 1], neighbours, 3)) // false
//
//
// // 3, 1, 2
// console.log(fitsInto({1: [1, 0], 2: [2, 0]}, 3, [0, 2], {
//     '1': {
//         right: [],
//         bottom: [],
//     },
//     '3': {
//         right: [1],
//         bottom: []
//     },
//     '2': {
//         right: [],
//         bottom: []
//     }}, 3)) // true
