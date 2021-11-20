const realInput = '13,0,10,12,1,5,8';
const testInput = '0,3,6';

function part1(input, targetNo) {

    const nos = input.split(',').map((n) => parseInt(n, 10));

    const numberTurns = {};

    nos.forEach((no, k) => numberTurns[no] = [k+1])

    let lastNo = nos[nos.length-1];
    for (let i=nos.length; i<targetNo; i++) {
        if (i % 100000 === 0) { console.log({ i }) }
        if (numberTurns[lastNo].length === 1) {
            // console.log(`${lastNo} had its first time, returning 0`)
            lastNo = 0;
        } else if (numberTurns[lastNo].length > 1) {
            // console.log(`${lastNo} has been spoken before`, { t: numberTurns[lastNo]})
            const [f, s] = numberTurns[lastNo].slice(-2);
            // console.log({f, s})
            lastNo = s - f;
            // console.log('returning ', lastNo)
        } else {
            throw new Error('this should not happen');
        }
        if (!numberTurns[lastNo]) {
            numberTurns[lastNo] = [];
        }
        numberTurns[lastNo].push(i+1);
        // console.log('---------------', {numberTurns})
    }
    console.log(lastNo)
}



function part2(input, targetNo) {

    const nos = input.split(',').map((n) => parseInt(n, 10));

    const numberTurns = {};

    nos.forEach((no, k) => numberTurns[no] = [k+1])

    let lastNo = nos[nos.length-1];
    for (let i=nos.length+1; i<=targetNo; i++) {
        // console.log('+++++ TURN ' + i, { lastNo})
        if (i % 100000 === 0) { console.log({ i }) }
        if (numberTurns[lastNo].length === 1) {
            // console.log(`${lastNo} had its first time, returning 0`)
            lastNo = 0;
            numberTurns[lastNo] = !numberTurns[lastNo] ? [i] : [i, numberTurns[lastNo][0]]
        } else if (numberTurns[lastNo].length > 1) {
            // console.log(`${lastNo} has been spoken before`, { t: numberTurns[lastNo]})
            const s = numberTurns[lastNo][numberTurns[lastNo].length-2];
            const f = numberTurns[lastNo][numberTurns[lastNo].length-1];
            // const [f, s] = numberTurns[lastNo]
            // console.log({ s, f})
            lastNo = s - f;
            // console.log('current numTurns for ' + lastNo, numberTurns[lastNo])

            numberTurns[lastNo] = !numberTurns[lastNo] ? [i] : [
                i,
                numberTurns[lastNo][0]
            ];
            // console.log('returning ', lastNo)

        } else {
            throw new Error('this should not happen');
        }
        // console.log('---------------', {numberTurns})
    }
    console.log(lastNo)
}

// part1(testInput, 10);
// part2(testInput, 10);
part2(realInput, 30000000);