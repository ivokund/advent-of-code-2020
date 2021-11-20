const input = `.#######
#######.
###.###.
#....###
.#..##..
#.#.###.
###..###
.#.#.##.`;

const testInput = `.#.
..#
###`;

function part1(input) {
    const points = {}
    input.split('\n').forEach((line, y) => {
        line.split('').forEach((val, x) => {
            if (val === '#') {
                points[`${x}:${y}:0`] = true;
            }
        })
    });

    const neighbourMatrix = [];
    [-1, 0, 1].forEach((x) => {
        [-1, 0, 1].forEach((y) => {
            [-1, 0, 1].forEach((z) => {
                if (!(x === 0 && y === 0 && z === 0)) {
                    neighbourMatrix.push([x, y, z]);
                }
            })
        })
    })

    const getActiveNeighbourCount = (x, y, z, points) => {
        let activeCount = 0;
        neighbourMatrix.forEach(([dx, dy, dz]) => {
            const index = `${x+dx}:${y+dy}:${z+dz}`;
            if (points[index]) {
                activeCount++;
            }
        })
        return activeCount;
    }

    const getPotentialPointIndices = (points) => {
        const potentialPointIndices = [];
        Object.entries(points).map(([k, v]) => {
            const [x, y, z] = k.split(':').map((i) => parseInt(i, 10));
            potentialPointIndices.push(
                ...neighbourMatrix.map(([dx, dy, dz]) => `${x+dx}:${y+dy}:${z+dz}`)
            );
        });
        return potentialPointIndices;
    }

    // console.log(getActiveNeighbourCount(2, 0, 0, points));
    // process.exit();

    const iterate = (pointsBefore) => {

        const newPoints = [];
        getPotentialPointIndices(pointsBefore).forEach((index) => {
            const [x, y, z] = index.split(':').map((i) => parseInt(i, 10));
            const count = getActiveNeighbourCount(x, y, z, pointsBefore);
            if (count === 3) {
                newPoints.push([`${x}:${y}:${z}`, true]);
            }
        })

        Object.entries(pointsBefore).forEach(([k, v]) => {
            const [x, y, z] = k.split(':').map((i) => parseInt(i, 10));
            const count = getActiveNeighbourCount(x, y, z, pointsBefore);

            if (count === 2 || count === 3) {
                newPoints.push([`${x}:${y}:${z}`, true]);
            }
        })
        return Object.fromEntries(newPoints);
    }

    let finalPoints = {...points};
    for (let i=0; i<6; i++) {
        finalPoints = iterate(finalPoints);
    }

    console.log({ finalPoints });
    console.log(Object.values(finalPoints).filter((i) => !!i).length)

}



function part2(input) {
    const points = {}
    input.split('\n').forEach((line, y) => {
        line.split('').forEach((val, x) => {
            if (val === '#') {
                points[`${x}:${y}:0:0`] = true;
            }
        })
    });

    const neighbourMatrix = [];
    [-1, 0, 1].forEach((x) => {
        [-1, 0, 1].forEach((y) => {
            [-1, 0, 1].forEach((z) => {
                [-1, 0, 1].forEach((w) => {
                    if (!(x === 0 && y === 0 && z === 0 && w === 0)) {
                        neighbourMatrix.push([x, y, z, w]);
                    }
                })
            })
        })
    })

    const getActiveNeighbourCount = (x, y, z, w, points) => {
        let activeCount = 0;
        neighbourMatrix.forEach(([dx, dy, dz, dw]) => {
            const index = `${x+dx}:${y+dy}:${z+dz}:${w+dw}`;
            if (points[index]) {
                activeCount++;
            }
        })
        return activeCount;
    }

    const getPotentialPointIndices = (points) => {
        const potentialPointIndices = [];
        Object.entries(points).map(([k, v]) => {
            const [x, y, z, w] = k.split(':').map((i) => parseInt(i, 10));
            potentialPointIndices.push(
                ...neighbourMatrix.map(([dx, dy, dz, dw]) => `${x+dx}:${y+dy}:${z+dz}:${w+dw}`)
            );
        });
        return potentialPointIndices;
    }

    // console.log(getActiveNeighbourCount(2, 0, 0, points));
    // process.exit();

    const iterate = (pointsBefore) => {

        const newPoints = [];
        getPotentialPointIndices(pointsBefore).forEach((index) => {
            const [x, y, z, w] = index.split(':').map((i) => parseInt(i, 10));
            const count = getActiveNeighbourCount(x, y, z, w, pointsBefore);
            if (count === 3) {
                newPoints.push([`${x}:${y}:${z}:${w}`, true]);
            }
        })

        Object.entries(pointsBefore).forEach(([k, v]) => {
            const [x, y, z, w] = k.split(':').map((i) => parseInt(i, 10));
            const count = getActiveNeighbourCount(x, y, z, w, pointsBefore);

            if (count === 2 || count === 3) {
                newPoints.push([`${x}:${y}:${z}:${w}`, true]);
            }
        })
        return Object.fromEntries(newPoints);
    }

    let finalPoints = {...points};
    for (let i=0; i<6; i++) {
        finalPoints = iterate(finalPoints);
    }

    console.log({ finalPoints });
    console.log(Object.values(finalPoints).filter((i) => !!i).length)

}


part2(input)