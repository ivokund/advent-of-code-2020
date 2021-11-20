const testInput = '389125467';
const realInput = '219748365';

function part1(input, count) {
    const arr = input.split('').map((i) => parseInt(i, 10));

    let currentIndex = 0;
    for (let i=0; i<count; i++) {

        const index = i % input.length
        console.log('--- move ' + (i + 1))
        console.log('cups: ' + arr.map((num, k) => {
            return currentIndex === k ? `(${num})` : num
        }).join(' '))

        // const currentLabel = arr[index];
        // const pickup = arr.splice(index + 1, 3);
        const currentLabel = arr[currentIndex];
        const pickup = arr.splice(currentIndex + 1, 3);
        console.log('pick up: ' + pickup.join(', '))

        const lowest = Math.min(...arr);
        const highest = Math.max(...arr);

        let destLabel = currentLabel - 1;
        if (pickup.includes(destLabel)) { destLabel-- }
        if (pickup.includes(destLabel)) { destLabel-- }
        if (pickup.includes(destLabel)) { destLabel-- }

        if (destLabel < lowest) {
            console.log('setting to ' + highest)
            destLabel = highest;
        }

        const destIndex = arr.indexOf(destLabel);
        console.log('destination: ' + destLabel)

        arr.splice(destIndex + 1, 0, ...pickup);
        // currentIndex++;
        console.log(' ');


        const first = arr.shift()
        arr.push(first)
    }
    const final = arr.join('')
    const parts = final.split('1')
    console.log(parts[1] + parts[0])
}



function part1_2(input, count) {
    const arr = input.split('').map((i) => parseInt(i, 10));

    const nextIds = arr.reduce((acc, id, key, origArray) => {
        acc[`_${id}`] = origArray[key+1] !== undefined ? origArray[key+1] : origArray[0]
        return acc
    }, {})

    const initialLowest = Math.min(...arr);
    const initialHighest = Math.max(...arr);

    const getNext = (id) => nextIds[`_${id}`]

    let currentVal = arr[0]
    for (let i=0; i<count; i++) {

        let highest = initialHighest
        let lowest = initialLowest

        console.log('--- move ' + (i + 1))

        const pickup1 = getNext(currentVal)
        const pickup2 = getNext(pickup1)
        const pickup3 = getNext(pickup2)
        let destLabel = currentVal - 1;

        nextIds[`_${currentVal}`] = getNext(pickup3)

        const pickup = [pickup1, pickup2, pickup3]

        while (pickup.includes(highest)) { highest-- }
        while (pickup.includes(lowest)) { lowest++ }

        console.log('pick up: ' + pickup.join(', '))

        if (pickup.includes(destLabel)) { destLabel-- }
        if (pickup.includes(destLabel)) { destLabel-- }
        if (pickup.includes(destLabel)) { destLabel-- }

        if (destLabel < lowest) {
            console.log('setting to ' + highest)
            destLabel = highest;
        }

        const prevDestNext = getNext(destLabel)

        nextIds[`_${destLabel}`] = pickup1
        nextIds[`_${pickup3}`] = prevDestNext

        currentVal = getNext(currentVal)
    }

    let finalStr = ''
    let lastNo = getNext(1)

    for (let i=0; i<count-2; i++) {
        finalStr += lastNo
        lastNo = getNext(lastNo)
    }

    console.log('>>>>' + finalStr)
}





function part2(input, cupCount, moveCount) {
    const arr = input.split('').map((i) => parseInt(i, 10));

    const lowest = Math.min(...arr);

    let maxLabel = Math.max(...arr)

    while (arr.length < cupCount) {
        maxLabel++
        arr.push(maxLabel)
    }

    console.log('Created array of ' + arr.length)

    function arrayMax(arr) {
        let len = arr.length, max = -Infinity;
        while (len--) {
            if (arr[len] > max) {
                max = arr[len];
            }
        }
        return max;
    }

    for (let i=0; i<moveCount; i++) {

        const index = i % cupCount

        // console.log('--- move ' + (i + 1))
        // console.log('cups: ' + arr.map((num, k) => {
        //     return index === k ? `(${num})` : num
        // }).join(' '))


        if (i % 1000 === 0){
            console.log({i, index })
        }


        const currentLabel = arr[index];
        const pickup = arr.splice(index+1, 3);
        // console.log('pick up: ' + pickup.join(', '))
        // console.log('current label: ' + currentLabel)


        let destLabel = currentLabel - 1;
        if (pickup.includes(destLabel)) { destLabel-- }
        if (pickup.includes(destLabel)) { destLabel-- }
        if (pickup.includes(destLabel)) { destLabel-- }

        if (destLabel < lowest) {
            destLabel = arrayMax(arr);
            // console.log('setting from ' + destLabel + ' to ' + destLabel)
        }

        const destIndex = arr.indexOf(destLabel);
        // console.log('destination: ' + destLabel)

        arr.splice(destIndex + 1, 0, ...pickup);

    }
    console.log(arr)
    const oneIndex = arr.findIndex((num) => num === 1)
    console.log({oneIndex})
    const num1 = arr[oneIndex + 1]
    const num2 = arr[oneIndex + 2]
    console.log({num1, num2})
    console.log(num1 * num2)
}


function arrayMax(arr) {
    let len = arr.length, max = -Infinity;
    while (len--) {
        if (arr[len] > max) {
            max = arr[len];
        }
    }
    return max;
}

function part2_2(input, cupCount, moveCount) {
    const arr = input.split('').map((i) => parseInt(i, 10));

    const initialLowest = Math.min(...arr);
    let initialHighest = Math.max(...arr);

    while (arr.length < cupCount) {
        initialHighest++
        arr.push(initialHighest)
    }

    console.log('Created array of ' + arr.length)

    const nextIds = arr.reduce((acc, id, key, origArray) => {
        acc[`_${id}`] = origArray[key+1] !== undefined ? origArray[key+1] : origArray[0]
        return acc
    }, {})

    const getNext = (id) => nextIds[`_${id}`]

    let currentVal = arr[0]
    for (let i=0; i<moveCount; i++) {

        let highest = initialHighest
        let lowest = initialLowest

        if (i % 100000 === 0){
            console.log({i })
        }

        const pickup1 = getNext(currentVal)
        const pickup2 = getNext(pickup1)
        const pickup3 = getNext(pickup2)
        let destLabel = currentVal - 1;

        nextIds[`_${currentVal}`] = getNext(pickup3)

        const pickup = [pickup1, pickup2, pickup3]

        while (pickup.includes(highest)) { highest-- }
        while (pickup.includes(lowest)) { lowest++ }

        // console.log('pick up: ' + pickup.join(', '))

        if (pickup.includes(destLabel)) { destLabel-- }
        if (pickup.includes(destLabel)) { destLabel-- }
        if (pickup.includes(destLabel)) { destLabel-- }

        if (destLabel < lowest) {
            // console.log('setting to ' + highest)
            destLabel = highest;
        }

        const prevDestNext = getNext(destLabel)

        nextIds[`_${destLabel}`] = pickup1
        nextIds[`_${pickup3}`] = prevDestNext

        currentVal = getNext(currentVal)
    }

    const num1 = getNext(1)
    const num2 = getNext(num1)
    console.log({num1, num2})
    console.log(num1 * num2)
}

// part1(testInput, 10)
// part1_2(testInput, 10)

//{ oneIndex: 560232 }
// { num1: 636092, num2: 636093 }

// part2(testInput, testInput.length, 10)
part2_2(realInput, 1_000_000, 10_000_000)
// 149245887792 not