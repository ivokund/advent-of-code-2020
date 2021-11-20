const { rotate, flip } = require("./day20/part2-operations");
const part1Output = JSON.parse('{"2273-rcw-fh":[0,0],"2617-rcw-fh":[1,0],"2969-r0-fh":[2,0],"1823-rcw-f0":[3,0],"1523-rcw-fh":[4,0],"2141-rccw-fh":[5,0],"1697-rcw-fh":[6,0],"1747-rcw-f0":[7,0],"1039-rcw-fh":[8,0],"2521-rcw-fh":[9,0],"3299-rcw-fh":[10,0],"2953-rccw-fh":[11,0],"1543-rcw-fh":[0,1],"2593-rccw-f0":[1,1],"2011-rcw-f0":[2,1],"3221-r0-f0":[3,1],"3163-r0-f0":[4,1],"3373-r0-fv":[5,1],"1567-r0-f0":[6,1],"1303-r0-f0":[7,1],"2621-rcw-fh":[8,1],"2467-r0-f0":[9,1],"2341-r0-fv":[10,1],"2371-r0-fh":[11,1],"2143-rccw-fh":[0,2],"3623-r0-fv":[1,2],"2297-rccw-fh":[2,2],"3391-r0-fh":[3,2],"3407-rccw-fh":[4,2],"1663-rccw-fh":[5,2],"1907-rccw-fh":[6,2],"3533-rcw-f0":[7,2],"3571-rcw-fh":[8,2],"3469-r0-f0":[9,2],"1913-r0-fh":[10,2],"1117-rcw-f0":[11,2],"3041-r0-fh":[0,3],"3203-r0-f0":[1,3],"3229-rccw-fh":[2,3],"2579-rccw-f0":[3,3],"1049-rccw-f0":[4,3],"1087-rcw-fh":[5,3],"1637-rccw-f0":[6,3],"2903-rcw-f0":[7,3],"2281-r0-fv":[8,3],"3011-rccw-fh":[9,3],"1321-rcw-f0":[10,3],"3877-rccw-fh":[11,3],"1759-rcw-f0":[0,4],"2699-r0-f0":[1,4],"1571-r0-f0":[2,4],"1229-rcw-f0":[3,4],"1993-r0-f0":[4,4],"3863-r0-fv":[5,4],"2287-r0-fv":[6,4],"2957-r0-fh":[7,4],"3539-rcw-fh":[8,4],"1187-r0-fh":[9,4],"2909-rcw-fh":[10,4],"2111-rcw-fh":[11,4],"1667-r0-fh":[0,5],"3023-r0-fh":[1,5],"3929-r0-fh":[2,5],"2749-r0-fv":[3,5],"3251-r0-fh":[4,5],"1181-rcw-fh":[5,5],"3313-rcw-f0":[6,5],"1733-rccw-fh":[7,5],"3037-rccw-f0":[8,5],"1009-rcw-fh":[9,5],"2411-rccw-f0":[10,5],"1607-r0-f0":[11,5],"1621-rccw-f0":[0,6],"2711-rccw-f0":[1,6],"2357-r0-fv":[2,6],"3541-rccw-f0":[3,6],"3767-rccw-fh":[4,6],"3209-rcw-f0":[5,6],"1879-r0-fh":[6,6],"1447-r0-f0":[7,6],"2843-rcw-f0":[8,6],"2063-rcw-f0":[9,6],"3467-r0-fv":[10,6],"2333-rccw-f0":[11,6],"2441-r0-fh":[0,7],"1979-r0-fh":[1,7],"1931-rcw-f0":[2,7],"1259-rccw-f0":[3,7],"1597-r0-fh":[4,7],"3643-rccw-f0":[5,7],"3923-r0-fv":[6,7],"1657-r0-fh":[7,7],"3557-rcw-f0":[8,7],"2753-r0-f0":[9,7],"3491-rcw-f0":[10,7],"3881-r0-fv":[11,7],"1867-r0-fv":[0,8],"1787-rccw-f0":[1,8],"2591-r0-fh":[2,8],"2551-rcw-fh":[3,8],"3631-rcw-fh":[4,8],"1097-rcw-fh":[5,8],"1063-r0-fv":[6,8],"1831-r0-f0":[7,8],"2609-rcw-fh":[8,8],"2477-rccw-fh":[9,8],"3343-rccw-f0":[10,8],"3067-rccw-f0":[11,8],"1531-r0-f0":[0,9],"2099-r0-f0":[1,9],"2237-rccw-fh":[2,9],"3853-rcw-fh":[3,9],"1019-r0-fh":[4,9],"1801-rcw-fh":[5,9],"1601-r0-fv":[6,9],"1873-r0-fh":[7,9],"3833-rcw-f0":[8,9],"1399-r0-f0":[9,9],"1409-r0-fv":[10,9],"2087-rccw-fh":[11,9],"3259-rcw-fh":[0,10],"3187-rcw-f0":[1,10],"3329-rccw-fh":[2,10],"1933-rcw-f0":[3,10],"2207-rcw-fh":[4,10],"3769-rccw-fh":[5,10],"1471-rccw-f0":[6,10],"2003-rccw-f0":[7,10],"2161-r0-f0":[8,10],"3821-r0-fv":[9,10],"1549-rccw-f0":[10,10],"2663-r0-fv":[11,10],"1213-r0-f0":[0,11],"3511-rccw-fh":[1,11],"1289-rccw-fh":[2,11],"2677-r0-fv":[3,11],"2549-rccw-f0":[4,11],"1307-rccw-fh":[5,11],"1583-rcw-f0":[6,11],"1489-rccw-f0":[7,11],"3559-rcw-fh":[8,11],"1481-rccw-f0":[9,11],"2707-rcw-fh":[10,11],"2243-r0-fv":[11,11]}');

