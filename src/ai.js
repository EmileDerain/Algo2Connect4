function computeMove(gameState) {
    console.log('De base: ', gameState);
    const numberPlayer = whoPlay(gameState);
    const mark = tryAll(gameState, numberPlayer);

    for (let i = 0; i < 7; i++) {
        //Si il peut gagné
        if (mark[i][0][2]) {
            for (let j = 0; j <= 6; j++) {
                if (gameState[i][j] === 0) {
                    console.log("AIplays: ", [i, j]);
                    return [i, j];
                }
            }
        }
    }

    const bestOne = choiceBest(numberPlayer, mark);

    for (let j = 0; j <= 6; j++) {
        if (gameState[bestOne][j] === 0) {
            console.log("AIplays: ", [bestOne, j]);
            return [bestOne, j];
        }
    }

}

function choiceBest(numberPlayer, tab) {
    const min = [0, 0, 0, 0, 0, 0, 0];

    //console.log('tab: ', tab);

    let iMaxMe = 3;
    let iMinEnemy = 0;
    if (numberPlayer === 1) {

        for (let i = 1; i < 7; i++) {
            if (tab[iMinEnemy][0][1] > tab[i][0][1] && tab[i][1]) {
                iMinEnemy = i;
            }
        }

        //console.log('1Min -> ', tab[iMinEnemy], '--indexMin : ', iMinEnemy);

        for (let i = 0; i < 7; i++) {
            if (tab[iMinEnemy][0][1] === tab[i][0][1] && tab[i][1]) {
                min[i] = 1;
            }
        }

        if (min[3] === 1) {
            iMaxMe = 3;
        } else if (min[4] === 1) {
            iMaxMe = 4;
        } else if (min[2] === 1) {
            iMaxMe = 2;
        } else if (min[5] === 1) {
            iMaxMe = 5;
        } else if (min[1] === 1) {
            iMaxMe = 1;
        } else if (min[6] === 1) {
            iMaxMe = 6;
        } else {
            iMaxMe = 0;
        }

        //console.log('1minTab -> ', min, '--indexMax : ', iMaxMe);


        for (let i = 0; i < 7; i++) {
            if (min[i] === 1) {
                if (tab[iMaxMe][0][0] < tab[i][0][0] && tab[i][1]) {
                    iMaxMe = i;
                }
            }
        }

        //console.log('1Better: ', iMaxMe);

        return iMaxMe;

    } else {
        for (let i = 1; i < 7; i++) {
            if (tab[iMinEnemy][0][0] > tab[i][0][0] && tab[i][1]) {
                iMinEnemy = i;
            }
        }

        //console.log('2Min -> ', tab[iMinEnemy], '--index : ', iMinEnemy);


        for (let i = 0; i < 7; i++) {
            if (tab[iMinEnemy][0][0] === tab[i][0][0] && tab[i][1]) {
                min[i] = 1;
                iMaxMe = i;
            }
        }

        if (min[3] === 1) {
            iMaxMe = 3;
        } else if (min[4] === 1) {
            iMaxMe = 4;
        } else if (min[2] === 1) {
            iMaxMe = 2;
        } else if (min[5] === 1) {
            iMaxMe = 5;
        } else if (min[1] === 1) {
            iMaxMe = 1;
        } else if (min[6] === 1) {
            iMaxMe = 6;
        } else {
            iMaxMe = 0;
        }

        //console.log('2minTab -> ', min, '--indexMax : ', iMaxMe);


        for (let i = 0; i < 7; i++) {
            if (min[i] === 1) {
                if (tab[iMaxMe][0][1] < tab[i][0][1] && tab[i][1]) {
                    iMaxMe = i;
                }
            }
        }
        //console.log('2Better: ', iMaxMe);
        return iMaxMe;

    }
}

function tryAll(gameState, numberPlayer) {
    //console.log("Numéro IA: ", numberPlayer);
    const res = [0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 7; i++) {
        const aGameState = newGameState(gameState, i, numberPlayer);
        const ptn = markGame(aGameState[0]);
        //console.log("If IA play : ", i, " -> ptn[j1][j2] :" + ptn);
        res[i] = [ptn, aGameState[1]];
    }
    //console.log('res : ', res);
    return res;
}

function whoPlay(gameState) {
    let j1 = 0;
    let j2 = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
            if (gameState[i][j] === 1) {
                j1 += 1;
            } else if (gameState[i][j] === 2) {
                j2 += 1;
            }
        }
    }
    if (j1 === j2) {
        return 1;
    } else {
        return 2;
    }
}

function newGameState(gameState, col, numberPlayer) {
    const gameState2 = JSON.parse(JSON.stringify(gameState));
    for (let j = 0; j <= 5; j++) {
        if (gameState2[col][j] === 0) {
            gameState2[col][j] = numberPlayer;
            return [gameState2, true];
        }
    }
    return [gameState2, false];
}

