const testInput = `939
7,13,x,x,59,x,31,19`;

const realInput = `1000510
19,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,523,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,13,x,x,x,x,x,x,x,x,x,x,29,x,853,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,23`;


function part1(input) {
    const [ts, lines] = input.split('\n');
    const timestamp = parseInt(ts, 10);
    const busLines = lines.split(',').filter((id) => id !== 'x').map((id) => parseInt(id, 10));

    console.log({ timestamp, busLines })

    let leavingTime = timestamp;
    while (true) {
        busLines.forEach((no) => {
            if (leavingTime % no === 0) {
                console.log(`Bus ${no} leaves at ${leavingTime}`);
                const minsToWait = leavingTime - timestamp;
                console.log({ minsToWait });
                console.log({ answer: no * minsToWait });

                process.exit()
            }
        });
        leavingTime++;
    }
}

function part2(input) {
    const [, lines] = input.split('\n');
    const busLines = lines.split(',');
    //117318378600000



    const maxVal = Math.max(
        ...busLines
            .filter((no) => no !== 'x')
            .map((no) => parseInt(no, 10))
    );

    const maxValIndex = busLines.indexOf(`${maxVal}`);

    const realEntries = busLines
        .map((v, k) => [k, v])
        .filter(([k, v]) => v !== 'x')
        .sort((a, b) => b[1] - a[1])


    console.log({ maxVal, maxValIndex, realEntries })

    let foundTimestamp;
    loop1:
    for (let i = 0; !foundTimestamp; i += maxVal) {
        if (i % (maxVal * 10000000) === 0) { console.log(i); }
        i-= (maxValIndex);
        for (const [index, no] of realEntries) {
            const matches = no === 'x' || (i + index) % no === 0;
            if (!matches){
                i+=maxValIndex;
                continue loop1;
            }
        }
        // 145881168900000
        //
        foundTimestamp = i;
        console.log({ foundTimestamp })
        break;
    }
}



part2(testInput);
