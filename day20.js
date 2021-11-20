const fitsInto = require("./day20/fitsInto");
const generateSides = require("./day20/genSideVariations");
const {testInput, realInput } = require('./day20/input');

const mock = `Tile 1:
ab
cd

Tile 2:
ef
gh

Tile 3:
ij
kl

Tile 4:
ab
op
`

function part1(input) {
    const tiles = input.split('\n\n');

    const tilesIdsAndTiles = tiles.map((tile) => {
        const tileLines = tile.split('\n');
        const tileNo = tileLines[0].match(/^Tile (\d+):$/)[1];
        tileLines.shift();
        return [tileNo, tileLines];
    });
    const tileIds = tilesIdsAndTiles.map(([id]) => id);

    const tileIdsBySides = generateSides(tilesIdsAndTiles);
//     console.log(tileIdsBySides);
// process.exit();

    const sideLength = Math.sqrt(tiles.length);

    const connectingSides = Object.fromEntries(Object.entries(tileIdsBySides)
        .filter(([side, matches]) => matches.length > 1)
        .filter(([side, matches]) => {
            const sideMatches = (sides) => {
                return sides.includes('top') && sides.includes('bottom')
                    || sides.includes('left') && sides.includes('right');
            }

            return sideMatches(matches.map(([id, side]) => side));
        })
    );
//     console.log(connectingSides, sideLength)
// process.exit();

    const setOfMatches = Object.entries(connectingSides).map(([side, matches]) => matches);

    const neighbours = setOfMatches.reduce((acc, set) => {
        set.forEach(([id, side]) => {
            if (!acc[id]) {
                acc[id] = { bottom: [], right: [] };
            }
        });
        return acc;
    }, {})


    // console.log(setOfMatches);
    // process.exit();
    setOfMatches.forEach((matches) => {
        matches.forEach(([sideId1, dir1]) => {
            matches.forEach(([sideId2, dir2]) => {
                if (sideId1.split('-')[0] === sideId2.split('-')[0]) {
                    return;
                }
                // if (sideId1 === '1951-r0-fv' ) {
                //     console.log({dir1, dir2, sideId1, sideId2});
                // }
                if (dir1 === 'top' && dir2 === 'bottom') {
                    neighbours[sideId2].bottom.push(sideId1);
                } else if (dir1 === 'bottom' && dir2 === 'top') {
                    neighbours[sideId1].bottom.push(sideId2);
                } else if (dir1 === 'left' && dir2 === 'right') {
                    neighbours[sideId2].right.push(sideId1);
                } else if (dir1 === 'right' && dir2 === 'left') {
                    neighbours[sideId1].right.push(sideId2);
                }
            })
        })
    });
    // process.exit();

    Object.keys(neighbours).forEach((nId) => {
        neighbours[nId].right = [...new Set(neighbours[nId].right)];
        // neighbours[nId].top = [...new Set(neighbours[nId].top)];
        // neighbours[nId].left = [...new Set(neighbours[nId].left)];
        neighbours[nId].bottom = [...new Set(neighbours[nId].bottom)];
    })
//     console.log(neighbours)
// process.exit();
    const minMax = (coordsById, coordIndex) => {
        const all = Object.entries(coordsById).map(([id, coords]) => coords[coordIndex]);
        const [min, max] = [Math.min(...all), Math.max(...all)];
        return [min, max];
    }

    const draw = (coordsByIds, highlights) => {
        const [xMin, xMax] = minMax(coordsByIds, 0)
        const [yMin, yMax] = minMax(coordsByIds, 1)
        const coordsMap = Object.fromEntries(Object.entries(coordsByIds).map(([id, [x, y]]) => [`${x},${y}`, id]));

        const count = Object.keys(coordsByIds).length
        // let rows = [`stack:${stack.length}, skipped: ${skipped}, done: ${iterations}___total:${count}/${tileIds.length}`];
        let rows = [`stack:${stack.length}, skipped: ${skipped}, done: ${iterations}___total:${count}/${tileIds.length}`];
        for (let y = yMin; y<=yMax; y++) {
            let cols = [];
            for (let x = xMin; x<=xMax; x++) {
                const csvCoord = `${x},${y}`;
                const id = coordsMap[csvCoord];
                cols.push(highlights[csvCoord] || (id ? '▣' : '▢'));
                // cols.push(id);
            }
            rows.push(cols.join(' '))
        }
        return rows.join('\n');
    }


    const getCoordsByIndex = (idx, sideLength) => {
        const y = Math.floor(idx / sideLength);
        const x = idx < sideLength ? idx : (idx % (sideLength));
        const xy = `${x},${y}`;
        return {x, y, xy};
    }


    const startingCombinations = [];
    Object.entries(neighbours).forEach(([from, neigh]) => {
        neigh.right.forEach((toId) => {
            startingCombinations.push({
                map: {
                    [from]: [0, 0],
                    [toId]: [1, 0],
                },
                neighbours,
            })
        })
    });

    const globalNeighbours = neighbours;

    // const stack = [startingCombinations[15]];
    const stack = [...startingCombinations];
    // const stack = [ //1951-fv  2311-fv
    //     {map: {'1951-r0-fv': [0, 0], '2311-r0-fv': [1, 0]}, neighbours}
    // ]
    // stack.reverse()

    const doneLog = {};
    let skipped = 0;
    let iterations = 0;

    const doMatches = ({map, neighbours, start=0}) => {
        iterations++;
        console.log(draw(map, {}))
        if (iterations > 5) {
            // process.exit();
        }


        //
        // if (Object.keys(map).length === 2) {
        //     console.log('======== STARTING COMBINATION ======')
        // }
        //
        //
        // console.log('=======')
        // console.log('=======')
        // console.log({start, map})
        let newMatrix = {...map};
        const neighbourUpdates = {};


        const count = tileIds.length
        for (let i=start; i<count; i++) {
            const {x, y, xy} = getCoordsByIndex(i, sideLength);
            // console.log('  starting iteration: ' + i, {x, y, sideLength})


            const existingShortIdMap = Object.fromEntries(
                Object.keys(newMatrix).map((longId) => [longId.split('-')[0], longId])
            );

            const allCoords = Object.fromEntries(Object.entries(newMatrix).map(([id, [x, y]]) => [`${x},${y}`, id]));

            // console.log(allCoords)
            const id = allCoords[xy]
            if (!id) {
                throw new Error(`  ${x},${y} is not set, so skipping this branch`);
            }

            const { xy: targetXy, x: targetX, y: targetY } = getCoordsByIndex(i+1, sideLength);
            const targetId = allCoords[targetXy]


            if (targetId) {
                // console.log(`  nextId at ${targetXy} is ${targetId}, continuing`)
                continue;
            }

            let neighbourSourceCoords;
            let neighbourDirection;

            if (x < sideLength - 1) {
                neighbourSourceCoords = xy;
                neighbourDirection = 'right';
            } else if (x === sideLength - 1) {
                neighbourSourceCoords = `0,${y}`; // beginning of line
                neighbourDirection = 'bottom';
            } else {
                throw new Error('what?')
            }
            const neighbourSourceId = allCoords[neighbourSourceCoords];
            let targetIdCandidates = neighbours[neighbourSourceId][neighbourDirection];

            // console.log(`  finding neighbours ${neighbourDirection} from ${neighbourSourceCoords} (${neighbourSourceId})`);
            // console.log(`  considering for ${targetXy}:`, targetIdCandidates);
            targetIdCandidates = targetIdCandidates.filter((longId) => {
                const shortId = longId.split('-')[0];
                return !newMatrix[shortId]
            })
            // console.log(`  actually considering for ${targetXy}:`, targetIdCandidates);


            let added = 0
            for (const targetId of targetIdCandidates) {
                if (existingShortIdMap[targetId.split('-')[0]]) { // assigned already
                    // console.log(`    ${targetId} already assigned`)
                    continue;
                }
                if (fitsInto(newMatrix, targetId, [targetX, targetY], globalNeighbours, sideLength)) {

                    // console.log(`    add to stack where ${targetId} = ${targetXy}`)
                    stack.push({
                        map: {...newMatrix, [targetId]: [targetX, targetY]},
                        neighbours,//: newNeighbours,
                        start: i+1,
                    });
                    added++;
                }
            }

            const len = Object.keys(newMatrix).length
            // console.log({len})


            if (len === tileIds.length) {
                console.log('--------')
                console.log(draw(newMatrix, {}))


                console.log({ newMatrix })

                const [xMin, xMax] = minMax(newMatrix, 0);
                const [yMin, yMax] = minMax(newMatrix, 1);

                const corners = Object.entries(newMatrix).filter(([id, [x, y]]) => {
                    return x === xMin && y === yMin ||
                        x === xMax && y === yMax ||
                        x === xMin && y === yMax ||
                        x === xMax && y === yMin;
                }).map(([k, v]) => +k.split('-')[0])
                const sum = corners.reduce((sum, item) => sum * item, 1);
                console.log({ corners, sum })
                console.log(JSON.stringify(newMatrix))
                throw new Error('found match')
            }


            if (added > 0) {
                // console.log(`added ${added} items to stack, discontinuing this branch`)
                break;
            } else {
                // console.log(`did not add anything, discontinuing this branch`)
                break;
            }
        }


    }


    while (stack.length > 0) {
        // stack.sort((a, b) => (Object.keys(a).length - Object.keys(b).length))
        const pos = stack.pop();
        doMatches(pos);
    }


}



// 1951-r0-fv  2311-r0-fv     3079-r0-f0
// 2729-r0-fv  1427-r0-fv     2473-rccw-fh
// 2971-r0-fv  1489-r0-fv     1171-r0-fh

part1(realInput)