function markGame(gameState) {
    let j1 = 0;
    let j2 = 0;
    let canWin = false;

    //console.log('TEST GameState: ', gameState);


    let nb = giveO_E(gameState);
    //console.log('TEST GameState: ', gameState);

    j1 += nb[0];
    j2 += nb[1];
    if (nb[2])
        canWin = true;

    nb = giveE_O(gameState);
    //console.log('TEST GameState: ', gameState);

    j1 += nb[0];
    j2 += nb[1];
    if (nb[2])
        canWin = true;

    nb = giveS_N(gameState);
    //console.log('TEST GameState: ', gameState);

    j1 += nb[0];
    j2 += nb[1];
    if (nb[2])
        canWin = true;

    nb = giveNO_SE(gameState);
    //console.log('TEST GameState: ', gameState);

    j1 += nb[0];
    j2 += nb[1];
    if (nb[2])
        canWin = true;

    nb = giveSE_NO(gameState);
    //console.log('TEST GameState: ', gameState);

    j1 += nb[0];
    j2 += nb[1];
    if (nb[2])
        canWin = true;

    nb = giveSO_NE(gameState);
    // console.log('TEST GameState: ', gameState);

    j1 += nb[0];
    j2 += nb[1];
    if (nb[2])
        canWin = true;

    nb = giveNE_SO(gameState);
    //console.log('TEST GameState: ', gameState);

    j1 += nb[0];
    j2 += nb[1];
    if (nb[2])
        canWin = true;

    return [j1, j2, canWin];

}

const pt1 = 1;
const pt2 = 4;
const pt3 = 9;
const pt4 = 100;

//place = [col, row]
function giveO_E(gameState) {
    let canWin = false;

    let j = {0: 0, 1: 0, "-1": 0};
    for (let i = 0; i < 4; i++) {
        for (let k = 0; k < 6; k++) {
            //console.log('i: ', i, ' k: ', k, ' du tab: ', gameState);
            const cp = gameState[i][k];
            if (cp !== 0 && (gameState[i + 1][k] === cp || gameState[i + 1][k] === 0) &&
                (gameState[i + 2][k] === cp || gameState[i + 2][k] === 0) &&
                (gameState[i + 3][k] === cp || gameState[i + 3][k] === 0)) {
                if (gameState[i + 1][k] === cp) {

                    if (gameState[i + 2][k] === cp) {
                        if (gameState[i + 3][k] === cp) {
                            j[cp] = j[cp] + pt4;
                            canWin = true;
                        } else {
                            j[cp] = j[cp] + pt3;
                        }
                    } else {
                        j[cp] = j[cp] + pt2;
                    }
                } else {
                    j[cp] = j[cp] + pt1;
                }
            }

        }
    }
    //console.log("giveO_E : ", j);
    return [j[1], j[2], canWin];
}


function giveE_O(gameState) {
    let canWin = false;

    let j = {0: 0, 1: 0, "-1": 0};
    for (let i = 3; i < 7; i++) {
        for (let k = 0; k < 6; k++) {
            //console.log('i: ', i, ' k: ', k, ' du tab: ', gameState);

            const cp = gameState[i][k];
            if (cp !== 0 && (gameState[i - 1][k] === cp || gameState[i - 1][k] === 0) &&
                (gameState[i - 2][k] === cp || gameState[i - 2][k] === 0) &&
                (gameState[i - 3][k] === cp || gameState[i - 3][k] === 0)) {
                if (gameState[i - 1][k] === cp) {

                    if (gameState[i - 2][k] === cp) {
                        if (gameState[i - 3][k] === cp) {
                            j[cp] = j[cp] + pt4;
                            canWin = true;
                        } else {
                            j[cp] = j[cp] + pt3;
                        }
                    } else {
                        j[cp] = j[cp] + pt2;
                    }
                } else {
                    j[cp] = j[cp] + pt1;
                }
            }

        }
    }
    // console.log("giveE_O : ", j);
    return [j[1], j[2], canWin];
}

function giveS_N(gameState) {
    let canWin = false;

    let j = {0: 0, 1: 0, "-1": 0};
    for (let i = 0; i < 7; i++) {
        for (let k = 0; k < 3; k++) {
            //console.log('i: ', i, ' k: ', k, ' du tab: ', gameState);

            const cp = gameState[i][k];
            if (cp !== 0 && (gameState[i][k + 1] === cp || gameState[i][k + 1] === 0) &&
                (gameState[i][k + 2] === cp || gameState[i][k + 2] === 0) &&
                (gameState[i][k + 3] === cp || gameState[i][k + 3] === 0)) {
                if (gameState[i][k + 1] === cp) {

                    if (gameState[i][k + 2] === cp) {
                        if (gameState[i][k + 3] === cp) {
                            j[cp] = j[cp] + pt4;
                            canWin = true;
                        } else {
                            j[cp] = j[cp] + pt3;
                        }
                    } else {
                        j[cp] = j[cp] + pt2;
                    }
                } else {
                    j[cp] = j[cp] + pt1;
                }
            }

        }
    }
    // console.log("giveS_N : ", j);
    return [j[1], j[2], canWin];
}

