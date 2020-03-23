var playground = createPlayground();


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
                if (p1[0] === cell[0] && p1[1] === cell[1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function moveDown(currentObject) {
    if (!currentObject) {
        return;
    }
    for (let position of currentObject.position) {
        if (position[0] <= 0 || overlaps([position[0] - 1, position[1]])) {
            currentObject.state = 'static';
            if (currentObj) {
                let lines = new Set();
                for (let pos of currentObj.position) {
                    if(pos[0] !== undefined) lines.add(pos[0]);

                }
                lines.forEach(line => console.log(`!!!!!!!!the line is: ${playground[line]}`))
                for (let l of lines) {
                    if (!playground[l].some(element => element === undefined)) {
                        console.log("cleaning");
                        console.log(playground[l]);
                        playground[l].fill(null);
                        console.log("after cleaning");
                        console.log(playground[l]);

                    }
                }
                break;
            }
        }
    }
    if (currentObject.state === 'falling') {
        currentObject.position.forEach(position => (position[0] -= 1));
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

renderPlayground()

// interval 1 second
var currentObj;
var gameInterval = setInterval(() => {


    if (!getCurrentObject()) {
        currentObj = createRandomObj();
    } else {
        currentObj = getCurrentObject();
    }

    moveDown(currentObj);

    console.log(objects);
}, 400);