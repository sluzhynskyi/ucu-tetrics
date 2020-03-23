var playground = createPlayground();

console.log(playground);

// will add object positions to the emply playground array
function renderPositions() {
    objects.forEach(object => {
        object.position.forEach(([rowIndex, cellIndex]) => {
            playground[rowIndex][cellIndex] = TYPE_COLORS[object.type];
        })
    });
}
function overlaps(cell) {
    for (let obj of objects) {
        if (obj.state === 'static') {
            for (let p1 of obj.position) {
                console.log(`p1: ${p1}, cell: ${cell}`)
                if (p1[0] === cell[0] && p1[1] === cell[1]) {
                    console.log("TRUE")
                    return true;
                }
            }
        }
    }
    return false;
}

function moveDown(currentObject) {
    for (let position of currentObject.position) {
        if (position[0] <= 0 || overlaps([position[0] - 1, position[1]])) {
            currentObject.state = 'static';
            break;
        }
    }
    if (currentObject.state === 'falling') {
        currentObject.position.forEach(position => (position[0] -= 1));
        console.log(objects)
    }

    playground = createPlayground();
    renderPlayground()

}

function moveRight(obj) {
    console.log("right")
    let currentObject = getCurrentObject();
    if (currentObject.position.every(position => (position[1] < 7) && !overlaps([position[0], position[1] + 1]))) {
        currentObject.position.forEach(position => position[1] += 1);
    }
    // 3. re-define clear playground
    playground = createPlayground();

    // 4. re-renderPositions
    // 5. re-renderPlayground
    renderPlayground()

}

function moveLeft(obj) {
    console.log('moving left')
    let currentObject = getCurrentObject();
    if (currentObject.position.every(position => (position[1] > 0 && !overlaps([position[0], position[1] - 1])))) {
        currentObject.position.forEach(position => position[1] -= 1);
    }
    // 3. re-define clear playground
    playground = createPlayground();

    // 4. re-renderPositions
    // 5. re-renderPlayground
    renderPlayground()
}

function pauseGame() {
    console.log('pausing the game')
    clearInterval(gameInterval);
}

// function createObj() {}

// Events
// 1. move to bottom
// 2. move right
// 3. move left
// 4. pause
// 5. game over
// 6. (re)render playground

renderPlayground()

// interval 1 second
var gameInterval = setInterval(() => {
    let currentObj;
    if (!getCurrentObject()) {
        currentObj = createRandomObj();
    } else {
        currentObj = getCurrentObject();
    }
    moveDown(currentObj);


    console.log(objects);
}, 400);