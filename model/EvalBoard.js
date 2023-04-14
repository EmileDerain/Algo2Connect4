class EvalBoard {

    pt1 = 1;
    pt2 = 4;
    pt3 = 9;
    pt4 = 100;

    currentBoard;

    j1Points = 0;
    j2Points = 0;

    isThereAWinner = false;

    constructor(currentBoard) {
        this.currentBoard = currentBoard;
        //console.log("this.currentBoard: ", this.currentBoard)
    }

    evalCurrentBoard() {
        //Human
        let j1 = 0;
        //IA
        let j2 = 0;

        let nb = this.giveO_E();
        //console.log('TEST GameState: ', gameState);

        j1 += nb[0];
        j2 += nb[1];
        if (nb[2])
            this.isThereAWinner = true;

        nb = this.giveE_O();
        //console.log('TEST GameState: ', gameState);

        j1 += nb[0];
        j2 += nb[1];
        if (nb[2])
            this.isThereAWinner = true;

        nb = this.giveS_N();
        //console.log('TEST GameState: ', gameState);

        j1 += nb[0];
        j2 += nb[1];
        if (nb[2])
            this.isThereAWinner = true;

        nb = this.giveNO_SE();
        //console.log('TEST GameState: ', gameState);

        j1 += nb[0];
        j2 += nb[1];
        if (nb[2])
            this.isThereAWinner = true;

        nb = this.giveSE_NO();
        //console.log('TEST GameState: ', gameState);

        j1 += nb[0];
        j2 += nb[1];
        if (nb[2])
            this.isThereAWinner = true;

        nb = this.giveSO_NE();
        // console.log('TEST GameState: ', gameState);

        j1 += nb[0];
        j2 += nb[1];
        if (nb[2])
            this.isThereAWinner = true;

        nb = this.giveNE_SO();
        //console.log('TEST GameState: ', gameState);

        j1 += nb[0];
        j2 += nb[1];
        if (nb[2])
            this.isThereAWinner = true;

        this.j1Points = j1;
        this.j2Points = j2;
    }


//place = [col, row]
    giveO_E() {
        let canWin = false;

        let j = {0: 0, 1: 0, "-1": 0};
        for (let i = 0; i < 4; i++) {
            for (let k = 0; k < 6; k++) {
                //console.log('i: ', i, ' k: ', k, ' du tab: ', this.currentBoard);
                const cp = this.currentBoard[i][k];
                if (cp !== 0 && (this.currentBoard[i + 1][k] === cp || this.currentBoard[i + 1][k] === 0) &&
                    (this.currentBoard[i + 2][k] === cp || this.currentBoard[i + 2][k] === 0) &&
                    (this.currentBoard[i + 3][k] === cp || this.currentBoard[i + 3][k] === 0)) {
                    if (this.currentBoard[i + 1][k] === cp) {
                        if (this.currentBoard[i + 2][k] === cp) {
                            if (this.currentBoard[i + 3][k] === cp) {
                                j[cp] = j[cp] + this.pt4;
                                canWin = true;
                            } else {
                                j[cp] = j[cp] + this.pt3;
                            }
                        } else {
                            j[cp] = j[cp] + this.pt2;
                        }
                    } else {
                        j[cp] = j[cp] + this.pt1;
                    }
                }

            }
        }
        //console.log("giveO_E : ", j);
        return [j[1], j["-1"], canWin];
    }


    giveE_O() {
        let canWin = false;

        let j = {0: 0, 1: 0, 2: 0};
        for (let i = 3; i < 7; i++) {
            for (let k = 0; k < 6; k++) {
                //console.log('i: ', i, ' k: ', k, ' du tab: ', this.currentBoard);

                //console.log("this.currentBoard PB !! : ", i, k, this.currentBoard[i])


                const cp = this.currentBoard[i][k];
                if (cp !== 0 && (this.currentBoard[i - 1][k] === cp || this.currentBoard[i - 1][k] === 0) &&
                    (this.currentBoard[i - 2][k] === cp || this.currentBoard[i - 2][k] === 0) &&
                    (this.currentBoard[i - 3][k] === cp || this.currentBoard[i - 3][k] === 0)) {
                    if (this.currentBoard[i - 1][k] === cp) {

                        if (this.currentBoard[i - 2][k] === cp) {
                            if (this.currentBoard[i - 3][k] === cp) {
                                j[cp] = j[cp] + this.pt4;
                                canWin = true;
                            } else {
                                j[cp] = j[cp] + this.pt3;
                            }
                        } else {
                            j[cp] = j[cp] + this.pt2;
                        }
                    } else {
                        j[cp] = j[cp] + this.pt1;
                    }
                }

            }
        }
        // console.log("giveE_O : ", j);
        return [j[1], j[2], canWin];
    }

    giveS_N() {
        let canWin = false;

        let j = {0: 0, 1: 0, 2: 0};
        for (let i = 0; i < 7; i++) {
            for (let k = 0; k < 3; k++) {
                //console.log('i: ', i, ' k: ', k, ' du tab: ', this.currentBoard);

                const cp = this.currentBoard[i][k];
                if (cp !== 0 && (this.currentBoard[i][k + 1] === cp || this.currentBoard[i][k + 1] === 0) &&
                    (this.currentBoard[i][k + 2] === cp || this.currentBoard[i][k + 2] === 0) &&
                    (this.currentBoard[i][k + 3] === cp || this.currentBoard[i][k + 3] === 0)) {
                    if (this.currentBoard[i][k + 1] === cp) {

                        if (this.currentBoard[i][k + 2] === cp) {
                            if (this.currentBoard[i][k + 3] === cp) {
                                j[cp] = j[cp] + this.pt4;
                                canWin = true;
                            } else {
                                j[cp] = j[cp] + this.pt3;
                            }
                        } else {
                            j[cp] = j[cp] + this.pt2;
                        }
                    } else {
                        j[cp] = j[cp] + this.pt1;
                    }
                }

            }
        }
        // console.log("giveS_N : ", j);
        return [j[1], j[2], canWin];
    }

    giveNO_SE() {
        let canWin = false;

        let j = {0: 0, 1: 0, 2: 0};
        for (let i = 0; i < 4; i++) {
            for (let k = 3; k < 6; k++) {
                const cp = this.currentBoard[i][k];
                //console.log('i: ', i, ' k: ', k, ' du tab: ', this.currentBoard);

                if (cp !== 0 && (this.currentBoard[i + 1][k - 1] === cp || this.currentBoard[i + 1][k - 1] === 0) &&
                    (this.currentBoard[i + 2][k - 2] === cp || this.currentBoard[i + 2][k - 2] === 0) &&
                    (this.currentBoard[i + 3][k - 3] === cp || this.currentBoard[i + 3][k - 3] === 0)) {
                    if (this.currentBoard[i + 1][k - 1] === cp) {

                        if (this.currentBoard[i + 2][k - 2] === cp) {
                            if (this.currentBoard[i + 3][k - 3] === cp) {
                                j[cp] = j[cp] + this.pt4;
                                canWin = true;
                            } else {
                                j[cp] = j[cp] + this.pt3;
                            }
                        } else {
                            j[cp] = j[cp] + this.pt2;
                        }
                    } else {
                        j[cp] = j[cp] + this.pt1;
                    }
                }

            }
        }
        //console.log("giveNO_SE : ", j);
        return [j[1], j[2], canWin];
    }

    giveSE_NO() {
        let canWin = false;

        let j = {0: 0, 1: 0, 2: 0};
        for (let i = 3; i < 7; i++) {
            for (let k = 0; k < 3; k++) {
                const cp = this.currentBoard[i][k];
                //console.log('i: ', i, ' k: ', k, ' du tab: ', this.currentBoard);

                if (cp !== 0 && (this.currentBoard[i - 1][k + 1] === cp || this.currentBoard[i - 1][k + 1] === 0) &&
                    (this.currentBoard[i - 2][k + 2] === cp || this.currentBoard[i - 2][k + 2] === 0) &&
                    (this.currentBoard[i - 3][k + 3] === cp || this.currentBoard[i - 3][k + 3] === 0)) {
                    if (this.currentBoard[i - 1][k + 1] === cp) {

                        if (this.currentBoard[i - 2][k + 2] === cp) {
                            if (this.currentBoard[i - 3][k + 3] === cp) {
                                j[cp] = j[cp] + this.pt4;
                                canWin = true;
                            } else {
                                j[cp] = j[cp] + this.pt3;
                            }
                        } else {
                            j[cp] = j[cp] + this.pt2;
                        }
                    } else {
                        j[cp] = j[cp] + this.pt1;
                    }
                }

            }
        }
        //console.log("giveSE_NO : ", j);
        return [j[1], j[2], canWin];
    }

    giveSO_NE() {
        let canWin = false;

        let j = {0: 0, 1: 0, 2: 0};
        for (let i = 0; i < 4; i++) {
            for (let k = 0; k < 3; k++) {
                const cp = this.currentBoard[i][k];
                //console.log('i: ', i, ' k: ', k, ' du tab: ', this.currentBoard);

                if (cp !== 0 && (this.currentBoard[i + 1][k + 1] === cp || this.currentBoard[i + 1][k + 1] === 0) &&
                    (this.currentBoard[i + 2][k + 2] === cp || this.currentBoard[i + 2][k + 2] === 0) &&
                    (this.currentBoard[i + 3][k + 3] === cp || this.currentBoard[i + 3][k + 3] === 0)) {
                    if (this.currentBoard[i + 1][k + 1] === cp) {

                        if (this.currentBoard[i + 2][k + 2] === cp) {
                            if (this.currentBoard[i + 3][k + 3] === cp) {
                                j[cp] = j[cp] + this.pt4;
                                canWin = true;
                            } else {
                                j[cp] = j[cp] + this.pt3;
                            }
                        } else {
                            j[cp] = j[cp] + this.pt2;
                        }
                    } else {
                        j[cp] = j[cp] + this.pt1;
                    }
                }

            }
        }
        //console.log("giveSO_NE : ", j);
        return [j[1], j[2], canWin];
    }

    giveNE_SO() {
        let canWin = false;

        let j = {0: 0, 1: 0, 2: 0};
        for (let i = 3; i < 7; i++) {
            for (let k = 3; k < 6; k++) {
                const cp = this.currentBoard[i][k];
                //console.log('i: ', i, ' k: ', k, ' du tab: ', this.currentBoard);

                if (cp !== 0 && (this.currentBoard[i - 1][k - 1] === cp || this.currentBoard[i - 1][k - 1] === 0) &&
                    (this.currentBoard[i - 2][k - 2] === cp || this.currentBoard[i - 2][k - 2] === 0) &&
                    (this.currentBoard[i - 3][k - 3] === cp || this.currentBoard[i - 3][k - 3] === 0)) {
                    if (this.currentBoard[i - 1][k - 1] === cp) {

                        if (this.currentBoard[i - 2][k - 2] === cp) {
                            if (this.currentBoard[i - 3][k - 3] === cp) {
                                j[cp] = j[cp] + this.pt4;
                                canWin = true;
                            } else {
                                j[cp] = j[cp] + this.pt3;
                            }
                        } else {
                            j[cp] = j[cp] + this.pt2;
                        }
                    } else {
                        j[cp] = j[cp] + this.pt1;
                    }
                }
            }
        }
        //console.log("giveNE_SO : ", j);
        return [j[1], j[2], canWin];
    }
}

module.exports = EvalBoard;