const part1TestOutput = JSON.parse('{"1951-r0-fv":[0,0],"2311-r0-fv":[1,0],"3079-r0-f0":[2,0],"2729-r0-fv":[0,1],"1427-r0-fv":[1,1],"2473-rccw-fh":[2,1],"2971-r0-fv":[0,2],"1489-r0-fv":[1,2],"1171-r0-fh":[2,2]}');

const {testInput, realInput } = require('./day20/input');

function part2(input, part1Output) {

    // console.log({part1Output})

    const tiles = input.split('\n\n');

    const sideLength = Math.sqrt(tiles.length);

    const tilesIdsAndTiles = tiles.map((tile) => {
        const tileLines = tile.split('\n');
        const tileNo = tileLines[0].match(/^Tile (\d+):$/)[1];
        tileLines.shift();

        tileLines.pop();
        tileLines.shift();
        const cropped = tileLines.map((row) => row.substring(1, row.length - 1))

        return [tileNo, cropped];
    });


    const tileByShortId = Object.fromEntries(tilesIdsAndTiles);

    const opsByShortId = Object.fromEntries(Object.entries(part1Output).map(([longId, coords]) => {
        const [shortId, rotation, flip] = longId.split('-');
        return [shortId, { rotation, flip, coords }];
    }))
    // console.log(part1Output)

    const operateTile = (tile, ops) => {
        // console.log(tile, ops)
        tile = rotate(tile, ops.rotation)
        // console.log(tile)
        tile = flip(tile, ops.flip)
        return tile;
    }

    const finalTilesById = Object.fromEntries(Object.entries(tileByShortId).map(([tileId, tile]) => {
        return [tileId, operateTile(tile, opsByShortId[tileId])]
    }));
    // console.log(finalTilesById)

    const idByCoords = Object.fromEntries(Object.entries(part1Output).map(([id, [x, y]]) => [`${x},${y}`, id]));
    const tileMatrix = [];
    for (let y=0; y<sideLength; y++) {
        const tileRow = [];
        for (let x = 0; x < sideLength; x++) {
            const tileCoords = `${x},${y}`;
            const tileId = idByCoords[tileCoords].split('-')[0];
            tileRow.push(finalTilesById[tileId]);
        }
        tileMatrix.push(tileRow)
    }
    const tileSideLength = tilesIdsAndTiles[0][1].length;

    const finalMatrix = [];

    tileMatrix.forEach((rowOfTiles) => {
        for (let i = 0; i<tileSideLength; i++) {
            let row = '';
            // console.log({i})
            rowOfTiles.forEach((tile) => {
                // console.log(tile[i])
                row += tile[i]
            })
            finalMatrix.push(row);
        }
    })


    const matrices = [
        finalMatrix,
        rotate(finalMatrix, 'rcw'),
        rotate(finalMatrix, 'rccw'),
        flip(finalMatrix, 'fv'),
        flip(finalMatrix, 'fh'),

        flip(rotate(finalMatrix, 'rcw'), 'fv'),
        flip(rotate(finalMatrix, 'rcw'), 'fh'),
        flip(rotate(finalMatrix, 'rccw'), 'fv'),
        flip(rotate(finalMatrix, 'rccw'), 'fh'),
    ]

    const monster =
        '                  # \n' +
        '#    ##    ##    ###\n' +
        ' #  #  #  #  #  #   ';


    const monsterLen = 20;
    const sideLen = finalMatrix[0].length;
    const diff = sideLen - monsterLen;

    const monsters = [];

    for (let i=0; i<=diff; i++) {

        const lPad = '.'.repeat(i);
        const rPad = '.'.repeat(diff-i);

        const monRegexLines = monster.split('\n').map((line) => {
            return `${lPad}${line.replace(/\s/g, '.')}${rPad}`;
        }).map((line) => new RegExp(line))
        monsters.push(monRegexLines)
    }




    // console.log({ sideLen, diff, monsterLen, monsters});
    // process.exit();
    const getMonsterCount = (matrix) => {
//
        console.log('finding monsters from ', matrix)



        let count = 0;

        const hashCount = (str) => str.match(/#/g).length;

        for (let i=0; i<matrix.length; i++) {
            monsters.forEach((monster, a) => {


            const m1 = monster[0].exec(matrix[i]);
            const m2 = monster[1].exec(matrix[i-1]);
            const m3 = monster[2].exec(matrix[i-2]);

            if (m1 && m2 && m3) {
                console.log(i, m1.index, m2.index, m3.index)
            }
            if (m1 && m2 && m3) {
                count++;
            }
            })

        }


        if (count > 0) {

            const monsterHashCount = hashCount(monster);
            const tilehashCount = matrix.reduce((acc, line) => {
                acc += hashCount(line);
                return acc;
            }, 0)
            console.log({matrix, monsterHashCount, tilehashCount})
            console.log(tilehashCount - count * monsterHashCount)
            throw new Error('found')
        }


        return count;
    }

    matrices.forEach((matrix) => {
        console.log({count: getMonsterCount(matrix)})
    })
}


// part2(testInput, part1TestOutput);
part2(realInput, part1Output);