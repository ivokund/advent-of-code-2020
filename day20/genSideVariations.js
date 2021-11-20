const assert = require("assert");
const generateSides = (tilesIdsAndTiles) => tilesIdsAndTiles.reduce((acc, [tileNo, tile]) => {

    const genSideVariations = (origSide, origDirection) => {
        const flip = (s) => s.split('').reverse().join('');
        const flipHorDir = { bottom: 'bottom', top: 'top', left: 'right', right: 'left'}
        const flipVerDir = { bottom: 'top', top: 'bottom', left: 'left', right: 'right'}
        const rotDirCw = { bottom: 'left', top: 'right', left: 'top', right: 'bottom'}
        const rotDirCCw = { bottom: 'right', top: 'left', left: 'bottom', right: 'top'}

        const flipFns = {
            'f0': (oldDir, oldPixels) => [oldDir, oldPixels],
            'fv': (oldDir, oldPixels) => {
                if (['left', 'right'].includes(oldDir)) {
                    return [oldDir, flip(oldPixels)]
                } else {
                    return [flipVerDir[oldDir], oldPixels]
                }
            },
            'fh': (oldDir, oldPixels) => {
                if (['left', 'right'].includes(oldDir)) {
                    return [flipHorDir[oldDir], oldPixels]
                } else {
                    return [oldDir, flip(oldPixels)]
                }
            },
        }

        const rotateFns = {
            'r0': (oldDir, oldPixels) => [oldDir, oldPixels],
            'rcw': (oldDir, oldPixels) => {
                return [
                    rotDirCw[oldDir],
                    ['left', 'right'].includes(oldDir) ? flip(oldPixels) : oldPixels
                ]
            },
            'rccw': (oldDir, oldPixels) => {
                return [
                    rotDirCCw[oldDir],
                    ['top', 'bottom'].includes(oldDir) ? flip(oldPixels) : oldPixels
                ]
            }
        }
        Object.entries(flipFns).forEach(([fPrefix, fFn]) => {
            Object.entries(rotateFns).forEach(([rPrefix, rFn]) => {

                const [newDir, newSide] = fFn(...rFn(origDirection, origSide));
                setSide(newSide, `${tileNo}-${rPrefix}-${fPrefix}`, newDir)
            })
        })
    }

    const setSide = (side, id, direction) => {
        if (!acc[side]) {
            acc[side] = []
        }
        // console.log(`Set ${side} as ${direction} side of ${id}`)
        acc[side].push([id, direction]);
    }

    const len = tile[0].length;
    genSideVariations(tile[0], 'top');
    genSideVariations(tile.map((row) => row[0]).join(''), 'left');
    genSideVariations(tile.map((row) => row[len-1]).join(''), 'right');
    genSideVariations(tile[len-1], 'bottom');
    return acc;
}, {});

module.exports = generateSides;
/**
 * r0-f0
 *  AB
 *  CD
 *
 * r0-fv
 *  CD
 *  AB
 *
 * r0-fh
 *  BA
 *  DC
 *
 * rcw-f0
 *  CA
 *  DB
 *
 * rcw-fv
 *  DB
 *  CA
 *
 * rcw-fh
 *  AC
 *  BD
 *
 * rccw-f0
 *  BD
 *  AC
 *
 * rccw-fh
 *  DB
 *  CA
 *
 * rccw-fv
 *  AC
 *  BD
 *
 *
 */
// const input = [
//     ['1', ['AB', 'CD']]
// ];
// const expected = generateSides(input);
// console.log(expected);
// assert(expected.AB.length === 4)
// const ABs = expected.AB.map((a) => a.join(','));
// assert(ABs.includes('1,top'))
// assert(ABs.includes('1-rcw,right'))
// assert(ABs.includes('1-r180-f,bottom'))
// assert(ABs.includes('1-rccw-f,left'))
//
// const BAs = expected.BA.map((a) => a.join(','));
// assert(expected.BA.length === 4)
// assert(BAs.includes('1-f,top'))
// assert(BAs.includes('1-rcw-f,right'))
// assert(BAs.includes('1-r180,bottom'))
// assert(BAs.includes('1-rccw,left'))
