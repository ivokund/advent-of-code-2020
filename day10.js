const input1 = `133
157
39
74
108
136
92
55
86
46
111
58
80
115
84
67
98
30
40
61
71
114
17
9
123
142
49
158
107
139
104
132
155
96
91
15
11
23
54
6
63
126
3
10
116
87
68
72
109
62
134
103
1
16
101
117
35
120
151
102
85
145
135
79
2
147
33
41
93
52
48
64
81
29
20
110
129
43
148
36
53
26
42
156
154
77
88
73
27
34
12
146
78
47
28
97`;

const inputTest = `16
10
15
5
1
11
7
19
6
12
4`;

const inputTest2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const jolts = input1.split('\n').map(j => parseInt(j, 10));

const ordered = jolts.sort((a, b) => a - b);
const deviceJ = Math.max(...jolts) + 3;

function part1() {

    const distrs = {};
    let j = 0;


    const stack = [...ordered];
    while (stack.length > 0) {
        const item = stack.shift();
        const diff = item - j;
        distrs[diff] = (distrs[diff] || 0) + 1;
        j = item;
    }

    distrs[deviceJ - j]++;
    console.log({ distrs });
    console.log(distrs['1'] * distrs['3']);
}


// part 2


function part22_run(list) {
    console.log('running for ', { list })
    let count = 1;

    list.unshift(0);

    function parse(index, candidateForRemoval, lastParsed) {
        if (count % 10000000 === 0) {
            console.log({ count })
        }

        if (index >= 0) {
            const last = list[index];

            if (lastParsed - last <= 3) {
                parse(index-1, last, lastParsed);
                count++;

            }
            parse(index-1, last, candidateForRemoval);
        }
    }

    const last = list.pop();

    const index = list.length-1;
    parse(index, last, [deviceJ]);
    console.log({ count });
    return count;
}



function part22() {

    const { partitions } = ordered.reduce(({ last, partitions, buffer }, item, k) => {

        if ((last && item - last === 3)) {
            partitions.push(buffer)
            buffer = [];
        }
        buffer.push(item);


        if (k === ordered.length - 1) {
            partitions.push(buffer)
            buffer = [];
        }

        return { last: item, partitions, buffer };
    }, { partitions: [], buffer: [] })

    console.log( { partitions });

    const sum = partitions.reduce((sum, partition) => {
        return sum * part22_run(partition);
    }, 1)

    console.log({ sum });
}

part22();