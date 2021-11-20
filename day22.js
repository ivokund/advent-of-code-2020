const testInput = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

const realInput = `Player 1:
28
50
9
11
4
45
19
26
42
43
31
46
21
40
33
20
7
6
17
44
5
39
35
27
10

Player 2:
18
16
29
41
14
12
30
37
36
24
48
38
47
34
15
8
49
23
1
3
32
25
22
13
2`;

function part1(input) {
    const [deck1, deck2] = input
        .split(`\n\n`)
        .map((deck) => deck.split('\n')
            .slice(1)
            .map((num) => parseInt(num, 10)))

    while (deck1.length > 0 && deck2.length > 0) {
        const card1 = deck1.shift();
        const card2 = deck2.shift();

        if (card1 > card2) {
            deck1.push(card1);
            deck1.push(card2);
        } else if (card2 > card1) {
            deck2.push(card2);
            deck2.push(card1);
        } else {
            throw new Error('equal');
        }
    }


    const winner = deck1.length > 0 ? deck1 : deck2;
    const score = winner.reverse().reduce((sum, num, key) => {
        return sum + num * (key + 1)
    }, 0)
    console.log({ deck1, deck2, score })

}



function part2(input) {
    const [deck1, deck2] = input
        .split(`\n\n`)
        .map((deck) => deck.split('\n')
            .slice(1)
            .map((num) => parseInt(num, 10)))




    const playGame = (deck1, deck2) => {
        // console.log('play game start')
        const playedRounds = {};

        while (deck1.length > 0 && deck2.length > 0) {

            const hash = deck1.join(',') + '|' + deck2.join(',');
            if (playedRounds[hash]) {
                return [deck1, 1];
            }
            playedRounds[hash] = true;
            // console.log('--- New round ---', {deck1, deck2})

            const card1 = deck1.shift();
            const card2 = deck2.shift();

            // console.log({card1, card2})


            let winnerIndex = card1 > card2 ? 1 : 2;

            if (deck1.length >= card1 && deck2.length >= card2) {
                [, winnerIndex] = playGame(deck1.slice(0, card1), deck2.slice(0, card2));
            }

            // console.log({ winnerIndex })

            if (winnerIndex === 1) {
                deck1.push(card1);
                deck1.push(card2);
            } else if (winnerIndex === 2) {
                deck2.push(card2);
                deck2.push(card1);
            } else {
                throw new Error('equal');
            }
        }
        return deck1.length > 0 ? [deck1, 1] : [deck2, 2];
    }

    const [winningDeck, winnerIndex] = playGame(deck1, deck2);

    const score = winningDeck.reverse().reduce((sum, num, key) => {
        return sum + num * (key + 1)
    }, 0)
    console.log({ deck1, deck2, score })

}

part2(realInput);