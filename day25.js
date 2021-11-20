const testInput = [5764801, 17807724]
const realInput = [11349501, 5107328]

function part1(pKey1, pKey2, subj) {

    const loop = (val, subj) => {
        val *= subj
        return val % 20201227
    }

    const getLoopSize = (pubKey, subj) => {
        let val = 1, loopId
        for (loopId=0; val !== pubKey; loopId++) {
            val = loop(val, subj)
        }
        if (val === pubKey) {
            return loopId
        }
    }

    const loop1 = getLoopSize(pKey1, subj)
    console.log(`Loop size for ${pKey1}: ${loop1}`)

    const loop2 = getLoopSize(pKey2, subj)
    console.log(`Loop size for ${pKey2}: ${loop2}`)


    let key = 1
    for (let i=1; i <= loop2; i++) {
        key = loop(key, pKey1)
    }

    console.log({ key })

}



part1(realInput[0], realInput[1], 7)