function giveNO_SE(gameState) {
    let canWin = false;

    let j = {0: 0, 1: 0, "-1": 0};
    for (let i = 0; i < 4; i++) {
        for (let k = 3; k < 6; k++) {
            const cp = gameState[i][k];
            //console.log('i: ', i, ' k: ', k, ' du tab: ', gameState);

            if (cp !== 0 && (gameState[i + 1][k - 1] === cp || gameState[i + 1][k - 1] === 0) &&
                (gameState[i + 2][k - 2] === cp || gameState[i + 2][k - 2] === 0) &&
                (gameState[i + 3][k - 3] === cp || gameState[i + 3][k - 3] === 0)) {
                if (gameState[i + 1][k - 1] === cp) {

                    if (gameState[i + 2][k - 2] === cp) {
                        if (gameState[i + 3][k - 3] === cp) {
                            j[cp] = j[cp] + pt4;
                            canWin = true;
                        } else {
                            j[cp] = j[cp] + pt3;
                        }
                    } else {
                        j[cp] = j[cp] + pt2;
                    }
                } else {
                    j[cp] = j[cp] + pt1;
                }
            }

        }
    }
    //console.log("giveNO_SE : ", j);
    return [j[1], j[2], canWin];
}

function giveSE_NO(gameState) {
    let canWin = false;

    let j = {0: 0, 1: 0, "-1": 0};
    for (let i = 3; i < 7; i++) {
        for (let k = 0; k < 3; k++) {
            const cp = gameState[i][k];
            //console.log('i: ', i, ' k: ', k, ' du tab: ', gameState);

            if (cp !== 0 && (gameState[i - 1][k + 1] === cp || gameState[i - 1][k + 1] === 0) &&
                (gameState[i - 2][k + 2] === cp || gameState[i - 2][k + 2] === 0) &&
                (gameState[i - 3][k + 3] === cp || gameState[i - 3][k + 3] === 0)) {
                if (gameState[i - 1][k + 1] === cp) {

                    if (gameState[i - 2][k + 2] === cp) {
                        if (gameState[i - 3][k + 3] === cp) {
                            j[cp] = j[cp] + pt4;
                            canWin = true;
                        } else {
                            j[cp] = j[cp] + pt3;
                        }
                    } else {
                        j[cp] = j[cp] + pt2;
                    }
                } else {
                    j[cp] = j[cp] + pt1;
                }
            }

        }
    }
    //console.log("giveSE_NO : ", j);
    return [j[1], j[2], canWin];
}

function giveSO_NE(gameState) {
    let canWin = false;

    let j = {0: 0, 1: 0, "-1": 0};
    for (let i = 0; i < 4; i++) {
        for (let k = 0; k < 3; k++) {
            const cp = gameState[i][k];
            //console.log('i: ', i, ' k: ', k, ' du tab: ', gameState);

            if (cp !== 0 && (gameState[i + 1][k + 1] === cp || gameState[i + 1][k + 1] === 0) &&
                (gameState[i + 2][k + 2] === cp || gameState[i + 2][k + 2] === 0) &&
                (gameState[i + 3][k + 3] === cp || gameState[i + 3][k + 3] === 0)) {
                if (gameState[i + 1][k + 1] === cp) {

                    if (gameState[i + 2][k + 2] === cp) {
                        if (gameState[i + 3][k + 3] === cp) {
                            j[cp] = j[cp] + pt4;
                            canWin = true;
                        } else {
                            j[cp] = j[cp] + pt3;
                        }
                    } else {
                        j[cp] = j[cp] + pt2;
                    }
                } else {
                    j[cp] = j[cp] + pt1;
                }
            }

        }
    }
    //console.log("giveSO_NE : ", j);
    return [j[1], j[2], canWin];
}

function giveNE_SO(gameState) {
    let canWin = false;

    let j = {0: 0, 1: 0, "-1": 0};
    for (let i = 3; i < 7; i++) {
        for (let k = 3; k < 6; k++) {
            const cp = gameState[i][k];
            //console.log('i: ', i, ' k: ', k, ' du tab: ', gameState);

            if (cp !== 0 && (gameState[i - 1][k - 1] === cp || gameState[i - 1][k - 1] === 0) &&
                (gameState[i - 2][k - 2] === cp || gameState[i - 2][k - 2] === 0) &&
                (gameState[i - 3][k - 3] === cp || gameState[i - 3][k - 3] === 0)) {
                if (gameState[i - 1][k - 1] === cp) {

                    if (gameState[i - 2][k - 2] === cp) {
                        if (gameState[i - 3][k - 3] === cp) {
                            j[cp] = j[cp] + pt4;
                            canWin = true;
                        } else {
                            j[cp] = j[cp] + pt3;
                        }
                    } else {
                        j[cp] = j[cp] + pt2;
                    }
                } else {
                    j[cp] = j[cp] + pt1;
                }
            }
        }
    }
    //console.log("giveNE_SO : ", j);
    return [j[1], j[2], canWin];
}

exports.computeMove = computeMove;